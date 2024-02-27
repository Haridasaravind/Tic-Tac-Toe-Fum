Milestone 2: Modeling - Architecture, Components, & Integration

1. Information Needed by Front End:

The front end needs information about:
Current state of the game board: The arrangement of X, O, and empty cells on the Tic Tac Toe board.
Winner information: If there is a winner, the front end needs to know who won.
Scores for players X and O: To display the current score of each player.

2.Representation in JSON (Response from /api/poll):
The response from the /api/poll endpoint could be a JSON object containing the necessary information:

{
  "board": [["X", "O", ""], ["", "X", ""], ["O", "", "X"]],
  "winner": "X",
  "scoreX": 2,
  "scoreO": 1
}



3.Player Actions and Conditions:
A player can perform an action (make a move) under the following conditions:

The game is not over (there is no winner).
The selected cell on the board is currently empty.
Actions a player can perform:

Make a move: Specify the row and column indices where the player wants to place their symbol (X or O).
Reset the game: Start a new game, clearing the board and resetting scores.

4. 
Making a move (POST request to /move):
In json  file we have
{
  "row": 1,
  "col": 2
}


Resetting the game (POST request to /reset):
In json  file we have
{} // An empty JSON object

We can derive from the structure of our front-end and back-end code. 
The front end makes requests to the back end to fetch the current state or perform actions, and the back end responds with JSON containing the necessary information.
