from flask import Flask, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

@app.route('/mappings', methods=['GET'])
def get_all_mappings():
    with open(os.path.abspath(f"../config/mappings.json"), 'r') as f:
        mappings = json.load(f)
        return jsonify(mappings)
