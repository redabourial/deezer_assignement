if [ ! -v GUNICORN_WORKERS ]; then
    GUNICORN_WORKERS=10
fi
if [ ! -v GUNICORN_INTERFACE ]; then
    GUNICORN_INTERFACE=0.0.0.0
fi
if [ ! -v GUNICORN_PORT ]; then
    GUNICORN_PORT=8000
fi

gunicorn deezer_assignement.wsgi -b $GUNICORN_INTERFACE:$GUNICORN_PORT -w $GUNICORN_WORKERS
