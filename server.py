# -*- coding: utf-8 -*-
"""
    jQuery Example
    ~~~~~~~~~~~~~~

    A simple application that shows how Flask and jQuery get along.

    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""
import socket, time, string, struct
from flask import Flask, jsonify, render_template, request, json
from flask.ext.socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'yellow'
socketio = SocketIO(app)

client_cpp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_cpp.connect(('localhost', 9999))

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('requestframe')
def requestframe(message_in):

    msglenstr = client_cpp.recv(4)
    msglen = struct.unpack("!i", msglenstr)

    msg = client_cpp.recv(msglen[0])

    socketio.emit('frame', msg)


if __name__ == '__main__':
    socketio.run(app, '127.0.0.1', 4000)

