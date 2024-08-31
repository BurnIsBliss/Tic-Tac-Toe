const gameBoardVariable = (function gameBoard () {
    let rows, columns;
    rows = columns = 3;

    let board = []

    // initializing the board
    for (let i=0; i<rows; i++) {
        let boardColumns = [];
        for (let j=0; j<columns; j++) {
            boardColumns.push(Cell());
        }
        board.push(boardColumns);
    }

    const getGameBoard = () => {
        // console.log(board);
        // console.log(board[0][1].getValue());
    }

    const placeSymbol = (valueX, valueY, playerValue) => {
        if (board[valueX][valueY].getValue() == 0) {
            board[valueX][valueY].placeValue(playerValue);
        }
        else {
            console.log('Cell not available!');
        }
    }

    const displayGameBoard = () => {
        // Display the board after each token placement
    }

    return {getGameBoard, displayGameBoard, placeSymbol}
})();

// Function to populate the individual cells
function Cell() {
    let value = 0;

    // Accept a players token to change the value of a particular cell
    const placeValue = (player) => {
        value = player;
    }

    // Taking advantage of the 'closure' property to get the value of the cell
    const getValue = () => value;

    return {placeValue, getValue};
}

function Players (playerOneName = "Player 1", playerTwoName = "Player 2") {
    const playerArray = [{name: playerOneName, token: 'X'}, {name: playerTwoName, token: 'O'}];
    let activePlayer;

    const getName = (player) => player.name;
    const getToken = (player) => player.token;

    const randomFirstPlayer = () => {
        activePlayer = playerArray[Math.floor(Math.random()*playerArray.length)];
    }

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerArray[0] ? playerArray[1] : playerArray[0];
    }

    const getActivePlayer = () => activePlayer;

    return {getName, getToken, switchActivePlayer, getActivePlayer, randomFirstPlayer};
}

// This section is responsible for controlling the flow and state of the game's turns, as well as to determine the winner
function gameController() {
    const playerInstances = Players();



}


gameBoardVariable.displayGameBoard();