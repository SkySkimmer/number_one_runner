#BvS Number One Bot Runner
Runs the binary number one bot for you

Dependencies: Mozilla jpm https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm#Installation

BvS Number One Bot 0.3 or later https://github.com/SkySkimmer/number_one

The bot executable is expected at `/tmp/number_one_main`
You can change that by editing the path in `index.js`
You should probably run it before using this extension so that the data file is generated.

How to try in a fresh firefox profile:
`$ jpm run -b (which firefox)`

How to build the xpi:
`$ jpm xpi`

Install the xpi by going to about:addons, clicking the gear and selecting install from file. Unsigned addons must be allowed.

Signed version: http://thedragonrider.free.fr/bvsn1runner.xpi
DOES NOT AUTO UPDATE
