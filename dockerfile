FROM python:3.12

WORKDIR /usr/src/app

COPY backend ./

RUN pip install -r requirements.txt

ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:8000", "deezer_assignement.wsgi"]