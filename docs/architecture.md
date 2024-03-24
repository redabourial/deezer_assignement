# Dependencies
The app is made with Django, React, React-Router, Vite, Redux-Toolkit and Ant-Design. 
# URLs
| url                | method | argument                             | description                                                                             |
|--------------------|--------|--------------------------------------|-----------------------------------------------------------------------------------------|
| api/users/         | POST   | body must contain username and email | Endpoint to create a user, returns an extra timer time_to_create which isn't persisted. |
| api/users/<int:pk> | GET    | pk is the primary key                | Endpoint to get a user.                                                                 |
| assets/            | GET    |                                      | Serves assets (js/css files)                                                            |
| *                  | GET    |                                      | Catch-all that returns index.html to enable react-router to function on page refresh.   |
# Application workflow
## User Creation Sequence
![User Creation](https://raw.githubusercontent.com/redabourial/deezer_assignement/main/docs/architecture/user_creation_sequence.png)
## Profile Viewing sequence
![User Creation](https://raw.githubusercontent.com/redabourial/deezer_assignement/main/docs/architecture/profile_viewing_sequence.png)
