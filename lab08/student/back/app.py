# IMPORTS
# https://pypi.org/project/schedule/
import json
from flask import Flask, jsonify, request
# https://flask-socketio.readthedocs.io/en/latest/
from flask_socketio import SocketIO
from flask_cors import CORS
import datetime
import pytz
from helpers.Database import Database

# INIT THE APP
app = Flask(__name__)

# SETTINGS
endpoint = '/api/v1'
conn = Database(app, 'funergydev', 'notAChance', 'water', '10.8.0.1')

CORS(app)
app.config['SECRET_KEY'] = 'Secret!'

socketio = SocketIO(app)


# HELPERS
# Generic error showing / handling

# SOCKET.IO EVENTS
@socketio.on('connect')
def connect():
    amount = conn.get_data('select sum(amount) as "amount" from logging where DATE(date) = CURRENT_DATE')
    progress = amount[0]['amount'] if amount[0]['amount'] else 0
    socketio.emit('welcome', {'currentProgress': float(progress)})


@socketio.on('new-logging')
def new_logging(data):
    id = conn.set_data('insert into logging(amount) values (%s)', [data['amount']])
    socketio.emit('newLogging', {'amount': data['amount']})


# ROUTES
@app.route('/api/v1/amounts')
def amounts():
    return jsonify(conn.get_data('select * from logging order by date asc'))


# SOCKET

# START THE APP
if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
