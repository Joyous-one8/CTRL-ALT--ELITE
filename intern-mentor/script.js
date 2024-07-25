document.getElementById('mentorship-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const internName = document.getElementById('intern').value;
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('confirmation').textContent = 'The intern ' + internName + ' will contact you soon.';
});
