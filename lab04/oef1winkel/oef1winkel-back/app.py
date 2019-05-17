from flask import Flask
from flask import request
from flask import jsonify
from datetime import datetime

app = Flask(__name__)

dict = {100: {'naam': 't-shirt', 'prijs': 18},
        101: {'naam': 'pull', 'prijs': 22},
        102: {'naam': 'koffietas', 'prijs': 11}
        }


def wegschrijven(par_id, par_aantal, par_totaal):
    f = open('betalingen.csv', "a")
    f.write('{0};{1};{2};{3}'.format(par_id, par_aantal, par_totaal, datetime.now().utcnow()))
    f.write('\n')


@app.route('/')
def hello_world():
    return 'ga naar de API url'


@app.route('/api/v1/payment', methods=["POST"])
def payment():
    try:
        product = int(request.form['product'])
        aantal = int(request.form['aantal'])
        if 0 < aantal < 100 and product in dict.keys():
            prijs = dict[product]['prijs']
            wegschrijven(product, aantal, aantal * prijs)
            return jsonify(status="success"), 201
        else:
            return jsonify(status="error", message="value(s) incorrect"), 400
    except Exception:
        return jsonify(status="error"), 500


if __name__ == '__main__':
    app.run()
