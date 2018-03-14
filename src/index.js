module.exports = function solveSudoku(matrix) {
  matrix.forEach((row, i) => {
    let missing = findMissing(row);
    matrix[i] = row.map(cell => cell == 0 ? missing : cell);
  });
  return solve(solve(matrix));

  function rotate(array) {
    let result = array.map(item => []);
    array.forEach((row,i) => {
      for(let j = 0; j < row.length; j++){
        result[j].push(array[i][j]);
      }
    });
    return result;
  }

  function solve(matrix) {
    return rotate(matrix).map(column => {
      return column.map(cell => {
        if(Array.isArray(cell)) {
          let missing = findMissing(column);
          cell = cell.filter(p => missing.indexOf(p) >= 0);
          if(cell.length == 1) {
            cell = cell[0];
          }
        }
        return cell;
      });
    });
  }

  function isSolved(array) {
    return array.filter(row => 
      row.filter(cell => Array.isArray(cell)).length > 0
    ).length == 0;
  }

  function findMissing(array) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(p => array.indexOf(p) < 0);
  }
}
