'use strict';
var connect = angular.module('connect',[]);

connect.controller('mainController', ['$scope','$timeout',
  function (scope, $timeout) {
    initialize();
    scope.clickColumn = function (colNumber) {
      if (scope.gameHasEnded){
        return;
      }

      switch (colNumber) {
        case 1:
          playerMove(scope.displayColumn1, scope.column1, scope.playerTurn);
          break;

        case 2:
          playerMove(scope.displayColumn2, scope.column2, scope.playerTurn);
          break;

        case 3:
          playerMove(scope.displayColumn3, scope.column3, scope.playerTurn);
          break;

        case 4:
          playerMove(scope.displayColumn4, scope.column4, scope.playerTurn);
          break;

        case 5:
          playerMove(scope.displayColumn5, scope.column5, scope.playerTurn);
          break;

        case 6:
          playerMove(scope.displayColumn6, scope.column6, scope.playerTurn);
          break;

        case 7:
          playerMove(scope.displayColumn7, scope.column7, scope.playerTurn);
          break;
      }

      var one_second = 1000;
      if (isGameFinished()) {
        scope.gameHasEnded = true;
        $timeout(function(){
          alert ("The Game is a draw.");
        },one_second);
      };

    }

    //TODO: Refactor to change the globalVariables on a different function
    function playerMove (displayColumn, column, player) {
      if (isColumnFilled(column.length)) {
        alert("Invalid Move");
        return;
      }
      displayColumn[column.length] = player;
      column.push(player);
      scope.chipsDropped++;
      if(isMoveAWin(column)){
        scope.gameHasEnded = true;
        alert('Congratulations Player:' + scope.playerTurn);
        return;
      };
      scope.playerTurn = setPlayerTurnToOpponent(scope.playerTurn);

    }

    function isMoveAWin(column) {
      var minMovesToWin = 7;
      if(scope.chipsDropped < minMovesToWin) {
        return false;
      }

      if(verticalPatternWin(column)){
        return true;
      }

      if(horizontalPatternWin(column)){
        return true;
      }

      if(diagonalPatternWin(column)){
        return true;
      }

      return false;
    }

    function diagonalPatternWin(column) {
      var currentIndexPosition = column.length - 1; //y-coordinate



    }

    function horizontalPatternWin(column) {
      var currentIndexPosition = column.length - 1;
      var horizontalContents = [];
      var player = scope.playerTurn;
      horizontalContents.push(scope.column1[currentIndexPosition]);
      horizontalContents.push(scope.column2[currentIndexPosition]);
      horizontalContents.push(scope.column3[currentIndexPosition]);
      horizontalContents.push(scope.column4[currentIndexPosition]);
      horizontalContents.push(scope.column5[currentIndexPosition]);
      horizontalContents.push(scope.column6[currentIndexPosition]);
      horizontalContents.push(scope.column7[currentIndexPosition]);

      var patternCount = 0;
      for(var i=0; i<horizontalContents.length; i++){
        if(horizontalContents[i] === player){
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

    function verticalPatternWin (column) {
      if(column.length < 4) {
        return false;
      }

      var currentPosition = column.length;
      var patternCount = 0;
      var player = scope.playerTurn;
      for (var i=currentPosition; i>-1; i--) {
        if(column[i] === player){
          patternCount++;
        }

        if(patternCount === 4){
          return true;
        }
      }
      return false;
    }

    function isColumnFilled(columnLength){
      return columnLength >= scope.gameRows.length;
    }

    function setPlayerTurnToOpponent(playerTurn){
      if (playerTurn === 'A') {
        return 'B';
      } else {
        return 'A';
      }
    }

    function isGameFinished(){
      return scope.chipsDropped === scope.MAX_CHIPS_ALLOWED;
    }

    function initialize () {
      scope.gameHasEnded = false;
      //For a 6 x 7 board maximum allowed chips is 42.
      scope.MAX_CHIPS_ALLOWED = 42;
      scope.chipsDropped = 0;
      scope.playerTurn = 'A';

      scope.gameRows = [5,4,3,2,1,0];

      //var displayColumn = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //var column = [];
      //var columns = [];
      //
      //var cols = {
      //  display: displayColumn,
      //  column: column
      //}
      //
      //scope.columns.push();


      //scope.displayColumn1 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //scope.column1 = [];
      //
      //scope.displayColumn2 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //scope.column2 = [];
      //
      //scope.displayColumn3 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //scope.column3 = [];
      //
      //scope.displayColumn4 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //scope.column4 = [];
      //
      //scope.displayColumn5 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //scope.column5 = [];
      //
      //scope.displayColumn6 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //scope.column6 = [];
      //
      //scope.displayColumn7 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      //scope.column7 = [];

      scope.displayColumn1 = {0:'1',1:'1',2:'1',3:'1',4:'1',5:'1'};
      scope.column1 = [];

      scope.displayColumn2 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      scope.column2 = [];

      scope.displayColumn3 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      scope.column3 = [];

      scope.displayColumn4 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      scope.column4 = [];

      scope.displayColumn5 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      scope.column5 = [];

      scope.displayColumn6 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      scope.column6 = [];

      scope.displayColumn7 = {0:'Blank',1:'Blank',2:'Blank',3:'Blank',4:'Blank',5:'Blank'};
      scope.column7 = [];

    }
  }
]);