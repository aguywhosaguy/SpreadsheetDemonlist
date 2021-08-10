function onOpen(){

  var ui = SpreadsheetApp.getUi();

  var menu = ui.createMenu("Manage List");

  menu.addItem("Add Level", "newLevel");
  menu.addItem("Move Level","moveLevel");

  var submenu = ui.createMenu("Edit Level");
  submenu.addItem("Edit Level Name", "editName");
  submenu.addItem("Edit Level Verifier", "editVerifier");
  submenu.addItem("Edit Level Creator", "editCreator");
  submenu.addItem("Edit Level ID", "editID");
  submenu.addItem("Add Publisher", "addPublisher");
  submenu.addItem("Additional creators", "addCreators");
  menu.addSubMenu(submenu)

  menu.addItem("Remove Level", "removeLevel");
  menu.addItem("Refresh Colors", "setColors");


  menu.addToUi();

}

const getList = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("List")
const getListLogs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("List Logs")

function newLevel(){ 

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var lvl = ui.prompt("Name of level")
  var vfr = ui.prompt("Enter verifier")
  var ctr = ui.prompt("Enter creator (You can add additional creators and publisher later)")
  var i = ui.prompt("Enter ID")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var level = lvl.getResponseText();
  var verifier = vfr.getResponseText();
  var creator = ctr.getResponseText();
  var id = i.getResponseText();
  var person = ps.getResponseText()


  getList.getRange("a" + placement + ":f" + placement).insertCells(SpreadsheetApp.Dimension.ROWS)
  getList.getRange("a" + placement).setValue(level);
  getList.getRange("b" + placement).setValue(verifier);
  getList.getRange("c" + placement).setValue(creator);
  getList.getRange("d" + placement).setValue(id);

  setColors()

  var levelinfo = "Placed at " + placement + ". Name: " + level + " Verifier: " + verifier + " Creator: " + creator + " ID: " + id
  logAction("Level added", person, levelinfo)
}

function editName(){

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var lvl = ui.prompt("Enter new name")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var level = lvl.getResponseText();
  var person = ps.getResponseText()


  getList.getRange("a" + placement).setValue(level);

  var action = level + " added to " + placement
  logAction("Name edited", person, action)
}

function editVerifier(){

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var vfr = ui.prompt("Enter new verifier")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var verifier = vfr.getResponseText();
  var person = ps.getResponseText();


  getList.getRange("b" + placement).setValue(verifier);

  var action = verifier + " added to " + placement
  logAction("Verifier edited", person, action)
}

function editCreator(){

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var ctr = ui.prompt("Enter new creator")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var creator = ctr.getResponseText();
  var person = ps.getResponseText()


  getList.getRange("c" + placement).setValue(creator);

  var action = creator + " added to " + placement
  logAction("Creator edited", person, action)
}

function editID(){

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var i = ui.prompt("Enter new ID")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var id = i.getResponseText();
  var person = ps.getResponseText()


  getList.getRange("d" + placement).setValue(id);

  var action = "ID " + id + " added to " + placement
  logAction("Id edited", person, action)
}

function addPublisher(){

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var plr = ui.prompt("Enter Publisher")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var publisher = plr.getResponseText();
  var person = ps.getResponseText()


  getList.getRange("e" + placement).setValue(publisher);

  var action = "Publisher added to " + placement
  logAction("Publisher added", person, action)
}

function removeLevel(){ 

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var person = ps.getResponseText()


  getList.getRange("a" + placement + ":f" + placement).deleteCells(SpreadsheetApp.Dimension.ROWS)
  
  setColors()

  logAction("Level Removed", person, placement)
}

function addCreators(){

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var nt = ui.prompt("Enter additional creators, set blank to remove creators")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var note = nt.getResponseText();
  var person = ps.getResponseText()

  getList.getRange("c" + placement).setNote(note)

  var action = note + " added to " + placement
  logAction("Creator Added", person, action)
}

function moveLevel(){ 

  var ui = SpreadsheetApp.getUi();
  var pm = ui.prompt("Enter placement of level")
  var pm2 = ui.prompt("Enter new placement of level")
  var ps = ui.prompt("Enter your username")


  var placement = pm.getResponseText();
  var placement2 = pm2.getResponseText();
  var person = ps.getResponseText()

  var level = getList.getRange("a" + placement).getValues()
  var verifier = getList.getRange("b" + placement).getValues()
  var creator = getList.getRange("c" + placement).getValues()
  var id = getList.getRange("d" + placement).getValues()
  var publisher = getList.getRange("e" + placement).getValues()


  getList.getRange("a" + placement + ":f" + placement).deleteCells(SpreadsheetApp.Dimension.ROWS)
  getList.getRange("a" + placement2 + ":f" + placement2).insertCells(SpreadsheetApp.Dimension.ROWS)

  getList.getRange("a" + placement2).setValue(level);
  getList.getRange("b" + placement2).setValue(verifier);
  getList.getRange("c" + placement2).setValue(creator);
  getList.getRange("d" + placement2).setValue(id);
  getList.getRange("e" + placement2).setValue(publisher);

  setColors()

  var levels = placement + " > " + placement2
  logAction("Level Moved", person, levels)
}

function setColors(){

  getList.getRange("a1:z1").setBackgroundRGB(255, 255, 0)
  getList.getRange("a2:z2").setBackgroundRGB(192, 192, 192)
  getList.getRange("a3:z3").setBackgroundRGB(176, 141, 87)
  getList.getRange("a4:z15").setBackgroundRGB(0, 255, 0)
  getList.getRange("a16:z16").setBackgroundRGB(255, 255, 255)
}

function logAction(message, person, action){
  getListLogs.getRange("a1:d1").insertCells(SpreadsheetApp.Dimension.ROWS)
  getListLogs.getRange("a1").setValue(message)
  getListLogs.getRange("b1").setValue(person)
  getListLogs.getRange("c1").setValue(action)
  getListLogs.getRange("d1").setValue(Date())
}
