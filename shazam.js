function retrieveTracknames() {
    var tags = document.querySelectorAll('article.shz-partial-track');

    var tracks = Array.map(tags, (tag) => {
        var title = tag.querySelector('.title').textContent.trim();
        var artist = tag.querySelector('.artist').textContent.trim();
        return `${title} ${artist}`;
    });
    return tracks;
}

function encodeQueryString(params) {
    var esc = encodeURIComponent;
    var query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');
    return query;
}

function getYoutubeId(search) {
  var queryString = encodeQueryString({
      key: 'AIzaSyBJ58q5fF4gs80VRK78tPFAYcnclkDLkUU',
      part: 'snippet',
      maxResults: 25,
      q: search
  });
  return fetch(`https://www.googleapis.com/youtube/v3/search?${queryString}`).then((response) => {
      return response.json().then(({items}) => {
          return items[0].id.videoId;
      })
  });
}

function retrieveMultipleYoutubeIds(ids) {
    return Promise.all(Array.map(ids, getYoutubeId)).then(videoIds => {
        return videoIds.filter((n) => { return n != undefined });
    });
}

browser.runtime.onMessage.addListener(function(msg) {
      if (msg.action == 'convert-tags-to-mp3') {
          var tracknames = retrieveTracknames();
          retrieveMultipleYoutubeIds(tracknames).then((videoIds) => {
              console.log(videoIds);
              browser.runtime.sendMessage({
                   type: "retrieved-youtube-ids",
                   videoIds: videoIds
               });
          });
      }
});
