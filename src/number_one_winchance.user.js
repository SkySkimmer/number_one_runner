// ==UserScript==
// @name           BvS Number One Win Chances
// @namespace      SkySkimmer
// @description    Display chance to win Number One games
// @version        1.0.1
// @include        http://*.animecubed.com/billy/bvs/numberone.html
// @include        https://*.animecubed.com/billy/bvs/numberone.html
// @require        lib.js
// @resource       wins http://thedragonrider.free.fr/n1wins.txt
// @grant          GM_getResourceText
// ==/UserScript==

function doGame(wins, elmt) {
    var state = parseGame(elmt);
    var chance = Math.round(100 * get_winchance(wins, state));

    // we insert an <hr> and the winchance info before the <hr> which
    // follows the round number
    var ref = elmt.getElementsByTagName("hr")[2];

    // put in the <hr>
    var myhr = document.createElement("hr");
    ref.parentNode.insertBefore(myhr, ref);

    var winb = document.createElement("b");
    var wintxt = document.createTextNode("Win: ");
    ref.parentNode.insertBefore(winb, ref);
    winb.appendChild(wintxt);

    var chancenode = document.createTextNode("" + chance + "%");
    ref.parentNode.insertBefore(chancenode, ref);
}

function main() {
    var wins = GM_getResourceText("wins");

    var matches = document.forms["maction"].querySelectorAll("td");
    for (var i = 0; i < matches.length; i++) {
        doGame(wins, matches[i]);
    }

}

if(/Your In-Progress Matches/.test(document.body.innerHTML))
    main();
