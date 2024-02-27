const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require('./Server'); // Importing the server instance
const e = require('express');
const { before } = require('mocha');

const { expect } = chai;
chai.use(chaiHttp);
// Test suite for the Tic Tac Toe Server
describe('Tic Tac Toe Server', () => {
  // now test cases go here

  describe('Server End Points', () => {
    it('should return the initial state of the board', (done) => {
      chai
        .request(server)
        .get('/board')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.board).to.deep.equal([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ]);
          expect(res.body.winner).to.equal('');
          expect(res.body.scoreX).to.equal(0);
          expect(res.body.scoreO).to.equal(0);
          done();
        });
    });

    it('should allow a player to make a valid move', (done) => {
      chai
        .request(server)
        .post('/move')
        .send({ row: 0, col: 0 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          done();
        });
    });

    it('should reset the game state', (done) => {
      chai
        .request(server)
        .post('/reset')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          done();
        });
    });
  });

  describe('Game Reset', () => {
    it('it should reset the game board and scores', async function () {
      // make a move
      const res = await chai.request(server).post('/move').send({ row: 0, col: 0 });
      const res_1 = await chai.request(server).get('/board');
      // Asserting the state of the board
      expect(res_1.body.board).to.deep.equal([
        ['X', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
      expect(res_1.body.scoreX).to.equal(0);
      expect(res_1.body.scoreO).to.equal(0);

      // Reset the game
      const res_2 = await chai.request(server).post('/reset');
      const res_3 = await chai.request(server).get('/board');
      // Asserting the reset state of the board
      expect(res_3.body.board).to.deep.equal([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
      expect(res_3.body.scoreX).to.equal(0);
      expect(res_3.body.scoreO).to.equal(0);
    });
  });

  describe('Game Logic Tests', () => {
    beforeEach((done) => {
      chai
        .request(server)
        .post('/reset')
        .end((err, res) => {
          done();
        });
    });

    it('should not allow a player to make an invalid move', (done) => {
      chai
        .request(server)
        .post('/move')
        .send({ row: 3, col: 3 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.equal('Invalid move');
          done();
        });
    });

    it('should not allow a player to make a move on an occupied space', (done) => {
      chai
        .request(server)
        .post('/move')
        .send({ row: 0, col: 0 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;

          chai
            .request(server)
            .post('/move')
            .send({ row: 0, col: 0 })
            .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an('object');
              expect(res.body.success).to.be.false;
              expect(res.body.message).to.equal('Invalid move');
              done();
            });
        });
    });

    it('it should declare a winner if a row is completed', async () => {
      const move1 = await chai.request(server).post('/move').send({ row: 0, col: 0 });
      const move2 = await chai.request(server).post('/move').send({ row: 1, col: 0 });
      const move3 = await chai.request(server).post('/move').send({ row: 0, col: 1 });
      const move4 = await chai.request(server).post('/move').send({ row: 1, col: 1 });
      const move5 = await chai.request(server).post('/move').send({ row: 0, col: 2 });

      expect(move5).to.have.status(200);
      expect(move5.body).to.be.an('object');
      expect(move5.body.success).to.be.true;
      expect(move5.body.winner).to.includes('X');
    });

    it('it should declare a winner if a column is completed', async () => {
      const move1 = await chai.request(server).post('/move').send({ row: 0, col: 0 });
      const move2 = await chai.request(server).post('/move').send({ row: 0, col: 1 });
      const move3 = await chai.request(server).post('/move').send({ row: 1, col: 0 });
      const move4 = await chai.request(server).post('/move').send({ row: 1, col: 1 });
      const move5 = await chai.request(server).post('/move').send({ row: 2, col: 0 });

      expect(move5).to.have.status(200);
      expect(move5.body).to.be.an('object');
      expect(move5.body.success).to.be.true;
      expect(move5.body.winner).to.includes('X');
    });

    it('it should declare a winner if a diagonal is completed', async () => {
      const move1 = await chai.request(server).post('/move').send({ row: 0, col: 0 });
      const move2 = await chai.request(server).post('/move').send({ row: 0, col: 1 });
      const move3 = await chai.request(server).post('/move').send({ row: 1, col: 1 });
      const move4 = await chai.request(server).post('/move').send({ row: 1, col: 2 });
      const move5 = await chai.request(server).post('/move').send({ row: 2, col: 2 });

      expect(move5).to.have.status(200);
      expect(move5.body).to.be.an('object');
      expect(move5.body.success).to.be.true;
      expect(move5.body.winner).to.includes('X');
    });
  });

  describe('Board Extension', () => {
    beforeEach((done) => {
      chai
        .request(server)
        .post('/reset')
        .end((err, res) => {
          done();
        });
    });

    const fillUpBoard = async () => {
      let moves = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
        { row: 1, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 0 },
      ];

      for (let i = 0; i < moves.length; i++) {
        const move = await chai.request(server).post('/move').send(moves[i]);
        expect(move).to.have.status(200);
        expect(move.body).to.be.an('object');
        expect(move.body.success).to.be.true;
      }
    };

    it('it should extend the board from 3x3 to 4x4 when the 3x3 board is full', async () => {
      await fillUpBoard();
      const res = await chai.request(server).get('/board');
      const { board } = res.body;
      expect(board.length).to.equal(4);
      expect(board[0].length).to.equal(4);
      expect(board[1].length).to.equal(4);
      expect(board[2].length).to.equal(4);
      expect(board[3].length).to.equal(4);
    });

    it('it should declare a winner if a Column is completed', async () => {
      await fillUpBoard();

      let moves = [
        { row: 0, col: 3 },
        { row: 3, col: 0 },
        { row: 1, col: 3 },
        { row: 3, col: 1 },
        { row: 2, col: 3 },
        { row: 3, col: 2 },
        { row: 3, col: 3 },
      ];

      let move;

      for (let i = 0; i < moves.length; i++) {
        move = await chai.request(server).post('/move').send(moves[i]);
        expect(move).to.have.status(200);
        expect(move.body).to.be.an('object');
        expect(move.body.success).to.be.true;
      }

      expect(move.body.winner).to.includes('X');

      const res = await chai.request(server).get('/board');
      const { board } = res.body;
      expect(board.length).to.equal(3);
    });

    it('it should declare a winner if a Row is completed', async () => {
      await fillUpBoard();

      let moves = [
        { row: 3, col: 0 },
        { row: 0, col: 3 },
        { row: 3, col: 1 },
        { row: 1, col: 3 },
        { row: 3, col: 2 },
        { row: 2, col: 3 },
        { row: 3, col: 3 },
      ];

      let move;

      for (let i = 0; i < moves.length; i++) {
        move = await chai.request(server).post('/move').send(moves[i]);
        expect(move).to.have.status(200);
        expect(move.body).to.be.an('object');
        expect(move.body.success).to.be.true;
      }

      expect(move.body.winner).to.includes('X');

      const res = await chai.request(server).get('/board');
      const { board } = res.body;
      expect(board.length).to.equal(3);
    });


    it('should avoid awarding 2 points for two triplets on the 4x4 board', async () => {
      // Fill the board to create two triplets (e.g., two horizontal triplets)
      const moves = [
        { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 0, col: 1 },
        { row: 1, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 2 },
        { row: 0, col: 3 }, { row: 1, col: 3 }
      ];
    
      // Make the moves
      for (const move of moves) {
        const response = await chai.request(server).post('/move').send(move);
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.success).to.be.true;
      }
    
      // Check the scores after making the moves
      const scoresResponse = await chai.request(server).get('/board');
      expect(scoresResponse).to.have.status(200);
      expect(scoresResponse.body).to.be.an('object');
      expect(scoresResponse.body.scoreX).to.equal(0); // Ensure no points are awarded for the scenario
      expect(scoresResponse.body.scoreO).to.equal(0); // Ensure no points are awarded for the scenario
    });

    it('should handle a draw scenario on the 4x4 board', async () => {
      // Fill the board to create a draw scenario
      const moves = [
        { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 },
        { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 },
        { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 },
        { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 },
      ];
    
      // Make the moves
      for (const move of moves) {
        const response = await chai.request(server).post('/move').send(move);
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.success).to.be.true;
      }
    
      // Check that there is no winner and the game is a draw
      const scoresResponse = await chai.request(server).get('/board');
      expect(scoresResponse).to.have.status(200);
      expect(scoresResponse.body).to.be.an('object');
      expect(scoresResponse.body.winner).to.equal('');
      expect(scoresResponse.body.scoreX).to.equal(0);
      expect(scoresResponse.body.scoreO).to.equal(0);
    });
    
    
  });
});
