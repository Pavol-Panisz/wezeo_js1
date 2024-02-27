let pcInput
let userInput
let isFirstRound = true // is this the first round of the current game?
let isFirstGame = true

const winningPoints = 5
const inputChoices = ["K", "P", "N"] 
const inputToWordMap = new Map([
    ["K", "kameň"],
    ["P", "papier"],
    ["N", "nožnice"]
]) 

let userPoints = 0
let pcPoints = 0

let matchResults = []
let matchResultStr = ""

let inputsUsedMap = new Map([
    ["K", 0],
    ["P", 0],
    ["N", 0]
])


// ------------------- game "loop" ---------------------------------------------


function onClickPlay()
{
    if (isFirstGame) firstGamePrompt()
    console.log("new round started")

    // generate the pc input
    pcInput = generatePcInput()

    // get the user input and cancel the game if they clicked "cancel"
    userInput = getUserInput()
    if (userInput === null) // null gets returned when the user clicks cancel 
    {
        console.log("game ended early because user cancelled out of the input prompt")
        return
    }
    console.log("user played " + userInput)

    // determine the round winner (pc / user / draw) and log the result
    let whoWonRound = determineRoundWinner(userInput, pcInput)

    // record the round result in an array
    recordRoundResult(whoWonRound, pcInput, userInput)

    // update the matchResultStr that is displayed in the lower right corner of the website
    updateResultHistory(whoWonRound, pcInput, userInput)
    displayResultHistory()

    // display the round winner in a prompt, update the score and also display it
    updateResult(whoWonRound)
    announceWinner(whoWonRound)
    displayScore()

    // if this round ends the game, display a follow-up prompt announcing the winner
    let gameEnded = (userPoints >= winningPoints || pcPoints >= winningPoints)
    if (gameEnded) { handleGameEnd() }

    // change the play button text based on whether the game was ended
    document.getElementById("play-button").innerHTML = gameEnded ? "Nová hra" : "Ďaľšie kolo"

    // increment the counters for which inputs got used and log this
    incrementInputsUsed(userInput, pcInput)
    
    console.log(gameEnded ? "game ended succesfully" : "round ended succesfully")
}


// ------------ individual functions ----------------------------------------------------

function firstGamePrompt()
{
    alert("Hra začína!\nDo nasledujúceho okienka zadaj buď \"K\", \"P\" alebo \"N\"pre\nkameň, papier alebo nožnice.") 
    isFirstGame = false;
}

function generatePcInput()
{
    let index = Math.floor(Math.random()*3) 
    pcInput = inputChoices[index]
    console.log("pc played " + pcInput)
    return pcInput
}

function getUserInput()
{
    let isValid = false
    let userInput

    while (!isValid)
    {
        userInput = window.prompt("Zadaj K/P/N", "")
        if (userInput === null) {
            break
        }

        userInput = userInput.toLowerCase()
        if (userInput == "k" || userInput == "p" || userInput == "n")
        {
            isValid = true
        }
        else
        {
            isValid = false
            alert("Chyba, máš zadať buď \"K\", \"P\" alebo \"N\".")
        }
    }

    if (!isValid) { return null }
    
    return userInput.toUpperCase()
}

function determineRoundWinner(userInput, pcInput)
{
    let whoWon = "user"
    if (userInput == pcInput) 
    {
        whoWon = "draw"
    }
    else if (
        (userInput == "K" && pcInput == "P") ||
        (userInput == "P" && pcInput == "N") ||
        (userInput == "N" && pcInput == "K"))
    {
        whoWon = "pc"
    }
    whoWon == "draw" ? console.log("the game ended in a draw") : console.log(whoWon + " won")
    return whoWon
}

function updateResult(whoWon) 
{
    if (whoWon == "user")
    {
        userPoints++
    }
    else if (whoWon == "pc")
    {
        pcPoints++
    }
}

function announceWinner(whoWon)
{
    if (whoWon == "user")
    {
        alert(`Vyhral/a si toto kolo!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`)
    }
    else if (whoWon == "pc")
    {
        alert(`Prehral/a si toto kolo!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`)
    }
    else 
    {
        alert(`Remíza v tomto kole!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`)
    }
}

function displayScore()
{
    document.getElementById("user-point-display").innerHTML = userPoints
    document.getElementById("pc-point-display").innerHTML = pcPoints
}

function incrementInputsUsed(userInput, pcInput) 
{
    inputsUsedMap.set(userInput, inputsUsedMap.get(userInput) + 1)
    inputsUsedMap.set(pcInput, inputsUsedMap.get(pcInput) + 1)
    console.log("updated the inputsUsedMap: " + 
        `{K: ${inputsUsedMap.get("K")}, P: ${inputsUsedMap.get("P")}, N: ${inputsUsedMap.get("N")}}`)
}

function recordRoundResult(whoWonRound, pcInput, userInput)
{
    result = {whoWonRound, pcInput, userInput}
    matchResults.push(result)
    console.log("adding to the match results array: " + `{whoWonRound: ${whoWonRound}, pcInput: ${pcInput}, userInput: ${userInput}}`)
}

function updateResultHistory(whoWonRound, pcInput, userInput) 
{
    if (isFirstRound)
    {
        matchResultStr += "new game<br>"
    }

    matchResultStr += "winner: " + whoWonRound + " | pc: " + pcInput + " | user: " + userInput + "<br>"
    isFirstRound = false;
}

function displayResultHistory() 
{
    let historyText = document.getElementById("history-text")
    historyText.innerHTML = matchResultStr
    historyText.scrollTop = historyText.scrollHeight - historyText.clientHeight

    document.getElementById("history-header").innerHTML = "History"
}

function handleGameEnd()
{
    alert(userPoints >= winningPoints ? "Vyhral/a si túto hru!" : "Prehral/a si túto hru :(")

    matchResultStr += "game ended. winner: " + (userPoints >= winningPoints ? "user" : "pc") + "<br>"
    displayResultHistory()

    pcPoints = 0
    userPoints = 0
    displayScore()
    isFirstRound = true
}