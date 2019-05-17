# Imports
from flask import Flask, jsonify, request, url_for, json
from flask_cors import CORS
from flask_socketio import SocketIO

# Custom imports
from database.DP1Database import Database

# status verkiezingen
is_published = False

# Start app
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

conn = Database(app=app, user='', password='', db='')

# Custom endpoint
endpoint = '/api/v1'


# TESTROUTE
@app.route(endpoint + '/')
def get_data():
    pass


# Start app
if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000)
