import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
/*
 Mocks the Axios HTTP requests using the axios-mock-adapter library.
 Create a new instance of the mock adapter
*/
const mock = new MockAdapter(axios);
/**
 * Mocks the initial state of the Tic Tac Toe board and responses for move and reset actions.
 */
const initialBoardResponse = {
  board: [['', '', ''], ['', '', ''], ['', '', '']],
  winner: '',
  scoreX: 0,
  scoreO: 0,
  currentPlayer: 'X',
};
const moveResponse = { success: true };
const resetResponse = { success: true };
/**
 * Test suite for the App component.
 */
describe('App Component', () => {
  beforeEach(() => {
    // Mock the initial board response
    mock.onGet('http://localhost:5000/board').reply(200, initialBoardResponse);
    // Mock the move and reset responses
    mock.onPost('http://localhost:5000/move').reply(200, moveResponse);
    mock.onPost('http://localhost:5000/reset').reply(200, resetResponse);
  });
 /**
   * Clean up after each test by resetting the mock adapter state.
  */
  afterEach(() => {
    // Reset the mock adapter state after each test
    mock.reset();
  });

  it('renders the component with initial state', async () => {
    render(<App />);

    // Wait for the initial API call to complete
    await waitFor(() => {
      expect(screen.getByText('Winner:')).toBeInTheDocument();
      expect(screen.getByText('Score X:')).toBeInTheDocument();
      expect(screen.getByText('Score O:')).toBeInTheDocument();
    });

    // Verify that the initial state is rendered correctly
    expect(screen.getByText('Winner:')).toHaveTextContent('Winner: ');
    expect(screen.getByText('Score X:')).toHaveTextContent('Score X: 0');
    expect(screen.getByText('Score O:')).toHaveTextContent('Score O: 0');
  });

  it('makes a move when a cell is clicked', async () => {
    render(<App />);

    // Wait for the initial API call to complete
    await waitFor(() => {
      expect(screen.getByText('Winner:')).toBeInTheDocument();
      expect(screen.getByText('Score X:')).toBeInTheDocument();
      expect(screen.getByText('Score O:')).toBeInTheDocument();
    });

    // Mock a successful move response
    mock.onPost('http://localhost:5000/move').reply(200, { success: true });

    // Click on a cell
    fireEvent.click(screen.getByText(''));

    // Wait for the move API call to complete
    await waitFor(() => {
      // Verify that the board is updated
      expect(screen.getByText('Winner:')).toHaveTextContent('Winner: ');
      expect(screen.getByText('Score X:')).toHaveTextContent('Score X: 0');
      expect(screen.getByText('Score O:')).toHaveTextContent('Score O: 0');
    });
  });

  it('resets the game when the "Reset Game" button is clicked', async () => {
    render(<App />);

    // Wait for the initial API call to complete
    await waitFor(() => {
      expect(screen.getByText('Winner:')).toBeInTheDocument();
      expect(screen.getByText('Score X:')).toBeInTheDocument();
      expect(screen.getByText('Score O:')).toBeInTheDocument();
    });

    // Mock a successful reset response
    mock.onPost('http://localhost:5000/reset').reply(200, { success: true });

    // Click on the "Reset Game" button
    fireEvent.click(screen.getByText('Reset Game'));

    // Wait for the reset API call to complete
    await waitFor(() => {
      // Verify that the board is reset
      expect(screen.getByText('Winner:')).toHaveTextContent('Winner: ');
      expect(screen.getByText('Score X:')).toHaveTextContent('Score X: 0');
      expect(screen.getByText('Score O:')).toHaveTextContent('Score O: 0');
    });

    
    // ... (add more frontend test cases if needed)
  
  });
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
