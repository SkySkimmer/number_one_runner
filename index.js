
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var child_process = require("sdk/system/child_process");

const { emit } = require('sdk/event/core');
 
pageMod.PageMod({
  include: ["http://www.animecubed.com/billy/bvs/numberone.html",
            "http://animecubed.com/billy/bvs/numberone.html"],
  contentScriptFile: "./pagescript.js",
  onAttach: function(worker) {
    worker.port.on("matches", function(matchdata) {
      var bot = child_process.spawn('/tmp/number_one_main', []);

      var results = "";
      bot.stdout.on('data', function(data) {
        console.log('got data from bot:\n' + data);
        results += data;
      });

      bot.on('close', function (code) {
        console.log('sending data to page:\n' + results);
        worker.port.emit("results", results);
      });

      emit(bot.stdin, 'data', matchdata);
      emit(bot.stdin, 'end');
    });
  }
});

