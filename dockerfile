FROM python:3.12-alpine
WORKDIR /usr/src/app

COPY backend ./
COPY startup.sh ./
RUN  chmod +x startup.sh

RUN  apk add mysql-dev build-base    && \
     pip install -r requirements.txt && \
     apk del build-base

CMD ./startup.sh