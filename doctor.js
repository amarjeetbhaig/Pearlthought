const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Sample data for doctors and appointments
const doctors = [
    { id: 1, name: "Dr. Smith", availableSlots: ["Monday 6 PM", "Wednesday 7 PM", "Friday 8 PM"] },
    // Add more doctors if needed
];

const appointments = [];

// API endpoint for getting the list of doctors
app.get('/doctors', (req, res) => {
    const doctorList = doctors.map(doctor => ({ id: doctor.id, name: doctor.name }));
    res.json(doctorList);
});

// API endpoint for getting doctor details
app.get('/doctors/:doctorId', (req, res) => {
    const doctorId = parseInt(req.params.doctorId);
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    if (doctor) {
        res.json({ id: doctor.id, name: doctor.name, availableSlots: doctor.availableSlots });
    } else {
        res.status(404).json({ error: "Doctor not found" });
    }
});

// API endpoint for booking an appointment
app.post('/appointments', (req, res) => {
    const { doctorId, patientName, slot } = req.body;
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    if (doctor && doctor.availableSlots.includes(slot)) {
        const appointmentId = appointments.length + 1;
        const appointment = { id: appointmentId, doctorId, patientName, slot };
        appointments.push(appointment);
        res.status(201).json({ message: "Appointment booked successfully", appointmentId });
    } else {
        res.status(400).json({ error: "Invalid doctor ID or slot" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
