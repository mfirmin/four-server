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

client_cpp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_cpp.connect(('localhost', 9999))

start = time.time()
i = 0
print "starting..."
while i < 1000:
    msg = {'value': client_cpp.recv(4)}
    i+=1
print "done!"
print time.time() - start

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/request/', methods=['GET'])
def request():

    print 'got a request:'
    #print client_cpp.send('1'), 'bytes sent to cppclient.'
    msg = {'value': client_cpp.recv(4)}

    return jsonify(msg)

#if __name__ == '__main__':
#    app.run()

