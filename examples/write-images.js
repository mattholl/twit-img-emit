// Save 100 images and exit

var fs = require('fs');
var TwitImgEmit = require('../index.js');

var twitImgEmit = new TwitImgEmit();

fs.exists(__dirname + '/tmp', function(exists) {
    if(!exists) {
        fs.mkdirSync(__dirname + '/tmp');
    }
});

var i = 0;
twitImgEmit.on('buf', function(buf) {
    fs.writeFile(__dirname + '/tmp/' + i, buf, function() {
        i++;
        stopListening();
    });
});

function stopListening() {
    if(i > 100) {
        twitImgEmit.removeAllListeners('buf');
        console.log('100 images saved.');
    }
}

