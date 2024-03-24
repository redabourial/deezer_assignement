if [ -z "${GUNICORN_WORKERS+x}" ]; then
    GUNICORN_WORKERS=10
fi
if [ -z "${GUNICORN_INTERFACE+x}" ]; then
    GUNICORN_INTERFACE=0.0.0.0
fi
if [ -z "${GUNICORN_PORT+x}" ]; then
    GUNICORN_PORT=8000
fi

echo gunicorn deezer_assignement.wsgi -b $GUNICORN_INTERFACE:$GUNICORN_PORT -w $GUNICORN_WORKERS
gunicorn deezer_assignement.wsgi -b $GUNICORN_INTERFACE:$GUNICORN_PORT -w $GUNICORN_WORKERS
