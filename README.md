# Mockingbird

A tool for mocking API responses. Uses [mitmproxy](https://mitmproxy.org/) to intercept requests and respond accordingly.

Requirements:
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/)

Installation:
- Clone the repository and simply do a `docker-compose up` while in the root directory.
- Configure your browser or network to use the proxy at localhost:8080 for both HTTP and HTTPS traffic.
- Once you have successfully setup your proxy, install the SSL certificates by visting http://mitm.it/
- Web Interface is available at http://localhost:80
