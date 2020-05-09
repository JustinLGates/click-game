//#region User interface manipulation

function drawResources() {
  document.getElementById("gold").innerText = `Gold: ${player.gold}`;
  document.getElementById("stone").innerText = `resources: ${player.resources}`;
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

//#region game loop

//#endregion

/**
 *starts a new game
 */
function play(event) {
  event.preventDefault();
  let form = event.target;
  createPlayer(form.username.value);
  hide("start-menu");
  drawQuestButtons();
  setInterval(() => {
    player.resources += 1;
    drawResources();
    drawQuestButtons();
  }, 2000);
}

//todo remove this before relasing game it is to make a player
createPlayer("test player");

/**
 * creates a new player
 * @param {string} username
 */
function createPlayer(username) {
  player.clickCount = 1.3;
  player.name = username;
  player.gold = 1;

  player.resources = 1;
  document.getElementById("username").innerText = player.name;

  drawResources();
}
//#endregion

//#region game logic
/**
 * Adds the number passed to the associated resource and calls drawResources
 * @param {number} gold
 * @param {number} resources
 */
function addResource(gold = 0, resources = 0) {
  console.log(gold);

  player.gold += gold;
  player.resources += resources;
  drawResources();
}
/**
 * Subtracts the number passed to theassociated resource and calls drawResources
 * @param {number} gold
 * @param {number} resources
 *
 */
function subtractResource(gold = 0, resources = 0) {
  player.gold -= gold;
  player.resources -= resources;

  drawResources();
}

/**
 * pass a quest name to make calculations for the reward and cost of quest set img ect
 * @param {string} questName
 */
function goOnQuest(questName) {
  quests.find((q) => {
    if (q.name === questName) {
      player.resources -= q.resourceCost;
      addResource(q.reward);
      if (player.resources < q.resourceCost) {
        drawQuestButtons();
      }
    }
  });
}

//#endregion

class quest {
  constructor(name, reward, image, resourceCost) {
    this.name = name;
    this.reward = reward;
    this.image = image;
    this.resourceCost = resourceCost;
  }
}
let quest1 = new quest("Seach for resouces", 1, "//placehold.it/150", 0);
let quest2 = new quest("Picking some flowers", 2, "//placehold.it/150", 1);
let quest3 = new quest("Fight some critters", 3, "//placehold.it/150", 2);
let quest4 = new quest("Seach for tresure", 5, "//placehold.it/150", 4);
let quest5 = new quest("Look for a dragon", 7, "//placehold.it/150", 6);
let quest6 = new quest("Arange a battle", 16, "//placehold.it/150", 10);
let quests = [quest1, quest2, quest3, quest4, quest5, quest6];

function drawQuestButtons() {
  let template = "";
  for (let i = 0; i < quests.length; i++) {
    if (player.resources >= quests[i].resourceCost) {
      template += `<div class="upgrade-box p-2">
    <label for="pick">${quests[i].name}<br />cost: ${quests[i].resourceCost} </label><br />
    <button
    onclick="goOnQuest('${quests[i].name}')"
    class="btn btn-success" 
    >
    Quest
    </button>
    </div>`;
    } else {
      template += `<div class="upgrade-box p-2">
    <label for="pick">${quests[i].name}<br />cost: ${quests[i].resourceCost} </label><br />
    <button
    onclick="goOnQuest('${quests[i].name}')"
    class="btn btn-success" disabled
    >
    Quest
    </button>
    </div>`;
    }
    document.getElementById("quest-box").innerHTML = template;
  }
}
