from flask import abort, Flask, jsonify, request
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

def load_mapping_as_json():
    with open(os.path.abspath(f"../config/mappings.json"), 'r') as f:
        mappings = json.load(f)
    return mappings

def save_mapping_as_json(data):
    with open(os.path.abspath(f"../config/mappings.json"), 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/mappings', methods=['GET'])
def get_all_mappings():
    return jsonify(load_mapping_as_json())

@app.route('/mapping/<int:id>', methods=['PUT'])
def update_mapping(id):
    index = id;
    if 0 > index or index >= len(load_mapping_as_json()):
        return abort(404)
    mappings = load_mapping_as_json()
    mappings[id] = request.get_json()
    save_mapping_as_json(mappings)
    return jsonify(success=True, mappings=mappings)
