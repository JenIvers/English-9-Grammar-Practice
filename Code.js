// The ID of your Google Sheet
const SPREADSHEET_ID = "173tUIsQFYL8QeI-65DW62SeyOuBEK8v2t5Lhtmq5qSo";
// The name of the sheet with questions
const QUESTIONS_SHEET = "Questions";
// The name of the sheet for the student roster
const ROSTER_SHEET = "Student Roster";
// The name of the sheet for teacher unit settings
const UNIT_SETTINGS_SHEET = "Unit_Settings";

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

// --- Define all available units (single source of truth) ---
const ALL_UNITS = [
  "Unit 1: Coming of Age", "Unit 2: Personal Narrative", "Unit 3: Novel Study", 
  "Unit 4: Short Story", "Unit 5: Romeo and Juliet", "Unit 5 (Enriched) Macbeth", 
  "Unit 6: Nonfiction", "Unit 6 (Enriched) Frankenstein", "Unit 7: Resilience", 
  "Unit 8: Annotated Bibliography & Documentary"
];

// Helper function to prevent sheet errors
function getSheetSafely(spreadsheet, sheetName) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`The sheet named "${sheetName}" could not be found. Please check the name in your Google Sheet and in the script.`);
  }
  return sheet;
}

// Helper function to initialize unit settings sheet if it doesn't exist
function initializeUnitSettingsSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(UNIT_SETTINGS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(UNIT_SETTINGS_SHEET);
    sheet.getRange(1, 1, 1, 3).setValues([["Teacher Email", "Unit Name", "Is Enabled"]]);
    
    // Initialize with all units enabled for all teachers
    const teachers = Object.keys(TEACHER_CONFIG);
    const initData = [];
    teachers.forEach(teacherEmail => {
      ALL_UNITS.forEach(unitName => {
        initData.push([teacherEmail, unitName, true]);
      });
    });
    
    if (initData.length > 0) {
      sheet.getRange(2, 1, initData.length, 3).setValues(initData);
    }
  }
  return sheet;
}

// Helper function to get teacher's unit settings
function getTeacherUnitSettingsData(teacherEmail) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeUnitSettingsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) return {};
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Teacher Email");
    const unitIndex = headers.indexOf("Unit Name");
    const enabledIndex = headers.indexOf("Is Enabled");
    
    const settings = {};
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[emailIndex] === teacherEmail) {
        settings[row[unitIndex]] = row[enabledIndex];
      }
    }
    
    // Ensure all units have a setting (default to true if missing)
    ALL_UNITS.forEach(unit => {
      if (settings[unit] === undefined) {
        settings[unit] = true;
      }
    });
    
    return settings;
  } catch (e) {
    console.error('Error getting teacher unit settings:', e);
    // Default to all enabled if there's an error
    const defaultSettings = {};
    ALL_UNITS.forEach(unit => defaultSettings[unit] = true);
    return defaultSettings;
  }
}

// ROUTING: Serves the unified HTML page for all users
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('English 9 Grammar Practice')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// NEW: Combined function to provide role detection and user info
function getRoleAndUserInfo() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const isTeacher = Object.keys(TEACHER_CONFIG).includes(userEmail);
    
    if (isTeacher) {
      return { 
        isTeacher: true,
        teacherName: TEACHER_CONFIG[userEmail].name
      };
    } else {
      // For students, check if they're registered and get their info
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
      const data = rosterSheet.getDataRange().getValues();
      const studentRow = data.find(row => row[0] === userEmail);
      
      if (studentRow) {
        const teacherDisplayName = studentRow[2];
        
        // Find the teacher's email to get their unit settings
        const teacherEntry = Object.entries(TEACHER_CONFIG).find(([email, config]) => config.name === teacherDisplayName);
        let enabledUnits = ALL_UNITS; // Default to all units if teacher not found
        
        if (teacherEntry) {
          const teacherEmail = teacherEntry[0];
          const teacherUnitSettings = getTeacherUnitSettingsData(teacherEmail);
          enabledUnits = ALL_UNITS.filter(unit => teacherUnitSettings[unit] === true);
        }
        
        return { 
          isTeacher: false,
          isRegistered: true, 
          name: studentRow[1], 
          teacher: studentRow[2],
          enabledUnits: enabledUnits
        };
      } else {
        const teacherNames = Object.values(TEACHER_CONFIG).map(t => t.name);
        return { 
          isTeacher: false,
          isRegistered: false, 
          teachers: teacherNames 
        };
      }
    }
  } catch (e) {
    return { error: e.toString() };
  }
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
function saveQuizResult(resultData) { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const studentName = studentInfo[1]; const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = teacherEntry.sheet; const resultsSheet = getSheetSafely(ss, resultsSheetName); const timestamp = new Date(); const score = resultData.score; const total = resultData.total; const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0; resultsSheet.appendRow([timestamp, userEmail, studentName, resultData.unit, score, total, percentage]); return { success: true }; } catch (e) { return { success: false, error: e.toString() }; } }
function getStudentProgress() { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = teacherEntry.sheet; const sheet = getSheetSafely(ss, resultsSheetName); const studentBestScores = getStudentBestScores(sheet); return { success: true, progress: studentBestScores[studentInfo[1]] || {} }; } catch (e) { return { success: false, error: e.toString() }; } }
function getQuestionsForUnit(unitName) { try { const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const sheet = getSheetSafely(ss, QUESTIONS_SHEET); const data = sheet.getDataRange().getValues(); const headers = data.shift(); const unitIndex = headers.indexOf('Unit'); const questionIndex = headers.indexOf('Question'); const answerIndex = headers.indexOf('Answer'); const incorrect1Index = headers.indexOf('Incorrect 1'); const incorrect2Index = headers.indexOf('Incorrect 2'); const incorrect3Index = headers.indexOf('Incorrect 3'); if (unitIndex === -1 || questionIndex === -1 || answerIndex === -1) { throw new Error("A required column (Unit, Question, or Answer) is missing from the questions sheet."); } const questions = data .filter(row => row[unitIndex] === unitName && row[questionIndex]) .map(row => { const options = [row[answerIndex], row[incorrect1Index], row[incorrect2Index], row[incorrect3Index]].filter(Boolean); return { question: row[questionIndex], answer: row[answerIndex], options: options }; }); return questions; } catch (e) { return { error: true, message: e.toString() }; } }

// PUBLIC API: Get teacher's unit settings (for teacher interface)
function getTeacherUnitSettings() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    const settings = getTeacherUnitSettingsData(userEmail);
    
    return { 
      success: true, 
      settings: settings,
      allUnits: ALL_UNITS
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Update teacher's unit setting (toggle on/off)
function updateTeacherUnitSettings(unitName, isEnabled) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    if (!ALL_UNITS.includes(unitName)) {
      throw new Error(`Invalid unit name: ${unitName}`);
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeUnitSettingsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Teacher Email");
    const unitIndex = headers.indexOf("Unit Name");
    const enabledIndex = headers.indexOf("Is Enabled");
    
    // Find existing row or create new one
    let rowFound = false;
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[emailIndex] === userEmail && row[unitIndex] === unitName) {
        sheet.getRange(i + 1, enabledIndex + 1).setValue(isEnabled);
        rowFound = true;
        break;
      }
    }
    
    // If no existing row found, add new row
    if (!rowFound) {
      sheet.appendRow([userEmail, unitName, isEnabled]);
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}