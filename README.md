# Convert web pages to mp3 files

*Disclaimer: this has been done for my own use, feel free to use it and submit
changes, but I probably won't spend a lot of time maintaining it.*

This is a tiny web extension which does two things:

- convert your shazam tags into mp3 files;
- download any Youtube page as an mp3 file.

<img src="/web2mp3.gif?raw=true"/>

## Requirements

First, this extension requires some steps before working properly.

It requires that you install the python application locally, and that
you install the `youtube-dl` package.

You will also need to add the native messaging app to the known ones.

On any linux machine, all of this can be accomplished with the following commands:

```bash
apt install youtube-dl python3
mkdir ~/.apps && mkdir ~/.mozilla/native-messaging-hosts/
wget https://raw.githubusercontent.com/almet/web2mp3/master/web2mp3.py -O ~/.apps/web2mp3.py
wget https://raw.githubusercontent.com/almet/web2mp3/master/web2mp3.json -O ~/.mozilla/native-messaging-hosts/web2mp3.json
chmod +x ~/.apps/web2mp3.py
chmod +x ~/.mozilla/native-messaging-hosts/web2mp3.json
sed -i "s:/home/alexis/.apps:`echo ~/.apps`:g" ~/.mozilla/native-messaging-hosts/web2mp3.json
```

Then, [install the extension](https://addons.mozilla.org/en-US/firefox/addon/web2mp3/).

Of course, you can install in a different location, just think about updating your paths!

Then, head to any youtube page, or to [your shazams](https://www.shazam.com/myshazam)
and click on the icon next to the URL. Your shazam tags will be automatically
downloaded and available in `~/web2mp3`.

Enjoy ;)

## Using yt-dlp

Youtube-dl has been forked to [yt-dlp](https://github.com/yt-dlp/yt-dlp), and
you can use this instead. The `web2mp3.py` script is looking for a `youtube-dl`,
so you might need to create a symlink to make this work.

For instance, you could install yt-dlp with [pipx](https://pypa.github.io/pipx/):

```bash
# Install using pipx
pipx install yt-dlp

# Create a symlink in /usr/local/bin
sudo ln -s `which yt-dlp` /usr/local/bin/youtube-dl
```
