document.addEventListener("DOMContentLoaded", function () {
  console.log("Quiz Game Loaded");

  let gameState = {
    currentScreen: "home",
    player: {
      xp: 0,
      coins: 0,
      streak: 0,
      level: 1
    },
    currentQuiz: {
      questions: [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "22"],
          correct: 1
        },
        {
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correct: 2
        }
      ],
      currentQuestion: 0,
      score: 0,
      correctCount: 0,
      wrongCount: 0
    }
  };

  function showScreen(id) {
    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("resultsScreen").classList.add("hidden");
    document.getElementById(id).classList.remove("hidden");
  }

  function startQuiz() {
    gameState.currentQuiz.currentQuestion = 0;
    gameState.currentQuiz.score = 0;
    gameState.currentQuiz.correctCount = 0;
    gameState.currentQuiz.wrongCount = 0;
    showScreen("gameScreen");
    renderQuestion();
  }

  function renderQuestion() {
    const q = gameState.currentQuiz.questions[gameState.currentQuiz.currentQuestion];
    document.getElementById("questionNumber").innerText = "Question " + (gameState.currentQuiz.currentQuestion + 1);
    document.getElementById("questionText").innerText = q.question;
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.className = "bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded block w-full";
      btn.onclick = () => checkAnswer(idx);
      optionsContainer.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const currentQ = gameState.currentQuiz.questions[gameState.currentQuiz.currentQuestion];
    const isCorrect = selected === currentQ.correct;
    if (isCorrect) {
      gameState.currentQuiz.score += 100;
      gameState.currentQuiz.correctCount++;
      gameState.player.xp += 10;
      gameState.player.streak++;
    } else {
      gameState.currentQuiz.wrongCount++;
      gameState.player.streak = 0;
    }

    gameState.currentQuiz.currentQuestion++;
    if (gameState.currentQuiz.currentQuestion < gameState.currentQuiz.questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    showScreen("resultsScreen");
    document.getElementById("finalScore").innerText = "Score: " + gameState.currentQuiz.score;
    document.getElementById("correctAnswers").innerText = gameState.currentQuiz.correctCount;
    document.getElementById("wrongAnswers").innerText = gameState.currentQuiz.wrongCount;
    document.getElementById("xpGained").innerText = gameState.currentQuiz.correctCount * 10;
  }

  function playAgain() {
    showScreen("homeScreen");
  }

  window.startQuiz = startQuiz;
  window.playAgain = playAgain;
});
