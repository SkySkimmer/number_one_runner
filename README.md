# BvS Number One Bot Runner
Runs the binary number one bot for you

## Installing the extension

Install from https://addons.mozilla.org/en-US/firefox/addon/bvs-number-one-bot-runner/

## Building the extension

This is a firefox "web-extension", see mozilla's docs.

You must generate a json data file containing game solutions.
Get https://github.com/SkySkimmer/number_one and run it as

    number_one_main | tr -s "[:space:]" | sed 's/ //g' > states.json

(the `tr` and `sed` aren't necessary, they just make it smaller.)

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

## Development

The code has some comments. Don't hesitate to make an issue if you
have any question, feature request or bug report. You can also make a
pull request if you implemented your own features.

## TODO

* add win chance to the json and display it in the browser
* implement the fallback for lost games (assume the opponent will make
  a mistake and avoid their 100% win moves)
