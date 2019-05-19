# Imports
from flask import Flask, jsonify, request, url_for, json
from flask_cors import CORS
from flask_socketio import SocketIO

# Custom imports
from database.DP1Database import Database

# status verkiezingen
is_published = True

# Start app
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

conn = Database(app=app, user='funergydev', password='notAChance', db='verkiezingen_2018', host='10.8.0.1')

# Custom endpoint
endpoint = '/api/v1'


@socketio.on('connect')
def connect():
    socketio.emit('connect', {"toggle": is_published})


@socketio.on('toggle')
def toggle():
    global is_published
    is_published = not is_published
    socketio.emit('haha')

# TESTROUTE
@app.route(endpoint + '/kieskringen')
def get_data():
    return jsonify(conn.get_data('select distinct kieskring from kandidaten')), 200


@app.route(endpoint + '/kieskring/<locatie>/partijen')
def kieskring_partijen(locatie):
    if is_published:
        return jsonify(
            conn.get_data('select distinct lijst,lijstnr,stemcijfer,kleur from kandidaten where kieskring = %s',
                          [locatie])), 200
    else:
        return jsonify(error='001', message='Results are private.'), 200


@app.route(endpoint + '/kieskring/<locatie>/partij/<partij>/verkozen')
def partij_verkozen(locatie, partij):
    if is_published:
        return jsonify(
            conn.get_data(
                'select naam_stembiljet,naamstemmen,case when not verkozen then 0 else 1 end as "verkozen" from kandidaten where kieskring = %s and lijst = %s',
                [locatie, partij])), 200
    else:
        return jsonify(error='001', message='Results are private.'), 200


@app.route(endpoint + '/kieskring/<locatie>/verkozen')
def verkozen_kandidaten(locatie):
    if is_published:
        return jsonify(
            conn.get_data(
                'select lijst,naam_stembiljet,naamstemmen from kandidaten where kieskring = %s and verkozen',
                [locatie])), 200
    else:
        return jsonify(error='001', message='Results are private.'), 200


# Start app


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000)
