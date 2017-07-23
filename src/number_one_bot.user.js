// ==UserScript==
// @name           BvS Number One Bot
// @namespace      SkySkimmer
// @description    Play BvS minigame Number One
// @version        5.0.1
// @include        http://*.animecubed.com/billy/bvs/numberone.html
// @include        https://*.animecubed.com/billy/bvs/numberone.html
// @require        lib.js
// @resource       states http://thedragonrider.free.fr/states.json
// @grant          GM_getResourceText
// ==/UserScript==

//based on https://greasyfork.org/en/scripts/18136-n1bot-inputs

/* A game is displayed in a big <td> whose text goes
   Tier X Event
   Battle Y
   You (win-loss)
   HP: $HP1
   Ammo: $bullets1
   Fatigue: $fatigue1
   Power: Prep|Catch|Pierce|Aura
   <hr>
   P2name
   $P2block (same as P1)
   <hr>
   Round $round
   <hr>

   then some stuff about previous actions,
   then <select> elements to input actions, going
   P1 first move - if P2 reloads - if P2 blocks - if P2 fires 1 to P2 bullets
   The values are according to action_map below.

   We need to parse the 2 player blocks + the round count, send the
   resulting game state to the background script then use the response
   to fill in the selects.
*/
var action_map = {
    "-1": "1^0",
    "0": "2^0",
    "1": "3^1",
    "2": "3^2",
    "3": "3^3",
    "4": "3^4",
    "5": "3^5",
    "6": "3^6"
};

var power_map = {
    "Prep": 0,
    "Catch": 1,
    "Pierce": 2,
    "Aura": 3
}

function parseGame(elmt) {
    var txt = elmt.textContent;

    var state = {p1:{}, p2:{}};

    var hp_patt = /HP: (\d)/g;
    state.p1.hp = parseInt(hp_patt.exec(txt)[1]);
    state.p2.hp = parseInt(hp_patt.exec(txt)[1]);

    var bullet_patt = /Ammo: (\d)/g;
    state.p1.bullets = parseInt(bullet_patt.exec(txt)[1]);
    state.p2.bullets = parseInt(bullet_patt.exec(txt)[1]);

    var fatigue_patt = /Fatigue: (\d)/g;
    state.p1.fatigue = parseInt(fatigue_patt.exec(txt)[1]);
    state.p2.fatigue = parseInt(fatigue_patt.exec(txt)[1]);

    var pow_patt = /Power: (\w+)/g;
    state.p1.type = power_map[pow_patt.exec(txt)[1]];
    state.p2.type = power_map[pow_patt.exec(txt)[1]];

    var round_patt = /Round (\d+)/;
    state.round = parseInt(round_patt.exec(txt)[1]);

    return state;
}

// go from the index in the list of selectors for a game to the property name in a strategy
function semantic_index(i) {
    if (i == 0)
        return "p1Move";

    // first doubletime action is reload which is -1, minus offset
    // from initial action we need 1 => -1
    i -= 2;

    return i.toString();
}

function botGame(states, elmt) {
    var selects = elmt.querySelectorAll("select");
    if (!selects || selects.length == 0) {
        // nothing to do
        return ;
    }

    var state = parseGame(elmt);
    var strat = get_doubletime_strat(states, state);
    for(var i=0; i < selects.length; i++) {
        var index = semantic_index(i);
        selects[i].value = action_map[strat[index]];
    }
}

function N1Bot() {
    var states = GM_getResourceText("states");

    var matches = document.forms["maction"].querySelectorAll("td");
    for (var i = 0; i < matches.length; i++) {
        botGame(states, matches[i]);
    }
}

if(/Your In-Progress Matches/.test(document.body.innerHTML))
  N1Bot();
