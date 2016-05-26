'use strict';

let Bot = require('slackbots');
let util = require('util');
let fs = require('fs');
let _ = require('lodash');

let ClasseBot = function Constructor(settings){
    this.settings = settings;
    this.settings.name = this.settings.name || 'george';

    this.user = null;

    this.quotes = this._loadQuotes(this.settings.quotesPath);
    this.quotesIndex = this._indexQuotes(this.quotes);

    // The keywords the bot will react to
    this.keywords = settings.keywords;
    this.keywordsRegex = this._prepareKeywordsRegex(this.keywords);
};

ClasseBot.prototype.run = function () {
    ClasseBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

ClasseBot.prototype._onStart = function(){
    this._loadBotUser();
};

ClasseBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.real_name === self.settings.name;
    })[0];

};

ClasseBot.prototype._onMessage = function (message) {
    if(this._isFromClasseBot(message))
       return false;//Else, the bot would take indefinitely :D

    //React to chat messages in conversation
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message)
    ) {

        if(this._startsWith(message, 'yep')){
            this._reply( 'yep '.repeat(Math.ceil(Math.random()*5)) , message);
        // }else if(this._canIAnswerToKeyword(message)){
        //     this._replyWithKeyword(message);
        }else if(this._containsKeyword(message)){
            this._replyWithRandomQuote(message);
        }
    }
};

ClasseBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

ClasseBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

ClasseBot.prototype._isFromClasseBot = function (message) {
    return message.user === undefined || message.user === this.user.id;
};

ClasseBot.prototype._containsKeyword = function (message) {
    if(!message.text)
        return false;
    let lc_text = message.text.toLowerCase();
    for(let reg of this.keywordsRegex){
        if(reg.test(lc_text)===true)
            return true;
    }
    return false;
};

ClasseBot.prototype._isEqual = function (message, text) {
    return message.type === 'message' && Boolean(message.text) && message.text.toLowerCase() === text;
};

ClasseBot.prototype._startsWith = function (message, text) {
    const reg = new RegExp('^'+text+'(\\W|$)');
    return message.type === 'message' && Boolean(message.text) && reg.test(message.text.toLowerCase());
};

ClasseBot.prototype._replyWithRandomQuote = function(originalMessage){
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel(channel.name, self._pickRandomQuote().text, {as_user: true});
};

ClasseBot.prototype._replyWithKeyword = function(originalMessage){
    var self = this;
    let quotes = self._getQuotesByKeyword(originalMessage);
    if(quotes.length > 0){
        var channel = self._getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, quotes[ Math.floor( Math.random() * quotes.length) ].text, {as_user: true});
    }
};

ClasseBot.prototype._canIAnswerToKeyword = function(message){
    //console.log('indexes found :', this._getQuotesIndexesByKeyword(message));//FIXME
    return this._getQuotesIndexesByKeyword(message).length > 0;
};

ClasseBot.prototype._reply = function(text, originalMessage){
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel(channel.name, text, {as_user: true});
};

ClasseBot.prototype._pickRandomQuote = function(){
    return this.quotes[ Math.floor( Math.random() * this.quotes.length) ];
};

ClasseBot.prototype._getQuotesByKeyword = function(message){
    let self = this;
    let indexes = this._getQuotesIndexesByKeyword(message);
    return indexes.map( (val)=>{
        return self.quotes[val];
    });
};

ClasseBot.prototype._getQuotesIndexesByKeyword = function(message){
    let self = this;
    let messageWords = message.text.split(/[\s,;\\!\\?]/);
    return messageWords
        .filter((val)=>{return val.length>0;}) //remove empty words
        .reduce((prev, curr, index, arr)=>{
        if(typeof(self.quotesIndex[curr]) != 'undefined'){
            return _.union(prev, self.quotesIndex[curr]);
        }
        return prev;
    }, []);
};

ClasseBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter((item)=>{
        return item.id === channelId;
    })[0];
};

ClasseBot.prototype._loadQuotes = function(filepath){
    // a quote = {keywords:['aa','bb','cc'], text:'this is the quote'}
    let txtQuotes = fs.readFileSync(filepath, 'utf8').split(/\n/);
    let quotes = txtQuotes.filter( (el)=>{return el.length>0;}).map( (curr, index, arr)=>{
        var q = curr.split('|');
        let quote =  {keywords : q[0].split(',') , text: q[1]};

        quote.keywords = quote.keywords
            .filter( (kw) =>{ return kw.length>0; })
            .map((kw)=>{return kw.trim();});

        return quote;

    });
    return quotes;
};

ClasseBot.prototype._indexQuotes = function(quotes){
    let indexes = quotes.reduce((prevObj, quote, index, arr)=>{

        for(let keyword of quote.text.split(/[^\wéèêëàâäîïôöûüç\u00a0]/).map((curr)=>{return curr.toLowerCase().trim();}) ){
            if(keyword.length>3){
                if(!prevObj[keyword]){
                    prevObj[keyword] = [];
                }
                prevObj[keyword] = _.union(prevObj[keyword], [index]);
            }
        }

        for(let keyword of quote.keywords ){
            if(!prevObj[keyword]){
                prevObj[keyword] = [];
            }
            prevObj[keyword] = _.union(prevObj[keyword], [index]);
        }

        return prevObj;
    },{});

    return indexes;
};

ClasseBot.prototype._prepareKeywordsRegex = function(keywords){
    return keywords.map( (curr, prev, arr, index)=>{
        return new RegExp('(^|\\W)'+curr+'(\\W|$)');
    } );
};

util.inherits(ClasseBot, Bot);

module.exports = ClasseBot;
