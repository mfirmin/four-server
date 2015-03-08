# -*- coding: utf-8 -*-
"""
    jQuery Example
    ~~~~~~~~~~~~~~

    A simple application that shows how Flask and jQuery get along.

    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""
import socket, time
from flask import Flask, jsonify, render_template, request
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/request/', methods=['GET'])
def request():

    client_cpp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_cpp.connect(('localhost', 9999))
    print 'got a request:'
    print client_cpp.send('1'), 'bytes sent to cppclient.'
    time.sleep(0.2)
    msg = {'value': client_cpp.recv(1024)}

    print msg


    return jsonify(msg)

if __name__ == '__main__':
    app.run()

