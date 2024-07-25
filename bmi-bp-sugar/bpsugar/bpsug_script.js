// Function to determine diet plan based on user input
function getDietPlan() {
    // Get user inputs
    let bp = parseFloat(document.getElementById('bp').value);
    let sugar = parseFloat(document.getElementById('sugar').value);
    let dietType = document.querySelector('input[name="dietType"]:checked').value;
    
    // Result container
    let result = document.getElementById('result');

    // Validate inputs
    if (isNaN(bp) || isNaN(sugar) || !dietType) {
        result.textContent = 'Please enter valid inputs for blood pressure, sugar level, and diet type.';
        return;
    }

    // Determine diet plan
    let dietPlan = '';

    if (bp > 140 || bp < 90 || sugar > 180) {
        if (bp > 140 && sugar > 180) {
            // Both high BP and high sugar
            dietPlan = dietType === 'vegetarian' ? `
                <h2>Diet Plan for Both High Blood Pressure and High Blood Sugar (Vegetarian)</h2>
                <ul>
                    <li><strong>Breakfast:</strong> Oats porridge with a small portion of fresh fruit.</li>
                    <li><strong>Lunch:</strong> Dal (lentil curry) with brown rice and a side of steamed green vegetables.</li>
                    <li><strong>Dinner:</strong> Mixed vegetable curry with roti and a small serving of curd.</li>
                    <li><strong>Snacks:</strong> Fresh fruits (like berries) and a handful of nuts.</li>
                </ul>
            ` : `
                <h2>Diet Plan for Both High Blood Pressure and High Blood Sugar (Non-Vegetarian)</h2>
                <ul>
                    <li><strong>Breakfast:</strong> Oats porridge with a small portion of fresh fruit and a boiled egg.</li>
                    <li><strong>Lunch:</strong> Grilled chicken with brown rice and a side of steamed green vegetables.</li>
                    <li><strong>Dinner:</strong> Fish curry with roti and a small serving of curd.</li>
                    <li><strong>Snacks:</strong> Fresh fruits (like berries) and a handful of nuts.</li>
                </ul>
            `;
        } else if (bp > 140) {
            // High BP
            dietPlan = dietType === 'vegetarian' ? `
                <h2>Diet Plan for High Blood Pressure (Vegetarian)</h2>
                <ul>
                    <li><strong>Breakfast:</strong> Whole wheat paratha with a side of curd.</li>
                    <li><strong>Lunch:</strong> Dal (lentil curry) with roti (whole wheat bread) and a side of mixed vegetable sabzi (curry).</li>
                    <li><strong>Dinner:</strong> Brown rice with a side of palak (spinach) and a bowl of dal.</li>
                    <li><strong>Snacks:</strong> Fresh fruits (like apples or oranges) and a handful of nuts (like almonds).</li>
                </ul>
            ` : `
                <h2>Diet Plan for High Blood Pressure (Non-Vegetarian)</h2>
                <ul>
                    <li><strong>Breakfast:</strong> Whole wheat paratha with a side of curd and a boiled egg.</li>
                    <li><strong>Lunch:</strong> Grilled chicken with roti (whole wheat bread) and a side of mixed vegetable sabzi (curry).</li>
                    <li><strong>Dinner:</strong> Brown rice with a side of palak (spinach) and grilled fish.</li>
                    <li><strong>Snacks:</strong> Fresh fruits (like apples or oranges) and a handful of nuts (like almonds).</li>
                </ul>
            `;
        } else if (sugar > 180) {
            // High Sugar
            dietPlan = dietType === 'vegetarian' ? `
                <h2>Diet Plan for High Blood Sugar (Vegetarian)</h2>
                <ul>
                    <li><strong>Breakfast:</strong> Moong dal chilla (lentil pancakes) with a side of mint chutney.</li>
                    <li><strong>Lunch:</strong> Quinoa or brown rice with a side of mixed vegetable curry and a bowl of curd.</li>
                    <li><strong>Dinner:</strong> Chana dal (split chickpea curry) with roti and a side of steamed vegetables.</li>
                    <li><strong>Snacks:</strong> A handful of walnuts or a small portion of fruit like an apple or pear.</li>
                </ul>
            ` : `
                <h2>Diet Plan for High Blood Sugar (Non-Vegetarian)</h2>
                <ul>
                    <li><strong>Breakfast:</strong> Moong dal chilla (lentil pancakes) with a side of mint chutney and a boiled egg.</li>
                    <li><strong>Lunch:</strong> Quinoa or brown rice with a side of mixed vegetable curry and grilled chicken.</li>
                    <li><strong>Dinner:</strong> Chana dal (split chickpea curry) with roti and grilled fish.</li>
                    <li><strong>Snacks:</strong> A handful of walnuts or a small portion of fruit like an apple or pear.</li>
                </ul>
            `;
        }
    } else {
        // Normal levels
        dietPlan = dietType === 'vegetarian' ? `
            <h2>Diet Plan for Normal Levels (Vegetarian)</h2>
            <ul>
                <li><strong>Breakfast:</strong> Upma (semolina dish) with a side of fresh fruit.</li>
                <li><strong>Lunch:</strong> Dal with brown rice or roti, and a side of vegetable curry.</li>
                <li><strong>Dinner:</strong> Vegetable khichdi (rice and lentil dish) with a side of raita (yogurt-based side dish).</li>
                <li><strong>Snacks:</strong> Fresh fruits and a small handful of mixed nuts.</li>
            </ul>
        ` : `
            <h2>Diet Plan for Normal Levels (Non-Vegetarian)</h2>
            <ul>
                <li><strong>Breakfast:</strong> Upma (semolina dish) with a side of fresh fruit and a boiled egg.</li>
                <li><strong>Lunch:</strong> Dal with brown rice or roti, and grilled chicken with a side of vegetable curry.</li>
                <li><strong>Dinner:</strong> Vegetable khichdi (rice and lentil dish) with grilled fish and a side of raita (yogurt-based side dish).</li>
                <li><strong>Snacks:</strong> Fresh fruits and a small handful of mixed nuts.</li>
            </ul>
        `;
    }

    // Display result
    result.innerHTML = dietPlan;
}

// Add event listener to the form
document.getElementById('dietForm').addEventListener('submit', function(event) {
    event.preventDefault();
    getDietPlan();
});

// Function to download the report as a text file
function downloadReport() {
    let result = document.getElementById('result').innerHTML;
    let blob = new Blob([result], { type: 'text/html' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'diet_plan.html';
    link.click();
}

// Add event listener to the download button
document.getElementById('downloadReport').addEventListener('click', downloadReport);




