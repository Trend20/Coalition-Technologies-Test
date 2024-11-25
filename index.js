document.addEventListener('DOMContentLoaded', () => {
    // Initialize blood pressure chart
    const ctx = document.getElementById('bpChart').getContext('2d');
    const bpChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
            datasets: [{
                label: 'Systolic',
                data: [120, 118, 162, 115, 148, 160],
                borderColor: '#FF69B4',
                tension: 0.4
            },
                {
                    label: 'Diastolic',
                    data: [80, 65, 110, 95, 70, 78],
                    borderColor: '#4169E1',
                    tension: 0.4
                }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 200
                }
            }
        }
    });

    // Fetch and populate patient data
    async function fetchPatientData() {
        try {
            const response = await fetch('https://api.example.com/patients');
            const data = await response.json();
            populatePatientsList(data);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    }

    function populatePatientsList(patients) {
        const patientsList = document.getElementById('patientsList');
        patients.forEach(patient => {
            const patientEl = document.createElement('div');
            patientEl.className = 'patient-item';
            patientEl.innerHTML = `
                    <div class="patient-avatar"></div>
                    <div>
                        <div>${patient.name}</div>
                        <div style="color: var(--text-secondary); font-size: 14px;">
                            ${patient.gender}, ${patient.age}
                        </div>
                    </div>
                `;
            patientsList.appendChild(patientEl);
        });
    }
});