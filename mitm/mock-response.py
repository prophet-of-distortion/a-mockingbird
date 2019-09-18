from mitmproxy import http
import json, os, re

ENVIRONMENT = os.getenv('ENVIRONMENT', 'default')

def response(flow: http.HTTPFlow) -> None:
    request_url = flow.request.url
    with open(os.path.abspath(f"config/rewrite_mapping.{ENVIRONMENT}.json"), 'r') as f:
        rewrite_mapping = json.load(f)
        for pattern, response_filename in rewrite_mapping:
            if re.search(pattern, request_url):
                response_file = open(os.path.abspath(f"response/{response_filename}.json"))
                props = json.load(response_file)
                flow.response = http.HTTPResponse.make(
                    props['status'], json.dumps(props['body']), props['header'])
