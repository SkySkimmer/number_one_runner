
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var child_process = require("sdk/system/child_process");
var url = require ("sdk/url")

const {Cu} = require("chrome");

// To read content from file
const {OS} = Cu.import("resource://gre/modules/osfile.jsm", {});


var bot_path = url.toFilename(self.data.url("number_one_main"));

OS.File.setPermissions(bot_path, {unixMode: 755});

const { emit } = require('sdk/event/core');
 
pageMod.PageMod({
  include: ["https://www.animecubed.com/billy/bvs/numberone.html",
            "https://animecubed.com/billy/bvs/numberone.html"],
  contentScriptFile: "./pagescript.js",
  onAttach: function(worker) {
    worker.port.on("matches", function(matchdata) {
      var bot = child_process.spawn(bot_path, []);

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

