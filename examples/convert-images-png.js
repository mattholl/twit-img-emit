// Convert images to png format

var fs = require('fs');
var TwitImgEmit = require('../index.js');
var gm = require('gm');

var twitImgEmit = new TwitImgEmit();

fs.exists(__dirname + '/tmp', function(exists) {
    if(!exists) {
        fs.mkdirSync(__dirname + '/tmp');
    }
});

twitImgEmit.on('buf', function(buf) {

    var time = new Date().getTime();

    gm(buf)
        .identify(function(err, format) {
            // console.log(format);
        })
        // .autoOrient()
        .write(__dirname + '/tmp/' + time + '.png', function(err) {
            // err?
        });
});
