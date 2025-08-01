// The ID of your Google Sheet
const SPREADSHEET_ID = "173tUIsQFYL8QeI-65DW62SeyOuBEK8v2t5Lhtmq5qSo";
// The name of the sheet with questions
const QUESTIONS_SHEET = "Questions";
// The name of the sheet for the student roster
const ROSTER_SHEET = "Student Roster";
// The name of the sheet for teacher unit settings
const UNIT_SETTINGS_SHEET = "Unit_Settings";
// The name of the sheet for exemplars
const EXEMPLARS_SHEET = "Exemplars";
// The name of the sheet for extra exemplars (teacher-contributed)
const EXTRA_EXEMPLARS_SHEET = "Extra_Exemplars";
// The name of the sheet for student exemplar progress
const STUDENT_EXEMPLAR_PROGRESS_SHEET = "Student_Exemplar_Progress";
// The name of the sheet for learning targets
const LEARNING_TARGETS_SHEET = "Learning_Targets";
// The name of the sheet for student proficiency tracking
const STUDENT_PROFICIENCY_SHEET = "Student_Proficiency";

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

// --- Define portfolio proficiency levels ---
const PORTFOLIO_PROFICIENCY_LEVELS = {
  NOT_STARTED: { value: 0, label: 'Not Started', cssClass: 'proficiency-not-started' },
  DEVELOPING: { value: 1, label: 'Developing', cssClass: 'proficiency-developing' },
  PROFICIENT: { value: 2, label: 'Proficient', cssClass: 'proficiency-proficient' },
  MASTERED: { value: 3, label: 'Mastered', cssClass: 'proficiency-mastered' }
};

// --- Define proficiency phases ---
const PROFICIENCY_PHASES = {
  BEGINNING: 'Beginning',
  MIDDLE: 'Middle', 
  END: 'End',
  SINGLE: 'Single' // For backward compatibility with existing units
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
    .setTitle('English 9 Learning Portfolio & Grammar Practice')
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

// Helper function to find column index with flexible matching
function findColumnIndex(headers, targetColumn, variations = []) {
  // First try exact match
  let index = headers.indexOf(targetColumn);
  if (index !== -1) return index;
  
  // Normalize the target for comparison
  const normalizedTarget = targetColumn.toLowerCase().trim();
  
  // Try normalized exact match
  for (let i = 0; i < headers.length; i++) {
    if (headers[i] && headers[i].toString().toLowerCase().trim() === normalizedTarget) {
      return i;
    }
  }
  
  // Try variations
  for (const variation of variations) {
    const normalizedVariation = variation.toLowerCase().trim();
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] && headers[i].toString().toLowerCase().trim() === normalizedVariation) {
        return i;
      }
    }
  }
  
  return -1;
}

// Helper function to initialize exemplars sheet if it doesn't exist
function initializeExemplarsSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(EXEMPLARS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(EXEMPLARS_SHEET);
    sheet.getRange(1, 1, 1, 6).setValues([["Unit", "Topic", "Use", "Source Text", "Exemplars", "How It Works"]]);
  }
  return sheet;
}

// Helper function to initialize extra exemplars sheet if it doesn't exist
function initializeExtraExemplarsSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(EXTRA_EXEMPLARS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(EXTRA_EXEMPLARS_SHEET);
    sheet.getRange(1, 1, 1, 6).setValues([["Unit", "Title", "Content", "Explanation", "Added_By", "Date_Added"]]);
  }
  return sheet;
}

// Helper function to initialize student exemplar progress sheet if it doesn't exist
function initializeStudentExemplarProgressSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(STUDENT_EXEMPLAR_PROGRESS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(STUDENT_EXEMPLAR_PROGRESS_SHEET);
    sheet.getRange(1, 1, 1, 4).setValues([["Student_Email", "Student_Name", "Unit", "Completed_Date"]]);
  }
  return sheet;
}

// Helper function to initialize learning targets sheet if it doesn't exist
function initializeLearningTargetsSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(LEARNING_TARGETS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(LEARNING_TARGETS_SHEET);
    sheet.getRange(1, 1, 1, 4).setValues([["Unit", "Learning_Target", "Description", "Order"]]);
    
    // Add some default learning targets for each unit
    const defaultTargets = [];
    ALL_UNITS.forEach((unit, unitIndex) => {
      // Add 3-4 default learning targets per unit
      defaultTargets.push([unit, "Grammar Foundation", "Demonstrate understanding of basic grammar concepts", 1]);
      defaultTargets.push([unit, "Application Skills", "Apply grammar rules in context", 2]);
      defaultTargets.push([unit, "Analysis and Evaluation", "Analyze and evaluate grammatical choices", 3]);
      defaultTargets.push([unit, "Creative Expression", "Use grammar effectively in creative writing", 4]);
    });
    
    if (defaultTargets.length > 0) {
      sheet.getRange(2, 1, defaultTargets.length, 4).setValues(defaultTargets);
    }
  }
  return sheet;
}

// Helper function to initialize student proficiency sheet if it doesn't exist
function initializeStudentProficiencySheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(STUDENT_PROFICIENCY_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(STUDENT_PROFICIENCY_SHEET);
    sheet.getRange(1, 1, 1, 7).setValues([["Student_Email", "Student_Name", "Unit", "Learning_Target", "Proficiency_Phase", "Proficiency_Level", "Last_Updated"]]);
  } else {
    // Check if we need to add the Proficiency_Phase column to existing sheet
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const phaseIndex = headers.indexOf("Proficiency_Phase");
    
    if (phaseIndex === -1) {
      // Need to add the Proficiency_Phase column
      const lastCol = sheet.getLastColumn();
      sheet.insertColumnAfter(lastCol - 2); // Insert before Proficiency_Level
      sheet.getRange(1, lastCol - 1).setValue("Proficiency_Phase");
      
      // Update existing data to have "Single" as default phase for backward compatibility
      const rowCount = sheet.getLastRow();
      if (rowCount > 1) {
        const phaseColumn = lastCol - 1;
        for (let i = 2; i <= rowCount; i++) {
          sheet.getRange(i, phaseColumn).setValue("Single");
        }
      }
    }
  }
  return sheet;
}

// PUBLIC API: Get exemplars for a specific unit
function getExemplarsForUnit(unitName) {
  try {
    console.log(`[getExemplarsForUnit] Looking for exemplars for unit: "${unitName}"`);
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeExemplarsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    console.log(`[getExemplarsForUnit] Sheet data rows: ${data.length}`);
    
    if (data.length < 2) {
      console.log(`[getExemplarsForUnit] No data found in Exemplars sheet (only ${data.length} rows)`);
      return { 
        success: true, 
        exemplars: [],
        debugInfo: {
          message: "Exemplars sheet exists but has no data",
          sheetName: EXEMPLARS_SHEET,
          rowCount: data.length,
          expectedHeaders: ["Unit", "Topic", "Use", "Source Text", "Exemplars", "How It Works"]
        }
      };
    }
    
    const headers = data[0];
    console.log(`[getExemplarsForUnit] Headers found: ${JSON.stringify(headers)}`);
    console.log(`[getExemplarsForUnit] Raw headers with positions:`, headers.map((h, i) => `${i}: "${h}"`));
    
    // Use flexible header matching with common variations
    const unitIndex = findColumnIndex(headers, "Unit");
    const topicIndex = findColumnIndex(headers, "Topic");
    const useIndex = findColumnIndex(headers, "Use");
    const sourceTextIndex = findColumnIndex(headers, "Source Text", ["SourceText", "Source_Text"]);
    const exemplarsIndex = findColumnIndex(headers, "Exemplars", ["Exemplar", "Examples", "Example"]);
    const howItWorksIndex = findColumnIndex(headers, "How It Works", [
      "How it works", "How It works", "how it works", "HowItWorks", "How_It_Works", 
      "Explanation", "Why It Works", "Why it works"
    ]);
    
    console.log(`[getExemplarsForUnit] Column indices - Unit: ${unitIndex}, Topic: ${topicIndex}, Use: ${useIndex}, Source Text: ${sourceTextIndex}, Exemplars: ${exemplarsIndex}, How It Works: ${howItWorksIndex}`);
    
    // Validate required columns exist
    const missingColumns = [];
    const columnMappings = [
      { name: "Unit", index: unitIndex },
      { name: "Topic", index: topicIndex },
      { name: "Use", index: useIndex },
      { name: "Source Text", index: sourceTextIndex },
      { name: "Exemplars", index: exemplarsIndex },
      { name: "How It Works", index: howItWorksIndex }
    ];
    
    columnMappings.forEach(col => {
      if (col.index === -1) missingColumns.push(col.name);
    });
    
    if (missingColumns.length > 0) {
      console.log(`[getExemplarsForUnit] Missing required columns: ${missingColumns.join(", ")}`);
      
      // Create detailed analysis of what was found vs what was expected
      const headerAnalysis = headers.map((header, index) => {
        return `Column ${String.fromCharCode(65 + index)} (${index}): "${header}" [${header ? header.length : 0} chars]`;
      });
      
      const detailedError = `Missing required columns in Exemplars sheet: ${missingColumns.join(", ")}
      
Found headers: ${JSON.stringify(headers)}
Column breakdown: ${headerAnalysis.join(', ')}

Expected exact headers: Unit, Topic, Use, Source Text, Exemplars, How It Works

Tip: Check for extra spaces, different capitalization, or special characters in your column headers.`;

      return {
        success: false,
        error: detailedError,
        debugInfo: {
          foundHeaders: headers,
          foundHeadersDetailed: headerAnalysis,
          missingColumns: missingColumns,
          expectedHeaders: ["Unit", "Topic", "Use", "Source Text", "Exemplars", "How It Works"],
          columnMappings: columnMappings
        }
      };
    }
    
    // Get all data rows for this unit
    const unitRows = data.slice(1).filter(row => row[unitIndex] === unitName);
    console.log(`[getExemplarsForUnit] Found ${unitRows.length} rows for unit "${unitName}"`);
    
    // Get only rows with content (any exemplar data)
    const exemplarRows = unitRows.filter(row => row[topicIndex] || row[exemplarsIndex]);
    console.log(`[getExemplarsForUnit] Found ${exemplarRows.length} rows with exemplar data`);
    
    const exemplars = exemplarRows
      .map((row, index) => ({
        number: index + 1,
        topic: row[topicIndex] || "",
        use: row[useIndex] || "",
        sourceText: row[sourceTextIndex] || "",
        exemplars: row[exemplarsIndex] || "",
        howItWorks: row[howItWorksIndex] || ""
      }));
    
    console.log(`[getExemplarsForUnit] Returning ${exemplars.length} exemplars`);
    
    return { 
      success: true, 
      exemplars: exemplars,
      debugInfo: {
        unitSearched: unitName,
        totalRows: data.length - 1,
        unitMatches: unitRows.length,
        validExemplars: exemplars.length,
        headers: headers
      }
    };
  } catch (e) {
    console.error(`[getExemplarsForUnit] Error: ${e.toString()}`);
    return { 
      success: false, 
      error: e.toString(),
      debugInfo: {
        unitSearched: unitName,
        sheetName: EXEMPLARS_SHEET
      }
    };
  }
}

// PUBLIC API: Check if student has completed exemplars for a unit
function getStudentExemplarProgress() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeStudentExemplarProgressSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, completedUnits: [] };
    }
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Student_Email");
    const unitIndex = headers.indexOf("Unit");
    
    const completedUnits = data
      .slice(1)
      .filter(row => row[emailIndex] === userEmail)
      .map(row => row[unitIndex]);
    
    return { success: true, completedUnits: completedUnits };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Save that student has completed exemplars for a unit
function saveExemplarProgress(unitName) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Get student name from roster
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
    const rosterData = rosterSheet.getDataRange().getValues();
    const studentInfo = rosterData.find(row => row[0] === userEmail);
    
    if (!studentInfo) {
      throw new Error("Student not found in roster.");
    }
    
    const studentName = studentInfo[1];
    const sheet = initializeStudentExemplarProgressSheet(ss);
    
    // Check if already completed
    const data = sheet.getDataRange().getValues();
    const emailIndex = data[0].indexOf("Student_Email");
    const unitIndex = data[0].indexOf("Unit");
    
    const alreadyCompleted = data.slice(1).some(row => 
      row[emailIndex] === userEmail && row[unitIndex] === unitName
    );
    
    if (!alreadyCompleted) {
      const timestamp = new Date();
      sheet.appendRow([userEmail, studentName, unitName, timestamp]);
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get extra exemplars for teachers (for editing interface)
function getExtraExemplarsForUnit(unitName) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeExtraExemplarsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, extraExemplars: [] };
    }
    
    const headers = data[0];
    const unitIndex = headers.indexOf("Unit");
    const titleIndex = headers.indexOf("Title");
    const contentIndex = headers.indexOf("Content");
    const explanationIndex = headers.indexOf("Explanation");
    const addedByIndex = headers.indexOf("Added_By");
    const dateIndex = headers.indexOf("Date_Added");
    
    const extraExemplars = data
      .slice(1)
      .filter(row => row[unitIndex] === unitName)
      .map((row, index) => ({
        id: index,
        title: row[titleIndex] || "",
        content: row[contentIndex] || "",
        explanation: row[explanationIndex] || "",
        addedBy: row[addedByIndex] || "",
        dateAdded: row[dateIndex] || ""
      }));
    
    return { success: true, extraExemplars: extraExemplars };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Add new extra exemplar (teacher-contributed)
function addExtraExemplar(unitName, exemplarData) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeExtraExemplarsSheet(ss);
    
    const timestamp = new Date();
    sheet.appendRow([
      unitName,
      exemplarData.title || "",
      exemplarData.content || "",
      exemplarData.explanation || "",
      teacherInfo.name,
      timestamp
    ]);
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Update/edit main exemplar (for main exemplars sheet)
function updateExemplar(unitName, exemplarNumber, exemplarData) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeExemplarsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    const headers = data[0];
    const unitIndex = headers.indexOf("Unit");
    const numberIndex = headers.indexOf("Exemplar_Number");
    const titleIndex = headers.indexOf("Title");
    const contentIndex = headers.indexOf("Content");
    const explanationIndex = headers.indexOf("Explanation");
    
    // Find existing row or create new one
    let rowFound = false;
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[unitIndex] === unitName && row[numberIndex] == exemplarNumber) {
        // Update existing row
        sheet.getRange(i + 1, titleIndex + 1).setValue(exemplarData.title || "");
        sheet.getRange(i + 1, contentIndex + 1).setValue(exemplarData.content || "");
        sheet.getRange(i + 1, explanationIndex + 1).setValue(exemplarData.explanation || "");
        rowFound = true;
        break;
      }
    }
    
    // If no existing row found, add new row
    if (!rowFound) {
      sheet.appendRow([
        unitName,
        exemplarNumber,
        exemplarData.title || "",
        exemplarData.content || "",
        exemplarData.explanation || ""
      ]);
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get learning targets for a specific unit
function getLearningTargetsForUnit(unitName) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeLearningTargetsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, targets: [] };
    }
    
    const headers = data[0];
    const unitIndex = headers.indexOf("Unit");
    const targetIndex = headers.indexOf("Learning_Target");
    const descriptionIndex = headers.indexOf("Description");
    const orderIndex = headers.indexOf("Order");
    
    const targets = data
      .slice(1)
      .filter(row => row[unitIndex] === unitName)
      .sort((a, b) => (a[orderIndex] || 999) - (b[orderIndex] || 999))
      .map(row => ({
        target: row[targetIndex] || "",
        description: row[descriptionIndex] || "",
        order: row[orderIndex] || 999
      }));
    
    return { success: true, targets: targets };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get student's proficiency levels for all learning targets
function getStudentProficiencyData() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeStudentProficiencySheet(ss);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, proficiencyData: {} };
    }
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Student_Email");
    const unitIndex = headers.indexOf("Unit");
    const targetIndex = headers.indexOf("Learning_Target");
    const phaseIndex = headers.indexOf("Proficiency_Phase");
    const levelIndex = headers.indexOf("Proficiency_Level");
    
    const proficiencyData = {};
    data.slice(1)
      .filter(row => row[emailIndex] === userEmail)
      .forEach(row => {
        const unit = row[unitIndex];
        const target = row[targetIndex];
        const phase = row[phaseIndex] || PROFICIENCY_PHASES.SINGLE;
        const level = row[levelIndex];
        
        if (!proficiencyData[unit]) {
          proficiencyData[unit] = {};
        }
        
        // For backward compatibility, if phase is Single, store directly
        // For phase-based, store under phase structure
        if (phase === PROFICIENCY_PHASES.SINGLE) {
          proficiencyData[unit][target] = level;
        } else {
          if (!proficiencyData[unit][target]) {
            proficiencyData[unit][target] = {};
          }
          proficiencyData[unit][target][phase] = level;
        }
      });
    
    return { success: true, proficiencyData: proficiencyData };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Save student's proficiency level for a learning target (with optional phase support)
function saveStudentProficiency(unitName, learningTarget, proficiencyLevel, proficiencyPhase = PROFICIENCY_PHASES.SINGLE) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Get student name from roster
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
    const rosterData = rosterSheet.getDataRange().getValues();
    const studentInfo = rosterData.find(row => row[0] === userEmail);
    
    if (!studentInfo) {
      throw new Error("Student not found in roster.");
    }
    
    const studentName = studentInfo[1];
    const sheet = initializeStudentProficiencySheet(ss);
    const data = sheet.getDataRange().getValues();
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Student_Email");
    const nameIndex = headers.indexOf("Student_Name");
    const unitIndex = headers.indexOf("Unit");
    const targetIndex = headers.indexOf("Learning_Target");
    const phaseIndex = headers.indexOf("Proficiency_Phase");
    const levelIndex = headers.indexOf("Proficiency_Level");
    const updatedIndex = headers.indexOf("Last_Updated");
    
    // Find existing row or create new one
    let rowFound = false;
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const existingPhase = row[phaseIndex] || PROFICIENCY_PHASES.SINGLE;
      if (row[emailIndex] === userEmail && row[unitIndex] === unitName && 
          row[targetIndex] === learningTarget && existingPhase === proficiencyPhase) {
        // Update existing row
        sheet.getRange(i + 1, levelIndex + 1).setValue(proficiencyLevel);
        sheet.getRange(i + 1, updatedIndex + 1).setValue(new Date());
        rowFound = true;
        break;
      }
    }
    
    // If no existing row found, add new row
    if (!rowFound) {
      sheet.appendRow([userEmail, studentName, unitName, learningTarget, proficiencyPhase, proficiencyLevel, new Date()]);
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get Unit 1 proficiency data with phase breakdown
function getUnit1ProficiencyData() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeStudentProficiencySheet(ss);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, proficiencyData: {} };
    }
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Student_Email");
    const unitIndex = headers.indexOf("Unit");
    const targetIndex = headers.indexOf("Learning_Target");
    const phaseIndex = headers.indexOf("Proficiency_Phase");
    const levelIndex = headers.indexOf("Proficiency_Level");
    
    const proficiencyData = {};
    data.slice(1)
      .filter(row => row[emailIndex] === userEmail && row[unitIndex] === "Unit 1: Coming of Age")
      .forEach(row => {
        const target = row[targetIndex];
        const phase = row[phaseIndex] || PROFICIENCY_PHASES.SINGLE;
        const level = row[levelIndex];
        
        if (!proficiencyData[target]) {
          proficiencyData[target] = {};
        }
        proficiencyData[target][phase] = level;
      });
    
    return { success: true, proficiencyData: proficiencyData };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get portfolio summary for student (units with completion status)
function getPortfolioSummary() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get student's enabled units (same logic as regular app)
    const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
    const rosterData = rosterSheet.getDataRange().getValues();
    const studentInfo = rosterData.find(row => row[0] === userEmail);
    
    let enabledUnits = ALL_UNITS;
    
    if (studentInfo) {
      const teacherDisplayName = studentInfo[2];
      const teacherEntry = Object.entries(TEACHER_CONFIG).find(([email, config]) => config.name === teacherDisplayName);
      
      if (teacherEntry) {
        const teacherEmail = teacherEntry[0];
        const teacherUnitSettings = getTeacherUnitSettingsData(teacherEmail);
        enabledUnits = ALL_UNITS.filter(unit => teacherUnitSettings[unit] === true);
      }
    }
    
    // Get proficiency data
    const proficiencyResponse = getStudentProficiencyData();
    if (!proficiencyResponse.success) {
      throw new Error(proficiencyResponse.error);
    }
    
    const proficiencyData = proficiencyResponse.proficiencyData;
    
    // Calculate unit summaries
    const unitSummaries = enabledUnits.map(unit => {
      const unitProficiency = proficiencyData[unit] || {};
      const targetCount = Object.keys(unitProficiency).length;
      
      let status = "Not Started";
      if (targetCount > 0) {
        const levels = Object.values(unitProficiency);
        const avgLevel = levels.reduce((sum, level) => sum + level, 0) / levels.length;
        
        if (avgLevel >= 3) status = "Mastered";
        else if (avgLevel >= 2) status = "Proficient";
        else if (avgLevel >= 1) status = "Developing";
        else status = "Started";
      }
      
      return {
        unit: unit,
        targetCount: targetCount,
        status: status
      };
    });
    
    return { 
      success: true, 
      unitSummaries: unitSummaries,
      enabledUnits: enabledUnits
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Test function to verify exemplar system setup (for debugging)
function testExemplarSystem() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      return { success: false, error: "Access Denied. This function is only available to teachers." };
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Test Exemplars sheet
    const exemplarsSheet = initializeExemplarsSheet(ss);
    const exemplarsData = exemplarsSheet.getDataRange().getValues();
    
    // Test with first available unit
    const testUnit = ALL_UNITS[0];
    const exemplarsResult = getExemplarsForUnit(testUnit);
    
    return {
      success: true,
      testResults: {
        spreadsheetId: SPREADSHEET_ID,
        exemplarsSheetExists: !!exemplarsSheet,
        exemplarsSheetName: EXEMPLARS_SHEET,
        exemplarsRowCount: exemplarsData.length,
        exemplarsHeaders: exemplarsData.length > 0 ? exemplarsData[0] : [],
        testUnit: testUnit,
        testResult: exemplarsResult,
        allUnits: ALL_UNITS,
        currentUser: userEmail,
        teacherConfig: teacherInfo
      }
    };
  } catch (e) {
    return { 
      success: false, 
      error: e.toString(),
      testResults: {
        spreadsheetId: SPREADSHEET_ID,
        exemplarsSheetName: EXEMPLARS_SHEET,
        currentUser: Session.getActiveUser().getEmail()
      }
    };
  }
}