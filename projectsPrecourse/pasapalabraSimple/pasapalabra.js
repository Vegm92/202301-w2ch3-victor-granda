import { questionPack } from "./questionPack";

let questions = questionPack[Math.floor(Math.random() * 3)]
const gameInfo = {
    userName : null,
    userAnswer : '',
    userPasapalabra : 0,
    userWannaPlay : true,
    wordPlaying : 0,
    wordsAnswered : 0,
    wordsCorrect: 0,
    wordsTotal : questions.length,
    maxTime : 130000,
    ranking : [
      {player : 'Mark', score : 12},
      {player : 'Julia', score : 10},
    ],
    actualTime : null,
}

const resetGameInfo = () =>{
  gameInfo.userPasapalabra = 0;
  gameInfo.wordsAnswered = 0;
  gameInfo.wordsCorrect = 0;
  gameInfo.wordPlaying = 0;
}

const userName = () => { 
    const wellcome = `Hola! Bienvenido a Pasapalabra, porfavor introduce tu nombre`
    if (gameInfo.userWannaPlay == true){
          while(gameInfo.userName == '' || gameInfo.userName == null || gameInfo.userName == undefined){
          gameInfo.userName = prompt(wellcome)
        }
    resetGameInfo();
    alert(`usuario ${gameInfo.userName}`)
    return showRules();
    }
}

const showRules = () => {
  console.clear();
  alert(`Hola ${gameInfo.userName}, a continuación se te mostrará una definición de una palabra que deberás adivinar.
  \n-Cada acierto sumará un punto.\n-El tiempo maximo de la partida són ${gameInfo.maxTime/1000} segundos.\n
  -Cuando aparezcan las definiciones: 
          ·Escribe pasapalabra si no conoces la respuesta y quieres continuar con la siguiente.
          ·Escribe "end" para finalizar la partida actual.`);
}

const confirmPlay= () => {
  gameInfo.userWannaPlay = confirm(`Quieres empezar a jugar ${gameInfo.userName}?`)
  return gameInfo.userWannaPlay
}

const startGame = () => {
  gameTimer()
  while(gameInfo.userWannaPlay == true && gameInfo.wordsCorrect !=questions.length ){
      initRound()
  }
}

const gameTimer = () => {
  gameInfo.actualTime = Date.now()
}

const initRound = () => {
  if (gameInfo.wordsAnswered == gameInfo.wordsTotal){
    return gameInfo.userWannaPlay = false;
  }
  for ( letter in questions ){
    switch (true) {
      case gameInfo.actualTime + gameInfo.maxTime <= Date.now():
        alert('TIME`S UP!!');
        gameInfo.userWannaPlay = false;
        return;
      case gameInfo.wordsCorrect == gameInfo.wordsTotal:
        return;
      case questions[letter].status == 0:
        userAnswer();
        if (gameInfo.userAnswer === null || gameInfo.userAnswer == 'end'){
          gameInfo.userWannaPlay = false;
          return;
        }
        answerManager();
    }
  }
}


const userAnswer = () => {
    gameInfo.userAnswer = prompt(`${questions[letter].question}`);
    if (gameInfo.userAnswer != null){
      gameInfo.userAnswer = cleanString(gameInfo.userAnswer);
  };
};

const answerManager = () => {
  switch (gameInfo.userAnswer) {
    case `pasapalabra`:
      gameInfo.userPasapalabra +=1;
      alert(`Siguiente pregunta! \n
       ${gameInfo.wordsCorrect}/${gameInfo.wordsTotal} aciertos
       \n ${gameInfo.userPasapalabra} pasapalabras`);
      break;
    case questions[letter].answer:
      questions[letter].status = "succes";
      gameInfo.wordsCorrect += 1;
      gameInfo.wordsAnswered += 1; 
      alert(`Correcto! ${gameInfo.wordsCorrect}/${gameInfo.wordsTotal} aciertos`); 
      break;
    default:
      questions[letter].status = `fail`;
      gameInfo.wordsAnswered += 1; 
      alert(`Incorrecto, la respuesta correcta es: ${questions[letter].answer}`);
  }
};


const sortQuestions = () => {
  questions = questionPack[Math.floor(Math.random() * 3)];
  return gameInfo.wordsTotal = questions.length
}

const rankingPlayer = () => {
   let count = 0;
   for (letter in questions){
    if (questions[letter].status == `succes`){
      count +=1;
    };
    questions[letter].status = 0;
   }
   gameInfo.ranking.push({player : gameInfo.userName, score: count});
};

const showRanking= (gameInfo) => {
  rankingPlayer()
  console.log("Ranking:")
  for (let i = 0; i < gameInfo.ranking.length; i++) {
    console.log(`${i + 1} position. ${gameInfo.ranking[i].player}: ${gameInfo.ranking[i].score} points`)
  }
}


const cleanString = (string) => {
  string = string.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
  return string;
}

const fareWell = () => {
  console.log(`Gracias por utilizar ésta app`);
  return resetGameInfo();
}

const playAgain = () => {
 confirm(`Quieres volver a jugar?`) ?
  gameInfo.userWannaPlay = true : fareWell();
}

const initFunction = () => {
  do{
    userName()
    if(confirmPlay()== true){
        sortQuestions()
        startGame();
        showRanking(gameInfo);
      };
    playAgain();
    }while(gameInfo.userWannaPlay == true);
};

initFunction()