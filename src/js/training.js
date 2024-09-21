const multiStepForm = document.getElementById('multiStepForm');
const steps = Array.from(document.querySelectorAll('div[id^="step"]'));
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const currentStepText = document.getElementById('currentStep');
const stepTitle = document.getElementById('stepTitle');
const stepIndicators = document.querySelectorAll('.step-indicator');

let currentStep = 0;

const validateCurrentStep = () => {
    const inputs = steps[currentStep].querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.required) {
            const errorElement = document.querySelector(`[data-error="${input.name}"]`);
            if (!input.value) {
                isValid = false;
                errorElement.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)}`;
                errorElement.classList.remove('hidden');
            }
        }
    });

    nextBtn.disabled = !isValid;
    nextBtn.classList.toggle('opacity-50', !isValid);
    nextBtn.classList.toggle('cursor-not-allowed', !isValid);
    return isValid;
};

const updateStepDisplay = (step) => {
    steps.forEach((s, index) => {
        s.classList.toggle('hidden', index !== step);
    });

    currentStepText.textContent = step + 1;
    progressBar.style.width = `${(step + 1) / steps.length * 100}%`;

    if (step === steps.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }

    prevBtn.classList.toggle('hidden', step === 0);
    stepTitle.textContent = ['Personal Information', 'Educational Background', 'Course Selection', 'Final Details'][step];

    stepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === step);
        indicator.classList.toggle('completed', index < step);
    });

    validateCurrentStep();
};

steps.forEach(step => {
    step.addEventListener('input', validateCurrentStep);
});

nextBtn.addEventListener('click', () => {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
        currentStep++;
        updateStepDisplay(currentStep);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateStepDisplay(currentStep);
    }
});

multiStepForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
        const formData = new FormData(multiStepForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        try {
            const response = await fetch('#', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                multiStepForm.reset();
                currentStep = 0;
                updateStepDisplay(currentStep);
            } else {
                alert('There was an error submitting the form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    }
});

const handleOtherOption = (selectElement, otherInputElement) => {
    selectElement.addEventListener('change', (e) => {
        otherInputElement.classList.toggle('hidden', e.target.value !== 'others');
        otherInputElement.required = e.target.value === 'others';
    });
};

handleOtherOption(
    document.querySelector('select[name="degree"]'),
    document.querySelector('input[name="otherDegree"]')
);
handleOtherOption(
    document.querySelector('select[name="course"]'),
    document.querySelector('input[name="otherCourse"]')
);
handleOtherOption(
    document.querySelector('select[name="engineeringSubject"]'),
    document.querySelector('input[name="otherEngineeringSubject"]')
);
handleOtherOption(
    document.querySelector('select[name="softwareSubject"]'),
    document.querySelector('input[name="otherSoftwareSubject"]')
);

// Initialize form display
updateStepDisplay(currentStep);