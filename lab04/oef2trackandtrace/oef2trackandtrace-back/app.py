from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request
import os

app = Flask(__name__)
CORS(app)


def lees_data_uit_csv():
    bestandsnaam = os.path.dirname(os.path.abspath(__file__)) + '/data/bpost.csv'
    dict_verzenddata = {}
    try:
        fp = open(bestandsnaam, 'r')
    except FileNotFoundError:
        print("File not Found!")
        return False

    lijn = fp.readline()
    # sla eerste lijn over
    lijn = fp.readline()
    while lijn != "":
        list_lijn = lijn.rstrip('\n').split(";")
        # code;naam;postcode;afgifte;sorteercentrum;onderweg;bezorgd
        code = list_lijn[0]
        naam = list_lijn[1]
        postcode = list_lijn[2]
        afgifte = list_lijn[3]
        sorteercentrum = list_lijn[4]
        onderweg = list_lijn[5]
        bezorgd = list_lijn[6]

        dict_details = {}
        dict_details["naam"] = naam
        dict_details["postcode"] = postcode
        # als afgifte verschillend is van de Lege String neem de waarde van afgifte anders neem None
        dict_details["afgifte"] = afgifte if afgifte != "" else None
        dict_details["sorteercentrum"] = sorteercentrum if sorteercentrum != "" else None
        dict_details["onderweg"] = onderweg if onderweg != "" else None
        dict_details["bezorgd"] = bezorgd if bezorgd != "" else None

        dict_verzenddata[code] = dict_details
        lijn = fp.readline()

    fp.close()
    print("*****Gegevens zijn ingelezen, inhoud van dict: ****")
    print(dict_verzenddata)
    return dict_verzenddata


def wegschrijven(code, naam, postcode):
    bestandsnaam = os.path.dirname(os.path.abspath(__file__)) + '/data/bpost.csv'
    try:
        fp = open(bestandsnaam, 'a')
        fp.write("{0};{1};{2};;;;;\n".format(code, naam, postcode))
        return True
    except FileNotFoundError:
        print("File not Found!")
        return False


@app.route('/')
def hello_world():
    return 'gebruik de api om de data op te vragen'


@app.route('/api/v1/track', methods=['POST', 'GET'])
def track_alles():
    if ('nummer' or 'naam' or 'postcode') not in request.form.keys():
        temp_list = []
        for key, value in lees_data_uit_csv().items():
            temp_dict = {key: value['naam']}
            temp_list.append(temp_dict)

        return jsonify(traceData=temp_list)
    else:
        try:
            nummer = request.form['nummer']
            naam = request.form['naam']
            postcode = request.form['postcode']

            wegschrijven(nummer, naam, postcode)
            return jsonify(status='success'), 201
        except ValueError:
            return jsonify(status='Error', message='Value(s) incorrect'), 400
        except:
            return jsonify(status='Error'), 500


@app.route('/api/v1/track/<track_code>')
def track_code(track_code):
    dict_data = lees_data_uit_csv()
    if track_code in dict_data.keys():
        return jsonify(track_code=track_code, detail=dict_data[track_code]), 200
    else:
        return jsonify(status="error"), 400


if __name__ == '__main__':
    app.run()
