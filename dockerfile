FROM python:3.12

WORKDIR /usr/src/app

COPY backend ./

RUN pip install -r requirements.txt

COPY startup.sh ./

RUN chmod +x startup.sh

CMD ["bash","./startup.sh"]