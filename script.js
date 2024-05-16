function createGameboard() {
    let gameboard = {
        //variables
        gameboardArray: ["", "", "", "", "", "", "", "", ""],
        winningCombinations: [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ],
        currentPlayer: null, 
        p1: null,
        p2: null,

        //methods
        addMove: function(currentPlayerHolder, player, location, move) {
            if (this.checkMoveFeasibility(location)) {
                this.gameboardArray[location] = move + ": player" + player;
            }
            else { 
                console.log("Please try again. That spot is taken.")
            }
        },

        checkMoveFeasibility: function(num) {
            if (this.gameboardArray[num] === "") {
                return true; 
            } else {
                return false;
            }
        },

        checkWinCondition: function() {
            for (let combo of this.winningCombinations) {
                if(this.gameboardArray[combo[0]] !== "" 
                && this.gameboardArray[combo[0]] === this.gameboardArray[combo[1]] 
                && this.gameboardArray[combo[1]] === this.gameboardArray[combo[2]]) {
                    return true; 
                }
            }
            return false;
        },


        startGame: function(p1, p2) {
            this.p1 = p1; 
            this.p2 = p2; 
            this.currentPlayer = this.p1; //p1 is the player Object
            this.displayBoard(); 
            },

        endGame: function() {
            document.body.removeChild(visualBoard);
            this.gameboardArray = ["", "", "", "", "", "", "", "", ""]
            alert(this.currentPlayer.name + " is the winner!")
            this.startGame(this.p1, this.p2);
        },

        resetGame: function() {
            document.body.removeChild(visualBoard);
            this.gameboardArray = ["", "", "", "", "", "", "", "", ""];
            this.startGame(this.p1, this.p2);
        },
        
        processMove: function(num) {
            this.addMove(this.currentPlayer, this.currentPlayer.whichPlayer, num, this.currentPlayer.shape);
            this.updateBoard(num, this.currentPlayer.shape);

            if (this.checkWinCondition()) {
                this.endGame();
            } else {
                this.switchPlayers();
            }
        },

        switchPlayers: function() {
            if (this.currentPlayer === this.p1) {
                this.currentPlayer = this.p2; 
            }
            else {
                this.currentPlayer = this.p1;
            }
        },

        updateBoard: function(num, shape) {
            let box = document.querySelector("#box" + num);

            if (shape === "cross") {
                box.textContent = "X";
            } else if (shape === "circle") {
                box.textContent = "O";
            }
        },
    
        displayBoard: function() {
            const visualBoard = document.createElement("div"); 
            visualBoard.id = "visualBoard";
            let boxes = [];

            for (let i = 0; i < 9; i++) {
                boxes[i] = document.createElement("div");
                boxes[i].id = "box" + i;
                boxes[i].classList.add("box");

                boxes[i].addEventListener("click", () => {
                    this.processMove(i);
                });

                visualBoard.appendChild(boxes[i]); 
                document.body.appendChild(visualBoard);              
            }
        }
    }

    return gameboard; 

}

function createPlayer(name, whichPlayer) {
    let player = {
        whichPlayer: whichPlayer, 
        name: name, 
        shape: "cross",
        }

    if (player.whichPlayer === 2) {
        player.shape = "circle"; 
    }

    return player; 

}

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
    game.resetGame();
});

let p1 = createPlayer ("Player 1", 1);
let p2 = createPlayer ("Player 2", 2);
let game = createGameboard();
game.startGame(p1, p2);



//add eventListener to boxes

//playGame triggers -> boxes are displayed with eventListener
//eventListener triggers addMove when clicked - don't need move() anymore?
//r1: box A is now filled (i.e. the array)
//how to switch players? while loop () => {switch?}
 //r2: box B is now filled

//how to tell when the game is finished? (if winCondition == true

//playGame makes changes
//playGame makes changes