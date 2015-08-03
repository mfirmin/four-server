# -*- coding: utf-8 -*-
"""
    Four Server
    Back end for _four_ project

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

@socketio.on('init')
def init(message_in):

    msglen = struct.pack("!i", 4)
    bytesSent = client_cpp.send(msglen)

    client_cpp.send('init')

    msglen = struct.pack("!i", len(message_in))
    bytesSent = client_cpp.send(msglen)

    client_cpp.send(message_in)

    msglenstr = client_cpp.recv(4)

    msglen = struct.unpack("!i", msglenstr)

    msg = client_cpp.recv(msglen[0])

    socketio.emit('init', msg)

@socketio.on('torques')
def sendTorques(message_in):
    msg_str = json.dumps(message_in)

    msglen = struct.pack("!i", 7)
    bytesSent = client_cpp.send(msglen)

    # send torques
    client_cpp.send('torques')

    # send lengths of torques str
    msglen = struct.pack("!i", len(msg_str))
    bytesSent = client_cpp.send(msglen)

    # send torques json str
    client_cpp.send(msg_str)

@socketio.on('reset')
def reset(message_in):

    msglen = struct.pack("!i", 5)
    bytesSent = client_cpp.send(msglen)

    client_cpp.send('reset')
    
# send world name
    msglen = struct.pack("!i", len(message_in))
    bytesSent = client_cpp.send(msglen)

    client_cpp.send(message_in)

@socketio.on('requestFrame')
def requestframe(message_in):

    msglen = struct.pack("!i", 12)
    bytesSent = client_cpp.send(msglen)

    client_cpp.send('requestFrame')
    
# send world name
    msglen = struct.pack("!i", len(message_in))
    bytesSent = client_cpp.send(msglen)

    client_cpp.send(message_in)

    msglenstr = client_cpp.recv(4)

    msglen = struct.unpack("!i", msglenstr)

    msg_out = client_cpp.recv(msglen[0])

    socketio.emit('frame', msg_out)

if __name__ == '__main__':
    socketio.run(app, '127.0.0.1', 4000)

