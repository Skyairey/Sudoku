import { CONSTANT } from "./constants";

export type Grid = number[][];

const newGrid = (size: number): Grid => {
  let arr: Grid = new Array(size)
    .fill(null)
    .map(() => new Array(size).fill(CONSTANT.UNASSIGNED));
  return arr;
};

const isColSafe = (grid: Grid, col: number, value: number): boolean => {
  for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};

const isRowSafe = (grid: Grid, row: number, value: number): boolean => {
  for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};

const isBoxSafe = (
  grid: Grid,
  boxRow: number,
  boxCol: number,
  value: number
): boolean => {
  for (let row = 0; row < CONSTANT.BOX_SIZE; row++) {
    for (let col = 0; col < CONSTANT.BOX_SIZE; col++) {
      if (grid[row + boxRow][col + boxCol] === value) return false;
    }
  }
  return true;
};

export const isSafe = (
  grid: Grid,
  row: number,
  col: number,
  value: number
): boolean => {
  return (
    isColSafe(grid, col, value) &&
    isRowSafe(grid, row, value) &&
    isBoxSafe(grid, row - (row % 3), col - (col % 3), value) &&
    value !== CONSTANT.UNASSIGNED
  );
};

type Position = { row: number; col: number };

const findUnassignedPos = (grid: Grid, pos: Position): boolean => {
  for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
    for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
      if (grid[row][col] === CONSTANT.UNASSIGNED) {
        pos.row = row;
        pos.col = col;
        return true;
      }
    }
  }
  return false;
};

const shuffleArray = (arr: number[]): number[] => {
  let currIndex = arr.length;
  while (currIndex !== 0) {
    let randIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;
    [arr[currIndex], arr[randIndex]] = [arr[randIndex], arr[currIndex]];
  }
  return arr;
};

const isFullGrid = (grid: Grid): boolean => {
  return grid.every((row) =>
    row.every((value) => value !== CONSTANT.UNASSIGNED)
  );
};

const sudokuCreate = (grid: Grid): boolean => {
  let unassignedPos: Position = { row: -1, col: -1 };
  if (!findUnassignedPos(grid, unassignedPos)) return true;

  let numberList = shuffleArray([...CONSTANT.NUMBERS]);
  let { row, col } = unassignedPos;

  for (let num of numberList) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (isFullGrid(grid) || sudokuCreate(grid)) {
        return true;
      }
      grid[row][col] = CONSTANT.UNASSIGNED;
    }
  }
  return isFullGrid(grid);
};

export const sudokuCheck = (grid: Grid): boolean => {
  let unassignedPos: Position = { row: -1, col: -1 };
  if (!findUnassignedPos(grid, unassignedPos)) return true;
  return isFullGrid(grid);
};

const rand = (): number => Math.floor(Math.random() * CONSTANT.GRID_SIZE);

const removeCells = (grid: Grid, level: number): Grid => {
  let res = grid.map((row) => [...row]);
  let attempts = level;
  while (attempts > 0) {
    let row = rand();
    let col = rand();
    while (res[row][col] === CONSTANT.UNASSIGNED) {
      row = rand();
      col = rand();
    }
    res[row][col] = CONSTANT.UNASSIGNED;
    attempts--;
  }
  return res;
};

export const sudokuGen = (
  level: number
): { original: Grid; question: Grid } | undefined => {
  let sudoku = newGrid(CONSTANT.GRID_SIZE);
  if (sudokuCreate(sudoku)) {
    let question = removeCells(sudoku, level);
    return { original: sudoku, question };
  }
  return undefined;
};
