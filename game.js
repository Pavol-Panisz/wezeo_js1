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

function onClickPlay() 
{
    alert("Hra začína!\nDo nasledujúceho okienka zadaj buď \"K\", \"P\" alebo \"N\"pre\nkameň, papier alebo nožnice.")
    
    let index = Math.floor(Math.random()*3); 
    pcInput = inputChoices[index];
    
    userInput = getUserInput();

    // TODO CHECK IF THIS STILL HOLDS UP, so there isnt a better way to do it
    if (userInput === null)
    {
        return;
    }

    let whoWon = "user";
    if (userInput == pcInput) 
    {
        whoWon = "draw";
    }
    else if (
        (userInput == "K" && pcInput == "N") ||
        (userInput == "P" && pcInput == "K") ||
        (userInput == "N" && pcInput == "P"))
    {
        whoWon = "pc";
    }

    // record the match result in an array
    result = {whoWon, pcInput, userInput};
    matchResults.push(result);
    console.log(matchResults);

    if (whoWon == "user")
    {
        userPoints++;
        alert(`Vyhral/a si!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`);
    }
    else if (whoWon == "pc")
    {
        pcPoints++;
        alert(`Prehral/a si!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`);
    }
    else 
    {
        alert(`Remíza!\n\n(Ty: ${inputToWordMap.get(userInput)} | Počítač: ${inputToWordMap.get(pcInput)})`);
    }
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