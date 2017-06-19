
var states = {};

fetch("states.json.bin").then(function (resp) {
    resp.json().then(function (data) {
        states = data;
    });
});

browser.runtime.onMessage.addListener(function(s, sender, respond) {
    console.log("runner got data from page: " + JSON.stringify(s));

    var strat = get_doubletime_strat(states, s);
    console.log("decided on strat: " + JSON.stringify(strat));

    respond(strat);
});
