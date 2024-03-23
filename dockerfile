FROM python:3.12

WORKDIR /usr/src/app

COPY backend ./

RUN pip install -r requirements.txt

CMD ["gunicorn", "deezer_assignement.wsgi"]