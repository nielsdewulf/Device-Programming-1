from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from helpers.Database import Database

# Code voor led
from helpers.klasseknop import Button
from RPi import GPIO
import time

led1 = 21
knop1 = Button(20)
knop1_value = False

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(led1, GPIO.OUT)

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

conn = Database(app, 'mct', 'mct', 'ledKnop')


@app.route('/')
def hallo():
    return "Server is running"


@socketio.on("connect")
def connecting():
    socketio.emit("connected", {'value': knop1_value})
    print("Connection with client established")


@socketio.on('knop')
def toggle(data):
    lees_knop(led1)


def lees_knop(pin):
    global knop1_value
    if GPIO.input(led1) == 1:
        GPIO.output(led1, GPIO.LOW)
        knop1_value = False
        socketio.emit('toggle', {'value': False})
    else:
        GPIO.output(led1, GPIO.HIGH)
        knop1_value = True
        socketio.emit('toggle', {'value': True})
    print("button pressed")
    conn.set_data('insert into toggleHistoriek(date,value) VALUES (now(),%s)', [knop1_value])


knop1.on_press(lees_knop)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
