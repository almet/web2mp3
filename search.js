function initLib() {
    return new Promise((resolve) => {
        gapi.client.setApiKey('AIzaSyBJ58q5fF4gs80VRK78tPFAYcnclkDLkUU');
        gapi.client.load('youtube', 'v3', resolve);
    });
}

function getYoutubeId(search) {
  return new Promise((resolve) => {
      var request = gapi.client.youtube.search.list({
          q: search,
          part: 'snippet'
      });

      return request.execute((response) => {
          resolve(response.result.items[1].id.videoId);
      })
  });
}

function retrieveMultipleYoutubeIds(ids) {
    return initLib().then(() => {
        return Promise.all(Array.map(ids, getYoutubeId)).then(videoIds => {
            return videoIds;
        })
    })
}

function main() {
    retrieveMultipleYoutubeIds(["Didn't Leave Nobody But The Baby Noah Hawley", "Wolf Pack Bachar Mar-Khalifé"]).then((videoIds) => {
        let command = `youtube-dl ${videoIds.join(" ")} -x --audio-format mp3 -o "%(title)s.%(ext)s"`
        alert(command);
    })
}
