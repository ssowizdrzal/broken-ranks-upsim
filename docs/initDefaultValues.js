// CONFIG DATA
const maxUpgradeConsidered = 10;
const minDurability = 30;
const maxDurability = 50;

let levels = [];
for (let i = 0; i < maxUpgradeConsidered; i++) {
    levels[i]=`+${i+1}`;
}

let durabilities = [];
for (let i = minDurability; i <= maxDurability; i++) {
    durabilities[i]=i;
}

// CONSTATNT DATA
let ranks = [];
ranks[0]= "I";
ranks[1]= "II";
ranks[2]= "III";
ranks[3]= "IV";
ranks[4]= "V";
ranks[5]= "VI";
ranks[6]= "VII";
ranks[7]= "VIII";
ranks[8]= "IX";
ranks[9]= "X";
ranks[10]= "XI";
ranks[11]= "XII";

let rankInhibPlat = [];
rankInhibPlat[0]= 3;
rankInhibPlat[1]= 4;
rankInhibPlat[2]= 4;
rankInhibPlat[3]= 5;
rankInhibPlat[4]= 6;
rankInhibPlat[5]= 6;
rankInhibPlat[6]= 7;
rankInhibPlat[7]= 8;
rankInhibPlat[8]= 8;
rankInhibPlat[9]= 10;
rankInhibPlat[10]= 12;
rankInhibPlat[11]= 12;

let rankUpgradePrice = [];
rankUpgradePrice[0]= 1000;
rankUpgradePrice[1]= 1500;
rankUpgradePrice[2]= 2500;
rankUpgradePrice[3]= 10000;
rankUpgradePrice[4]= 15000;
rankUpgradePrice[5]= 25000;
rankUpgradePrice[6]= 35000;
rankUpgradePrice[7]= 50000;
rankUpgradePrice[8]= 65000;
rankUpgradePrice[9]= 100000;
rankUpgradePrice[10]= 200000;
rankUpgradePrice[11]= 300000;

let levelUpgradeProbabilityWithoutEss = [];
levelUpgradeProbabilityWithoutEss[0]= 95/100;
levelUpgradeProbabilityWithoutEss[1]= 85/100;
levelUpgradeProbabilityWithoutEss[2]= 75/100;
levelUpgradeProbabilityWithoutEss[3]= 65/100;
levelUpgradeProbabilityWithoutEss[4]= 50/100;
levelUpgradeProbabilityWithoutEss[5]= 40/100;
levelUpgradeProbabilityWithoutEss[6]= 30/100;
levelUpgradeProbabilityWithoutEss[7]= 20/100;
levelUpgradeProbabilityWithoutEss[8]= 10/100;

let levelUpgradeProbabilityWithEss = [];
levelUpgradeProbabilityWithEss[0]= 97/100;
levelUpgradeProbabilityWithEss[1]= 95/100;
levelUpgradeProbabilityWithEss[2]= 85/100;
levelUpgradeProbabilityWithEss[3]= 75/100;
levelUpgradeProbabilityWithEss[4]= 60/100;
levelUpgradeProbabilityWithEss[5]= 50/100;
levelUpgradeProbabilityWithEss[6]= 40/100;
levelUpgradeProbabilityWithEss[7]= 30/100;
levelUpgradeProbabilityWithEss[8]= 20/100;

// EXAMPLE DATA
let platPrice = 6400;
let essPrice = 20000;
let flaskPrice = 20000;
let durability = 50/100;
let probToDoubleUpgrade = 2/100;
let safety = 1000;

// FILL INPUTS
function fillData(pre, post, array) {
    for(let ii = 0; ii< array.length; ii++){
        document.getElementById(`${pre}${ii+1}${post}`).value = array[ii];
    }
}

fillData(`Rank-`,`-inhib-price`,rankInhibPlat);
fillData(`Rank-`,`-upgrade-cost`,rankUpgradePrice);
fillData(`Level-`,`-upgrade-prob-woess`,levelUpgradeProbabilityWithoutEss);
fillData(`Level-`,`-upgrade-prob-wess`,levelUpgradeProbabilityWithEss);

document.getElementById("safety").value = safety;
document.getElementById("durability").value = durability;
document.getElementById("plat-price").value = platPrice;
document.getElementById("flask-price").value = flaskPrice;
document.getElementById("ess-price").value = essPrice;

// FUNCTIONS

function readData(pre, post, array) {
    for(let ii = 0; ii< array.length; ii++){
        array[ii] = document.getElementById(`${pre}${ii+1}${post}`).value;
    }
}

function readAllData(){
    readData(`Rank-`,`-inhib-price`,rankInhibPlat);
    readData(`Rank-`,`-upgrade-cost`,rankUpgradePrice);
    readData(`Level-`,`-upgrade-prob-woess`,levelUpgradeProbabilityWithoutEss);
    readData(`Level-`,`-upgrade-prob-wess`,levelUpgradeProbabilityWithEss);
    
    safety = document.getElementById("safety").value;
    durability = document.getElementById("durability").value;
    platPrice = document.getElementById("plat-price").value;
    flaskPrice = document.getElementById("flask-price").value;
    essPrice = document.getElementById("ess-price").value;
}

function determineUpgrade(level, essenceFlag) {

    level = (level>=levelUpgradeProbabilityWithEss.length) ? levelUpgradeProbabilityWithEss.length-1 : level;

    if(essenceFlag) {
        if (Math.random()>levelUpgradeProbabilityWithEss[level]) return false
    }
    else {
        if (Math.random()>levelUpgradeProbabilityWithoutEss[level]) return false
    }
    return true
}

function determineDegrade(durability) {
    let rand = Math.random()
    let result = false
    if (rand>durability){
        result = true
    } 
    return result
}

function createTable2D(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }

function createTable1DUgly(tableData) {
    let table = document.createElement('table');
    table.insertRow();
    for (let cell of tableData) {
        let newCell = table.rows[table.rows.length - 1].insertCell();
        newCell.textContent = cell;
    }
    document.body.appendChild(table);
  }

function runCalc() {
    // TODO - dodac petle wiecej z obsluga uzywania eski
    readAllData();
    let summaryArray = new Array(maxDurability-minDurability+1)
    let triesTable = new Array(maxUpgradeConsidered).fill(0)
    let sumOfTries = new Array(maxUpgradeConsidered).fill(0)
    let numbOfTries = new Array(maxUpgradeConsidered).fill(0)
    let totalTries = 0

    for (let i = minDurability; i <= maxDurability; i++) {
        let totalMaxUpgradesReached = 0;
        let level = 0;
        while(totalMaxUpgradesReached<=safety){
            //if(level==9) console.log(numbOfTries);
            totalTries++;
            for(let y=level; y < triesTable.length ; y++){
                triesTable[y]++;
            }

            if (level>=maxUpgradeConsidered){
                level = 0;
                for(let z=0; z < triesTable.length ; z++){
                    triesTable[z]=0;
                }
                totalMaxUpgradesReached++;
            } 

            if(determineUpgrade(level,false)){
                level++;  
                sumOfTries[level-1] = sumOfTries[level-1] + triesTable[level-1]
                triesTable[level-1] = 0;
                numbOfTries[level-1]++;
            }
            else{
                if(determineDegrade(i/100)){
                    level = 0;
                }
            }
        }

        let summaryArrayInside = []
        for(let b=0; b < sumOfTries.length ; b++){
            summaryArrayInside[b]= (sumOfTries[b]/numbOfTries[b]).toFixed(3);
        }
        summaryArray[i-minDurability]=summaryArrayInside;

    }
    createTable2D(summaryArray);
    document.getElementById("run-button").innerHTML = `RUN (LAST TIME USED ${totalTries} TOTAL TRIES)`;
}
