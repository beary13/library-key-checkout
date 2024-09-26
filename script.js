const librarianPassword = "librarian123"; // The correct password for login
let keyCheckedOut = false;
const waitlist = [];
let countdownInterval;
let countdownTime = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

function loginLibrarian() {
    const passwordInput = document.getElementById('librarianPassword').value;

    // Check if the entered password is correct
    if (passwordInput === librarianPassword) {
        // Hide the login section and display the librarian view
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('librarianView').style.display = 'block';
    } else {
        // If the password is incorrect, show an alert
        alert('Incorrect password. Please try again.');
    }
}

function toggleKeyStatus() {
    keyCheckedOut = !keyCheckedOut;
    const statusText = document.getElementById('statusText');
    const statusCircle = document.getElementById('statusCircle');
    const toggleButton = document.getElementById('toggleKeyButton');
    const countdownTimer = document.getElementById('countdownTimer');

    if (keyCheckedOut) {
        statusText.textContent = 'Key is checked out';
        statusCircle.classList.remove('available');
        statusCircle.classList.add('checked-out');
        toggleButton.textContent = 'Return key';
        startCountdown();
    } else {
        statusText.textContent = 'Key is available';
        statusCircle.classList.remove('checked-out');
        statusCircle.classList.add('available');
        toggleButton.textContent = 'Check out key';
        stopCountdown();
        countdownTimer.textContent = 'N/A';
    }
}

function startCountdown() {
    const countdownTimer = document.getElementById('countdownTimer');
    let endTime = Date.now() + countdownTime;

    countdownInterval = setInterval(() => {
        let timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.textContent = 'Time is up';
            keyCheckedOut = false;
            document.getElementById('statusText').textContent = 'Key is available';
            document.getElementById('statusCircle').classList.remove('checked-out');
            document.getElementById('statusCircle').classList.add('available');
            document.getElementById('toggleKeyButton').textContent = 'Check out key';
        } else {
            let hours = Math.floor(timeLeft / (1000 * 60 * 60));
            let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            countdownTimer.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
}

function addStudent() {
    const studentName = document.getElementById('studentName').value;
    const desiredTime = document.getElementById('desiredTime').value;

    if (studentName && desiredTime) {
        waitlist.push({ name: studentName, time: desiredTime });
        updateWaitlist();
    } else {
        alert('Please fill in your name and time.');
    }
}

function updateWaitlist() {
    const waitlistContainer = document.getElementById('waitlist');
    waitlistContainer.innerHTML = ''; // Clear current list
    waitlist.forEach((entry) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.name} - ${entry.time}`;
        waitlistContainer.appendChild(listItem);
    });
}
