FROM python:3.9.13-slim-buster

ENV PYTHONUNBUFFERED 1

RUN mkdir /myweb
WORKDIR /myweb

COPY requirements.txt /myweb/
RUN pip install -r requirements.txt 

COPY ./web /myweb