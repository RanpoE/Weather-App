async function postData() {
    const API_KEY = 'YOUR_API_KEY'
    const COORD = 'YOUR_COORDINATES'
    const BASE_URL = 'http://api.weatherapi.com/v1/'

    try {
        const response = await fetch(`${BASE_URL}current.json?key=${API_KEY}&q=${COORD}`, {
            method: 'POST'
        })

        if (!response.ok) {
            throw new Error(`Request error ${response.status}`)
        }

        const data = await response.json()
        const { current: { temp_c, humidity } } = data;
        document.getElementById('currentTemp').textContent = temp_c + '°'
        document.getElementById('currentHumid').textContent = humidity + '%';
    } catch (error) {
        console.log(error)
    }
}

function updateDateTime() {
    const now = new Date();

    // Update time (24-hour format)
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Manila'
    });
    document.getElementById('currentTime').textContent = timeString;

    // Update day
    const dayString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        timeZone: 'Asia/Manila'
    });
    document.getElementById('currentDay').textContent = dayString;

    // Update date
    const dateString = now.getDate();
    document.getElementById('currentDate').textContent = dateString;
}

// Initialize and update every minute
updateDateTime();
setInterval(updateDateTime, 60000);
postData()
// Interval every hour
setInterval(postData, 6000 * 60)