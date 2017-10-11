# Shazam tags to mp3 files

**Disclaimer: this has been done for my own use, feel free to use it and submit
changes, but I won't spend any effort into maintaining it alive.**

This is a tiny web extension which will convert your shazam tags into mp3 files
available on your machine.

This requires that you install the `app.py` file on your machine, and you need
to have the `youtube-dl` package installed.

You will also need to add the native messaging app to the known ones. For
instance, on linux this can be achieved with:

> cp shazam2mp3.json ~/.mozilla/native-messaging-hosts/

Of course, update your paths!

Once this is done, head to [the shazam website](https://www.shazam.com/myshazam)
listing your shazams and click on the icon next to the URL. Your shazam tags will
be automatically downloaded and available in `~/shazam`.

Enjoy ;)
