FROM python:3.8

ADD ingest.py /
ADD data.csv /

RUN pip install pandas

CMD [ "python", "./ingest.py" ]