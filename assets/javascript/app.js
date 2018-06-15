    
    var openScreen;
    var gameHTML;
    var counter = 15;
    var questionArray = ["Which soap opera does Joey act in?", //  Days of our lives
    "What does Phoebe legally change her name to?", //Princess Consuela Banana Hammock
    "What is the name of Phoebe's most-played song?", // Smelly Cat 
    "What comic book did Ross create as a child?", // Science Boy 
    "What's Joey's favorite food?", // Pizza
    "Which band sang the Friends theme tune?"]; // The Rembrandts.

    var answerArray = [
      ['Days of our lives','Greys Anathomy','All my Children'], 
      ['Phobe Hannigan','Princess Consuela Banana Hammock','Maria Consuelo Montana'], 
      ['Ode to a public hair','Love is like a giant pigeon','Smelly Cat'], 
      ['Dino Man','Science Boy','Super Boy'], 
      ['Pizza', 'Hamburger', 'Pasta'], 
      ['The Rembrandts', 'REM', 'Bon Jovi'] ];
        
    var correctAnswers = ['A. Days of our lives', 
    'B. Princess Consuela Banana Hammock', 
    'C. Smelly Cat', 
    'B. Science Boy', 
    'A. Pizza', 
    'A. The Rembrandts'];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correcto = 0;
    var incorrecto = 0;
    var norespuesta = 0;
    var clickSound = new Audio("./assets/sounds/Click2.mp3");

$(document).ready(function() {

  function openingPage() {
    openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Trivia Game</a></p>";
    $("#mainArea").append(openScreen);
  }
    
  openingPage();
    $("#mainArea").on("click", ".start-button", function(event){
      clickSound.play();
      $('.jumbotron').hide();
            
      generateQuestions();
      timerWrapper();
    });
    
    $("body").on("click", ".answer", function(event){  
      clickSound.play();
      selectedAnswer = $(this).text();
        
      if(selectedAnswer === correctAnswers[questionCounter]) {
        clearInterval(theClock);
        generateWin();
      }
      else{
        clearInterval(theClock);
        generateLoss();
      }
    });
    
    $("body").on("click", ".reset-button", function(event){
      clickSound.play();
      resetGame();
    });
    
  });
    
  function timeoutLoss() {
    norespuesta++;
    gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);  
  }
  function generateWin() {
    correcto++;
    gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" ;
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);  
  }
  function generateLoss() {
    incorrecto++;
    gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center' id='question-style'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000); 
  }  
  function generateQuestions() {
    gameHTML = "<p class='text-center timer-p timer-style'>Time Remaining: <span class='timer'>15</span></p><p class='text-center' id='question-style'>" + questionArray[questionCounter] + "</p><p class='first-answer answer' id='answers-style'>A. " + answerArray[questionCounter][0] + "</p><p class='answer' id='answers-style'>B. "+answerArray[questionCounter][1]+"</p><p class='answer' id='answers-style'>C. "+answerArray[questionCounter][2]+"</p>";
    $("#mainArea").html(gameHTML);
  }; 
  function wait() {
    if(questionCounter < 5){ 
      questionCounter++;
      generateQuestions();
      counter = 15;
      timerWrapper(); 
    }
    else{    
      finalScreen();
    }
  }; //end function
    
  function timerWrapper() {
    theClock = setInterval(fifteenSeconds, 1000);
      function fifteenSeconds() {
        if (counter === 0) {
          clearInterval(theClock);
          timeoutLoss();
        }
        if (counter > 0) {
          counter--;
        }
        $(".timer").html(counter);
      }
    }
    function finalScreen() {
      gameHTML =  "<p class='text-center timer-style'>Final Results!" + "</p>" + "<p class='summary-correct' id='question-style'>Correct Answers: " + correcto + "</p>" + "<p id='question-style'>Wrong Answers: " + incorrecto + "</p>" + "<p id='question-style'>Unanswered: " + norespuesta + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
      $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
      questionCounter = 0;
      correcto = 0;
      incorrecto = 0;
      norespuesta = 0;
      counter = 15;
      generateQuestions();
      timerWrapper();
  }

   