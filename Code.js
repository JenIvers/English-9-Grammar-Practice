// The ID of your Google Sheet
const SPREADSHEET_ID = "173tUIsQFYL8QeI-65DW62SeyOuBEK8v2t5Lhtmq5qSo";
// The name of the sheet with questions
const QUESTIONS_SHEET = "Questions";
// The name of the sheet with MCA questions
const MCA_QUESTIONS_SHEET = "MCA Questions";
// The name of the sheet for the student roster
const ROSTER_SHEET = "Student Roster";
// The name of the sheet for teacher unit settings
const UNIT_SETTINGS_SHEET = "Unit_Settings";
// The name of the sheet for teacher MCA unit settings
const MCA_UNIT_SETTINGS_SHEET = "MCA_Unit_Settings";
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
// The name of the sheet for Unit Learning Targets
const UNIT_LEARNING_TARGETS_SHEET = "Unit Learning Targets";
// The name of the sheet for Independent Reading
const INDEPENDENT_READING_SHEET = "Independent Reading";

// State Standards sheet names for each unit
const UNIT1_STANDARDS_SHEET = "Unit 1 Coming of Age State Standards";
const UNIT2_STANDARDS_SHEET = "Unit 2 Personal Narrative State Standards";
const UNIT3_STANDARDS_SHEET = "Unit 3 Novel Study State Standards";
const UNIT4_STANDARDS_SHEET = "Unit 4 Short Story State Standards";
const UNIT5_STANDARDS_SHEET = "Unit 5 Romeo and Juliet State Standards";
const UNIT5_ENRICHED_STANDARDS_SHEET = "Unit 5 (Enriched) Macbeth State Standards";
const UNIT6_STANDARDS_SHEET = "Unit 6 Nonfiction State Standards";
const UNIT6_ENRICHED_STANDARDS_SHEET = "Unit 6 (Enriched) Frankenstein State Standards";
const UNIT7_STANDARDS_SHEET = "Unit 7 Resilience State Standards";
const UNIT8_STANDARDS_SHEET = "Unit 8 Annotated Bibliography & Documentary State Standards";

// --- CRITICAL: YOUR EMAIL HAS BEEN ADDED HERE ---
const TEACHER_CONFIG = {
  "jennifer.ivers@orono.k12.mn.us": { name: "Ms. Ivers", sheet: "Ivers" },
  "email.for.ms.cole@yourschool.edu": { name: "Ms. Cole", sheet: "Cole" },         // <-- UPDATE THIS EMAIL
  "email.for.ms.erickson@yourschool.edu": { name: "Ms. Erickson", sheet: "Erickson" } // <-- UPDATE THIS EMAIL
};

// Teacher Viewers - get full teacher interface but don't appear as teachers to students
const TEACHER_VIEWERS = {
  // Add teacher viewer emails here - they will see full teacher interface but not be listed as teachers for students
  // Example: "viewer.email@yourschool.edu": { name: "Viewer Name" }
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

// --- Master list of all 41 English 9 state standards ---
const MASTER_STANDARDS_LIST = [
  { code: "9.1.1.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.", category: "Reading" },
  { code: "9.1.2.2", description: "Determine a theme or central idea of a text and analyze in detail its development over the course of the text.", category: "Reading" },
  { code: "9.1.3.3", description: "Analyze how complex characters develop over the course of a text, interact with other characters.", category: "Reading" },
  { code: "9.1.4.4", description: "Determine the meaning of words and phrases as they are used in the text, including figurative and connotative meanings.", category: "Reading" },
  { code: "9.1.5.5", description: "Analyze how an author's choices concerning how to structure a text create effects such as mystery, tension, or surprise.", category: "Reading" },
  { code: "9.1.6.6", description: "Analyze a particular point of view or cultural experience reflected in a work of literature from outside the United States.", category: "Reading" },
  { code: "9.1.7.7", description: "Analyze the representation of a subject or a key scene in two different artistic mediums.", category: "Reading" },
  { code: "9.1.9.9", description: "Analyze how an author draws on and transforms source material in a specific work.", category: "Reading" },
  { code: "9.1.10.10", description: "By the end of grade 9, read and comprehend literature in the grades 9-10 text complexity band proficiently.", category: "Reading" },
  { code: "9.2.1.1", description: "Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.", category: "Reading" },
  { code: "9.2.2.2", description: "Determine a central idea of a text and analyze its development over the course of the text.", category: "Reading" },
  { code: "9.2.3.3", description: "Analyze how the author unfolds an analysis or series of ideas or events.", category: "Reading" },
  { code: "9.2.4.4", description: "Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings.", category: "Reading" },
  { code: "9.2.5.5", description: "Analyze in detail how an author's ideas or claims are developed and refined by particular sentences, paragraphs, or larger portions of a text.", category: "Reading" },
  { code: "9.2.6.6", description: "Determine an author's point of view or purpose in a text and analyze how an author uses rhetoric to advance that point of view or purpose.", category: "Reading" },
  { code: "9.2.7.7", description: "Analyze various accounts of a subject told in different mediums, determining which details are emphasized in each account.", category: "Reading" },
  { code: "9.2.8.8", description: "Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is valid.", category: "Reading" },
  { code: "9.2.9.9", description: "Analyze seminal U.S. documents of historical and literary significance, including how they address related themes and concepts.", category: "Reading" },
  { code: "9.2.10.10", description: "By the end of grade 9, read and comprehend literary nonfiction in the grades 9-10 text complexity band proficiently.", category: "Reading" },
  { code: "9.3.1.1", description: "Write arguments to support claims in an analysis of substantive topics or texts, using valid reasoning and relevant evidence.", category: "Writing" },
  { code: "9.3.2.2", description: "Write informative/explanatory texts to examine and convey complex ideas, concepts, and information clearly.", category: "Writing" },
  { code: "9.3.3.3", description: "Write narratives to develop real or imagined experiences or events using effective technique, well-chosen details, and well-structured event sequences.", category: "Writing" },
  { code: "9.3.4.4", description: "Produce clear and coherent writing in which the development, organization, and style are appropriate to task, purpose, and audience.", category: "Writing" },
  { code: "9.3.5.5", description: "Develop and strengthen writing as needed by planning, revising, editing, rewriting, or trying a new approach.", category: "Writing" },
  { code: "9.3.6.6", description: "Use technology, including the Internet, to produce, publish, and update individual or shared writing products.", category: "Writing" },
  { code: "9.3.7.7", description: "Conduct short as well as more sustained research projects to answer a question or solve a problem.", category: "Writing" },
  { code: "9.3.8.8", description: "Gather relevant information from multiple authoritative print and digital sources, using advanced searches effectively.", category: "Writing" },
  { code: "9.3.9.9", description: "Draw evidence from literary or informational texts to support analysis, reflection, and research.", category: "Writing" },
  { code: "9.3.10.10", description: "Write routinely over extended time frames and shorter time frames for a range of tasks, purposes, and audiences.", category: "Writing" },
  { code: "9.4.1.1", description: "Initiate and participate effectively in a range of collaborative discussions on grades 9-10 topics, texts, and issues.", category: "Speaking & Listening" },
  { code: "9.4.2.2", description: "Integrate multiple sources of information presented in diverse media or formats evaluating the credibility and accuracy of each source.", category: "Speaking & Listening" },
  { code: "9.4.3.3", description: "Evaluate a speaker's point of view, reasoning, and use of evidence and rhetoric, identifying any fallacious reasoning or exaggerated or distorted evidence.", category: "Speaking & Listening" },
  { code: "9.4.4.4", description: "Present information, findings, and supporting evidence clearly, concisely, and logically such that listeners can follow the line of reasoning.", category: "Speaking & Listening" },
  { code: "9.4.5.5", description: "Make strategic use of digital media in presentations to enhance understanding of findings, reasoning, and evidence.", category: "Speaking & Listening" },
  { code: "9.4.6.6", description: "Adapt speech to a variety of contexts and tasks, demonstrating command of formal English when indicated or appropriate.", category: "Speaking & Listening" },
  { code: "9.5.1.1", description: "Demonstrate command of the conventions of standard English grammar and usage when writing or speaking.", category: "Language" },
  { code: "9.5.2.2", description: "Demonstrate command of the conventions of standard English capitalization, punctuation, and spelling when writing.", category: "Language" },
  { code: "9.5.3.3", description: "Apply knowledge of language to understand how language functions in different contexts.", category: "Language" },
  { code: "9.5.4.4", description: "Determine or clarify the meaning of unknown and multiple-meaning words and phrases based on grades 9-10 reading and content.", category: "Language" },
  { code: "9.5.5.5", description: "Demonstrate understanding of figurative language, word relationships, and nuances in word meanings.", category: "Language" },
  { code: "9.5.6.6", description: "Acquire and use accurately general academic and domain-specific words and phrases, sufficient for reading, writing, speaking, and listening at the college and career readiness level.", category: "Language" }
];

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

// Helper function to initialize MCA unit settings sheet if it doesn't exist
function initializeMCAUnitSettingsSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(MCA_UNIT_SETTINGS_SHEET);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(MCA_UNIT_SETTINGS_SHEET);
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

// Helper function to get teacher's MCA unit settings
function getTeacherMCAUnitSettingsData(teacherEmail) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeMCAUnitSettingsSheet(ss);
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
    console.error('Error getting teacher MCA unit settings:', e);
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
    .setTitle('English 9 Learning Hub')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// NEW: Combined function to provide role detection and user info
function getRoleAndUserInfo() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const isTeacher = Object.keys(TEACHER_CONFIG).includes(userEmail);
    const isTeacherViewer = Object.keys(TEACHER_VIEWERS).includes(userEmail);
    
    if (isTeacher) {
      return { 
        isTeacher: true,
        teacherName: TEACHER_CONFIG[userEmail].name
      };
    } else if (isTeacherViewer) {
      return {
        isTeacher: true, // They see teacher interface
        isViewer: true,  // But they're marked as viewer
        teacherName: TEACHER_VIEWERS[userEmail].name
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
        // Only show actual teachers to students, not viewers
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
function getTeacherDashboardOverview() { 
  try { 
    const userEmail = Session.getActiveUser().getEmail(); 
    const teacherInfo = TEACHER_CONFIG[userEmail];
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) throw new Error("Access Denied."); 
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID); 
    
    // If it's a viewer, aggregate data from all teacher sheets
    if (viewerInfo) {
      const allTeacherData = {};
      const combinedStats = {};
      
      Object.values(TEACHER_CONFIG).forEach(teacher => {
        try {
          const sheet = ss.getSheetByName(teacher.sheet);
          if (sheet) {
            const studentBestScores = getStudentBestScores(sheet);
            allTeacherData[teacher.name] = studentBestScores;
            
            // Add to combined stats
            Object.keys(studentBestScores).forEach(studentName => {
              Object.keys(studentBestScores[studentName]).forEach(unitName => {
                if (!combinedStats[unitName]) {
                  combinedStats[unitName] = { developing: 0, proficient: 0, mastered: 0, total: 0 };
                }
                const score = studentBestScores[studentName][unitName];
                if (score >= PROFICIENCY_BANDS.MASTERED.min) combinedStats[unitName].mastered++;
                else if (score >= PROFICIENCY_BANDS.PROFICIENT.min) combinedStats[unitName].proficient++;
                else combinedStats[unitName].developing++;
                combinedStats[unitName].total++;
              });
            });
          }
        } catch (e) {
          // Skip if sheet doesn't exist
        }
      });
      
      Object.keys(combinedStats).forEach(unitName => {
        const stats = combinedStats[unitName];
        stats.masteredPct = (stats.mastered / stats.total * 100).toFixed(1);
        stats.proficientPct = (stats.proficient / stats.total * 100).toFixed(1);
        stats.developingPct = (100 - parseFloat(stats.masteredPct) - parseFloat(stats.proficientPct)).toFixed(1);
      });
      
      return { 
        success: true, 
        teacherName: viewerInfo.name,
        isViewer: true,
        overview: combinedStats,
        allTeacherData: allTeacherData
      };
    }
    
    // Regular teacher logic
    const sheet = getSheetSafely(ss, teacherInfo.sheet); 
    const studentBestScores = getStudentBestScores(sheet); 
    const allStudents = Object.keys(studentBestScores); 
    if (allStudents.length === 0) { 
      return { success: true, teacherName: teacherInfo.name, overview: {} }; 
    } 
    const unitStats = {}; 
    allStudents.forEach(studentName => { 
      Object.keys(studentBestScores[studentName]).forEach(unitName => { 
        if (!unitStats[unitName]) { 
          unitStats[unitName] = { developing: 0, proficient: 0, mastered: 0, total: 0 }; 
        } 
        const score = studentBestScores[studentName][unitName]; 
        if (score >= PROFICIENCY_BANDS.MASTERED.min) unitStats[unitName].mastered++; 
        else if (score >= PROFICIENCY_BANDS.PROFICIENT.min) unitStats[unitName].proficient++; 
        else unitStats[unitName].developing++; 
        unitStats[unitName].total++; 
      }); 
    }); 
    Object.keys(unitStats).forEach(unitName => { 
      const stats = unitStats[unitName]; 
      stats.masteredPct = (stats.mastered / stats.total * 100).toFixed(1); 
      stats.proficientPct = (stats.proficient / stats.total * 100).toFixed(1); 
      stats.developingPct = (100 - parseFloat(stats.masteredPct) - parseFloat(stats.proficientPct)).toFixed(1); 
    }); 
    return { success: true, teacherName: teacherInfo.name, overview: unitStats }; 
  } catch(e) { 
    return { success: false, error: e.toString() }; 
  } 
}
function getUnitDetailsForTeacher(unitName) { 
  try { 
    const userEmail = Session.getActiveUser().getEmail(); 
    const teacherInfo = TEACHER_CONFIG[userEmail]; 
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) throw new Error("Access Denied."); 
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID); 
    
    // If it's a viewer, aggregate data from all teacher sheets
    if (viewerInfo) {
      const allStudentDetails = [];
      
      Object.values(TEACHER_CONFIG).forEach(teacher => {
        try {
          const sheet = ss.getSheetByName(teacher.sheet);
          if (sheet) {
            const studentBestScores = getStudentBestScores(sheet);
            Object.keys(studentBestScores).forEach(studentName => {
              if (studentBestScores[studentName][unitName]) {
                allStudentDetails.push({
                  studentName: studentName,
                  bestScore: studentBestScores[studentName][unitName],
                  teacher: teacher.name
                });
              }
            });
          }
        } catch (e) {
          // Skip if sheet doesn't exist
        }
      });
      
      return { 
        success: true, 
        details: allStudentDetails.sort((a, b) => a.studentName.localeCompare(b.studentName)),
        isViewer: true
      }; 
    }
    
    // Regular teacher logic
    const sheet = getSheetSafely(ss, teacherInfo.sheet); 
    const studentBestScores = getStudentBestScores(sheet); 
    const unitDetails = Object.keys(studentBestScores) 
      .map(studentName => ({ 
        studentName: studentName, 
        bestScore: studentBestScores[studentName][unitName] 
      })) 
      .sort((a, b) => a.studentName.localeCompare(b.studentName)); 
    return { success: true, details: unitDetails }; 
  } catch(e) { 
    return { success: false, error: e.toString() }; 
  } 
}
function saveQuizResult(resultData) { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const studentName = studentInfo[1]; const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = teacherEntry.sheet; const resultsSheet = getSheetSafely(ss, resultsSheetName); const timestamp = new Date(); const score = resultData.score; const total = resultData.total; const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0; resultsSheet.appendRow([timestamp, userEmail, studentName, resultData.unit, score, total, percentage]); return { success: true }; } catch (e) { return { success: false, error: e.toString() }; } }

function saveMCAQuizResult(resultData) { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const studentName = studentInfo[1]; const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = `MCA_${teacherEntry.sheet}`; let resultsSheet = ss.getSheetByName(resultsSheetName); if (!resultsSheet) { resultsSheet = ss.insertSheet(resultsSheetName); resultsSheet.getRange(1, 1, 1, 7).setValues([["Timestamp", "Email", "Student Name", "Unit", "Score", "Total", "Percentage"]]); } const timestamp = new Date(); const score = resultData.score; const total = resultData.total; const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : 0; resultsSheet.appendRow([timestamp, userEmail, studentName, resultData.unit, score, total, percentage]); return { success: true }; } catch (e) { return { success: false, error: e.toString() }; } }
function getStudentProgress() { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = teacherEntry.sheet; const sheet = getSheetSafely(ss, resultsSheetName); const studentBestScores = getStudentBestScores(sheet); return { success: true, progress: studentBestScores[studentInfo[1]] || {} }; } catch (e) { return { success: false, error: e.toString() }; } }

function getMCAStudentProgress() { try { const userEmail = Session.getActiveUser().getEmail(); const ss = SpreadsheetApp.openById(SPREADSHEET_ID); const rosterSheet = getSheetSafely(ss, ROSTER_SHEET); const rosterData = rosterSheet.getDataRange().getValues(); const studentInfo = rosterData.find(row => row[0] === userEmail); if (!studentInfo) throw new Error("Could not find student in the roster."); const teacherDisplayName = studentInfo[2]; const teacherEntry = Object.values(TEACHER_CONFIG).find(t => t.name === teacherDisplayName); if (!teacherEntry) throw new Error(`Configuration error: No sheet found for teacher "${teacherDisplayName}".`); const resultsSheetName = `MCA_${teacherEntry.sheet}`; const sheet = ss.getSheetByName(resultsSheetName); if (!sheet) return { success: true, progress: {} }; const studentBestScores = getStudentBestScores(sheet); return { success: true, progress: studentBestScores[studentInfo[1]] || {} }; } catch (e) { return { success: false, error: e.toString() }; } }

function getMCATeacherDashboardOverview() { 
  try { 
    const userEmail = Session.getActiveUser().getEmail(); 
    const teacherInfo = TEACHER_CONFIG[userEmail]; 
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) throw new Error("Access Denied."); 
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID); 
    
    // If it's a viewer, aggregate MCA data from all teacher sheets
    if (viewerInfo) {
      const combinedStats = {};
      
      Object.values(TEACHER_CONFIG).forEach(teacher => {
        try {
          const sheet = ss.getSheetByName(`MCA_${teacher.sheet}`);
          if (sheet) {
            const studentBestScores = getStudentBestScores(sheet);
            Object.keys(studentBestScores).forEach(studentName => {
              Object.keys(studentBestScores[studentName]).forEach(unitName => {
                if (!combinedStats[unitName]) {
                  combinedStats[unitName] = { developing: 0, proficient: 0, mastered: 0, total: 0 };
                }
                const score = studentBestScores[studentName][unitName];
                if (score >= PROFICIENCY_BANDS.MASTERED.min) combinedStats[unitName].mastered++;
                else if (score >= PROFICIENCY_BANDS.PROFICIENT.min) combinedStats[unitName].proficient++;
                else combinedStats[unitName].developing++;
                combinedStats[unitName].total++;
              });
            });
          }
        } catch (e) {
          // Skip if sheet doesn't exist
        }
      });
      
      Object.keys(combinedStats).forEach(unitName => {
        const stats = combinedStats[unitName];
        stats.masteredPct = (stats.mastered / stats.total * 100).toFixed(1);
        stats.proficientPct = (stats.proficient / stats.total * 100).toFixed(1);
        stats.developingPct = (100 - parseFloat(stats.masteredPct) - parseFloat(stats.proficientPct)).toFixed(1);
      });
      
      return { 
        success: true, 
        teacherName: viewerInfo.name,
        isViewer: true,
        overview: combinedStats
      };
    }
    
    // Regular teacher logic
    const sheetName = `MCA_${teacherInfo.sheet}`; 
    const sheet = ss.getSheetByName(sheetName); 
    if (!sheet) return { success: true, teacherName: teacherInfo.name, overview: {} }; 
    const studentBestScores = getStudentBestScores(sheet); 
    const allStudents = Object.keys(studentBestScores); 
    if (allStudents.length === 0) { 
      return { success: true, teacherName: teacherInfo.name, overview: {} }; 
    } 
    const unitStats = {}; 
    allStudents.forEach(studentName => { 
      Object.keys(studentBestScores[studentName]).forEach(unitName => { 
        if (!unitStats[unitName]) { 
          unitStats[unitName] = { developing: 0, proficient: 0, mastered: 0, total: 0 }; 
        } 
        const score = studentBestScores[studentName][unitName]; 
        if (score >= PROFICIENCY_BANDS.MASTERED.min) unitStats[unitName].mastered++; 
        else if (score >= PROFICIENCY_BANDS.PROFICIENT.min) unitStats[unitName].proficient++; 
        else unitStats[unitName].developing++; 
        unitStats[unitName].total++; 
      }); 
    }); 
    Object.keys(unitStats).forEach(unitName => { 
      const stats = unitStats[unitName]; 
      stats.masteredPct = (stats.mastered / stats.total * 100).toFixed(1); 
      stats.proficientPct = (stats.proficient / stats.total * 100).toFixed(1); 
      stats.developingPct = (100 - parseFloat(stats.masteredPct) - parseFloat(stats.proficientPct)).toFixed(1); 
    }); 
    return { success: true, teacherName: teacherInfo.name, overview: unitStats }; 
  } catch(e) { 
    return { success: false, error: e.toString() }; 
  } 
}

function getMCAUnitDetailsForTeacher(unitName) { 
  try { 
    const userEmail = Session.getActiveUser().getEmail(); 
    const teacherInfo = TEACHER_CONFIG[userEmail]; 
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) throw new Error("Access Denied."); 
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID); 
    
    // If it's a viewer, aggregate MCA data from all teacher sheets
    if (viewerInfo) {
      const allStudentDetails = [];
      
      Object.values(TEACHER_CONFIG).forEach(teacher => {
        try {
          const sheet = ss.getSheetByName(`MCA_${teacher.sheet}`);
          if (sheet) {
            const studentBestScores = getStudentBestScores(sheet);
            Object.keys(studentBestScores).forEach(studentName => {
              if (studentBestScores[studentName][unitName]) {
                allStudentDetails.push({
                  studentName: studentName,
                  bestScore: studentBestScores[studentName][unitName],
                  teacher: teacher.name
                });
              }
            });
          }
        } catch (e) {
          // Skip if sheet doesn't exist
        }
      });
      
      return { 
        success: true, 
        details: allStudentDetails.sort((a, b) => a.studentName.localeCompare(b.studentName)),
        isViewer: true
      }; 
    }
    
    // Regular teacher logic
    const sheetName = `MCA_${teacherInfo.sheet}`; 
    const sheet = ss.getSheetByName(sheetName); 
    if (!sheet) return { success: true, details: [] }; 
    const studentBestScores = getStudentBestScores(sheet); 
    const unitDetails = Object.keys(studentBestScores) 
      .map(studentName => ({ 
        studentName: studentName, 
        bestScore: studentBestScores[studentName][unitName] 
      })) 
      .sort((a, b) => a.studentName.localeCompare(b.studentName)); 
    return { success: true, details: unitDetails }; 
  } catch(e) { 
    return { success: false, error: e.toString() }; 
  } 
}
function getQuestionsForUnit(unitName) {
  try {
    console.log(`[getQuestionsForUnit] Looking for questions for unit: "${unitName}"`);
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getSheetSafely(ss, QUESTIONS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    console.log(`[getQuestionsForUnit] Found ${data.length} rows in sheet`);
    
    const headers = data.shift();
    console.log(`[getQuestionsForUnit] Headers: ${JSON.stringify(headers)}`);
    
    const unitIndex = headers.indexOf('Unit');
    const questionIndex = headers.indexOf('Question');
    const answerIndex = headers.indexOf('Answer');
    const incorrect1Index = headers.indexOf('Incorrect 1');
    const incorrect2Index = headers.indexOf('Incorrect 2');
    const incorrect3Index = headers.indexOf('Incorrect 3');
    
    if (unitIndex === -1 || questionIndex === -1 || answerIndex === -1) {
      throw new Error("A required column (Unit, Question, or Answer) is missing from the questions sheet.");
    }
    
    // Log all unique unit names found
    const uniqueUnits = [...new Set(data.map(row => row[unitIndex]).filter(Boolean))];
    console.log(`[getQuestionsForUnit] Available units in sheet: ${JSON.stringify(uniqueUnits)}`);
    
    const questions = data
      .filter(row => row[unitIndex] === unitName && row[questionIndex])
      .map(row => {
        const options = [row[answerIndex], row[incorrect1Index], row[incorrect2Index], row[incorrect3Index]].filter(Boolean);
        return {
          question: row[questionIndex],
          answer: row[answerIndex],
          options: options
        };
      });
    
    console.log(`[getQuestionsForUnit] Found ${questions.length} questions for unit "${unitName}"`);
    return questions;
  } catch (e) {
    console.error(`[getQuestionsForUnit] Error: ${e.toString()}`);
    return { error: true, message: e.toString() };
  }
}

function getMCAQuestionsForUnit(unitName) {
  try {
    console.log(`[getMCAQuestionsForUnit] Looking for MCA questions for unit: "${unitName}"`);
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getSheetSafely(ss, MCA_QUESTIONS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    console.log(`[getMCAQuestionsForUnit] Found ${data.length} rows in MCA sheet`);
    
    const headers = data.shift();
    console.log(`[getMCAQuestionsForUnit] Headers: ${JSON.stringify(headers)}`);
    
    const unitIndex = headers.indexOf('Unit');
    const questionIndex = headers.indexOf('Question');
    const passageIndex = headers.indexOf('Passage'); // Column C - Passage
    const answerIndex = headers.indexOf('Answer');
    const incorrect1Index = headers.indexOf('Incorrect 1');
    const incorrect2Index = headers.indexOf('Incorrect 2');
    const incorrect3Index = headers.indexOf('Incorrect 3');
    
    if (unitIndex === -1 || questionIndex === -1 || answerIndex === -1) {
      throw new Error("A required column (Unit, Question, or Answer) is missing from the MCA questions sheet.");
    }
    
    // Log all unique unit names found
    const uniqueUnits = [...new Set(data.map(row => row[unitIndex]).filter(Boolean))];
    console.log(`[getMCAQuestionsForUnit] Available units in MCA sheet: ${JSON.stringify(uniqueUnits)}`);
    
    const questions = data
      .filter(row => row[unitIndex] === unitName && row[questionIndex])
      .map(row => {
        const options = [row[answerIndex], row[incorrect1Index], row[incorrect2Index], row[incorrect3Index]].filter(Boolean);
        return {
          question: row[questionIndex],
          passage: passageIndex !== -1 ? (row[passageIndex] || '') : '', // Include passage from column C
          answer: row[answerIndex],
          options: options
        };
      });
    
    console.log(`[getMCAQuestionsForUnit] Found ${questions.length} MCA questions for unit "${unitName}"`);
    return questions;
  } catch (e) {
    console.error(`[getMCAQuestionsForUnit] Error: ${e.toString()}`);
    return { error: true, message: e.toString() };
  }
}

// PUBLIC API: Get teacher's unit settings (for teacher interface)
function getTeacherUnitSettings() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    // Viewers see all units enabled (read-only)
    if (viewerInfo) {
      const allUnitsEnabled = {};
      ALL_UNITS.forEach(unit => {
        allUnitsEnabled[unit] = true;
      });
      return { 
        success: true, 
        settings: allUnitsEnabled,
        allUnits: ALL_UNITS,
        isViewer: true
      };
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
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    // Viewers cannot modify settings
    if (viewerInfo) {
      return { success: false, error: "Viewers cannot modify unit settings." };
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

// PUBLIC API: Get teacher's MCA unit settings (for teacher interface)
function getTeacherMCAUnitSettings() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    // Viewers see all MCA units enabled (read-only)
    if (viewerInfo) {
      const allUnitsEnabled = {};
      ALL_UNITS.forEach(unit => {
        allUnitsEnabled[unit] = true;
      });
      return { 
        success: true, 
        settings: allUnitsEnabled,
        allUnits: ALL_UNITS,
        isViewer: true
      };
    }
    
    const settings = getTeacherMCAUnitSettingsData(userEmail);
    
    return { 
      success: true, 
      settings: settings,
      allUnits: ALL_UNITS
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Update teacher's MCA unit setting (toggle on/off)
function updateTeacherMCAUnitSettings(unitName, isEnabled) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    const viewerInfo = TEACHER_VIEWERS[userEmail];
    
    if (!teacherInfo && !viewerInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    // Viewers cannot modify MCA settings
    if (viewerInfo) {
      return { success: false, error: "Viewers cannot modify MCA unit settings." };
    }
    
    if (!ALL_UNITS.includes(unitName)) {
      throw new Error(`Invalid unit name: ${unitName}`);
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeMCAUnitSettingsSheet(ss);
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

// Helper function to initialize Unit Learning Targets sheet if it doesn't exist
function initializeUnitLearningTargetsSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(UNIT_LEARNING_TARGETS_SHEET);
  if (!sheet) {
    // If the sheet doesn't exist, return null - it should be created manually by teachers
    throw new Error(`The "${UNIT_LEARNING_TARGETS_SHEET}" sheet does not exist. Please create it manually with the proper structure.`);
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
    // All units now use the generic function from the Unit Learning Targets sheet
    return getLearningTargetsFromSheet(unitName);
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

// PUBLIC API: Get Learning Portfolio data from dedicated sheet for any unit
function getLearningPortfolioData(unitName) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeUnitLearningTargetsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, proficiencyData: {} };
    }
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Student_Email");
    const targetIndex = headers.indexOf("Learning_Target");
    const phaseIndex = headers.indexOf("Proficiency_Phase");
    const levelIndex = headers.indexOf("Proficiency_Level");
    
    const proficiencyData = {};
    data.slice(1)
      .filter(row => row[emailIndex] === userEmail)
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

// PUBLIC API: Get learning targets from the "Unit Learning Targets" sheet for any unit
function getLearningTargetsFromSheet(unitName) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getSheetSafely(ss, UNIT_LEARNING_TARGETS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, targets: [], proficiencyOptions: [] };
    }
    
    // Read learning targets from Column B (index 1)
    // Read proficiency options from Columns C, D, E (indices 2, 3, 4)
    const targets = [];
    const proficiencyOptions = [];
    
    // Set fixed proficiency options as requested: Beginning, Developing, Proficient, Mastery
    proficiencyOptions.push(
      { value: 1, label: 'Beginning' },
      { value: 2, label: 'Developing' },
      { value: 3, label: 'Proficient' },
      { value: 4, label: 'Mastery' }
    );
    
    // Read learning targets from Column B (starting from row 2), filtered by Column A
    // Use a Set to prevent duplicates
    const seenTargets = new Set();
    for (let i = 1; i < data.length; i++) {
      const unitColumn = data[i][0]; // Column A - Unit identifier
      const learningTarget = data[i][1]; // Column B - Learning target
      
      // Only include targets where Column A matches the requested unit
      // Support both full unit names (e.g., "Unit 2: Personal Narrative") and short names (e.g., "Unit 2")
      const unitColumnText = unitColumn ? unitColumn.toString().trim() : '';
      const unitShortName = unitName.split(':')[0].trim(); // Extract "Unit 2" from "Unit 2: Personal Narrative"
      
      if (unitColumn && learningTarget && learningTarget.toString().trim() &&
          (unitColumnText === unitName || unitColumnText === unitShortName)) {
        
        const targetText = learningTarget.toString().trim();
        // Prevent duplicates
        if (!seenTargets.has(targetText)) {
          seenTargets.add(targetText);
          targets.push({
            target: targetText,
            description: targetText, // Using target as description for now
            order: i
          });
        }
      }
    }
    
    return { 
      success: true, 
      targets: targets,
      proficiencyOptions: proficiencyOptions
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Save Learning Portfolio proficiency level
function saveLearningPortfolioProficiency(learningTarget, proficiencyLevel, proficiencyPhase = PROFICIENCY_PHASES.SINGLE) {
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
    const sheet = initializeUnitLearningTargetsSheet(ss);
    const data = sheet.getDataRange().getValues();
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Student_Email");
    const nameIndex = headers.indexOf("Student_Name");
    const targetIndex = headers.indexOf("Learning_Target");
    const phaseIndex = headers.indexOf("Proficiency_Phase");
    const levelIndex = headers.indexOf("Proficiency_Level");
    const updatedIndex = headers.indexOf("Last_Updated");
    
    // Find existing row or create new one
    let rowFound = false;
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const existingPhase = row[phaseIndex] || PROFICIENCY_PHASES.SINGLE;
      if (row[emailIndex] === userEmail && row[targetIndex] === learningTarget && existingPhase === proficiencyPhase) {
        // Update existing row
        sheet.getRange(i + 1, levelIndex + 1).setValue(proficiencyLevel);
        sheet.getRange(i + 1, updatedIndex + 1).setValue(new Date());
        rowFound = true;
        break;
      }
    }
    
    // If no existing row found, add new row
    if (!rowFound) {
      sheet.appendRow([userEmail, studentName, learningTarget, proficiencyPhase, proficiencyLevel, new Date(), ""]);
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// --- PORTFOLIO TEACHER DASHBOARD FUNCTIONS ---

// Get portfolio student data for teacher dashboard
function getPortfolioStudentData(unitName) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Verify this is a teacher
    if (!TEACHER_CONFIG[userEmail]) {
      return { success: false, error: "Access denied. Teachers only." };
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const proficiencySheet = getSheetSafely(ss, STUDENT_PROFICIENCY_SHEET);
    const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
    
    // Get all proficiency data
    const proficiencyData = proficiencySheet.getDataRange().getValues();
    const headers = proficiencyData[0];
    
    // Get roster data for student names
    const rosterData = rosterSheet.getDataRange().getValues();
    const rosterHeaders = rosterData[0];
    
    const dashboardData = [];
    
    // Process proficiency data for the specific unit
    for (let i = 1; i < proficiencyData.length; i++) {
      const row = proficiencyData[i];
      const studentEmail = row[0];
      const learningTarget = row[2];
      const phase = row[3];
      const proficiencyLevel = row[4];
      const lastUpdated = row[5];
      
      // Skip if this is not for the current unit - check if learning target belongs to unit
      // For now, we'll include all targets and let frontend filter
      
      // Get student name from roster
      const studentInfo = rosterData.find(rosterRow => rosterRow[0] === studentEmail);
      const studentName = studentInfo ? studentInfo[1] : studentEmail;
      
      dashboardData.push({
        studentEmail: studentEmail,
        studentName: studentName,
        learningTarget: learningTarget,
        phase: phase,
        proficiencyLevel: proficiencyLevel,
        lastUpdated: lastUpdated
      });
    }
    
    return { success: true, data: dashboardData };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// Export portfolio dashboard data as CSV
function exportPortfolioDashboard(unitName) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Verify this is a teacher
    if (!TEACHER_CONFIG[userEmail]) {
      return { success: false, error: "Access denied. Teachers only." };
    }
    
    const dashboardResult = getPortfolioStudentData(unitName);
    if (!dashboardResult.success) {
      return dashboardResult;
    }
    
    // Create CSV content
    let csvContent = "Student Name,Learning Target,Phase,Proficiency Level,Last Updated\n";
    
    dashboardResult.data.forEach(entry => {
      const proficiencyText = getProficiencyText(entry.proficiencyLevel);
      const lastUpdated = entry.lastUpdated ? new Date(entry.lastUpdated).toLocaleDateString() : 'Never';
      
      csvContent += `"${entry.studentName}","${entry.learningTarget}","${entry.phase}","${proficiencyText}","${lastUpdated}"\n`;
    });
    
    return { success: true, csvData: csvContent };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// Helper function to get proficiency text from level
function getProficiencyText(level) {
  switch(parseInt(level)) {
    case 0: return 'Not Started';
    case 1: return 'Beginning';
    case 2: return 'Developing';
    case 3: return 'Proficient';
    case 4: return 'Mastery';
    default: return 'Unknown';
  }
}

// Add new learning target
function addLearningTarget(unitName, targetText, phases) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Verify this is a teacher
    if (!TEACHER_CONFIG[userEmail]) {
      return { success: false, error: "Access denied. Teachers only." };
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const targetsSheet = getSheetSafely(ss, UNIT_LEARNING_TARGETS_SHEET);
    
    // Add new row with the learning target
    targetsSheet.appendRow([
      unitName,
      targetText,
      phases.beginning ? 'Yes' : 'No',
      phases.middle ? 'Yes' : 'No',
      phases.end ? 'Yes' : 'No',
      phases.single ? 'Yes' : 'No'
    ]);
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// Delete learning target
function deleteLearningTarget(unitName, targetText) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Verify this is a teacher
    if (!TEACHER_CONFIG[userEmail]) {
      return { success: false, error: "Access denied. Teachers only." };
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const targetsSheet = getSheetSafely(ss, UNIT_LEARNING_TARGETS_SHEET);
    
    const data = targetsSheet.getDataRange().getValues();
    
    // Find and delete the row
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === unitName && data[i][1] === targetText) {
        targetsSheet.deleteRow(i + 1);
        break;
      }
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// Update learning targets
function updateLearningTargets(unitName, changes) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Verify this is a teacher
    if (!TEACHER_CONFIG[userEmail]) {
      return { success: false, error: "Access denied. Teachers only." };
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const targetsSheet = getSheetSafely(ss, UNIT_LEARNING_TARGETS_SHEET);
    
    const data = targetsSheet.getDataRange().getValues();
    const unitRows = [];
    
    // Find all rows for this unit
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === unitName) {
        unitRows.push(i);
      }
    }
    
    // Update each row based on the changes
    changes.forEach((change, index) => {
      if (index < unitRows.length) {
        const rowIndex = unitRows[index] + 1; // +1 for sheet indexing
        targetsSheet.getRange(rowIndex, 2).setValue(change.target); // Target text
        targetsSheet.getRange(rowIndex, 3).setValue(change.phases.beginning ? 'Yes' : 'No');
        targetsSheet.getRange(rowIndex, 4).setValue(change.phases.middle ? 'Yes' : 'No');
        targetsSheet.getRange(rowIndex, 5).setValue(change.phases.end ? 'Yes' : 'No');
        targetsSheet.getRange(rowIndex, 6).setValue(change.phases.single ? 'Yes' : 'No');
      }
    });
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// --- INDEPENDENT READING FUNCTIONS ---

// Helper function to initialize Independent Reading sheet for a specific teacher
function initializeTeacherIndependentReadingSheet(spreadsheet, teacherName) {
  const sheetName = `Independent Reading - ${teacherName}`;
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.getRange(1, 1, 1, 17).setValues([[
      "Student_Email", "Student_Name", "Semester", "Book_Title", "Book_Author", 
      "Reflection_1_Date", "Reflection_1_Pages_Read", "Reflection_1_Total_Pages", "Reflection_1_Text",
      "Reflection_2_Date", "Reflection_2_Pages_Read", "Reflection_2_Total_Pages", "Reflection_2_Text",
      "Reflection_3_Date", "Reflection_3_Pages_Read", "Reflection_3_Total_Pages", "Reflection_3_Text"
    ]]);
  }
  return sheet;
}

// Helper function to get teacher name from student email using roster
function getStudentTeacherFromRoster(studentEmail) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
    const rosterData = rosterSheet.getDataRange().getValues();
    const studentInfo = rosterData.find(row => row[0] === studentEmail);
    
    if (!studentInfo) {
      throw new Error("Student not found in roster. Please contact your teacher.");
    }
    
    return studentInfo[2]; // Teacher display name
  } catch (e) {
    throw new Error(`Error finding student's teacher: ${e.toString()}`);
  }
}

// PUBLIC API: Get Independent Reading data for current user
function getIndependentReadingData() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get student's teacher and use teacher-specific sheet
    const teacherName = getStudentTeacherFromRoster(userEmail);
    const sheet = initializeTeacherIndependentReadingSheet(ss, teacherName);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, semester1: {}, semester2: {} };
    }
    
    const headers = data[0];
    const emailIndex = headers.indexOf("Student_Email");
    const semesterIndex = headers.indexOf("Semester");
    const titleIndex = headers.indexOf("Book_Title");
    const authorIndex = headers.indexOf("Book_Author");
    
    let semester1Data = {};
    let semester2Data = {};
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[emailIndex] === userEmail) {
        const semester = row[semesterIndex];
        const bookData = {
          title: row[titleIndex] || "",
          author: row[authorIndex] || "",
          reflections: [
            {
              date: row[headers.indexOf("Reflection_1_Date")] || "",
              pagesRead: row[headers.indexOf("Reflection_1_Pages_Read")] || "",
              totalPages: row[headers.indexOf("Reflection_1_Total_Pages")] || "",
              text: row[headers.indexOf("Reflection_1_Text")] || ""
            },
            {
              date: row[headers.indexOf("Reflection_2_Date")] || "",
              pagesRead: row[headers.indexOf("Reflection_2_Pages_Read")] || "",
              totalPages: row[headers.indexOf("Reflection_2_Total_Pages")] || "",
              text: row[headers.indexOf("Reflection_2_Text")] || ""
            },
            {
              date: row[headers.indexOf("Reflection_3_Date")] || "",
              pagesRead: row[headers.indexOf("Reflection_3_Pages_Read")] || "",
              totalPages: row[headers.indexOf("Reflection_3_Total_Pages")] || "",
              text: row[headers.indexOf("Reflection_3_Text")] || ""
            }
          ]
        };
        
        if (semester === "Semester 1") {
          semester1Data = bookData;
        } else if (semester === "Semester 2") {
          semester2Data = bookData;
        }
      }
    }
    
    return { 
      success: true, 
      semester1: semester1Data, 
      semester2: semester2Data 
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Save Independent Reading data
function saveIndependentReadingData(semester, bookTitle, bookAuthor, reflectionIndex, date, pagesRead, totalPages, reflectionText) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get student info and teacher from roster
    const rosterSheet = getSheetSafely(ss, ROSTER_SHEET);
    const rosterData = rosterSheet.getDataRange().getValues();
    const studentInfo = rosterData.find(row => row[0] === userEmail);
    
    if (!studentInfo) {
      throw new Error("Student not found in roster. Please contact your teacher.");
    }
    
    const studentName = studentInfo[1];
    const teacherName = studentInfo[2];
    
    // Use teacher-specific sheet
    const sheet = initializeTeacherIndependentReadingSheet(ss, teacherName);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Find existing row for this student and semester
    let rowIndex = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === userEmail && data[i][2] === semester) {
        rowIndex = i;
        break;
      }
    }
    
    // Prepare the row data
    const rowData = [
      userEmail, studentName, semester, bookTitle, bookAuthor,
      "", "", "", "", // Reflection 1
      "", "", "", "", // Reflection 2  
      "", "", "", ""  // Reflection 3
    ];
    
    // Set the specific reflection data
    const reflectionStartIndex = 5 + (reflectionIndex * 4);
    rowData[reflectionStartIndex] = date;
    rowData[reflectionStartIndex + 1] = pagesRead;
    rowData[reflectionStartIndex + 2] = totalPages;
    rowData[reflectionStartIndex + 3] = reflectionText;
    
    if (rowIndex >= 0) {
      // Update existing row - preserve other reflection data
      const existingRow = data[rowIndex];
      for (let i = 0; i < rowData.length; i++) {
        if (i < 5 || (i >= reflectionStartIndex && i < reflectionStartIndex + 4)) {
          // Update book info and current reflection
          sheet.getRange(rowIndex + 1, i + 1).setValue(rowData[i]);
        }
      }
    } else {
      // Add new row
      sheet.appendRow(rowData);
    }
    
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get all Independent Reading data for teachers
function getAllIndependentReadingData() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Check if user is a teacher
    const teacherInfo = TEACHER_CONFIG[userEmail];
    if (!teacherInfo) {
      throw new Error("Access denied. Only teachers can view all student data.");
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeTeacherIndependentReadingSheet(ss, teacherInfo.name);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { success: true, students: [] };
    }
    
    const headers = data[0];
    const students = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      students.push({
        studentName: row[1],
        semester: row[2],
        bookTitle: row[3],
        bookAuthor: row[4],
        reflections: [
          {
            date: row[5],
            pagesRead: row[6],
            totalPages: row[7],
            text: row[8]
          },
          {
            date: row[9],
            pagesRead: row[10],
            totalPages: row[11],
            text: row[12]
          },
          {
            date: row[13],
            pagesRead: row[14],
            totalPages: row[15],
            text: row[16]
          }
        ]
      });
    }
    
    return { success: true, students: students };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get Independent Reading dashboard data for teachers
function getIndependentReadingDashboard() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Check if user is a teacher
    const teacherInfo = TEACHER_CONFIG[userEmail];
    if (!teacherInfo) {
      throw new Error("Access denied. Only teachers can view dashboard data.");
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = initializeTeacherIndependentReadingSheet(ss, teacherInfo.name);
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) {
      return { 
        success: true, 
        teacherName: teacherInfo.name,
        stats: {
          totalStudents: 0,
          semester1Students: 0,
          semester2Students: 0,
          completedSemester1: 0,
          completedSemester2: 0
        },
        students: []
      };
    }
    
    const headers = data[0];
    const studentProgress = {};
    
    // Process each row to build student progress data
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const studentName = row[1];
      const semester = row[2];
      const bookTitle = row[3];
      const bookAuthor = row[4];
      
      if (!studentProgress[studentName]) {
        studentProgress[studentName] = {
          name: studentName,
          semester1: { hasBook: false, reflectionsCompleted: 0, totalReflections: 3 },
          semester2: { hasBook: false, reflectionsCompleted: 0, totalReflections: 3 }
        };
      }
      
      const semesterKey = semester === 'Semester 1' ? 'semester1' : 'semester2';
      if (semesterKey && bookTitle) {
        studentProgress[studentName][semesterKey].hasBook = true;
        studentProgress[studentName][semesterKey].bookTitle = bookTitle;
        studentProgress[studentName][semesterKey].bookAuthor = bookAuthor;
        
        // Count completed reflections
        let reflectionsCompleted = 0;
        for (let r = 0; r < 3; r++) {
          const reflectionStartIndex = 5 + (r * 4);
          if (row[reflectionStartIndex] && row[reflectionStartIndex + 3]) { // Date and text exist
            reflectionsCompleted++;
          }
        }
        studentProgress[studentName][semesterKey].reflectionsCompleted = reflectionsCompleted;
      }
    }
    
    // Calculate statistics
    const students = Object.values(studentProgress);
    const totalStudents = students.length;
    const semester1Students = students.filter(s => s.semester1.hasBook).length;
    const semester2Students = students.filter(s => s.semester2.hasBook).length;
    const completedSemester1 = students.filter(s => s.semester1.reflectionsCompleted === 3).length;
    const completedSemester2 = students.filter(s => s.semester2.reflectionsCompleted === 3).length;
    
    return {
      success: true,
      teacherName: teacherInfo.name,
      stats: {
        totalStudents,
        semester1Students,
        semester2Students,
        completedSemester1,
        completedSemester2
      },
      students: students.sort((a, b) => a.name.localeCompare(b.name))
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// --- STATE STANDARDS ALIGNMENT FUNCTIONS ---

// Array of all unit standards sheets for easy iteration
const ALL_STANDARDS_SHEETS = [
  { name: "Unit 1: Coming of Age", sheet: UNIT1_STANDARDS_SHEET },
  { name: "Unit 2: Personal Narrative", sheet: UNIT2_STANDARDS_SHEET },
  { name: "Unit 3: Novel Study", sheet: UNIT3_STANDARDS_SHEET },
  { name: "Unit 4: Short Story", sheet: UNIT4_STANDARDS_SHEET },
  { name: "Unit 5: Romeo and Juliet", sheet: UNIT5_STANDARDS_SHEET },
  { name: "Unit 5 (Enriched) Macbeth", sheet: UNIT5_ENRICHED_STANDARDS_SHEET },
  { name: "Unit 6: Nonfiction", sheet: UNIT6_STANDARDS_SHEET },
  { name: "Unit 6 (Enriched) Frankenstein", sheet: UNIT6_ENRICHED_STANDARDS_SHEET },
  { name: "Unit 7: Resilience", sheet: UNIT7_STANDARDS_SHEET },
  { name: "Unit 8: Annotated Bibliography & Documentary", sheet: UNIT8_STANDARDS_SHEET }
];

// PUBLIC API: Get comprehensive state standards overview (teacher only)
function getStateStandardsOverview() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const unitStandardsData = {};
    let uniqueStandards = new Set();
    let totalUnitStandards = 0;
    
    // Process each unit's standards sheet
    ALL_STANDARDS_SHEETS.forEach(unitInfo => {
      try {
        const sheet = ss.getSheetByName(unitInfo.sheet);
        if (sheet) {
          const data = sheet.getDataRange().getValues();
          if (data.length > 1) {
            const headers = data[0].map(h => h.toString().toLowerCase());
            const rows = data.slice(1);
            
            // Find column indices
            const standardIndex = headers.findIndex(h => h.includes('standard'));
            const formativeIndex = headers.findIndex(h => h.includes('formative'));
            const summativeIndex = headers.findIndex(h => h.includes('summative'));
            const categoryIndex = headers.findIndex(h => h.includes('category') || h.includes('domain'));
            
            const unitStandards = [];
            
            rows.forEach(row => {
              if (row[standardIndex] && row[standardIndex].toString().trim()) {
                const standardCode = row[standardIndex].toString().trim();
                const formativeAssessment = formativeIndex >= 0 ? row[formativeIndex] : '';
                const summativeAssessment = summativeIndex >= 0 ? row[summativeIndex] : '';
                const category = categoryIndex >= 0 ? row[categoryIndex] : 'Other';
                
                unitStandards.push({
                  code: standardCode,
                  formativeAssessment: formativeAssessment,
                  summativeAssessment: summativeAssessment,
                  category: category
                });
                
                uniqueStandards.add(standardCode);
                totalUnitStandards++;
              }
            });
            
            unitStandardsData[unitInfo.name] = {
              standards: unitStandards,
              sheetExists: true,
              standardsCount: unitStandards.length
            };
          } else {
            unitStandardsData[unitInfo.name] = {
              standards: [],
              sheetExists: true,
              standardsCount: 0
            };
          }
        } else {
          unitStandardsData[unitInfo.name] = {
            standards: [],
            sheetExists: false,
            standardsCount: 0,
            error: 'Sheet not found'
          };
        }
      } catch (unitError) {
        unitStandardsData[unitInfo.name] = {
          standards: [],
          sheetExists: false,
          standardsCount: 0,
          error: unitError.toString()
        };
      }
    });
    
    return { 
      success: true, 
      teacherName: teacherInfo.name,
      unitStandardsData: unitStandardsData,
      overview: {
        totalUnits: ALL_STANDARDS_SHEETS.length,
        totalStandards: uniqueStandards.size,
        totalStandardsOccurrences: totalUnitStandards
      }
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get detailed standards data organized by unit (teacher only)
function getStandardsByUnit() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const unitStandardsData = {};
    
    // Process each unit's standards sheet
    ALL_STANDARDS_SHEETS.forEach(unitInfo => {
      try {
        const sheet = ss.getSheetByName(unitInfo.sheet);
        if (sheet) {
          const data = sheet.getDataRange().getValues();
          if (data.length > 1) {
            const headers = data[0];
            const standardsRows = data.slice(1);
            
            // Parse standards data based on sheet structure
            const standards = standardsRows
              .filter(row => row[0] && row[0].toString().trim()) // Has content in first column
              .map((row, index) => {
                const standard = {};
                headers.forEach((header, colIndex) => {
                  if (header && row[colIndex] !== undefined) {
                    const headerKey = header.toString().toLowerCase().replace(/\s+/g, '_');
                    standard[headerKey] = row[colIndex];
                  }
                });
                standard.id = `${unitInfo.name}_${index + 1}`;
                return standard;
              });
            
            unitStandardsData[unitInfo.name] = {
              standards: standards,
              sheetExists: true,
              standardsCount: standards.length
            };
          } else {
            unitStandardsData[unitInfo.name] = {
              standards: [],
              sheetExists: true,
              standardsCount: 0
            };
          }
        } else {
          unitStandardsData[unitInfo.name] = {
            standards: [],
            sheetExists: false,
            standardsCount: 0,
            error: 'Sheet not found'
          };
        }
      } catch (unitError) {
        unitStandardsData[unitInfo.name] = {
          standards: [],
          sheetExists: false,
          standardsCount: 0,
          error: unitError.toString()
        };
      }
    });
    
    return { 
      success: true, 
      teacherName: teacherInfo.name,
      unitStandardsData: unitStandardsData 
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get standards coverage analysis with gaps and overlaps (teacher only)
function getStandardsCoverageAnalysis() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const teacherInfo = TEACHER_CONFIG[userEmail];
    
    if (!teacherInfo) {
      throw new Error("Access Denied. This function is only available to teachers.");
    }
    
    // Get all standards data first
    const unitDataResult = getStandardsByUnit();
    if (!unitDataResult.success) {
      return unitDataResult;
    }
    
    const unitStandardsData = unitDataResult.unitStandardsData;
    const allStandardsCodes = new Set();
    const standardsToUnits = {}; // Map standards to units that cover them
    const duplicateStandards = {};
    
    // Analyze standards across all units
    Object.keys(unitStandardsData).forEach(unitName => {
      const unitData = unitStandardsData[unitName];
      if (unitData.standards) {
        unitData.standards.forEach(standard => {
          // Try to find a standard code field
          const standardCode = standard.standard_code || 
                              standard.code || 
                              standard.standard || 
                              standard.id ||
                              Object.values(standard)[0]; // First non-empty value
          
          if (standardCode && standardCode.toString().trim()) {
            const code = standardCode.toString().trim();
            allStandardsCodes.add(code);
            
            if (!standardsToUnits[code]) {
              standardsToUnits[code] = [];
            }
            standardsToUnits[code].push(unitName);
            
            // Track duplicates
            if (standardsToUnits[code].length > 1) {
              duplicateStandards[code] = standardsToUnits[code];
            }
          }
        });
      }
    });
    
    // Calculate coverage statistics
    const totalUniqueStandards = allStandardsCodes.size;
    const duplicateCount = Object.keys(duplicateStandards).length;
    const coverageByUnit = {};
    
    Object.keys(unitStandardsData).forEach(unitName => {
      const unitData = unitStandardsData[unitName];
      coverageByUnit[unitName] = {
        totalStandards: unitData.standardsCount,
        uniqueStandards: unitData.standards ? 
          new Set(unitData.standards.map(s => 
            (s.standard_code || s.code || s.standard || s.id || Object.values(s)[0] || '').toString().trim()
          ).filter(code => code)).size : 0,
        sheetExists: unitData.sheetExists
      };
    });
    
    return {
      success: true,
      teacherName: teacherInfo.name,
      analysis: {
        totalUniqueStandards: totalUniqueStandards,
        duplicateStandards: duplicateStandards,
        duplicateCount: duplicateCount,
        coverageByUnit: coverageByUnit,
        standardsToUnits: standardsToUnits
      }
    };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// PUBLIC API: Get all standards data in one comprehensive call (teacher only)
function getAllStandardsData() {
  try {
    console.log('[getAllStandardsData] === STARTING STANDARDS DATA LOADING ===');
    const userEmail = Session.getActiveUser().getEmail();
    console.log(`[getAllStandardsData] User email: ${userEmail}`);
    const teacherInfo = TEACHER_CONFIG[userEmail];
    console.log(`[getAllStandardsData] Teacher info found: ${!!teacherInfo}`);
    if (teacherInfo) {
      console.log(`[getAllStandardsData] Teacher name: ${teacherInfo.name}`);
    }
    
    // TEMPORARY: Allow access for testing even if not a configured teacher
    // if (!teacherInfo) {
    //   throw new Error("Access Denied. This function is only available to teachers.");
    // }
    
    console.log(`[getAllStandardsData] Attempting to open spreadsheet ID: ${SPREADSHEET_ID}`);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('[getAllStandardsData] Spreadsheet opened successfully');
    console.log(`[getAllStandardsData] Processing ${ALL_STANDARDS_SHEETS.length} units`);
    const unitData = {};
    
    // Process each unit's standards sheet with master standards list
    ALL_STANDARDS_SHEETS.forEach(unitInfo => {
      try {
        console.log(`[getAllStandardsData] Processing unit: ${unitInfo.name}, sheet: ${unitInfo.sheet}`);
        const sheet = ss.getSheetByName(unitInfo.sheet);
        if (sheet) {
          console.log(`[getAllStandardsData] Found sheet for ${unitInfo.name}`);
          const data = sheet.getDataRange().getValues();
          console.log(`[getAllStandardsData] Sheet ${unitInfo.name} has ${data.length} rows (including headers)`);
          if (data.length > 1) {
            const headers = data[0].map(h => h.toString().toLowerCase());
            const rows = data.slice(1);
            
            // Validate sheet structure
            console.log(`[getAllStandardsData] Headers for ${unitInfo.name}: [${headers.join(', ')}]`);
            if (headers.length < 7) {
              console.log(`[getAllStandardsData] WARNING: Sheet ${unitInfo.name} has only ${headers.length} columns, expected at least 7`);
            }
            
            // Correct column mapping based on actual spreadsheet structure
            const anchorIndex = 2;       // Column C (Anchor strand)
            const benchmarkCodeIndex = 3; // Column D (Benchmark code)  
            const benchmarkDescIndex = 4; // Column E (Benchmark description)
            const formativeIndex = 5;     // Column F (Formative assessment)
            const summativeIndex = 6;     // Column G (Summative assessment)
            
            // Validate expected columns exist
            if (data[0].length <= benchmarkCodeIndex) {
              console.log(`[getAllStandardsData] ERROR: Sheet ${unitInfo.name} missing benchmark code column (expected column D/index 3)`);
            }
            if (data[0].length <= formativeIndex) {
              console.log(`[getAllStandardsData] ERROR: Sheet ${unitInfo.name} missing formative assessment column (expected column F/index 5)`);
            }
            if (data[0].length <= summativeIndex) {
              console.log(`[getAllStandardsData] ERROR: Sheet ${unitInfo.name} missing summative assessment column (expected column G/index 6)`);
            }
            
            // Organize by assessment type including non-covered standards
            const assessmentGroups = {
              formativeOnly: [],
              summativeOnly: [],
              both: [],
              notCovered: []
            };
            let totalStandards = 0;
            let totalCoveredStandards = 0;
            
            console.log(`[getAllStandardsData] Processing ${rows.length} data rows for ${unitInfo.name}`);
            rows.forEach(row => {
              if (row[benchmarkCodeIndex] && row[benchmarkCodeIndex].toString().trim()) {
                const anchorStrand = row[anchorIndex] ? row[anchorIndex].toString().trim() : 'Other';
                const benchmarkCode = row[benchmarkCodeIndex].toString().trim();
                const benchmarkDesc = row[benchmarkDescIndex] ? row[benchmarkDescIndex].toString().trim() : 'No description';
                
                // Get assessment data from specific columns
                const formativeValue = (row[formativeIndex] && row.length > formativeIndex) ? 
                  row[formativeIndex].toString().trim() : '';
                const summativeValue = (row[summativeIndex] && row.length > summativeIndex) ? 
                  row[summativeIndex].toString().trim() : '';
                
                const hasFormative = formativeValue.toLowerCase() === 'x';
                const hasSummative = summativeValue.toLowerCase() === 'x';
                
                // Log coverage for debugging
                if (hasFormative || hasSummative) {
                  console.log(`[getAllStandardsData] Standard ${benchmarkCode} has coverage - Formative: ${hasFormative}, Summative: ${hasSummative}`);
                }
                
                const standard = {
                  benchmarkCode: benchmarkCode,
                  benchmarkDesc: benchmarkDesc,
                  formative: hasFormative,
                  summative: hasSummative,
                  anchorStrand: anchorStrand
                };
                
                // Include ALL standards, group by assessment type
                if (hasFormative && hasSummative) {
                  assessmentGroups.both.push(standard);
                  totalCoveredStandards++;
                } else if (hasFormative) {
                  assessmentGroups.formativeOnly.push(standard);
                  totalCoveredStandards++;
                } else if (hasSummative) {
                  assessmentGroups.summativeOnly.push(standard);
                  totalCoveredStandards++;
                } else {
                  // Standards without any X marks go into notCovered group
                  assessmentGroups.notCovered.push(standard);
                }
                
                totalStandards++;
              }
            });
            
            console.log(`[getAllStandardsData] Unit ${unitInfo.name} summary: ${totalStandards} total standards, ${totalCoveredStandards} covered, ${assessmentGroups.notCovered.length} not covered`);
            
            unitData[unitInfo.name] = {
              assessmentGroups: assessmentGroups,
              sheetExists: true,
              standardsCount: totalCoveredStandards,
              totalStandards: totalStandards,
              notCoveredCount: assessmentGroups.notCovered.length
            };
          } else {
            console.log(`[getAllStandardsData] Sheet ${unitInfo.name} exists but has no data rows`);
            unitData[unitInfo.name] = {
              assessmentGroups: { formativeOnly: [], summativeOnly: [], both: [] },
              sheetExists: true,
              standardsCount: 0
            };
          }
        } else {
          console.log(`[getAllStandardsData] Sheet not found: ${unitInfo.sheet}`);
          unitData[unitInfo.name] = {
            assessmentGroups: { formativeOnly: [], summativeOnly: [], both: [] },
            sheetExists: false,
            standardsCount: 0,
            error: 'Sheet not found'
          };
        }
      } catch (unitError) {
        console.log(`[getAllStandardsData] Error processing unit ${unitInfo.name}: ${unitError.toString()}`);
        unitData[unitInfo.name] = {
          assessmentGroups: { formativeOnly: [], summativeOnly: [], both: [] },
          sheetExists: false,
          standardsCount: 0,
          error: unitError.toString()
        };
      }
    });
    
    console.log('[getAllStandardsData] === PROCESSING COMPLETE ===');
    console.log(`[getAllStandardsData] Units processed: ${Object.keys(unitData).length}`);
    
    // Log summary for each unit
    Object.entries(unitData).forEach(([unitName, data]) => {
      if (data.error) {
        console.log(`[getAllStandardsData] ${unitName}: ERROR - ${data.error}`);
      } else {
        console.log(`[getAllStandardsData] ${unitName}: ${data.totalStandards || 0} total, ${data.standardsCount || 0} covered`);
      }
    });

    const result = {
      success: true,
      teacherName: teacherInfo ? teacherInfo.name : "Testing User",
      unitData: unitData,
      masterStandards: MASTER_STANDARDS_LIST
    };
    
    console.log('[getAllStandardsData] === RETURNING SUCCESS RESPONSE ===');
    return result;
  } catch (e) {
    console.error('[getAllStandardsData] === FATAL ERROR ===');
    console.error(`[getAllStandardsData] Error type: ${e.name}`);
    console.error(`[getAllStandardsData] Error message: ${e.message}`);
    console.error(`[getAllStandardsData] Error stack: ${e.stack}`);
    
    const errorResponse = { success: false, error: e.toString() };
    console.log('[getAllStandardsData] === RETURNING ERROR RESPONSE ===');
    return errorResponse;
  }
}


// DIAGNOSTIC FUNCTION: Test spreadsheet access and sheet structure
function testStandardsAccess() {
  try {
    console.log('[testStandardsAccess] === DIAGNOSTIC TEST STARTING ===');
    
    // Test 1: User Authentication
    const userEmail = Session.getActiveUser().getEmail();
    console.log(`[testStandardsAccess] Current user: ${userEmail}`);
    
    // Test 2: Spreadsheet Access
    console.log(`[testStandardsAccess] Testing spreadsheet access: ${SPREADSHEET_ID}`);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('[testStandardsAccess] ✅ Spreadsheet opened successfully');
    
    // Test 3: List all sheets in the spreadsheet
    const sheets = ss.getSheets();
    console.log(`[testStandardsAccess] Found ${sheets.length} sheets total:`);
    sheets.forEach((sheet, index) => {
      console.log(`[testStandardsAccess]   ${index + 1}. "${sheet.getName()}"`);
    });
    
    // Test 4: Check each expected standards sheet
    const results = {
      userEmail: userEmail,
      spreadsheetId: SPREADSHEET_ID,
      totalSheets: sheets.length,
      allSheetNames: sheets.map(s => s.getName()),
      standardsSheetTests: {}
    };
    
    ALL_STANDARDS_SHEETS.forEach(unitInfo => {
      console.log(`[testStandardsAccess] Testing ${unitInfo.name} -> "${unitInfo.sheet}"`);
      
      const testResult = {
        unitName: unitInfo.name,
        expectedSheetName: unitInfo.sheet,
        sheetExists: false,
        rowCount: 0,
        columnCount: 0,
        hasData: false,
        error: null
      };
      
      try {
        const sheet = ss.getSheetByName(unitInfo.sheet);
        if (sheet) {
          testResult.sheetExists = true;
          const data = sheet.getDataRange().getValues();
          testResult.rowCount = data.length;
          testResult.columnCount = data.length > 0 ? data[0].length : 0;
          testResult.hasData = data.length > 1;
          
          console.log(`[testStandardsAccess]   ✅ Sheet exists: ${testResult.rowCount} rows, ${testResult.columnCount} columns`);
          
          if (testResult.hasData) {
            // Test the header structure
            const headers = data[0];
            console.log(`[testStandardsAccess]   Headers: [${headers.join(', ')}]`);
            
            // Check for expected columns
            testResult.hasAnchorColumn = testResult.columnCount > 2;
            testResult.hasBenchmarkColumn = testResult.columnCount > 3;
            testResult.hasFormativeColumn = testResult.columnCount > 5;
            testResult.hasSummativeColumn = testResult.columnCount > 6;
            
            console.log(`[testStandardsAccess]   Column check - Anchor: ${testResult.hasAnchorColumn}, Benchmark: ${testResult.hasBenchmarkColumn}, Formative: ${testResult.hasFormativeColumn}, Summative: ${testResult.hasSummativeColumn}`);
            
            // Count standards with coverage
            let coveredCount = 0;
            data.slice(1).forEach(row => {
              if (row[3] && row[3].toString().trim()) { // Has benchmark code
                const formative = row[5] ? row[5].toString().toLowerCase() : '';
                const summative = row[6] ? row[6].toString().toLowerCase() : '';
                if (formative === 'x' || summative === 'x') {
                  coveredCount++;
                }
              }
            });
            
            testResult.standardsWithCoverage = coveredCount;
            console.log(`[testStandardsAccess]   Standards with "X" coverage: ${coveredCount}`);
          } else {
            console.log(`[testStandardsAccess]   ⚠️ Sheet exists but has no data rows`);
          }
          
        } else {
          console.log(`[testStandardsAccess]   ❌ Sheet not found: "${unitInfo.sheet}"`);
        }
        
      } catch (error) {
        testResult.error = error.toString();
        console.log(`[testStandardsAccess]   ❌ Error accessing sheet: ${error.toString()}`);
      }
      
      results.standardsSheetTests[unitInfo.name] = testResult;
    });
    
    console.log('[testStandardsAccess] === DIAGNOSTIC TEST COMPLETE ===');
    return {
      success: true,
      diagnostics: results
    };
    
  } catch (e) {
    console.error('[testStandardsAccess] === DIAGNOSTIC TEST FAILED ===');
    console.error(`[testStandardsAccess] Error: ${e.toString()}`);
    return {
      success: false,
      error: e.toString(),
      diagnostics: null
    };
  }
}

