// trivia form with multiple choice or true/false options (your choice).
var footballTrivia = [
  {
    question:
      "How many years must a player be retired to be eligible for the Pro Football Hall of Fame",
    answers: ["Five", "Six", "Eight", "Seven"],
    correctanswer: "Five"
  },
  {
    question: "When was the Super Bowl Shuffle recorded",
    answers: ["1984", "1983", "1985", "1986"],
    correctanswer: "1985"
  },
  {
    question: "Who had the most rushing yards in the NFL for the 1980's",
    answers: [
      "Deion Sanders",
      "Walter Payton",
      "Eric Dickerson",
      "Gayle Sayers"
    ],
    correctanswer: "Eric Dickerson"
  },
  {
    question: "What record setting quarterback was the NFL's 82nd draft pick",
    answers: ["Tom Brady", "Brett Farve", "Steve Young", "Joe Montana"],
    correctanswer: "Joe Montana"
  },
  {
    question: "What are NFL players required to wear in games",
    answers: ["helmets", "pads", "jersey", "mouthpiece"],
    correctanswer: "helmets"
  },
  {
    question: "Who is Da Coach",
    answers: ["Mike Ditka", "Jimmy Johnson", "Parcell", "Seven"],
    correctanswer: "Mike Ditka"
  }
];

//limited amount of time to finish the quiz.

//game ends when the time runs out.

//reveal the number of questions that players answer correctly and incorrectly.
const MAXTIME = 10000;
var correctCount = 0;
var wrongCount = 0;

// Don't let the player pick more than one answer per question.

// Display a countdownTimer//////////////////////////////////////////////////////////
window.onload = function() {
  
  $("#start").on("click", function() {
    startTriviaGame();
    $("#instructions").hide();
  });
};


function startTimer() {
  //   Variable that will hold our setInterval that runs the stopwatch
var intervalId;
// prevents the clock from being sped up unnecessarily
// var clockRunning = false;
var number = 0;

  var stopwatch = {
    time: 0,

    reset: function() {
      stopwatch.time = 0;
      clearInterval(intervalId);
      // DONE: Change the "display" div to "00:00."
      $("#display").text("00:00");
    },
    start: function() {
      clearInterval(intervalId);
      intervalId = setInterval(stopwatch.count, MAXTIME);
    },
    stop: function() {
      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function() {
      // DONE: increment time by 1, remember we cant use "this" here.
      stopwatch.time++;
      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);
      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $("#display").text(converted);
    },

    timeConverter: function(t) {
      var minutes = Math.floor(t / 60);
      var seconds = t - minutes * 60;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes === 0) {
        minutes = "00";
      } else if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return minutes + ":" + seconds;
    }
  };
}

////////////////////////////////////////////////////////
function startTriviaGame() {
  // start timer
  // startTimer();
  // display questions
  displayQuestionsAnswers();
  
  // questionsCorrect
  // questionsIncorrect
  // set the score
}

// show Correct and Incorrest answers with score
$("#submit").on("click", function() {
  showResults();
});

function displayQuestionsAnswers() {
  
  $("#footballTrivia").html("Are you ready for some football!!!");

  var output = [];
  // create loop for questions
  for (var i = 0; i < footballTrivia.length; i++) {
    var answers = [];
    var questionText = footballTrivia[i].question;
    console.log(questionText);
    // create loop for answers
    for (var j = 0; j < footballTrivia[i].answers.length; j++) {
      // ...add an radio button
      //print out answer values for each question
      var answerText = footballTrivia[i].answers[j];
      console.log(answerText);

      //assign answers to radio button
      var input = $("<input />", {
        type: "radio",
        name: "question" + i + "-answers" + j,
        value: answerText
      });
      
      $("<label />", {
        insertAfter: "#answers",
        append: [input, "answers"]
      });

      // var $input = $('<input />', {
      //   type : "radio",
      //   name : "name",
      //   value : "alex"
      // });

      // $("<label />", {
      //   insertAfter: "#somediv", // (or use appendTo: to insert into it)
      //   append: [$input, "Alex"] // include our $input and also some text description
      // });
      
      // place answers for question into an array
      answers.push(
        `<label>
            <input type="radio" name="question${i}-answer${j}" value="${
          footballTrivia[i].answers[j]
        }">
            ${footballTrivia[i].answers[j]}
          </label>`
      );
    }
    var qDiv = $("<div>").addClass("question");
    var aDiv = $("<div>").addClass("answers");

    // add this question and its answers to the output array
    output.push(
      `<div class="question"> ${footballTrivia[i].question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      // `$("#question").append(${footballTrivia[i].question})</div>
      // $("#answers").append(${answers.join("")})</div>`
    );
  }
  // output array placed on DOM 
  $("#footballTrivia").append(output.join(""));
}

function showResults() {
  // get trivia answers
  var answers = [];

  
  //correct answers
  var numCorrect = 0;
  var numIncorrect = 0;
  console.log("In Show Results");
  $("#footballTrivia")
    .find(".answers")
    .val();
  console.log("Here are the answers"+ answers);
  // for each question...
  for (var i = 0; i < footballTrivia.length; i++) {
    // find selected answer
    console.log("The correct answer " + footballTrivia[i].correctanswer);

    for (var j = 0; j < footballTrivia[i].answers.length; j++) {
      isChecked = true;
      var selectedAnswer =`input[name=question${i}-answer${j}]:checked`;
      var answer = answers[j];

      if(isChecked){
      var userAnswer = $(selectedAnswer).val();
      console.log("The user's answer" + userAnswer);

      console.log("The correct answer" + footballTrivia[i].correctAnswer);
      // if answer is correct
      if (userAnswer === footballTrivia[i].correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        // answers[j].color() = "lightgreen";
      }
      // if answer is wrong
      else {
        // color the answers red
        numIncorrect++;
        // answers[j].color() = "red";
      }
    }
  }
  }

  // show number of correct answers out of total
  $("#results").text("The number of correct answers was "+numCorrect + " out of " + footballTrivia.length);
}
