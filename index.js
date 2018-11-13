/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let flag = 0;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="zero">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function checkForWinner() {
    if(flag == 1) {
        return;
    }
    if( flag == 0 && ( (grid[0][0] == 1 && grid[0][1] == 1 && grid[0][2] == 1) ||
        (grid[1][0] == 1 && grid[1][1] == 1 && grid[1][2] == 1) ||
        (grid[2][0] == 1 && grid[2][1] == 1 && grid[2][2] == 1) ||
        (grid[0][0] == 1 && grid[1][0] == 1 && grid[2][0] == 1) ||
        (grid[0][1] == 1 && grid[1][1] == 1 && grid[2][1] == 1) ||
        (grid[0][2] == 1 && grid[1][2] == 1 && grid[2][2] == 1) ||
        (grid[0][0] == 1 && grid[1][1] == 1 && grid[2][2] == 1) ||
        (grid[0][2] == 1 && grid[1][1] == 1 && grid[2][0] == 1)) ) {
            alert("Player Wins!!!\nReload page to start again");
            document.getElementById("winner").innerHTML= "Player Wins";
            document.getElementById("winner").style.color = "green";
            document.getElementById("winner").style.visibility = "visible";
            flag = 1;
        }

    if( flag == 0 && (  (grid[0][0] == 2 && grid[0][1] == 2 && grid[0][2] == 2) ||
    (grid[1][0] == 2 && grid[1][1] == 2 && grid[1][2] == 2) ||
    (grid[2][0] == 2 && grid[2][1] == 2 && grid[2][2] == 2) ||
    (grid[0][0] == 2 && grid[1][0] == 2 && grid[2][0] == 2) ||
    (grid[0][1] == 2 && grid[1][1] == 2 && grid[2][1] == 2) ||
    (grid[0][2] == 2 && grid[1][2] == 2 && grid[2][2] == 2) ||
    (grid[0][0] == 2 && grid[1][1] == 2 && grid[2][2] == 2) ||
    (grid[0][2] == 2 && grid[1][1] == 2 && grid[2][0] == 2)) )  {
        alert("Computer Wins!!!\nReload page to start again");
        document.getElementById("winner").innerHTML= "Computer Wins";
        document.getElementById("winner").style.color = "green";
        document.getElementById("winner").style.visibility = "visible";
        flag = 1;
    }
}

function onBoxClickByPlayer() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    checkForWinner();
    addClickHandlersForComputer();
    
}
function onBoxClickByComputer() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 2;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    checkForWinner();
    addClickHandlersForPlayer();
    
}

function addClickHandlersForComputer() {
    var boxes = document.getElementsByClassName("box");
   
    for (var idx = 0; idx < boxes.length; idx++) {
            if(flag != 1) {
            boxes[idx].addEventListener('click', onBoxClickByComputer, false);
            }
    }
}

function addClickHandlersForPlayer() {
    var boxes = document.getElementsByClassName("box");
   
    for (var idx = 0; idx < boxes.length; idx++) {
        if(flag != 1) {
            boxes[idx].addEventListener('click', onBoxClickByPlayer, false);
        }
    }
}

initializeGrid();
renderMainGrid();
addClickHandlersForPlayer();