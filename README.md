# BvS Number One Bot Runner
Runs the binary number one bot for you (Greasemonkey version)

## Installing the userscript

You need Greasemonkey or any similar tool which supports `@resourse`. Then just click the following link:
https://github.com/SkySkimmer/number_one_runner/raw/greasemonkey/src/number_one_bot.user.js

It will automatically download the lib.js from this repository and http://thedragonrider.free.fr/states.json (around 25MB).

## Building the states.json

To build from scratch, you must generate a json data file containing
game solutions.

Get https://github.com/SkySkimmer/number_one (version 0.6.0 or later)
and compile and run it.

It should say "N1 bot generator". If it only says "N1 bot" you have the wrong version.

Do `less states.json` and `tail states.json` to check that it looks
OK: the beginning should be like

    {
    "836413":{
    "-1":0,
    "0":0,
    "1":0,
    "2":0,
    "3":0,
    "4":0,
    "5":0,
    "6":1
    },

and the end like

    "213200":{
    "-1":0.286186,
    "0":0.525691,
    "1":0.188123
    }
    }

Remember to modify the user.js so that the @resource URL points to your states.json.

## Development

The code has some comments. Don't hesitate to make an issue if you
have any question, feature request or bug report. You can also make a
pull request if you implemented your own features.

## TODO

* add win chance to the json and display it in the browser
* implement the fallback for lost games (assume the opponent will make
  a mistake and avoid their 100% win moves)

# Number One Win Chance Display

## Installing the userscript

You need Greasemonkey or any similar tool which supports `@resourse`. Then just click the following link:
https://github.com/SkySkimmer/number_one_runner/raw/greasemonkey/src/number_one_winchance.user.js

It will automatically download the lib.js from this repository and http://thedragonrider.free.fr/n1wins.txt (around 5MB).

## Building the n1wins.txt

To build from scratch, you must generate a text file containing game
solutions.

Just get https://github.com/SkySkimmer/number_one (version 0.6.0 or
higher) and compile and run it.

Remember to modify the user.js so that the `@resource` URL points to
your own n1wins.txt.
