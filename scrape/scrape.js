var cheerio = require('cheerio');

var url = "http://www.reddit.com/r/gifs";

download(url, function (data) {
  if (data) {
    var $ = cheerio.load(data);
    $('a').each(function () {
      var att = $(this).attr('html');
      if (typeof val === 'string' && checkGif(val)) {
        // Save the image to HD

      }
    });
  }
});

function checkGif(string) {
  string = string.toLowerCase();
  var gif = ".gif";
  return string.indexOf(gif, string.length - gif.length) !== -1;
}
