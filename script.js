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

    const getGameBoard = () => board;

    const placeSymbol = (valueX, valueY, playerValue) => {
        console.log(board[valueX][valueY],valueX,valueY);
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

function Players (playerName = "Default Name", playerToken) {
    const nameOfPlayer = playerName;
    const token = playerToken;

    const getName = () => nameOfPlayer;
    const getToken = () => token;

    // const switchActivePlayer = () => {
    //     activePlayer = activePlayer === playerArray[0] ? playerArray[1] : playerArray[0];
    // }

    // const getActivePlayer = () => activePlayer;

    return {getName, getToken};
}

// This section is responsible for controlling the flow and state of the game's turns, as well as to determine the winner
function gameController() {
    const player1 = Players("Player 1", "X");
    const player2 = Players("Player 2", "O");

    let activePlayer = Math.floor(Math.random()*2)?player1:player2;

    const switchPlayer = () => {
        activePlayer = activePlayer == player1?player2:player1;
    }

    const roundStatus = () => {
        let winner = 0;
        const currentBoard = gameBoardVariable.getGameBoard();
        let k = 0;
        for (let i=0; i<currentBoard.length; i++){
            if ((currentBoard[i][0]==currentBoard[i][1]==currentBoard[i][2])&&currentBoard[i][0]!=0) {
                winner = currentBoard[i][0]==player1.getToken()?player1:player2;
                k = 1;
                break;
            }
            else if ((currentBoard[0][i]==currentBoard[1][i]==currentBoard[0][i])&&currentBoard[0][i]!=0) {
                winner = currentBoard[0][i]==player1.getToken()?player1:player2;
                k = 1;
                break;
            }
        }
        if (k==1) {
            console.log(`The winner is ${winner.getName()}`);
        }
        // To check the diagonal cases
        else if ((currentBoard[0][0]==currentBoard[1][1]==currentBoard[2][2])&&currentBoard[1][1]!=0) {
            k = 1;
            winner = currentBoard[1][1]==player1.getToken()?player1:player2;
        }
        else if ((currentBoard[0][2]==currentBoard[1][1]==currentBoard[2][0])&&currentBoard[1][1]!=0) {
            k = 1;
            winner = currentBoard[0][i]==player1.getToken()?player1:player2;
        }
        // To check for a tie
        let tieGame = 0;
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                if (currentBoard[i][j]==0) {
                    console.log("Game still in progress");
                    tieGame = 1;
                    break;
                }
            }
            if (tieGame==1) break;
        }
        if (tieGame==0) winner="The game is a tie!!!";
    };

    const getWinnerStatus = () => winner;

    const getActivePlayer = () => activePlayer;

    return {roundStatus, getWinnerStatus, switchPlayer, getActivePlayer};
}

function displayController() {
    const currentBoard = gameBoardVariable.getGameBoard();
    const gameControllerObject = gameController();

    const boardContainer = document.querySelector(".board");
    const displayGameBoard = () => {
        let x=0, y;
        for (let row of currentBoard) {
            const createRowElement = document.createElement('div');
            y = 0;
            for (let col of row ) {
                // console.log(col);
                let createSingleELement = document.createElement('div');
                createSingleELement.classList=(`${x}${y}`);
                if (col.getValue()==0) createSingleELement.textContent = "nil";
                else createSingleELement.textContent = col.getValue();
                createRowElement.appendChild(createSingleELement);
                y++;
            }
            boardContainer.appendChild(createRowElement);
            x++;
        }
    }

    const validCells = () => {
        const validNode = document.querySelectorAll('.board > div > div');
        validNode.forEach((node) => {
            if (node.textContent=='nil') {
                console.log(gameControllerObject.getActivePlayer().getToken());
                node.addEventListener("click", () => {gameBoardVariable.placeSymbol(Number(node.className[0]),Number(node.className[1]),gameControllerObject.getActivePlayer().getToken()); gameControllerObject.switchPlayer(); console.log(gameControllerObject.getActivePlayer().getToken())});
            }
        })

    }

    return {displayGameBoard, validCells}
}

const displayControllerVariable = displayController();
displayControllerVariable.displayGameBoard();

const displayControllerObject = displayController();
displayControllerObject.validCells();

// Prevent default
const formSubmitButton = document.querySelector(".submitForm").addEventListener("click", (event) => event.preventDefault());