FROM mypython:latest

ENV PYTHONUNBUFFERED 1

RUN mkdir /myweb
WORKDIR /myweb

COPY requirements.txt /myweb/
RUN pip install -r requirements.txt 

COPY ./web /myweb