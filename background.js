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
    console.log("page action clicked, triggering content-script.");
    browser.tabs.sendMessage(tab.id, {'action': 'convert-tags-to-mp3'});
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
    console.log(tabId, changeInfo, tab);
    if (tab.url.indexOf('https://www.shazam.com/myshazam') == 0) {
        browser.pageAction.show(tabId);
    }
})
