Milestone 1: Specification


Project Name: tic-tac-foe-fum (full) — 2 player competitive game
Type: Competitive board game

Project Overview:
The "tic-tac-foe-fum" project is designed as a two-player competitive game that evolves from a traditional Tic-Tac-Toe format into a dynamic and strategic experience. The game starts on a 3x3 board and introduces board extensions, allowing players to earn points for completing triplets.

Participants and Roles:

Participants: Two players.
Roles: Player 1 uses 'X', and Player 2 uses 'O'. Each player competes to form triplets on the game board, earning points for completed triplets.

Initial Setup: The game begins with a standard Tic-Tac-Toe board of size 3x3.
Players are designated as Player 1 and Player 2.
Determining the first move will be addressed later through the implementation of functions and methods. Presently, our focus is on laying the foundation for the necessary classes.

Gameplay: Players take turns making moves on the 3x3 Tic-Tac-Toe board.
Player 1/Player 2 goes first (will be decided by the game).
Moves consist of placing a player's mark (X or O) in an empty cell on their turn.

Winning Conditions: If a player forms a winning triplet on the 3x3 board, the game immediately ends.
Winning involves creating a triplet either horizontally, vertically, or diagonally on the 3x3 board.
Players earn a point for each completed triplet on the 3x3 board.

Board Extension: If there is no winner in the initial 3x3 game, a random corner is chosen.
The board is extended to 4x4 along the direction of the chosen random corner, introducing a dynamic element.

Continued Play: Play continues on the extended 4x4 board until it is full.
Players take turns making moves on the expanded board.

Scoring: Players earn points for each completed triplet on the 4x4 board as well.
Triplets can be formed horizontally, vertically, or diagonally on the 4x4 board.
Clarify the scoring system, including whether points accumulate or reset when the board extends.


Game Completion:
The game concludes when the 4x4 board is full.
The player with the highest score, considering points earned for triplets, is declared the winner.


Exceptional Situations:mExceptional situations include winning on the 3x3 board, triggering a board extension, and managing gameplay on the 4x4 board.
Exceptional situations are handled by extending the board and continuing play.

Documentation:The specification follows the principles of clear communication.
It avoids assumptions about the reader's familiarity with specific game conventions.
Sufficient detail is provided on participants, setup, gameplay, actions, constraints, and exceptional situations.


Testing: Tests will be developed to ensure correct behavior in various scenarios, covering gameplay, board extension, and winning conditions.


Conclusion:The "tic-tac-foe-fum" project offers an innovative and strategic gaming experience, combining the classic Tic-Tac-Toe with dynamic board extensions. The evolving board and scoring system enhance gameplay, creating an engaging and competitive experience for two players

