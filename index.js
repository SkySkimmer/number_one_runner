
var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
  include: ["http://www.animecubed.com/billy/bvs/numberone.html",
            "http://animecubed.com/billy/bvs/numberone.html"],
  contentScriptFile: "./pagescript.js"
});

/* //reminder of how to spawn
var child_process = require("sdk/system/child_process");

var ls = child_process.spawn('/bin/ls', ['-lh', '/']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});
*/

