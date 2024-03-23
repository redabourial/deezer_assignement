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

