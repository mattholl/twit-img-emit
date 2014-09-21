var twitter = require('twitter');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');
var _ = require('lodash');
var http = require('http');

var TwitImgEmit = function(options) {

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

    // pass in keywords / geo coords object to filter
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
            var parsedData;

            // In case we fall behind
            if('warning' in data) { console.log('falling behind'); return; }

            try {
                parsedData = JSON.parse(JSON.stringify(data));
            } catch(e) {
                console.log(e);
            }

            if('entities' in parsedData) {
                if('media' in parsedData.entities) {
                    for (var i = 0; i < parsedData.entities.media.length; i++) {

                        var media_url = parsedData.entities.media[i].media_url;
                        // var media_file_name = path.basename(media_url);

                        self.getImage(media_url);
                    }
                }
            }
        });
    });

};

TwitImgEmit.prototype.getImage = function(imgURL) {
    // We've got a URL so just get the image
    var self = this;
    http.get(imgURL, function(res) {

        var bufs = [];

        res.on('data', function(data) {
            bufs.push(data);
        });

        res.on('end', function(data) {
            var buf = Buffer.concat(bufs);
            self.emit('buf', buf);
        });
    });
};

module.exports = TwitImgEmit;