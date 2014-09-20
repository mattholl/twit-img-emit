var twitter = require('twitter');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');
var _ = require('lodash');

var TwitImgEmit = function(options) {
    // pass in keywords / geo coords object to filter
    var opts = options || {};
    var config;

    try {
        config = JSON.parse(fs.readFileSync(__dirname + '/conf.json'));
    } catch(e) {
        if (e.code === 'ENOENT') {
            console.log('File not found! ' + e.path);
        } else {
            throw e;
        }
        return;
    }

    this.setupTwitStream(config, opts);

    EventEmitter.call(this, options);
};

util.inherits(TwitImgEmit, EventEmitter);

TwitImgEmit.prototype.setupTwitStream = function(config, opts) {

    var twit = new twitter({
        consumer_key: config.key.consumer_key,
        consumer_secret: config.key.consumer_secret,
        access_token_key: config.key.access_token_key,
        access_token_secret: config.key.access_token_secret
    });

    var self = this;

    // Check if the stream needs to be filtered.
    // stall_warnings is set to true and filter to mediumm by default.
    var filter = _.pick(config.filter, function(value, key) {
        return value !== null;
    });

    twit.stream('filter', filter, function(stream) {
        stream.on('data', function(data) {
            console.log(data);
        });
    });

};

module.exports = TwitImgEmit;