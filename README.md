# Convert shazam tags to mp3 files

**Disclaimer: this has been done for my own use, feel free to use it and submit
changes, but I won't spend any effort into maintaining it alive.**

This is a tiny web extension which will convert your shazam tags into mp3 files
available on your machine. It also provides an easy way to download Youtube
songs as mp3 files.

This requires that you install the `app.py` file on your machine, and you need
to have the `youtube-dl` package installed.

You will also need to add the native messaging app to the known ones.

On any linux machine, all of this can be accomplished with the following commands:

```bash
apt install youtube-dl python3
mkdir ~/.apps && mkdir ~/.mozilla/native-messaging-hosts/
wget https://raw.githubusercontent.com/almet/shazam2mp3/master/app.py -O ~/.apps/app.py
wget https://raw.githubusercontent.com/almet/shazam2mp3/master/shazam2mp3.json -O ~/.mozilla/native-messaging-hosts/shazam2mp3.json
chmod +x ~/.apps/app.py
chmod +x ~/.mozilla/native-messaging-hosts/shazam2mp3.json
sed -i "s:/home/alexis/dev/shazam2mp3:`echo ~/.apps`:g" shazam2mp3.json
```

Of course, you can install in a different location, just think about updating your paths!

Once this is done, head to [the shazam website](https://www.shazam.com/myshazam)
listing your shazams and click on the icon next to the URL. Your shazam tags will
be automatically downloaded and available in `~/shazam`.

This will also work on any youtube page.

Enjoy ;)
