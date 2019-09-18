# Interposer

A tool for mocking API responses. Uses [mitmproxy](https://mitmproxy.org/) to intercept requests and respond accordingly.

Requirements:
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)

Installation:
 1. Set an `$ENVIRONMENT` environment variable.
 1. Create a JSON file that maps the url patterns to detect to its corresponding response. See format below. Save this as `config/rewrite_mapping.$ENVIRONMENT.json`. Make sure to replace `$ENVIRONMENT` with your chosen value.

Format:
 ```javascript
{
    "title": "Rewrite Mapping",
    "type" : "array",
    "items": {
        "type": "array",
        "items": [
            {
                "type": "string",
                "description": "The URL pattern to detect. This must be a python regex string."
            },
            {
                "type": "string",
                "description": "The filename of the file that describes the response to emit."
            }
        ]
    }
}
 ```

 Example:
 ```javascript
[

    ["users/0.1/users/", "mocked_user_response"],
    ["projects/0.1/projects/1111/", "project_1111_response"],
    ["projects/0.1/projects/\\d+/", "general_project_response"]
]
 ```
 3. Create the response files for each of the url patterns defined in the mapping.

Format:
```javascript
{
    "title": "Response Format",
    "type": "object",
    "properties": {
        "status": {
            "type": "integer",
            "description": "The HTTP Status Code to emit."
        },
        "header": {
            "type": "object",
            "description": "HTTP headers to include in the response."
        },
        "body": {
            "type": "object",
            "description": "The response body.",
        }
    }
}
```

 Example:
 ```javascript
{
  "status": 200,
  "header": {
    "Content-Type": "application/json; charset=UTF-8"
  },
  "body": {
    "status": "error",
    "request_id": "I9Z8ZDqUr2uhEQG4aLRHVBU95LYkhpuQ",
    "message": "There was an error",
    "error_code": "NOT_FOUND"
  }
}
 ```
4. Run `docker-compose up`. This will populate the `certificates/` folder with the mitmproxy certificates.
5. Install the certificates.
6. Configure your proxy settings to use `localhost:8080`.
