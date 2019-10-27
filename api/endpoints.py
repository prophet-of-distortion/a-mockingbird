from flask import abort, Flask, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

def load_mapping_as_json():
    with open(os.path.abspath(f"../config/mappings.json"), 'r') as f:
        mappings = json.load(f)
    return mappings

@app.route('/mappings', methods=['GET'])
def get_all_mappings():
    return jsonify(load_mapping_as_json())

@app.route('/mapping/<int:id>', methods=['GET'])
def update_mapping(id):
    index = id - 1;
    if 0 > index or index >= len(load_mapping_as_json()):
        return abort(404)
    return jsonify(message='Success!')
