FROM ubuntu:latest
LABEL maintainer="pier@freelancer.com"

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

RUN pip install pipenv
COPY Pipfile Pipfile.lock /
RUN pipenv install --system --deploy

WORKDIR /api

ENV FLASK_APP=endpoints.py
ENV FLASK_ENV=development
ENTRYPOINT ["flask", "run", "--host", "0.0.0.0"]
