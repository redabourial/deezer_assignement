FROM python:3.12-alpine

WORKDIR /usr/src/app

COPY backend/requirements.txt ./

RUN apk add mysql-dev build-base    && \
    pip install -r requirements.txt && \
    apk del build-base

COPY backend ./

COPY startup.sh ./

RUN chmod +x startup.sh

CMD ./startup.sh