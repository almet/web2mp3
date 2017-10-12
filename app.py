#!/usr/bin/env python3

import os.path
import sys
import json
import struct
import subprocess

CACHE_LOCATION = os.path.expanduser('~/shazams/.cache')
ACTIONS = {
    'download-youtube-ids': lambda m: download_youtube_ids(m['ids']),
}


def get_message():
    """Read a message from stdin and decode it."""
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    return json.loads(message)


def encode_message(message):
    """Encode a message for transmission, given its content."""
    encoded_content = json.dumps(message).encode('utf-8')
    encoded_length = struct.pack('@I', len(encoded_content))
    return {'length': encoded_length, 'content': encoded_content}


def send_message(message):
    """Send an encoded message to stdout"""
    encoded = encode_message(message)
    sys.stdout.buffer.write(encoded['length'])
    sys.stdout.buffer.write(encoded['content'])
    sys.stdout.buffer.flush()


def load_cache():
    """Loads the cache from the disk"""
    if os.path.isfile(CACHE_LOCATION):
        with open(CACHE_LOCATION, 'r') as f:
            return json.load(f)
    else:
        return []


def save_cache(ids):
    """Save downloaded ids in the cache"""
    with open(CACHE_LOCATION, 'w+') as f:
        json.dump(ids, f)


def download_youtube_ids(ids):
    cached_ids = load_cache()
    urls = ['"https://www.youtube.com/watch?v=%s"' % id_ for id_ in ids if id_ not in cached_ids]
    formated_ids = ' '.join(urls)
    command = 'youtube-dl {0} -x --audio-format mp3 -o "~/shazams/%(title)s.%(ext)s"'.format(formated_ids)

    if len(urls) == 0:
        send_message({"type": "status", "status": "No songs to download."})
    else:
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        send_message({"type": "status", "status": "Downloading %s songs" % len(urls)})
        exit_status = process.wait()
        if exit_status == 0:
            send_message({"type": "status", "status": "Your shazam songs have been downloaded and are available in ~/shazams. Enjoy!"})
            save_cache(list(set(cached_ids + ids)))
        else:
            send_message({"type": "status", "status": "There were an error during the download of your shazam, check the console for more information."})


while True:
    message = get_message()
    message_type = message.get('type')
    if message_type in ACTIONS:
        ACTIONS[message_type](message)
