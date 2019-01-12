/*
 * Created by BN
 */
function Pet(atk, mainAtt, subAtt, twoAtk, combo7, combo10, piercer, supBonusAtk, lAtk, boost) {
  this.atk = atk;
  this.mainAtt = mainAtt;
  this.subAtt = subAtt;
  this.twoAtk = twoAtk;
  this.combo7 = combo7;
  this.combo10 = combo10;
  this.piercer = piercer;
  this.supBonusAtk = supBonusAtk;
  this.lAtk = lAtk;
  this.boost = boost;
  this.mainAtk = 0;
  this.subAtk = 0;
}

//(subAtt === "none") ? 0 : (mainAtt === subAtt) ? atk / 10 : atk / 3;

function Combo(orbAtt, orbCount, plusCount, shape) {
  this.orbAtt = orbAtt;
  this.orbCount = orbCount;
  this.plusCount = plusCount;
  this.shape = shape;
}

var a = [];
var error = ["寵物", "覺醒"];

function calc() {
  document.getElementById("total-combo").value = Number(document.getElementById("base-combo").innerHTML) + Number(document.getElementById("bonus-combo").innerHTML);
  
  var i, j, k;
  
  var enOrbs = [], enAtts = [];
  for (k = 1; k <= 5; k++) {
    enOrbs[k] = Number(document.getElementById(k + "_enOrb").value);
    if (isNaN(enOrbs[k]) || enOrbs[k] < 0) enOrbs[k] = 0;
    enAtts[k] = Number(document.getElementById(k + "_enAtt").value);
    if (isNaN(enAtts[k]) || enAtts[k] < 0) enAtts[k] = 0;
  }
  
  var line = [];
  for (k = 1; k <= 5; k++) {
    line[k] = 0;
  }
  
  var combos = [];
  var orbAtts = document.getElementsByClassName("orbAtt");
  var orbCounts = document.getElementsByClassName("orbCount");
  var plusCounts = document.getElementsByClassName("plusCount");
  var shapes = document.getElementsByClassName("shape");
  for (j = 0; j < orbAtts.length; j++) {
    var orbAtt = Number(orbAtts[j].value);
    var orbCount = Number(orbCounts[j].value);
    if (isNaN(orbCount) || orbCount < 3) orbCount = 3;
    var plusCount = Number(plusCounts[j].value);
    if (isNaN(plusCount) || plusCount < 0) plusCount = 0;
    plusCount = Math.min(orbCount, plusCount);
    var shape = shapes[j].value;
    if (orbCount !== 5 && shape === "L") shape = "normal";
    if ((orbCount !== 5 || orbCount !== 6 || orbCount !== 7) && shape === "line") shape = "normal";
    if (orbCount !== 9 && shape === "square") shape = "normal";
    if (shape === "line") line[orbAtt]++;
    combos[j] = new Combo(orbAtt, orbCount, plusCount, shape);
  }
  
  var pets = [];
  for (i = 0; i < 6; i++) {
    var atk = Number(document.getElementById(i + "_atk").value);
    if (isNaN(atk) || atk < 0) atk = 0;
    var mainAtt = Number(document.getElementById(i + "_mainAtt").value);
    var subAtt = Number(document.getElementById(i + "_subAtt").value);
    var twoAtk = Number(document.getElementById(i + "_twoAtk").value);
    var combo7 = Number(document.getElementById(i + "_combo7").value);
    var combo10 = Number(document.getElementById(i + "_combo10").value);
    var piercer = Number(document.getElementById(i + "_piercer").value);
    var supBonusAtk = Number(document.getElementById(i + "_supBonusAtk").value);
    var lAtk = Number(document.getElementById(i + "_lAtk").value);
    var boost = Number(document.getElementById(i + "_boost").value);
    pets[i] = new Pet(atk, mainAtt, subAtt, twoAtk, combo7, combo10, piercer, supBonusAtk, lAtk, boost);
    var damage;
    var sub = (subAtt === "0") ? 0 : (mainAtt === subAtt) ? atk / 10 : atk / 3;;
    for (j = 0; j < combos.length; j++) {
      if (combos[j].orbAtt === "0" || combos[j].orbAtt === "6") continue;
      if (combos[j].orbAtt === mainAtt) {
        damage = atk * (1 + (combos[j].orbCount - 3) * 0.25) * (1 + combos[j].plusCount * 0.06) * (1 + enOrbs[mainAtt] * 0.05);
        if (combos[j].orbCount === 4) damage *= Math.pow(1.5, twoAtk);
        else if (combos[j].shape === "L") damage *= Math.pow(1.5, lAtk);
        else if (combos[j].shape === "square") damage *= Math.pow(2.5, piercer);
        pets[i].mainAtk += damage;
      }
      if (combos[j].orbAtt === subAtt) {
        damage = sub * (1 + (combos[j].orbCount - 3) * 0.25) * (1 + combos[j].plusCount * 0.06) * (1 + enOrbs[subAtt] * 0.05);
        if (combos[j].orbCount === 4) damage *= Math.pow(1.5, twoAtk);
        else if (combos[j].shape === "L") damage *= Math.pow(1.5, lAtk);
        else if (combos[j].shape === "square") damage *= Math.pow(2.5, piercer);
        pets[i].subAtk += damage;
      }
    }
    
    var team_multiplier = Number(document.getElementById("team_multiplier").value);
    if (isNaN(team_multiplier) || team_multiplier < 0.5) team_multiplier = 1;
    var bonusCombo = Number(document.getElementById("bonus-combo").value);
    if (isNaN(bonusCombo) || bonusCombo < 0) bonusCombo = 0;
    var totalCombo = Number(document.getElementById("base-combo").innerHTML) + bonusCombo;
    document.getElementById("total-combo").value = totalCombo;
    pets[i].mainAtk *= boost * (1 + (totalCombo - 1) * 0.25) * team_multiplier * (1 + 0.1 * enAtts[mainAtt] * line[mainAtt]);
    pets[i].subAtk *= boost * (1 + (totalCombo - 1) * 0.25) * team_multiplier * (1 + 0.1 * enAtts[subAtt] * line[subAtt]);;
    document.getElementById(i + "_mainAtk").innerHTML = pets[i].mainAtk.toFixed(0);
    document.getElementById(i + "_subAtk").innerHTML = pets[i].subAtk.toFixed(0);
  }
}

function validate() {
  for (var i = 1; i <= 6; i++) {
    var id = i + "_atk";
    var value = Number(document.getElementById(id).value);
    if (!Number.isInteger(value) || value < 0) {
      alert("1" + i);
      return false;
    }
  }
  for (var i = 1; i <= 6; i++) {
    var id = i + "_mainAtt";
    var value = document.getElementById(id).value;
    var mainAtt = ["fire", "water", "wood", "light", "dark"];
    if (mainAtt.indexOf(value) === -1) {
      alert("2" + i);
      return false;
    }

  }
  for (var i = 1; i <= 6; i++) {
    var id = i + "_subAtt";
    var value = document.getElementById(id).value;
    var subAtt = ["fire", "water", "wood", "light", "dark", "none"];
    if (subAtt.indexOf(value) === -1) {
      alert("3" + i);
      return false;
    }

  }
  return true;
}

function errMsg(type) {

}

function getValues() {
  var i;
}

/*
 * try {
      atk = Number(document.getElementById(i + "_atk").value);
      if (!Number.isInteger(atk) || atk < 0)
        throw "的功擊力必須是整數且不少於零";
      mainAtt = document.getElementById(i + "_mainAtt").value;
      subAtt = document.getElementById(i + "_subAtt").value;
    } catch (err) {
      var name;
      switch (i - 1) {
        case 0:
          name = "隊長";
          break;
        case 1:
        case 2:
        case 3:
        case 4:
          name = "隊員" + (i - 1);
          break;
        case 5:
          name = "戰友";
          break;
      }
      alert(name + err);
      return;
    }
 */