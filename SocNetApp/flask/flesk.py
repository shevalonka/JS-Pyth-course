
from flask import Flask, request, g

app = Flask(__name__)

@app.route('/paste', methods=['GET','POST'])
def new_paste():
    if request.method == 'POST':
        print(request.get_json())
        return request.get_json()
    else:
        return{'message': 'hola soy Alona'}


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['db.db'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()