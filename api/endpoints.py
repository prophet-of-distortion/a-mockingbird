from flask import Flask, jsonify
import json, os

app = Flask(__name__)

@app.route('/mappings', methods=['GET'])
def get_all_mappings():
    with open(os.path.abspath(f"../config/mappings.json"), 'r') as f:
        mappings = json.load(f)
        return jsonify(mappings)
