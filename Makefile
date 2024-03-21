backend_coverage: 
	docker exec -it django coverage run --rcfile=coverage.rc manage.py test --settings=deezer_assignement.test_settings
	docker exec -it django coverage report  --rcfile=coverage.rc  -m --fail-under=100

frontend_coverage:
	docker exec -it vite npx jest 

coverage: backend_coverage frontend_coverage
