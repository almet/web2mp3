#!/usr/bin/env python3

import sys
import json
import struct
import subprocess


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


while True:
    message = get_message()
    if message.get('type') == 'download-youtube-ids':

        ids = ' '.join(['"https://www.youtube.com/watch?v=%s"' % id_ for id_ in message['ids']])
        command = 'youtube-dl {0} -x --audio-format mp3 -o "~/shazams/%(title)s.%(ext)s"'.format(ids)
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
        send_message({"type": "status", "status": "Downloading %s songs" % len(message['ids'])})
        process.wait()
        send_message({"type": "status", "status": "Your shazam songs have been downloaded and are available in ~/shazams. Enjoy!"})
