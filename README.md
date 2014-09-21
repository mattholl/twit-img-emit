twit-img-emit
=============

This is a small module which connects to the Twitter stream API and returns the image URLs received as buffers.

See the examples for setting up a read stream of images.

Basic Usage
-----------

````
var twImg = new TwitImgEmit();
twImg.on('data', function(imgData) {
    fs.saveFile('imageData', imgData);
});
````

### Set up

1. Generate Twitter API keys
2. Copy conf.json.example to conf.json and add API keys. 
3. Optionally add keywords or location coordinates to filter the sream
4. Attach listeners for the incoming images

### Using the tracking params

#### track
"A comma-separated list of phrases which will be used to determine what Tweets will be delivered on the stream. A phrase may be one or more terms separated by spaces, and a phrase will match if all of the terms in the phrase are present in the Tweet, regardless of order and ignoring case." ** [See the docs for more info][1] **

#### filter_level
none, low, medium : This is set to medium by default to filter out most of the porn. **Most** of it, so use cautiously.

#### locations
"A comma-separated list of longitude and latitude pairs specifying a set of bounding boxes by which to filter Tweets"

For example:

"-180,-90,180,90" results in any geotagged Tweet.

At least a track or location parameter must be specified in order to use the filter parameter.

[1]:https://dev.twitter.com/streaming/overview/request-parameters
