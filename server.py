# -*- coding: utf-8 -*-
"""
    jQuery Example
    ~~~~~~~~~~~~~~

    A simple application that shows how Flask and jQuery get along.

    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""
import socket, time, string
from flask import Flask, jsonify, render_template, request, json
app = Flask(__name__)

client_cpp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_cpp.connect(('localhost', 9999))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/request/', methods=['GET'])
def request():

    print 'got a request:'
    #print client_cpp.send('1'), 'bytes sent to cppclient.'
    msglen = int(client_cpp.recv(4).strip('\x00'))
    msg = client_cpp.recv(msglen)

    return jsonify(json.loads(msg))

if __name__ == '__main__':
    app.run()

