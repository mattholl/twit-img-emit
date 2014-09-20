twit-img-emit
=============

This is a small module which connects to the Twitter stream API and returns the image URLs received as buffers.

See the examples for setting up a read stream of images.

Basic Usage
-----------

````
var images = new twitImageEmitter();
images.on('data', function(imgData) {
    fs.saveFile('imageData.ext', imgData);
});
````

### Set up

1. Generate API keys at twitter dev api
    Go to
2. Add the keys to the conf.json file
    Copy conf.json.example to conf.json and add your API keys. Optionally add keyword to filter the sream.

3. Optionally add tracking strings or location coordinates, more on this below.

4. The module creates an emitter of data events where the callback data is a buffer of the file at a Twitter  URL.

### Using the tracking params

#### track
"A comma-separated list of phrases which will be used to determine what Tweets will be delivered on the stream. A phrase may be one or more terms separated by spaces, and a phrase will match if all of the terms in the phrase are present in the Tweet, regardless of order and ignoring case."

#### filter_level
none, low, mediuem
Set to medium to filter out most of the porn.

#### locations
A comma-separated list of longitude,latitude pairs specifying a set of bounding boxes to filter Tweets by

-180,-90,180,90 Any geotagged Tweet

** See the docs for more info
https://dev.twitter.com/streaming/overview/request-parameters **
