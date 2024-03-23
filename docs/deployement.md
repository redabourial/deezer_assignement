# Pull the docker image
```
    docker pull docker.artisandunet.com/reda_bourial_deezer_assignement:latest
```
# Deploying it
Deployement assumes you already have a nginx reverse proxy for TLS termination and an accessible mysql database.
You must set the following env variables.

| Variable                    | Description                    | Format                                    |
|-----------------------------|--------------------------------|-------------------------------------------|
| DJANGO_SECRET               | SECRET_KEY in django           | Random string                             |
| DJANGO_CORS_ALLOWED_ORIGINS | CORS_ALLOWED_ORIGINS in django | URLs as string (separated by commas)      |
| DJANGO_ALLOWED_HOSTS        | ALLOWED_HOSTS in django        | Hostnames as string (separated by commas) |
| MYSQL_HOST                  | Mysql host to use              | String                                    |
| MYSQL_DATABASE              | Mysql database to use          | String                                    |
| MYSQL_USER                  | Mysql user to use              | String                                    |
| MYSQL_PASSWORD              | Mysql password to use          | String                                    |

## Running migrations
```
    	docker run                                                       \ 
               -e DJANGO_SECRET=$$$$$$$$$$$$                             \
	           -e DJANGO_CORS_ALLOWED_ORIGINS=$$$$$$$$$$$$               \
			   -e DJANGO_ALLOWED_HOSTS=$$$$$$$$$$$$                      \
			   -e MYSQL_HOST=$$$$$$$$$$$$                                \
               -e MYSQL_DATABASE=$$$$$$$$$$$$                            \
               -e MYSQL_USER=$$$$$$$$$$$$                                \
               -e MYSQL_PASSWORD=$$$$$$$$$$$$                            \
			    docker.artisandunet.com/reda_bourial_deezer_assignement  \
				python manage.py migrate
```

## Other consideration
The container while listen for incoming connections on port 8000. 