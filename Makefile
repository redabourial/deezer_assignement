include .env

backend_coverage: 
	docker exec -it django coverage run --rcfile=coverage.rc manage.py test --settings=deezer_assignement.test_settings
	docker exec -it django coverage report  --rcfile=coverage.rc  -m --fail-under=100

frontend_coverage:
	docker exec -it vite npx jest 

coverage: backend_coverage frontend_coverage

backend_lint:
	docker exec -it django black --check .

frontend_lint:
	docker exec -it vite npm run lint

lint: backend_lint frontend_lint


backend_lint_fix:
	docker exec -it django black .

frontend_lint_fix:
	docker exec -it vite npm run lint_fix

lint_fix: backend_lint_fix frontend_lint_fix

local_build:
	docker rmi -f deezer_assignement:nightly
	cd frontend && npm install
	cd frontend && npm run build
	rm -rf backend/static/
	mkdir backend/static/
	mv ./frontend/dist/* backend/static/
	docker build --tag deezer_assignement:nightly . 

local_run:
	docker rm -f django vite || true
	docker run -e DJANGO_SECRET=secret                              \
	           -e DJANGO_CORS_ALLOWED_ORIGINS=http://0.0.0.0:8000   \
			   -e DJANGO_ALLOWED_HOSTS=0.0.0.0                      \
			   -e MYSQL_HOST=127.0.0.1                              \
               -e MYSQL_DATABASE=$(MYSQL_DATABASE)                  \
               -e MYSQL_USER=$(MYSQL_USER)                          \
               -e MYSQL_PASSWORD=$(MYSQL_PASSWORD)                  \
			   --network="host"                                     \
			   -p 127.0.0.1:80:8000                                 \
			    docker.io/library/deezer_assignement:nightly

local_build_and_run: local_build local_run
