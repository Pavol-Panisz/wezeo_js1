let pcInput;
let userInput;
const inputChoices = ["K", "P", "N"] ;
const inputToWordMap = new Map([
    ["K", "kameň"],
    ["P", "papier"],
    ["N", "nožnice"]
]); 

let userPoints = 0;
let pcPoints = 0;

let matchResults = [];
let matchResultStr = "";

let inputsUsedMap = new Map([
    ["K", 0],
    ["P", 0],
    ["N", 0]
]);

function onClickPlay() 
{
    alert("Hra začína!\nDo nasledujúceho okienka zadaj buď \"K\", \"P\" alebo \"N\"pre\nkameň, papier alebo nožnice.")
    console.log("new game started");

    // generate the pc input
    let index = Math.floor(Math.random()*3); 
    pcInput = inputChoices[index];
    console.log("pc played " + pcInput);

    // get the user input and cancel the game if they clicked "cancel"
    userInput = getUserInput();
    if (userInput === null) // null gets returned when the user clicks cancel 
    {
        console.log("game ended early because user cancelled out of the input prompt");
        return;
    }
    console.log("user played " + userInput);

    // determine the winner (pc / user / draw) and log the result
    let whoWon = determineWinner(userInput, pcInput);

    // record the match result in an array
    result = {whoWon, pcInput, userInput};
    matchResults.push(result);
    console.log("adding to the match results array: " + `{whoWon: ${whoWon}, pcInput: ${pcInput}, userInput: ${userInput}}`);

    // update the matchResultStr that is displayed in the lower right corner of the website
    updateResultHistory(whoWon, pcInput, userInput);

    // display the winner in a prompt, update the score and also display it
    updateAndDisplayResult(whoWon);

    // after the game is done, change the button text
    document.getElementById("play-button").innerHTML = "Hrať znova";

    // increment the counters for which inputs got used and log this
    incrementInputsUsed(userInput, pcInput)
    
    console.log("game ended succesfully");
}

function getUserInput()
{
    let isValid = false;
    let userInput;

    while (!isValid)
    {
        userInput = window.prompt("Zadaj K/P/N", "");
        if (userInput === null) {
            break;
        }

        userInput = userInput.toLowerCase();
        if (userInput == "k" || userInput == "p" || userInput == "n")
        {
            isValid = true;
        }
        else
        {
            isValid = false;
            alert("Chyba, máš zadať buď \"K\", \"P\" alebo \"N\".");
        }
    }

    if (!isValid) { return null; }
    
    return userInput.toUpperCase();
}

function determineWinner(userInput, pcInput) 
{
    let whoWon = "user";
    if (userInput == pcInput) 
    {
        whoWon = "draw";
    }
    else if (
        (userInput == "K" && pcInput == "P") ||
        (userInput == "P" && pcInput == "N") ||
        (userInput == "N" && pcInput == "K"))
    {
        whoWon = "pc";
    }
    whoWon == "draw" ? console.log("the game ended in a draw") : console.log(whoWon + " won");
    return whoWon;
}

function updateAndDisplayResult(whoWon) 
{
    if (whoWon == "user")
    {
        userPoints++;
        document.getElementById("user-point-display").innerHTML = userPoints;
        alert(`Vyhral/a si!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`);
    }
    else if (whoWon == "pc")
    {
        pcPoints++;
        document.getElementById("pc-point-display").innerHTML = pcPoints;
        alert(`Prehral/a si!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`);
    }
    else 
    {
        alert(`Remíza!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`);
    }
}

function incrementInputsUsed(userInput, pcInput) 
{
    inputsUsedMap.set(userInput, inputsUsedMap.get(userInput) + 1);
    inputsUsedMap.set(pcInput, inputsUsedMap.get(pcInput) + 1);
    console.log("updated the inputsUsedMap: " + 
        `{K: ${inputsUsedMap.get("K")}, P: ${inputsUsedMap.get("P")}, N: ${inputsUsedMap.get("N")}}`);
}

function updateResultHistory(whoWon, pcInput, userInput) 
{
    matchResultStr += "winner: " + whoWon + " | pc: " + pcInput + " | user: " + userInput + "<br>";
    let historyText = document.getElementById("history-text");
    historyText.innerHTML = matchResultStr;
    historyText.scrollTop = historyText.scrollHeight - historyText.clientHeight;

    document.getElementById("history-header").innerHTML = "History";
}