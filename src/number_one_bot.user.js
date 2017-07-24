// ==UserScript==
// @name           BvS Number One Bot
// @namespace      SkySkimmer
// @description    Play BvS minigame Number One
// @version        5.0.2
// @include        http://*.animecubed.com/billy/bvs/numberone.html
// @include        https://*.animecubed.com/billy/bvs/numberone.html
// @require        lib.js
// @resource       states http://thedragonrider.free.fr/states.json
// @grant          GM_getResourceText
// ==/UserScript==


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
