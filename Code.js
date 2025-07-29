// The ID of your Google Sheet
const SPREADSHEET_ID = "173tUIsQFYL8QeI-65DW62SeyOuBEK8v2t5Lhtmq5qSo";
// The name of the sheet with questions
const QUESTIONS_SHEET = "Questions";
// The name of the sheet for the student roster
const ROSTER_SHEET = "Student Roster";

// --- CRITICAL: YOUR EMAIL HAS BEEN ADDED HERE ---
const TEACHER_CONFIG = {
  "jennifer.ivers@orono.k12.mn.us": { name: "Ms. Ivers", sheet: "Ivers" },
  "email.for.ms.cole@yourschool.edu": { name: "Ms. Cole", sheet: "Cole" },         // <-- UPDATE THIS EMAIL
  "email.for.ms.erickson@yourschool.edu": { name: "Ms. Erickson", sheet: "Erickson" } // <-- UPDATE THIS EMAIL
};

// --- Define proficiency bands (single source of truth) ---
const PROFICIENCY_BANDS = {
  MASTERED: { min: 90, label: 'Mastered' },
  PROFICIENT: { min: 70, label: 'Proficient' },
  DEVELOPING: { min: 0, label: 'Developing' }
};

// Helper function to prevent sheet errors
function getSheetSafely(spreadsheet, sheetName) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`The sheet named "${sheetName}" could not be found. Please check the name in your Google Sheet and in the script.`);
  }
  return sheet;
}

// ROUTING: Serves the correct HTML page based on user role
function doGet(e) {
  const userEmail = Session.getActiveUser().getEmail();
  if (Object.keys(TEACHER_CONFIG).includes(userEmail)) {
    return HtmlService.createTemplateFromFile('Teacher')
      .evaluate()
      .setTitle('Teacher Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Grammar Practice Quiz')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// --- THIS FUNCTION IS UPDATED TO AVOID THE RACE CONDITION ---
function registerStudent(studentData) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
    
    // Add the student to the roster
    rosterSheet.appendRow([userEmail, studentData.name, studentData.teacher]);
    
    // IMPORTANT: Return the new student's info directly so the client doesn't have to ask again.
    return { 
      success: true, 
      name: studentData.name, 
      teacher: studentData.teacher 
    };

  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// --- The rest of the functions are unchanged, but included for completeness. ---

function getStudentBestScores(sheet) { const data = sheet.getDataRange().getValues(); if (data.length < 2) return {}; const headers = data.shift(); const nameIndex = headers.indexOf("Student Name"); const unitIndex = headers.indexOf("Unit"); const percentageIndex = headers.indexOf("Percentage"); return data.reduce((acc, row) => { const studentName = row[nameIndex]; const unit = row[unitIndex]; const percentage = Number(row[percentageIndex]); if (!studentName || !unit) return acc; if (!acc[studentName]) acc[studentName] = {}; if (!acc[studentName][unit] || percentage > acc[studentName][unit]) { acc[studentName][unit] = percentage; } return acc; }, {}); }
function getTeacherDashboardOverview() { try { const userEmail = Session.getActiveUser().getEmail(); const teacherInfo = TEACHER_CONFIG[userEmail]; if (!teacherInfo) throw new Error("Access Denied."); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const sheet = getSheetSafely(ss, teacherInfo.sheet); const studentBestScores = getStudentBestScores(sheet); const allStudents = Object.keys(studentBestScores); if (allStudents.length === 0) { return { success: true, teacherName: teacherInfo.name, overview: {} }; } const unitStats = {}; allStudents.forEach(studentName => { Object.keys(studentBestScores[studentName]).forEach(unitName => { if (!unitStats[unitName]) { unitStats[unitName] = { developing: 0, proficient: 0, mastered: 0, total: 0 }; } const score = studentBestScores[studentName][unitName]; if (score >= PROFICIENCY_BANDS.MASTERED.min) unitStats[unitName].mastered++; else if (score >= PROFICIENCY_BANDS.PROFICIENT.min) unitStats[unitName].proficient++; else unitStats[unitName].developing++; unitStats[unitName].total++; }); }); Object.keys(unitStats).forEach(unitName => { const stats = unitStats[unitName]; stats.masteredPct = (stats.mastered / stats.total * 100).toFixed(1); stats.proficientPct = (stats.proficient / stats.total * 100).toFixed(1); stats.developingPct = (100 - parseFloat(stats.masteredPct) - parseFloat(stats.proficientPct)).toFixed(1); }); return { success: true, teacherName: teacherInfo.name, overview: unitStats }; } catch(e) { return { success: false, error: e.toString() }; } }
function getUnitDetailsForTeacher(unitName) { try { const userEmail = Session.getActiveUser().getEmail(); const teacherInfo = TEACHER_CONFIG[userEmail]; if (!teacherInfo) throw new Error("Access Denied."); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const sheet = getSheetSafely(ss, teacherInfo.sheet); const studentBestScores = getStudentBestScores(sheet); const unitDetails = Object.keys(studentBestScores) .map(studentName => ({ studentName: studentName, bestScore: studentBestScores[studentName][unitName] })) .sort((a, b) => a.studentName.localeCompare(b.studentName)); return { success: true, details: unitDetails }; } catch(e) { return { success: false, error: e.toString() }; } }
function getUserInfo() { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const data = rosterSheet.getDataRange().getValues(); const studentRow = data.find(row => row[0] === userEmail); if (studentRow) { return { isRegistered: true, name: studentRow[1], teacher: studentRow[2] }; } else { const teacherNames = Object.values(TEACHER_CONFIG).map(t => t.name); return { isRegistered: false, teachers: teacherNames }; } } catch (e) { return { error: e.toString() }; } }
function saveQuizResult(resultData) { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const studentName = studentInfo[1]; const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = teacherEntry.sheet; const resultsSheet = getSheetSafely(ss, resultsSheetName); const timestamp = new Date(); const score = resultData.score; const total = resultData.total; const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0; resultsSheet.appendRow([timestamp, userEmail, studentName, resultData.unit, score, total, percentage]); return { success: true }; } catch (e) { return { success: false, error: e.toString() }; } }
function getStudentProgress() { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = teacherEntry.sheet; const sheet = getSheetSafely(ss, resultsSheetName); const studentBestScores = getStudentBestScores(sheet); return { success: true, progress: studentBestScores[studentInfo[1]] || {} }; } catch (e) { return { success: false, error: e.toString() }; } }
function getQuestionsForUnit(unitName) { try { const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const sheet = getSheetSafely(ss, QUESTIONS_SHEET); const data = sheet.getDataRange().getValues(); const headers = data.shift(); const unitIndex = headers.indexOf('Unit'); const questionIndex = headers.indexOf('Question'); const answerIndex = headers.indexOf('Answer'); const incorrect1Index = headers.indexOf('Incorrect 1'); const incorrect2Index = headers.indexOf('Incorrect 2'); const incorrect3Index = headers.indexOf('Incorrect 3'); if (unitIndex === -1 || questionIndex === -1 || answerIndex === -1) { throw new Error("A required column (Unit, Question, or Answer) is missing from the questions sheet."); } const questions = data .filter(row => row[unitIndex] === unitName && row[questionIndex]) .map(row => { const options = [row[answerIndex], row[incorrect1Index], row[incorrect2Index], row[incorrect3Index]].filter(Boolean); return { question: row[questionIndex], answer: row[answerIndex], options: options }; }); return questions; } catch (e) { return { error: true, message: e.toString() }; } }
