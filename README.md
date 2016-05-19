# Slack classebot

A slack bot, with the american class !

## Requirements

You'll need :
 * npm
 * nodejs >= 5.0.0

## Installation

 * Create a bot : https://slack.com/apps/build/custom-integration
 * clone the project
 * cd in the directory
 * run "npm install"  
 * copy config.json.sample to config.json  
 * edit config.json to meet your correct's bot settings  

## Tests

run ``npm test``

Coverage informations should be displayed. They only concern the lib/ directory.  

More details on coverage can be found in the coverage/directory.  
coverage/lcov-report/index.html can be viewed in a browser to see the exact coverage.  

## Running the bot

run ``npm start``

The bot should get connected to your slack chat.  
You can start talking with it

## Quotes
``quotes.txt.sample`` can help you create your own ``quotes.txt``.  
You can put quotes.txt wherever you want, and set its path in ``config.json``:  
 * "quotesPath": "quotes.txt"  

The file ``quotes.txt`` must contain all the quotes available.  

Each line, in this file, is presented as follow :  
``keyword, other_keywod|The real quote``
 * a list of keywords, comma separated
 * a pipe ``|``, to separate
 * a sentence (or group of sentences), corresponding to the actual quote
