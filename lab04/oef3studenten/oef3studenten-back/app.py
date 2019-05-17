# importeer de flask library
from flask import Flask
from flask_cors import CORS
from flask import jsonify
import os

# Maak een applicatie-object aan
app = Flask(__name__)
CORS(app)


def lees_scores():
    bestandsnaam = os.path.dirname(os.path.abspath(__file__)) + '/data/scores.txt'
    dict_scores = {}
    try:
        fp = open(bestandsnaam, 'r')
    except FileNotFoundError:
        print("File not Found!")
        return False

    lijn = fp.readline()

    while lijn != "":
        lijn = lijn.rstrip('\n')
        list_lijn = lijn.split(":")
        naam = list_lijn[0]
        punten = list_lijn[1:]
        dict_scores[naam] = punten
        lijn = fp.readline()

    fp.close()
    return dict_scores


@app.route('/api/v1/studenten')
def studenten_alles():
    return jsonify(studenten=list(lees_scores().keys())), 200


@app.route('/api/v1/studenten/<naam>')
def student_info(naam):
    dict = lees_scores()
    if naam in dict.keys():
        return jsonify(naam=naam, punten=dict[naam]), 200
    else:
        return jsonify(status="error"), 400


# start de Flask server met debug
if __name__ == '__main__':
    app.run(debug=True)
