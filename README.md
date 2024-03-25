# Live version
a live version can be found [here](https://deezer.artisandunet.com).
# How to
## Setup dev environnement
Please make sure you have docker, docker-compose and node installed.
```
make up
```
All the following commands assume the dev env is set.
## Run unit tests
### Backend only
```
make backend_coverage
```
### Frontend only
```
make frontend_coverage
```
### Both
```
make coverage
```
## Run linter (checking only)
### Backend only 
```
make backend_lint
```
### Frontend only
```
make frontend_lint
```
### Both
```
make lint
```
## Run linter (auto-lint)
### Backend only 
```
make backend_lint_fix
```
### Frontend only
```
make frontend_lint_fix
```
### Both
```
make lint_fix
```
## Build
### Simply build
```
make local_build
```
### Build and run the build
```
make local_build_and_run
```
Then go to [http://127.0.0.1:8000](http://127.0.0.1:8000).
## Run e2e tests
This assumes you have built and are running the build. 
```
make e2e_tests
```
## Run Workflows
### Backend
```
act -j backend
```
### Frontend
```
act -j frontend
```
### E2E
```
act -j e2e
```
# Ressources
## Architecture
### Dependencies
The app is made with Django, React, React-Router, Vite, Redux-Toolkit and Ant-Design. 
### URLs
| url                | method | argument                             | description                                                                             |
|--------------------|--------|--------------------------------------|-----------------------------------------------------------------------------------------|
| api/users/         | POST   | body must contain username and email | Endpoint to create a user, returns an extra timer time_to_create which isn't persisted. |
| api/users/<int:pk> | GET    | pk is the primary key                | Endpoint to get a user.                                                                 |
| assets/            | GET    |                                      | Serves assets (js/css files)                                                            |
| *                  | GET    |                                      | Catch-all that returns index.html to enable react-router to function on page refresh.   |
### Application workflow
#### User Creation Sequence
![User Creation](https://raw.githubusercontent.com/redabourial/deezer_assignement/master/.images/user_creation_sequence.png)
#### Profile Viewing sequence
![User Creation](https://raw.githubusercontent.com/redabourial/deezer_assignement/master/.images/profile_viewing_sequence.png)
## CI-CD
### Lint
Linting checks for code style and import order both for frontend and backend. 
### Unit-Testing
Unit tests test the front and the back separatly. 
### Coverage
Unit tests will fail if the coverage is below 100%.
### E2E Tests
Additional tests written with selenium in the [e2e folder](https://github.com/redabourial/deezer_assignement/tree/master/e2e).<br />
Tests are run with firefox.
### Push to registry
The docker image is built for amd64/arm64, versionned (by git tags) and pushed to hub.artisandunet.com.<br/>
There is a [check](https://github.com/redabourial/deezer_assignement/blob/master/.github/workflows/push_build.yml#L35) to predict version conflict, it doesn't push if the version already exists in the registry.
## Deployement
### Pull the docker image
```
docker pull hub.artisandunet.com/reda_bourial_deezer_assignement:latest
```
### Deploying it
Deployement assumes you already have a nginx reverse proxy for TLS termination and an accessible mysql database.<br/>
You must set the following env variables :
| Variable                    | Description                    | Format                                    |
|-----------------------------|--------------------------------|-------------------------------------------|
| DJANGO_SECRET               | SECRET_KEY in django           | Random string                             |
| DJANGO_CORS_ALLOWED_ORIGINS | CORS_ALLOWED_ORIGINS in django | URLs as string (separated by commas)      |
| DJANGO_ALLOWED_HOSTS        | ALLOWED_HOSTS in django        | Hostnames as string (separated by commas) |
| MYSQL_HOST                  | Mysql host to use              | String                                    |
| MYSQL_DATABASE              | Mysql database to use          | String                                    |
| MYSQL_USER                  | Mysql user to use              | String                                    |
| MYSQL_PASSWORD              | Mysql password to use          | String                                    |
| GUNICORN_WORKERS            | Number of gunicorn work        | Integer (default: 10)                     |
| GUNICORN_INTERFACE          | Interface to bind to           | IP address (default: 0.0.0.0)             |
| GUNICORN_PORT               | Port to listen to              | Integer (default:8000)                    |

You can check that everything is okay with your env variables using :
```
docker run                                                       \
       -e DJANGO_SECRET=$$$$$$$$$$$$$$$$$$$$$$$$$                \
       -e DJANGO_CORS_ALLOWED_ORIGINS=$$$$$$$$$$$$               \
       -e DJANGO_ALLOWED_HOSTS=$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_HOST=$$$$$$$$$$$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_DATABASE=$$$$$$$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_USER=$$$$$$$$$$$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_PASSWORD=$$$$$$$$$$$$$$$$$$$$$$$$$               \
       hub.artisandunet.com/reda_bourial_deezer_assignement      \
       python manage.py check --deploy
```
SESSION_COOKIE_SECURE is set to true make sure you set at least the X-Forwarded-Proto header in your nginx config.</br>
Here is the recommended directives :
```
proxy_set_header Host $host;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```
I is also be recommended to set the following (compatible with nginx 1.19.8+ only) :
```
proxy_cookie_flags Set $cookie_name secure;
```
An example configuration can be found in [the examples folder](https://github.com/redabourial/deezer_assignement/tree/master/examples).
### Running migrations
```
docker run                                                       \
       -e DJANGO_SECRET=$$$$$$$$$$$$$$$$$$$$$$$$$                \
       -e DJANGO_CORS_ALLOWED_ORIGINS=$$$$$$$$$$$$               \
       -e DJANGO_ALLOWED_HOSTS=$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_HOST=$$$$$$$$$$$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_DATABASE=$$$$$$$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_USER=$$$$$$$$$$$$$$$$$$$$$$$$$$$$$               \
       -e MYSQL_PASSWORD=$$$$$$$$$$$$$$$$$$$$$$$$$               \
       hub.artisandunet.com/reda_bourial_deezer_assignement      \
       python manage.py migrate
```
# Known issues
### 1. Static files are served by django
While not an issue by itself, i am aware that using a CDN is a more appropriate way of serving static files.
But since django does caching and nginx does the compression, the impact is minimal.
### 2. Source maps are added to the container
Source maps are added to the static folder and served by django.
A better way would be to filter source maps and store them as artifacts but that will not be done.
### 3. Antd source maps are broken
When building the following errors will appear:
```
node_modules/antd/es/card/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/app/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/checkbox/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/auto-complete/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
node_modules/antd/es/back-top/index.js (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.
...
```
The build files work fine, beside the fact that exceptions can't be traced in antd.
The [issue has been reported on github](https://github.com/ant-design/ant-design/issues/46273) but i couldn't find a fix.
### 4. The workflow for pushing to docker isn't compatible with act
[act](https://github.com/nektos/act) just isn't compatible with QEMU's setup action.
### 5. The workflow for pushing to docker doesn't wait for other workflows to be successful
I couldn't figure out how to do it simply.
### 6. The workflows do not use caching
I didn't have time to implement it.
### 7. The fibonnaci computation is convoluted
I choose to use the matrix exponentiation method for [computing fibonnaci](https://github.com/redabourial/deezer_assignement/blob/master/backend/users/models/user.py#L34). While not the most straightfoward method it is the fastest. My though is that specs change and you should always implement the fastest method for n -> &infin; .<br/>
For the record i known it is slower than this implementation for x in [50,55] : 
```
def fibonacci(x):
    # Start with a state corresponding to fib(50)
    fib_x = 12586269025
    fib_x_minus_one = 7778742049
    # Iterate until fib(x) is computed
    for _ in range(x - 50):
        temp = fib_x
        fib_x = fib_x + fib_x_minus_one
        fib_x_minus_one = temp
    return fib_x
```
### 8. SECURE_SSL_REDIRECT isn't set
It is assumed nginx does redirection from http to https.<br/>
In this case setting SECURE_SSL_REDIRECT results in a redirection loop.
### 9. Vite versionned files are not detected as immutable by default in whitenoise 
Fixed [here](https://github.com/redabourial/deezer_assignement/blob/master/backend/deezer_assignement/settings.py#L141)<br/>
This fix makes the first level of STATIC_ROOT immutable, which means nothing but vite files are immutable, adjust if needed.  
