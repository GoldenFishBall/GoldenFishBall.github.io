/*
 * Created by BN
 */

var lastRow = document.getElementById("last-row").cloneNode(true);

function addNewRow(id) {
  var table = document.getElementById(id);

  var rowCount = table.rows.length;
  
  if (rowCount > 15) return false;
  
  var row = table.insertRow(rowCount - 1);

  var cellCount = table.rows[1].cells.length;
  var cell = [];
  var c;
  
  for (c = 0; c < cellCount; c++) {
    cell[c] = row.insertCell(c);
    cell[c].innerHTML = table.rows[1].cells[c].innerHTML;
    if (c > 1 && c < cellCount - 1) cell[c].classList.add("middle");
  }
  cell[1].classList.add("leftmost");
  cell[cellCount - 1].classList.add("rightmost");
  
  document.getElementById("base-combo").innerHTML = table.rows.length - 2;
  
  if (table.rows.length === 16) {
    document.getElementById("last-row").style.display = "none";
    for (c = 1; c < cellCount; c++) {
      table.rows[14].cells[c].style.borderBottom = "2px solid black";
    }
  }
  
  return true;
}

function removeThisRow(id, r) {
  var table = document.getElementById(id);

  var rowCount = table.rows.length;

  if (rowCount < 4) return false;
  
  table.deleteRow(r.rowIndex);
  document.getElementById("base-combo").innerHTML = table.rows.length - 2;
  
  if (table.rows.length === 15) {
    var cellCount = table.rows[1].cells.length;
    document.getElementById("last-row").style.display = "";
    for (var c = 1; c < cellCount; c++) {
      table.rows[13].cells[c].style.borderBottom = "";
    }
  }
  
  return true;
}
