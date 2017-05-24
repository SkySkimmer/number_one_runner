

browser.runtime.onMessage.addListener(function(matchdata, sender, respond) {
    console.log("runner got data from page");

    var bot = browser.runtime.sendNativeMessage("number_one", matchdata);

    bot.then(function(msg) {
        console.log('runner got data from bot:\n' + msg);
        respond(msg);
    },
             function (e) { console.log("bvsn1runner: got error from binary"); });

    return true;
});
