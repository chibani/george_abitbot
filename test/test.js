'use strict';

let ClasseBot = require('../lib/classebot');
let assert = require('chai').assert;

let testSettings = {
    token: 'xoxb-36189534368-425zIfnbgD4J1urNWtNAnmMR',
    name: 'Georges Abitbol',
    quotesPath: 'test/quotes.txt',
    keywords:['george','classe']
};

describe('ClasseBot', ()=>{
    let bot = new ClasseBot(testSettings);

    describe('constructor', ()=>{
        it('should load the bot settings properly', ()=>{
            assert.equal(bot.settings, testSettings);
        });
    });

    describe('_loadQuotes', ()=>{
        it('should load quotes from a text file', ()=>{
            assert.lengthOf(bot.quotes, 3);
            assert.lengthOf(bot.quotes[0].keywords, 0);
            assert.lengthOf(bot.quotes[1].keywords, 2);
            assert.lengthOf(bot.quotes[2].keywords, 3);
            assert.equal(bot.quotes[0].text, 'Ceci est une première citation');
        });
    });


    describe('_indexQuotes', ()=>{
        it('should index the quotes by their keywords', ()=>{
            assert.property(bot.quotesIndex, 'seconde');
            assert.property(bot.quotesIndex, 'puissante');
            assert.property(bot.quotesIndex, 'dernière');

            assert.lengthOf(bot.quotesIndex['seconde'], 1);
            assert.lengthOf(bot.quotesIndex['puissante'], 2);

        });
    });

    describe('_getQuotesByKeyword', function(){
        it('should return the right quotes by keyword for a given keyword', ()=>{
            assert.lengthOf(bot._getQuotesByKeyword({text:'rien'}), 0);
            assert.lengthOf(bot._getQuotesByKeyword({text:'puissante'}), 2);
        });
        it('should return the right quotes by keyword for a given sentence', ()=>{
            assert.lengthOf(bot._getQuotesByKeyword({text:'une phrase pour rien'}), 0);
            assert.lengthOf(bot._getQuotesByKeyword({text:'une citation puissante, s\'il vous plait'}), 3);
        });
    });


    // bot.run();
    // describe('_loadBotUser', ()=>{
    //
    //     it('should load the bot user properly', ()=>{
    //         //assert.equals(bot.user.name, 'Georges Abitbol');
    //     });
    // });

    describe('_is*', ()=>{
        it('should recognize a chat message', ()=>{
            assert.isFalse( bot._isChatMessage({type:'not a message', text:'AAA'}) );
            assert.isFalse( bot._isChatMessage({type:'message', text:''}) );
            assert.isTrue( bot._isChatMessage({type:'message', text:'AAA'}) );
        });

        it('should recognize a channel conversation', ()=>{
            assert.isFalse( bot._isChannelConversation({}) );
            assert.isFalse( bot._isChannelConversation({channel:'A1234'}) );
            assert.isTrue( bot._isChannelConversation({channel:'CisAChannel'}) );
        });

        // it('should recognize bot\'s own message', ()=>{
        //     assert.isFalse( bot._isFromClasseBot({}) );
        //     assert.isFalse( bot._isFromClasseBot({channel:'A1234'}) );
        //     assert.isTrue( bot._isFromClasseBot({channel:'CisAChannel'}) );
        // });

        it('should detect a message, with the text',()=>{
            assert.isFalse(bot._isEqual({type:'message'}, 'AAA'));
            assert.isFalse(bot._isEqual({type:'message', text: 'AAA'}, null));
            assert.isFalse(bot._isEqual({type:'message', text: 'AAA'}, 'BBB'));
            assert.isTrue(bot._isEqual({type:'message', text: 'AAA'}, 'AAA'));
        });

        it('should detect "George"',()=>{
            assert.isFalse(bot._containsKeyword({type:'message', text: 'AAA'}));
            assert.isFalse(bot._containsKeyword({type:'message', text: 'salut georgeabitbol'}));
            assert.isTrue(bot._containsKeyword({type:'message', text: 'george'}));
            assert.isTrue(bot._containsKeyword({type:'message', text: 'Alors voilà george Abitbol !'}));
            assert.isTrue(bot._containsKeyword({type:'message', text: 'George est un fasciste de merde, un fasciste de merde !'}));
        });


        it('should detect "classe"',()=>{
            assert.isFalse(bot._containsKeyword({type:'message', text: 'AAA'}));
            assert.isFalse(bot._containsKeyword({type:'message', text: 'joli classement'}));
            assert.isTrue(bot._containsKeyword({type:'message', text: 'Voilà l\'homme le plus classe du monde !'}));
            assert.isTrue(bot._containsKeyword({type:'message', text: 'classe, bravo'}));
        });


    });

});
