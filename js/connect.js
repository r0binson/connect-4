'use strict';
var connect = angular.module('connect', []);

connect.controller('mainController', ['$scope', '$timeout',
  function (scope, $timeout) {
    var one_second = 1000;
    initialize();
    scope.clickColumn = function (colNumber) {
      if (scope.gameHasEnded) {
        return;
      }

      scope.message = '';

      var displayColumn = scope.displayColumns[colNumber];
      var column = scope.columns[colNumber];
      scope.colNumber = colNumber;

      playerMove(displayColumn, column, scope.playerTurn);

      if (isGameFinished()) {
        scope.gameHasEnded = true;
        $timeout(function () {
          alert("The Game is a draw.");
        }, one_second);
      }
      ;
    }

    //TODO: Refactor to change the globalVariables on a different function
    function playerMove(displayColumn, column, player) {
      if (isColumnFilled(column.length)) {
        scope.message = "Invalid Move.";
        return;
      }
      displayColumn[column.length] = player;
      column.push(player);
      scope.chipsDropped++;
      if (isMoveAWin(column)) {
        scope.gameHasEnded = true;
        $timeout(function () {
          scope.message = 'Player ' + scope.playerTurn + ' wins!'
        }, one_second);
        return;
      };
      scope.playerTurn = setPlayerTurnToOpponent(scope.playerTurn);
    }

    function isMoveAWin(column) {
      var minMovesToWin = 7;
      if (scope.chipsDropped < minMovesToWin) {
        return false;
      }

      if (verticalPatternWin(column)) {
        return true;
      }

      if (horizontalPatternWin(column)) {
        return true;
      }

      if (rightDiagonalPatternWin(column)) {
        return true;
      }

      if (leftDiagonalPatternWin(column)) {
        return true;
      }

      return false;
    }

    function rightDiagonalPatternWin(column) {
      var currentIndexPosition = column.length - 1;
      var currentColumn = scope.colNumber;
      var xMax = scope.columns.length; //columns
      var yMax = scope.gameRows.length; //Rows
      var rightDiagonal = [];

      var startingX = 0;
      var startingY = currentIndexPosition - currentColumn;

      if (startingY < 0) {
        startingX = (startingY * -1);
        startingY = 0;
      }

      for (var x = startingX; x < xMax && startingY < yMax; x++) {
        var tmpColumn = scope.columns[x];
        rightDiagonal.push(tmpColumn[startingY])
        startingY++;
      }

      var player = scope.playerTurn;
      return isPatternAWin(rightDiagonal, player);
    }

    function leftDiagonalPatternWin(column) {
      var currentIndexPosition = column.length - 1;
      var currentColumn = scope.colNumber;
      var xMax = scope.columns.length; //columns
      var yMax = scope.gameRows.length; //Rows
      var leftDiagonal = [];

      var startingX = currentIndexPosition + currentColumn;
      var startingY = 0;

      if (startingX > xMax - 1) {
        startingY = (startingX - (xMax - 1));
        startingX = xMax - 1; //zero base index
      }

      for (var x = startingX; x > -1 && startingY < yMax; x--) {
        var tmpColumn = scope.columns[x];
        leftDiagonal.push(tmpColumn[startingY])
        startingY++;
      }

      var player = scope.playerTurn;
      return isPatternAWin(leftDiagonal, player);
    }


    function horizontalPatternWin(column) {
      var currentIndexPosition = column.length - 1;
      var horizontalContents = [];
      var player = scope.playerTurn;
      for (var i = 0; i < scope.columns.length; i++) {
        var column = scope.columns[i];
        horizontalContents.push(column[currentIndexPosition]);
      }

      return isPatternAWin(horizontalContents, player);
    }

    function isPatternAWin(arrayContents, player) {
      var patternCount = 0;
      for (var i = 0; i < arrayContents.length; i++) {
        if (arrayContents[i] === player) {
          patternCount++
          if (patternCount === 4) {
            return true;
          }
        } else {
          patternCount = 0;
        }
      }
      return false;
    }

    function verticalPatternWin(column) {
      if (column.length < 4) {
        return false;
      }

      var player = scope.playerTurn;
      return isPatternAWin(column, player);
    }

    function isColumnFilled(columnLength) {
      return columnLength >= scope.gameRows.length;
    }

    function setPlayerTurnToOpponent(playerTurn) {
      if (playerTurn === 'A') {
        return 'B';
      } else {
        return 'A';
      }
    }

    function isGameFinished() {
      return scope.chipsDropped === scope.MAX_CHIPS_ALLOWED;
    }

    function initialize() {
      scope.gameHasEnded = false;
      scope.message = 'Player A begin.';
      scope.player1 = 'Player A';
      scope.player2 = 'Player B';

      //For a 6 x 7 board maximum allowed chips is 42.
      scope.MAX_CHIPS_ALLOWED = 42;
      scope.chipsDropped = 0;
      scope.playerTurn = 'A';

      scope.gameRows = [5, 4, 3, 2, 1, 0];
      scope.gameColumns = 7;

      scope.columns = [];
      scope.displayColumns = [];

      for (var i = 0; i < scope.gameColumns; i++) {
        scope.displayColumns.push({0: '', 1: '', 2: '', 3: '', 4: '', 5: ''});
        scope.columns.push([]);
      }
    }
  }
]);