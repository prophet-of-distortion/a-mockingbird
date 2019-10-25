from mitmproxy import http
import json, os, re

def response(flow: http.HTTPFlow) -> None:
    request_url = flow.request.url
    with open(os.path.abspath(f"config/mappings.json"), 'r') as f:
        rewrite_mapping = json.load(f)
        for pattern, props in rewrite_mapping:
            if re.search(pattern, request_url):
                flow.response = http.HTTPResponse.make(
                    props['status'], json.dumps(props['body']), props['header'])
