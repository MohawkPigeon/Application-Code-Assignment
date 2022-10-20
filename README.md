# Application-Code-Assignment

To get the program running in docker:

1. Open a terminal and go to the root of this project.
2. Have docker open and run this: docker build . -t "your username"/node-web-app
3. Then this: docker run -p 49160:8080 -d "your username"/node-web-app

Once docker is running, this should work as an example:
http://localhost:49160/api/doctors/1

GET: /api/patient/:CPR/:id

GET: /api/patients/:id

GET: /api/doctors/:CPR


POST: /api/patient
Needs: name(STRING), CPR(INT)

POST: /api/doctor
Needs: name(STRING), id(INT), department(INT)

POST: /api/admission
Needs: department(INT), doctors(INT), patient(INT)
