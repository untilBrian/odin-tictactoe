//Gameboard object
    //add move (check if space is taken though)
    //calculate win condition
        //perform check after each round
    //reset board
    //player.Move()?


function createGameboard() {
    let gameboard = {
        //variables
        gameboardArray: ["", "", "", "", "", "", "", "", ""],
        winningCombinations: [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ],

        //methods
        addMove: function(currentPlayerHolder, player, location, move) {
            if (this.checkMoveFeasibility(location-1)) {
                this.gameboardArray[location-1] = move + ": player" + player;
            }
            else { 
                console.log("Please try again. That spot is taken.")
                this.addMove(currentPlayerHolder, player, currentPlayerHolder.move(), move);
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
                this.assignWinner(this.gameboardArray[combo[0]])
                return true; 
                }
            }
            return false;
        },

        assignWinner: function(moveInfo) {
            let lastChar = moveInfo[moveInfo.length - 1]
            return lastChar; 
        },

        playGame: function(p1, p2) {
            let currentPlayer = p1; 

            //switching players
            for (var i = 1; ; i++) {
                currentPlayer = i % 2 === 0 ? p2 : p1; 
                this.addMove(currentPlayer, currentPlayer.whichPlayer, currentPlayer.move(), currentPlayer.shape)
                console.log(this.gameboardArray);
                
                if (this.checkWinCondition()) {
                    console.log("Player " + currentPlayer.whichPlayer + " wins!" + " That's also " + currentPlayer.name)
                    this.gameboardArray = ["", "", "", "", "", "", "", "", ""];

                    break; 
                }

                if (!confirm("Continue to next move?")) {
                    break; 
                }
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

        move: function() {
            let loc = prompt(player.name + ", What is your location?")
            return loc; 
        }
    }

    if (player.whichPlayer === 2) {
        player.shape = "circle"; 
    }

    return player; 

}

let littleBrian = createPlayer ("lilBrian", 1);
let bigBrian = createPlayer ("bigBoy", 2);
let testGame = createGameboard();
testGame.playGame(littleBrian, bigBrian)
