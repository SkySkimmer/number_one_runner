//based on https://greasyfork.org/en/scripts/18136-n1bot-inputs

function N1Bot() {
    var matches = document.maction.querySelectorAll("td");
    var txts = "";
    for (var i = 0; i < matches.length; i++) {
        var selector = matches[i].querySelector("select");
        if (!selector) continue;
        // console.log(selector ? selector.name : "");
        //var powahs = matches[i].querySelectorAll("img");
        var txt = selector.name + matches[i].textContent;
        txt = txt.slice(0, txt.search("Your Action:"));
        txt = txt.slice(txt.search("HP"));
        txt = txt.replace(/\n/g, " ");
        //console.log(txt);
        txts += txt;
    }

  if(txts == "")
    return ;

  console.log("sending data to runner:" + txts);

  self.port.emit("matches", txts);

  var action_map = {
    "Reload": "1^0",
    "Block": "2^0",
    "Fire 1": "3^1",
    "Fire 2": "3^2",
    "Fire 3": "3^3",
    "Fire 4": "3^4",
    "Fire 5": "3^5",
    "Fire 6": "3^6"
  };
  var selectors = document.maction.querySelectorAll("select");
  
  self.port.on("results", function(data) {

    var myRegExp = /\: +(?:Autoload! )?(.+)/g; // the only thing this doesn't parse is "Reload (Game is already over)", which is a reload
    var i = 0;
    var match = myRegExp.exec(data);
    while (match != null) {
      if (i >= selectors.length) break;
      
      selectors[i++].value = action_map[match[1]] || "1^0";
      // console.log(match[1]);
      match = myRegExp.exec(data);
    } 
  });
}

if(/Your In-Progress Matches/.test(document.body.innerHTML))
  N1Bot();

self.port.on("replacePage", function(message) {
  document.body.innerHTML = "<h1>" + message + "</h1>";
});

