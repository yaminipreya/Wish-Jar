function goToStep(stepNumber) {
    // Update step contents
    const steps = document.querySelectorAll('.simulator-step-content');
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${stepNumber}`).classList.add('active');

    // Update progress bar circles
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((pStep, index) => {
        if (index + 1 <= stepNumber) {
            pStep.classList.add('active');
        } else {
            pStep.classList.remove('active');
        }
    });

    // Dynamic updates based on inputs
    if (stepNumber === 2) {
        const customName = document.getElementById('jarNameInput').value;
        if(customName) {
            document.getElementById('displayJarTitle').innerText = customName;
        }
    }

    // Smooth scroll to simulator
    document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' });
}

function scrollToSimulator() {
    document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' });
}
