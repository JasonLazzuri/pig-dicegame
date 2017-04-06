function Player(playerName, isTurn, turnScore, totalScore) {
  this.playerName = playerName;
  this.isTurn = isTurn;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

var player1 = new Player("player1", true, 0, 0);
var player2 = new Player("player2", false, 0, 0);

var rollResult = 0;

function dice() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll(currentPlayer, otherPlayer) {
  rollResult = 0;
  rollResult += dice();
  $("#result").text(rollResult);
  if (rollResult === 1) {
    currentPlayer.turnScore = 0;
    currentPlayer.isTurn = false;
    otherPlayer.isTurn = true;
    $("#" + currentPlayer.playerName + "-turns").append("<li>" + 0 + "</li>");
    $("#" + currentPlayer.playerName + "-column").removeClass("bg-success");
    $("#" + otherPlayer.playerName + "-column").addClass("bg-success");
    $("#current-turn-score").text(0);
  } else {
    currentPlayer.turnScore += rollResult;
    $("#current-turn-score").text(currentPlayer.turnScore);
  }
}

function stop(currentPlayer, otherPlayer) {
  currentPlayer.totalScore += currentPlayer.turnScore;
  currentPlayer.isTurn = false;
  otherPlayer.isTurn = true;
  $("#" + currentPlayer.playerName + "-turns").append("<li>" + currentPlayer.turnScore + "</li>");
  $("#" + currentPlayer.playerName + "-score").text(currentPlayer.totalScore);
  $("#" + currentPlayer.playerName + "-column").removeClass("bg-success");
  $("#" + otherPlayer.playerName + "-column").addClass("bg-success");
  $("#current-turn-score").text(0);
  currentPlayer.turnScore = 0;
}

  if (player1.totalScore >= 100) {
    $("#player1-wins").show();
    $("body").css('background-color', 'orange');
    $("#player2-column").removeClass("bg-success");
  }

  if (player2.totalScore >= 100) {
    $("#player2-wins").show();
    $("body").css('background-color', 'lightblue');
    $("#player1-column").removeClass("bg-success");
  }

$(document).ready(function() {
  $("#player1-column").addClass("bg-success");

  $("#roll").click(function() {
    if (player1.isTurn === true) {
      roll(player1, player2);
    } else {
      roll(player2, player1);
    }
  });

  $("#stop").click(function() {
    if (player1.isTurn === true) {
      stop(player1, player2);
    } else {
      stop(player2, player1);
    }
  });
});
