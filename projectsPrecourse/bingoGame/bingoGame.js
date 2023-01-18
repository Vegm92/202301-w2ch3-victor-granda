let bombo = 0; let carta = []; let historialBombo = [];
let rows = []; let counterRows = {first: 0, second: 0, third: 0}
// // let isBingo = false, playBingo = false, nextTurn = false;
// // let user = "", puntuation = 1000, matches = 0, turns = 0;
const bingoDisplay = {
    isBingo : false, 
    playBingo : true,
    nextTurn : false,
}
let keepPlaying = !bingoDisplay.isBingo && bingoDisplay.playBingo

const userDisplay = {  

    user : "", 
    puntuation : 1000, 
    matches : 0, 
    turns : 0, 
   
}

const leaderBoard = () =>{

    const board = new Map([["Maria", 500], ["Victor", 600], ["Roberto", 700], ["Anna", 800]])
    if (bingoDisplay.isBingo == true){board.set(userDisplay.user, userDisplay.puntuation)}
    const sortedLeaderBoard = new Map([...board].sort((a, b) => b[1] - a[1]));
    console.log("------------------------LEADERBOARD------------------------") 
    return sortedLeaderBoard.forEach((value, key) => {console.log(`${key} => ${value} puntos!`)
      })
}

const wellcome = () =>{

    userDisplay.user = prompt(`Hola! Por favor introduce tu nombre`)
    while (userDisplay.user === null || userDisplay.user === undefined || userDisplay.user.match(/\d+/) || userDisplay.user === "") {
        alert("Debes introducir un nombre válido")
        userDisplay.user = prompt("Introduce tu nombre.")
    }
    alert(`Saludos ${userDisplay.user}!`)
    if (confirm("Quieres jugar al bingo?")){
        console.log("Iniciando bingo...");
        bingoDisplay.playBingo = true;
        return 
    } else {
        confirm("Quieres salir?")
        fareWell();
        return 
    }
}

const bingoCard = () =>{
    let randomNum = 0
    for (let i = 1; carta.length < 15; i++) {
        randomNum = getRandomNumber(1, 25)        
        if(carta.includes(randomNum)) { i--; randomNum = 0
        } else {carta.push(randomNum)} 
    }  
    alert(`Tu carta de juego es:\n ${getRows()} `) /* ${carta.join('  ')} */
    if(confirm("Quieres otro cartón de juego distinto?")){
        carta = [];
        return bingoCard(1,16)
    }
}

const getRows = () => { 
    let firstRow = new Array ( carta.slice(0, 5).join(" ")) ;
    let secondRow = new Array (carta.slice(5, 10).join(" "));
    let thirdRow = new Array (carta.slice(10, 15).join(" "));
    rows = [firstRow, secondRow, thirdRow];
    return [`${firstRow} \n ${secondRow} \n ${thirdRow}`];
}


const checkLinesRows = () => { 
    let row1 = carta.slice(0,5)
    let row2 = carta.slice(5,10)
    let row3 = carta.slice(10,15)
    if (!row1.some(Number) && counterRows.first === 0) {
        counterRows.first++
        return console.log("------------------------LINEA FILA 1------------------------")
    }
    if (!row2.some(Number) && counterRows.second === 0){
        counterRows.second++
        return console.log("------------------------LINEA FILA 2------------------------")
    }
    if (!row3.some(Number)&& counterRows.third === 0){
        counterRows.third++
        return console.log("------------------------LINEA FILA 3------------------------")
    }
}



function getRandomNumber(min, max){
    while (bingoDisplay.playBingo && !bingoDisplay.isBingo) {
        const number = Math.floor(Math.random() * (max - min +1)) + min;
        return number;
    }  
}

const bomboRandom = (min, max) =>{
    let pulledNumbers = 0
    do{
        pulledNumbers = getRandomNumber(1, 25);
        while (!historialBombo.includes(pulledNumbers) && bingoDisplay.playBingo) {
            historialBombo.push(pulledNumbers)
            bombo = pulledNumbers;
            return alert (`Número sacado del bombo es: \n el ${pulledNumbers}`) 
        }
        if (historialBombo.includes(pulledNumbers) && bingoDisplay.playBingo){
           return bomboRandom();
        }
    }
    while (carta.length == 18 && !bingoDisplay.isBingo && bingoDisplay.playBingo)
}

const matchNumBombo = () =>{
    const index = carta.indexOf(bombo);   
    carta.forEach(element => {
        if (element == bombo){
            carta[index] = "X"                
            console.log(`* Genial! El ${bombo} ésta en tu cartón de juego: \n ${getRows()}`) /* porsiaca ${carta.join(' ')} */
            userDisplay.matches ++;
            }
        if (index === -1 && bombo !== 0){
             console.log(`Lástima! \n el número ${bombo} no está en tu carta`)
            }
        });    
}

const newTurn = () =>{
    while(!bingoDisplay.isBingo && bingoDisplay.playBingo){
        if (confirm("¿Quieres sacar otra bola?")){
        userDisplay.turns ++;
        userDisplay.puntuation -= 15;
        bingoDisplay.nextTurn = true;
        return console.clear();
        }else {
            bingoDisplay.nextTurn = false
        return fareWell()
        }  
        
    }
    // let seguir = false;
    // if (confirm("¿Quieres sacar otra bola?")){
    //     seguir = true;
    //     userDisplay.turns ++;
    //     userDisplay.puntuation -= 15;
    //     bingoDisplay.nextTurn = true;
    //     return console.clear();
    // } else {
    //         bingoDisplay.nextTurn = false
    //     return fareWell()
    //     }  
}
const refreshConsole = () =>{
console.log(`\n \n \n \n \n Ok ${userDisplay.user}, vas por el turno ${userDisplay.turns}, con ${userDisplay.matches} aciertos y ${userDisplay.puntuation} puntos.`);
}

const bingoWin = () =>{
    if(userDisplay.matches === 15){
        alert(`Bingo!`);
        bingoDisplay.isBingo = true;
        bingoDisplay.playBingo = false
       return endBingoCard();
    } else if(!bingoDisplay.isBingo) {
        return newTurn();
    }
}

const endBingoCard = () =>{
     console.log(`¡¡ Genial ${userDisplay.user}, has completado tu cartón en ${userDisplay.turns} turnos, felicidades!!`)
     leaderBoard();
     return console.log(`Gracias por jugar ${userDisplay.user}!`)
      
}

const tutorialPuntuation = () =>{
    return  console.log(`La puntuación inicial es de ${userDisplay.puntuation} \n y por cada turno se irá restando 15puntos. \n el jugador con más puntuación, ganará.`)
}

const fareWell = () =>{
    let goodBye = `Adiós ${userDisplay.user}, gracias por jugar!`

    if (confirm("Confirma para salir")){
        bingoDisplay.playBingo = false
       return console.log(goodBye);
    } else{
        if (confirm("Reiniciar el juego?")){
            return initGame()
        }else {
            return console.log(goodBye); 
        }
    }

}

const initGame = () =>{
   wellcome();
   leaderBoard();
   switch (bingoDisplay.playBingo) {
    case true:
        tutorialPuntuation(), bingoCard(),bingo();
        break;
    case false:
        if(!bingoDisplay.playBingo){
            fareWell();
        }
        break;
   }
}

const bingo = () =>{
   do{
    console.log(keepPlaying); 
    console.log(`${userDisplay.user} tu puntuación: ${userDisplay.puntuation} \n y aciertos: ${userDisplay.matches}`)
    console.log(`${getRows()}`);
    matchNumBombo(), checkLinesRows(), bingoWin(), bomboRandom();
    } while (!bingoDisplay.isBingo && bingoDisplay.nextTurn && bingoDisplay.playBingo)   
}
initGame();