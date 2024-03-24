FROM python:3.12-alpine

RUN apk update
RUN apk upgrade
RUN apk add mysql-dev build-base

WORKDIR /usr/src/app

COPY backend ./

RUN pip install -r requirements.txt

COPY startup.sh ./

RUN chmod +x startup.sh

# cleanup to make image smaller
RUN apk del build-base

CMD ./startup.sh