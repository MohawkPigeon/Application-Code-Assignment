# Application-Code-Assignment

Once docker is running, this should work as an example:
http://localhost:8080/api/doctors/1

GET: /api/patient/:CPR/:id

GET: /api/patients/:id

GET: /api/doctors/:CPR


POST: /api/patient
Needs: name(STRING), CPR(INT)

POST: /api/doctor
Needs: name(STRING), id(INT), department(INT)

POST: /api/admission
Needs: department(INT), doctors(INT), patient(INT)
