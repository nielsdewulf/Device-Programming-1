# Imports
from flask import Flask, jsonify, request, url_for, json
from flask_cors import CORS

# Custom imports
from database.DP1Database import Database

# Start app
app = Flask(__name__)
CORS(app)

conn = Database(app, 'funergydev', 'notAChance', 'trein', '10.8.0.1')

# Custom endpoint
endpoint = '/api/v1'


# ROUTES

@app.route(endpoint + '/treinen', methods=['GET', 'POST'])
def treinen():
    if request.method == 'GET':
        return jsonify(
            conn.get_data('select * from bestemmingen join treinen t on bestemmingen.idbestemming = t.bestemmingID'))
    elif request.method == 'POST':
        data = request.get_json()
        if ('vertrek' and 'bestemmingID' and 'spoor' and 'afgeschaft') in data.keys():
            vertrek = data['vertrek']
            bestemmingid = data['bestemmingID']
            spoor = data['spoor']
            vertraging = data['vertraging']
            afgeschaft = data['afgeschaft']
            ret = conn.set_data(
                'insert into treinen (vertrek, bestemmingID, spoor, vertraging, afgeschaft) VALUES (%s,%s,%s,%s,%s)',
                [vertrek, bestemmingid, spoor, vertraging, afgeschaft])
            return jsonify(treinid=ret), 201
        else:
            return jsonify(status="Wrong inputs"), 400


@app.route(endpoint + '/treinen/<treinid>', methods=['GET', 'PUT', 'DELETE'])
def trein(treinid):
    if request.method == 'GET':
        return jsonify(conn.get_data(
            'select * from treinen join bestemmingen b on treinen.bestemmingID = b.idbestemming where idtrein=%s',
            treinid))
    elif request.method == 'PUT':
        data = request.get_json()
        if ('vertrek' and 'bestemmingID' and 'spoor' and 'afgeschaft') in data.keys():
            vertrek = data['vertrek']
            bestemmingid = data['bestemmingID']
            spoor = data['spoor']
            vertraging = data['vertraging']
            afgeschaft = data['afgeschaft']
            conn.set_data(
                'update treinen set vertrek=%s, bestemmingID=%s, spoor=%s,vertraging=%s, afgeschaft=%s where idtrein=%s',
                [vertrek, bestemmingid, spoor, vertraging, afgeschaft, treinid])
            return jsonify(treinid=treinid), 200
        else:
            return jsonify(status="Wrong inputs"), 400
    elif request.method == 'DELETE':
        ret = conn.delete_data('delete from treinen where idtrein=%s', treinid)
        if ret == 0:
            return jsonify(message='No records were deleted'), 204
        else:
            return jsonify(message=f'{ret} record(s) were deleted'), 200


@app.route(endpoint + '/bestemmingen')
def bestemmingen():
    return jsonify(conn.get_data('select * from bestemmingen'))


@app.route(endpoint + '/treinen/bestemmingen/<bestemming_id>', methods=['GET'])
def bestemming(bestemming_id):
    return jsonify(conn.get_data(
        'select * from treinen join bestemmingen b on treinen.bestemmingID = b.idbestemming where bestemmingID=%s',
        bestemming_id)), 200


# Start app
if __name__ == '__main__':
    app.run(debug=True)
