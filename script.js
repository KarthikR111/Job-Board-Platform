// Utility function to get jobs from localStorage
function getJobs() {
    const jobs = localStorage.getItem('jobs');
    return jobs ? JSON.parse(jobs) : [];
}

// Utility function to save jobs to localStorage
function saveJobs(jobs) {
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

// Function to render jobs on the main page
function renderJobs() {
    const jobsContainer = document.getElementById('jobs-container');
    if (!jobsContainer) return; // Not on index.html

    const jobs = getJobs();
    jobsContainer.innerHTML = '';

    if (jobs.length === 0) {
        jobsContainer.innerHTML = '<p>No jobs available at the moment.</p>';
        return;
    }

    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Salary:</strong> ${job.salary || 'Not specified'}</p>
        `;
        jobsContainer.appendChild(jobCard);
    });
}

// Function to handle job form submission
function handleJobFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const job = {
        title: formData.get('title'),
        company: formData.get('company'),
        description: formData.get('description'),
        location: formData.get('location'),
        salary: formData.get('salary')
    };

    const jobs = getJobs();
    jobs.push(job);
    saveJobs(jobs);

    // Redirect to index.html
    window.location.href = 'index.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    renderJobs();

    const jobForm = document.getElementById('job-form');
    if (jobForm) {
        jobForm.addEventListener('submit', handleJobFormSubmit);
    }
});