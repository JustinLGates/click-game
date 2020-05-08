//#region User interface manipulation

function drawResources() {
  document.getElementById("gold").innerText = `Gold: ${player.gold}`;
  document.getElementById("stone").innerText = `Stone: ${player.stone}`;
  document.getElementById("wood").innerText = `wood: ${player.wood}`;
}

/**
 * takes an element name and adds hidden class to argument
 * must be an elements id
 * @param {string} elementName
 */
function hide(elementName) {
  document.getElementById(elementName).classList.add("hidden");
}

/**
 * removes the hidden class from the argument
 * must be an elements id
 * @param {string} elementToShow
 *
 */
function show(elementToShow) {
  document.getElementById(elementToShow).classList.remove("hidden");
  if (elementToShow === "quest") {
    hide("upgrades");
  } else if (elementToShow === "upgrades") {
    hide("quest");
  }
}
//#endregion
//#region initalizing the player and starting the game

let player = {};
let quest = {};

/**
 *starts a new game
 */
function play(event) {
  event.preventDefault();
  let form = event.target;
  createPlayer(form.username.value);
  hide("start-menu");
}
//todo remove this before relasing game it is to make a player
createPlayer("test player");
/**
 * creates a new player
 * @param {string} username
 */
function createPlayer(username) {
  player.name = username;
  player.gold = 0;
  player.wood = 0;
  player.stone = 0;

  document.getElementById("username").innerText = player.name;
  drawResources();
}
//#endregion
