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
Please see [architecture.md](https://raw.githubusercontent.com/redabourial/deezer_assignement/main/docs/architecture.md) 
## CI-CD
Please see [ci_cd.md](https://raw.githubusercontent.com/redabourial/deezer_assignement/main/docs/ci_cd.md)
## Deployement
Please see [deployement.md](https://raw.githubusercontent.com/redabourial/deezer_assignement/main/docs/deployement.md)
# Known issues
Please see [known_issues.md](https://raw.githubusercontent.com/redabourial/deezer_assignement/main/docs/known_issues.md)
