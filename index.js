/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
// import { ConnectionReadyEvent } from 'mongodb';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/************************************************************************************
 * Bonus: Search bar function that looks up game name
 */
document.addEventListener("DOMContentLoaded", function()
{
    const searchBar = document.getElementById("srchBar");

    searchBar.addEventListener("input", function()
    {
        searchName();
    });

    function searchName()
    {
    console.log("Search function called");
    let search = document.getElementById("srchBar").value;
    search = search.toLowerCase();
    let cards = document.getElementsByClassName("game-card");
    for (let i = 0; i < cards.length;i++)
    {
        let cardText = cards[i].textContent.toLowerCase();
        cardText = cardText.trim();
        console.log(cardText);
        if (cardText.includes(search))
        {
            cards[i].style.display = "initial";
        }
        else
        {
            cards[i].style.display = "none";
        }
    }
}
});




/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        for(let i = 0; i < games.length;i++)
            {
                // create a new div element, which will become the game card
                const game = document.createElement("div");

                // add the class game-card to the list
                game.classList.add("game-card");

                // set the inner HTML using a template literal to display some info 
                // about each game
                // TIP: if your images are not displaying, make sure there is space
                // between the end of the src attribute and the end of the tag ("/>")
                const info = `
                    <h2> ${games[i].name} </h2>
                    <p> ${games[i].description} </p>
                    <p> Goal: $${games[i].goal} </p>
                    <p> Backers: ${games[i].backers} </p>
                    <p> Pledged: $${games[i].pledged} </p>
                    <img src= " ${games[i].img}" alt="Game preview" class="game-img">
                `;
                game.innerHTML = info;

                // append the game to the games-container
                gamesContainer.appendChild(game);
            }
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

    // use reduce() to count the number of total contributions by summing the backers
    const totalContributions = GAMES_JSON.reduce( (total,game) => 
    {
        return total + game.backers;
    }, 0);
    
    // set the inner HTML using a template literal and toLocaleString to get a number with commas
    
    contributionsCard.innerHTML = `$${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (total,game) => 
    {
        return total + game.pledged;
    }, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML

const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let filtered = GAMES_JSON.filter(function(game)
    {
    // creates an array of filtered items
        return game.pledged < game.goal;

        // use the function we previously created to add the unfunded games to the DOM
    });
    addGamesToPage(filtered);
}

document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have met or exceeded their goal
    let filtered = GAMES_JSON.filter(function(game)
    {
        return game.pledged >= game.goal;

        // use the function we previously created to add the unfunded games to the DOM
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(filtered);
}
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

document.getElementById("all-btn").addEventListener("click", showAllGames);

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let filtered = GAMES_JSON.filter(function(game)
    {
    // creates an array of filtered items
        return game.pledged < game.goal;
    });
let numUnfunded = filtered.length;
// create a string that explains the number of unfunded games using the ternary operator
const displayStrOne = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length}
 games. Currently, ${numUnfunded } game remains unfunded. We need your help to fund these amazing games!`;

const displayStrOther = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length}
games. Currently, ${numUnfunded } games remain unfunded. We need your help to fund these amazing games!`;

// This ternary operator checks if numUnfunded is 1. If it is then displayStrOne is shown. If it's anything but that, then displayStrOther is shown.
let displayFinal = `${numUnfunded === 1 ? displayStrOne : displayStrOther}`;


// create a new DOM element containing the template string and append it to the description container
const description = document.createElement("p");
description.innerHTML = displayFinal;
descriptionContainer.appendChild(description);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// sortedGames is an array/list of games with the ones with highest pledges at the start.
const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledge = document.createElement("p");
topPledge.innerHTML = firstGame.name;
firstGameContainer.appendChild(topPledge);

// do the same for the runner up item
const runnerPledge = document.createElement("p");
runnerPledge.innerHTML = secondGame.name;
secondGameContainer.appendChild(runnerPledge);
