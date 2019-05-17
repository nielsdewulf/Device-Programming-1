from flask import Flask, jsonify, request
from flask_cors import CORS
from DP1.DP1Database import Database

app = Flask(__name__)
CORS(app)
# Custom endpoint
endpoint = '/api/v1'
conn = Database(app, 'funergydev', 'notAChance', 'vliegtuigen', '10.8.0.1')


# # ROUTES
@app.route(endpoint + '/klanten', methods=['POST', 'GET'])
def klanten():
    if request.method == "GET":
        return jsonify(conn.get_data("select * from tblklant;")), 200
    elif request.method == "POST":
        # Return nieuwe id van klant die aangemaakt is
        id = conn.set_data(
            "insert into tblklant(FNaam, VNaam, Straat, Nummer, Postcode, Gemeente) VALUES (%s, %s, %s, %s, %s, %s);",
            [request.form['FNaam'], request.form['VNaam'], request.form['Straat'], request.form['Nummer'],
             request.form['Postcode'], request.form['Gemeente']])
        return jsonify(klantID=id), 201


@app.route(endpoint + '/klanten_json', methods=['GET', 'POST'])
def klanten_json():
    if request.method == "GET":
        return jsonify(conn.get_data("select * from tblklant;")), 200
    elif request.method == "POST":
        # Return nieuwe id van klant die aangemaakt is
        data = request.get_json()
        id = conn.set_data(
            "insert into tblklant(FNaam, VNaam, Straat, Nummer, Postcode, Gemeente) VALUES (%s, %s, %s, %s, %s, %s);",
            [data['FNaam'], data['VNaam'], data['Straat'], data['Nummer'],
             data['Postcode'], data['Gemeente']])
        return jsonify(klantID=id), 201


@app.route(endpoint + '/klanten/<klant_id>', methods=['GET', 'PUT', 'DELETE'])
def klant(klant_id):
    if request.method == 'GET':
        return jsonify(conn.get_data("select * from tblklant where KlantID=%s", klant_id)), 200
    elif request.method == 'PUT':
        data = request.get_json()
        # Van Put krijg je geen bruikbaar antwoord terug
        conn.set_data(
            'update tblklant set FNaam = %s, VNaam = %s, Straat = %s, Nummer = %s, Postcode = %s, Gemeente = %s where KlantID = %s',
            [data['FNaam'], data['VNaam'], data['Straat'],
             data['Nummer'],
             data['Postcode'], data['Gemeente'], klant_id])
        return jsonify(klantID=klant_id), 200
    elif request.method == 'DELETE':
        antw = conn.delete_data('delete from tblklant where KlantID = %s', klant_id)
        if antw == 0:
            return jsonify(message='no records deleted'), 204
        else:
            return jsonify(message=f'{antw} records(s) deleted'), 201


# BESTEMMINGEN ROUTE

@app.route(endpoint + '/bestemmingen', methods=['POST', 'GET'])
def bestemmingen():
    if request.method == "GET":
        return jsonify(conn.get_data("select * from tblbestemming;")), 200
    elif request.method == "POST":
        data = request.get_json()
        # Return nieuwe id van klant die aangemaakt is
        id = conn.set_data(
            "insert into tblbestemming(Afkorting, Voluit, Land, TypeVlucht) VALUES (%s, %s, %s, %s);",
            [data['Afkorting'], data['Voluit'], data['Land'], data['TypeVlucht']])
        return jsonify(bestemmingID=id), 201


@app.route(endpoint + '/bestemmingen/<bestemming_id>', methods=['GET', 'PUT', 'DELETE'])
def bestemming(bestemming_id):
    if request.method == 'GET':
        return jsonify(conn.get_data("select * from tblbestemming where BestemmingID=%s", bestemming_id)), 200
    elif request.method == 'PUT':
        data = request.get_json()
        # Van Put krijg je geen bruikbaar antwoord terug
        conn.set_data(
            'update tblbestemming set Afkorting=%s,Voluit=%s,Land=%s,TypeVlucht=%s where BestemmingID = %s',
            [data['Afkorting'], data['Voluit'], data['Land'], data['TypeVlucht'], bestemming_id])
        return jsonify(bestemmingID=bestemming_id), 200
    elif request.method == 'DELETE':
        antw = conn.delete_data('delete from tblbestemming where BestemmingID = %s', bestemming_id)
        if antw == 0:
            return jsonify(message='no records deleted'), 204
        else:
            return jsonify(message=f'{antw} records(s) deleted'), 201


if __name__ == '__main__':
    app.run(debug=True)
