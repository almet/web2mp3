var port = browser.runtime.connectNative("shazam2mp3");

port.onMessage.addListener((message) => {
    if (message.type == 'status') {
        browser.notifications.create({
            "title": "Shazam to mp3",
            "type": "basic",
            "message": message.status
        });
    }
});

browser.pageAction.onClicked.addListener((tab) => {
    // Depending on the tab URL, we'll do a different action.
    if (tab.url.startsWith('https://www.youtube.com/watch')) {
        // If we are on youtube, we just want to download the current song.
        console.log(tab.url);
        var id_ = tab.url.split('?v=')[1]
        port.postMessage({
            type: 'download-youtube-ids',
            ids: [id_]
        });
    } else if (tab.url.startsWith('https://www.shazam.com/myshazam')) {
        // If we are on shazam, then we want to retrieve all the names and convert
        // them to youtube ids.
        browser.tabs.sendMessage(tab.id, {'action': 'convert-tags-to-mp3'});
    }
});

browser.runtime.onMessage.addListener(payload => {
    if (payload.type == "retrieved-youtube-ids") {
        console.log(payload.videoIds);
        console.log(payload.videoIds.toString());
        port.postMessage({
            type: 'download-youtube-ids',
            ids: payload.videoIds
        });
    }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.startsWith('https://www.shazam.com/myshazam')
        || tab.url.startsWith('https://www.youtube.com/watch')) {
        browser.pageAction.show(tabId);
    }
})
