const $valueEnter =  document.querySelector("#enterValue");
const $confirmBtn = document.querySelector("#confirmBtn");

$confirmBtn.addEventListener("click", confirmAction);
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") { confirmAction() };
});

// setup
const choices = {
    "day": "",
    "month": "",
    "now": "month",
    "type": ""
};

const month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const poke_type1 = { 'january':  'ground', 'february': 'fighting', 'march': 'normal', 'april': 'steel', 'may': 'flying', 'june': 'psychic', 'july': 'normal', 'august': 'ground', 'september': 'flying', 'october': 'psychic', 'november': 'fighting', 'december': 'steel' };

const poke_type2 = ['electric', 'fairy', 'normal', 'dark', 'dragon', 'ice', 'bug', 'poison', 'electric', 'fairy', 'ghost', 'dark', 'fire', 'grass', 'water', 'ice', 'electric', 'bug', 'poison', 'rock', 'fairy', 'ghost', 'dark', 'normal', 'grass', 'fire', 'dragon', 'water', 'ice', 'poison', 'rock'];


const pokemoji = { 'electric': '💡', 'dark': '🌙', 'bug': '🐛', 'fairy': '🧚', 'fire': '🔥', 'ice': '🧊', 'poison': '💀', 'ghost': '👻', 'grass': '🌱', 'water': '💧', 'rock': '🪨', 'normal': '🐻', 'dragon': '🐲', 'flying': '🦅', 'ground': '🦔', 'fighting': '🥊', 'steel': '🗡️', 'psychic': '🔮'};

function render(screen) {
    if (screen == "bday") {
      let listItems = "";
      for(i = 1; i <= 31; i++) {
        listItems += `<option value="${i}">${i}</option>`;
      }

      $valueEnter.innerHTML = `
          <div>
          <h2>What day were you born in?</h2>
          <select name="select" id="bday" class="enterValueInput">
          ${listItems}
          </select>
          </div>
      `;
    }
    else if (screen == "month") {
      let listItems = "";
      /* same code, but with "For".
        for(i = 0; i <= (12 - 1); i++) {
          listItems += `<option value="${i}">${month[i].toUpperCase()}</option>`
      }*/

      month.forEach((elem, i) => {
        listItems += `<option value="${i}">${elem.toUpperCase()}</option>`;
      });

      $valueEnter.innerHTML = `
          <div>
          <h2>What month were you born in?</h2>
          <select name="select" id="mborn" class="enterValueInput">
          ${listItems}
          </select>
          </div>
      `;
    }
    else if (screen == "poketypeView") {
      $confirmBtn.value = "Try Again";
      $valueEnter.innerHTML = `
          <div>
              <h2>Your pokémon type is:</h2>
              <p>${pokemoji[choices.type[0]]} ${choices.type[0]} / ${pokemoji[choices.type[1]]} ${choices.type[1]}</p>
          </div>
      `;
    }
    else console.error("pickValue Function: ", "The value doesn't exist or has not been passed to the function.");
}

function pickValue(valueType) {

    if (valueType == "month") {
        choices.month = month[document.querySelector("#mborn").value];
        choices.now = "bday";
        render(choices.now);
        console.log(choices);
    }
    else if (valueType == "bday") {
        choices.day = Number(document.querySelector("#bday").value);
        choices.now = "poketypeView";
        check();
        render(choices.now);
        console.log(choices);
    }
    else if (valueType == "poketypeView") {
        // nothing???? 
        start();
    }
    else console.error("pickValue Function: ", "The value doesn't exist or has not been passed to the function.");
}

function check() { choices.type = [poke_type1[choices.month], poke_type2[choices.day - 1]] };

function start() {
    $confirmBtn.value = "Continue";
    choices.now = "month";
    render("month");
};

function confirmAction() { pickValue(choices.now) };

start();

