function rollDice() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(name, isTurn, turnScore, totalScore) {
  this.name = name;
  this.isTurn = isTurn;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

$(document).ready(function() {
  var player1 = new Player(player1, true, 0, 99);
  var player2 = new Player(player2, false, 0, 0);

  var rollResult = 0;

  $("#player1-column").addClass("bg-success");
  $("#roll").click(function() {
    rollResult = 0;
    rollResult += rollDice();
    $("#result").text(rollResult);
    if (player1.isTurn === true) {
      if (rollResult === 1) {
        player1.turnScore = 0;
        player1.isTurn = false;
        player2.isTurn = true;
        $("#player1-turns").append("<li>" + 0 + "</li>");
        $("#player1-column").removeClass("bg-success");
        $("#player2-column").addClass("bg-success");
        $("#current-turn-score").text(0);
      } else {
        player1.turnScore += rollResult;
        $("#current-turn-score").text(player1.turnScore);
      }
    } else {
      if (rollResult === 1) {
        player2.turnScore = 0;
        player2.isTurn = false;
        player1.isTurn = true;
        $("#player2-turns").append("<li>" + 0 + "</li>");
        $("#player2-column").removeClass("bg-success");
        $("#player1-column").addClass("bg-success");
        $("#current-turn-score").text(0);
      } else {
        player2.turnScore += rollResult;
        $("#current-turn-score").text(player2.turnScore);
      }
    }
  });

  $("#stop").click(function() {
    if (player1.isTurn === true) {
      player1.totalScore += player1.turnScore;
      player1.isTurn = false;
      player2.isTurn = true;
      $("#player1-turns").append("<li>" + player1.turnScore + "</li>");
      player1.turnScore = 0;
      $("#player1-score").text(player1.totalScore);
      $("#player1-column").removeClass("bg-success");
      $("#player2-column").addClass("bg-success");
      $("#current-turn-score").text(0);
    } else {
      player2.totalScore += player2.turnScore;
      player2.isTurn = false;
      player1.isTurn = true;
      $("#player2-turns").append("<li>" + player2.turnScore + "</li>");
      player2.turnScore = 0;
      $("#player2-score").text(player2.totalScore);
      $("#player2-column").removeClass("bg-success");
      $("#player1-column").addClass("bg-success");
      $("#current-turn-score").text(0);
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
  });
});
