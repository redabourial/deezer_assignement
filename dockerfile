FROM python:3.12-alpine

RUN apk update
RUN apk upgrade
RUN apk add mysql-dev mysql-dev build-base

WORKDIR /usr/src/app

COPY backend ./

RUN pip install -r requirements.txt

COPY startup.sh ./

RUN chmod +x startup.sh

CMD ["sh","./startup.sh"]