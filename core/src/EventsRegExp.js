var onEvents = ["beforeopen", "open", "close", "valuechanged", "validation", "click", "checkedchanged", "itemclick",
  "itemdblclick", "beforeload", "preload", "loaderror", "load", "datechanged", "timechanged", "dateclick", "drawdate",
  "buttonclick", "enter", "keydown", "keyup", "focus", "blur", "closeclick", "beforeshowpopup", "showpopup", "hidepopup",
  "nodeclick", "beforenodecheck", "beforenodeselect", "fileselect", "uploadsuccess", "uploaderror", "uploadcomplete",
  "columnschanged", "rowclick", "rowdblclick", "rowmousedown", "cellclick", "cellmousedown", "headercellclick",
  "headercellmousedown", "headercellcontextmenu", "update", "drawcell", "cellbeginedit", "cellcommitedit", "cellendedit",
  "selectionchanged", "beforeselect", "beforedeselect", "select", "deselect", "cellvalidation", "drawsummarycell",
  "resize", "drawnode", "nodedblclick", "nodemousedown", "dragstart", "nodeselect", "loadnode", "nodecheck", "beforeexpand",
  "expand", "beforecollapse", "collapse", "drop", "givefeedback", "beforebuttonclick", "pagechanged", "activechanged",
  "itemselect", "beforenodeexpand", "nodeexpand", "beforenodecollapse", "nodecollapse", "beforeactivechanged",
  "beforecloseclick", "tabload", "tabdestroy", "mouseover", "mouseout", "showrowdetail"];
onEvents = onEvents.map((event) => {
  return "on" + event;
})
var fieldEvents = ["renderer", "summaryRenderer", "ajaxData", "data"];
var events = onEvents.concat(fieldEvents);
var regExp = new RegExp("\\s(" + events.join("|") + ")=\\\\?[\"']?(.*?)(\\(\\))?\\\\?[\"']?(?=(\\s|\\/>|>))", "gi");
module.exports = regExp;