const express = require('express');
const app = express();

app.use(express.json());

//doctors should probably be a doctors object but adding as an integer for simplicity. doctors = id, patient = CPR.
const admissions = [
    {department: 1, doctors: 1, patient: 1},
    {department: 2, doctors: 2, patient: 2},
    {department: 3, doctors: 3, patient: 3},
    {department: 1, doctors: 1, patient: 2},
    {department: 1, doctors: 2, patient: 1}
];
const patients = [
    {name: 'patient1', CPR: 1},
    {name: 'patient2', CPR: 2},
    {name: 'patient3', CPR: 3}
];
const doctors = [
    {name: 'doctor1', id: 1, department: 1},
    {name: 'doctor2', id: 2, department: 2},
    {name: 'doctor3', id: 3, department: 3}
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Check if doctor has access to patient and send patient if true.
app.get('/api/patient/:CPR/:id', (req, res) => {
    const admission = admissions.find(a => a.doctors === parseInt(req.params.id))
    const patient = patients.find(p => p.CPR === parseInt(req.params.CPR) && parseInt(req.params.CPR) === admission.patient); //This could be done in one line with above, but leaving as is for readability.
    if (!patient) res.status(404).send('Patient with given id was not found for given doctor');
    res.send(patient);
});

app.post('/api/patient', (req, res) => {
    const patient = {
        name: req.body.name,
        CPR: req.body.CPR
    };
    patients.push(patient);
    res.send(patient);
});

app.post('/api/doctor', (req, res) => {
    const doctor = {
        name: req.body.name,
        id: req.body.id,
        department: req.body.department
    };
    doctors.push(doctor);
    res.send(doctor);
});

//Get a list of all patients for a doctor
const patientIDs = []; //there might be a better way to do this, without these IDs.
app.get('/api/patients/:id', (req, res) => {
    const admission = admissions.filter(a => a.doctors === parseInt(req.params.id));
    admission.forEach(element => {
        patientIDs.push(element.patient);
    }); 

    const patientList = patients.filter(p => patientIDs.includes(p.CPR));
    if (!patientList) res.status(404).send('No patients was found for given doctor');
    res.send(patientList);

    patientIDs.forEach(element => {
        patientIDs.pop();
    });
    patientIDs.pop();
});

//Get a list of all doctors for a patient
const admissionIDs = [];
const IDs = [];
app.get('/api/doctors/:CPR', (req, res) => {
    const patient = patients.filter(p => p.CPR === parseInt(req.params.CPR));
    patient.forEach(element => {
        admissionIDs.push(element.CPR);
    }); 

    const admissionList = admissions.filter(a => admissionIDs.includes(a.patient));
    admissionList.forEach(element => {
        IDs.push(element.doctors);
    }); 

    const doctor = doctors.filter(d => IDs.includes(d.id));
    if (!doctor) res.status(404).send('Patient with given id was not found for any doctor');
    res.send(doctor);


    //you could use only one ID placeholder variable by popping in the code instead of at the end.
    admissionIDs.forEach(element => {
        admissionIDs.pop();
    });
    admissionIDs.pop();
    IDs.forEach(element => {
        IDs.pop();
    });
    IDs.pop();
});

//Assign a doctor to a patient, the program is currently setup to give doctors access to patients who are assigned to them in admission. There are currently no checks on whether or not they are in the same department.
app.post('/api/admission', (req, res) => {
    const admission = {
        department: parseInt(req.body.department),
        doctors: parseInt(req.body.doctors),
        patient: parseInt(req.body.patient)
    };
    admissions.push(admission);
    res.send(admission);
});


const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));


//Overall the program still needs some validation and error handeling, but works in it's current state.