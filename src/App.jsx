import React, { useState, useEffect, useRef } from 'react';
import Grid from './Grid';
import SuccessModal from './SuccessModal';
import FailModal from './FailModal';
import { questionCells, spansValue, values } from './data'; // Import the necessary data

const App = () => {
  const [currentCell, setCurrentCell] = useState(null);
  const [previousCell, setPreviousCell] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [toggleBox5, setToggleBox5] = useState(false);

  const handleCellClick = (cell) => {
    if (cell.classList.contains("w")) {
      setPreviousCell(currentCell);
      setCurrentCell(cell);
      highlightCells(cell);
    }
  };

  const highlightCells = (selectedCell) => {
    const boxesBelongedTo = getBoxesBelongedTo(selectedCell);
    const htmlCells = getActualHtmlCells(boxesBelongedTo);
    const correctCells = getCorrectAxialCell(htmlCells, previousCell);
    setHighlightedCells(correctCells.flat(Infinity));
  };

  const getBoxesBelongedTo = (selectedCell) => {
    let boxesBelongedTo = [];
    const row = selectedCell.getAttribute('row');
    const col = selectedCell.getAttribute('col');
    for (const key in questionCells) {
      if (Object.hasOwnProperty.call(questionCells, key)) {
        const boxes = questionCells[key]['boxes'];
        for (const box of boxes) {
          if (box.row == row && box.col == col && toggleBox5) {
            setToggleBox5(!toggleBox5);
            break;
          }
          if (box.row == row && box.col == col) {
            boxesBelongedTo.push(boxes);
            setToggleBox5(!toggleBox5);
            break;
          }
        }
      }
    }
    return boxesBelongedTo;
  };

  const getActualHtmlCells = (boxesBelongedTo) => {
    return boxesBelongedTo.map(boxes => boxes.map(box => document.querySelector(`.w[row='${box.row}'][col='${box.col}']`)));
  };

  const getCorrectAxialCell = (htmlCellsCollections, prev) => {
    let cellIsInDirection = false;
    let correctCells = htmlCellsCollections;
    htmlCellsCollections.forEach(cells => {
      if (cells.includes(prev)) {
        cellIsInDirection = inSameDirection(cells[0], prev);
        if (cellIsInDirection) {
          correctCells = [cells];
          return correctCells;
        }
      }
    });
    return correctCells;
  };

  const inSameDirection = (cell, prev) => {
    let row = cell.getAttribute('row');
    let col = cell.getAttribute('col');
    if (!prev) return false;
    let prev_row = prev.getAttribute('row');
    let prev_col = prev.getAttribute('col');
    let output = (row - prev_row) * (col - prev_col);
    return output === 0;
  };

  return (
    <div>
      <Grid
        values={values}
        spansValue={spansValue}
        onCellClick={handleCellClick}
      />
      <SuccessModal />
      <FailModal />
    </div>
  );
};

export default App;
