function calculateBMI() {
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight) {
        document.getElementById('status').innerText = 'Please enter valid values.';
        return;
    }

    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters * heightInMeters);
    bmi = bmi.toFixed(2);

    var statusText = 'Your BMI is ' + bmi + '. ';
    var idealWeightMin = 18.5 * (heightInMeters * heightInMeters);
    var idealWeightMax = 24.9 * (heightInMeters * heightInMeters);

    var status, suggestions;

    if (bmi < 18.5) {
        status = 'Underweight';
        suggestions = `
            <ul>
                <li>Increase your calorie intake with nutritious foods.</li>
                <li>Include more protein-rich foods like lean meats, dairy, and legumes.</li>
                <li>Incorporate healthy fats from nuts, seeds, and avocados.</li>
                <li>Consider strength training exercises to build muscle mass.</li>
                <li>Consult with a healthcare professional for personalized advice.</li>
            </ul>
        `;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        status = 'Normal';
        suggestions = `
            <ul>
                <li>Maintain a balanced diet with a variety of nutrients.</li>
                <li>Continue regular physical activities to stay fit.</li>
                <li>Monitor your weight periodically to stay within the healthy range.</li>
                <li>Stay hydrated and get enough sleep.</li>
            </ul>
        `;
    } else {
        status = 'Overweight';
        suggestions = `
            <ul>
                <li>Reduce calorie intake with portion control and balanced meals.</li>
                <li>Increase physical activities, such as cardio exercises and strength training.</li>
                <li>Include more fruits, vegetables, and whole grains in your diet.</li>
                <li>Limit the consumption of sugary and processed foods.</li>
                <li>Consult with a healthcare professional for personalized advice.</li>
            </ul>
        `;
    }

    document.getElementById('status').innerText = 'Status: ' + status;
    document.getElementById('idealWeight').innerHTML = `Ideal weight range: ${idealWeightMin.toFixed(1)} kg - ${idealWeightMax.toFixed(1)} kg.`;
    document.getElementById('suggestions').innerHTML = `Suggestions: ${suggestions}`;
}
