import React, { useState } from 'react';

const GoBoard: React.FC = () => {
    // Initialize the board as a 9x9 grid
    const [board, setBoard] = useState(Array(9).fill(Array(9).fill(0)));

    // Handle placing a stone on the board
    const placeStone = (row: number, col: number, player: number) => {
        const newBoard = board.map((r, i) => 
            r.map((c, j) => (i === row && j === col ? player : c))
        );
        setBoard(newBoard);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '5px' }}>
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <button
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                            width: '50px',
                            height: '50px',
                            background: cell === 1 ? 'black' : cell === 2 ? 'white' : 'gray'
                        }}
                        onClick={() => placeStone(rowIndex, colIndex, 1)} // Player 1 places a stone
                    />
                ))
            )}
        </div>
    );
};

export default GoBoard;