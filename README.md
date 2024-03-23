# Live version
a live version can be found at [https://deezer.artisandunet.com](https://deezer.artisandunet.com).
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
Then go to [http://0.0.0.0:8000](http://0.0.0.0:8000).
# Ressources
## Architecture
Please see [architecture.md](#TODO add link) 
## Code quality checks
Please see [code_quality.md](#TODO add link)
## Dev env
Please see [dev_env.md](#TODO add link)
# CI-CD
## CI
Please see [ci.md](#TODO add link)
## CD
Please see [cd.md](#TODO add link)
## Deployement
Please see [deployement.md](#TODO add link)
# Known issues
Please see [known_issues.md](#TODO add link)
