const BASE_URL = "https://smart-garden-scheduler-production.up.railway.app";

function addPlant() {
    const name = document.getElementById('plantName').value;
    const interval = document.getElementById('wateringInterval').value;

    if (!name || !interval) {
        alert("Please fill both plant name and interval.");
        return;
    }

    fetch(`${BASE_URL}/api/plants/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            wateringIntervalDays: parseInt(interval)
        })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error("Error adding plant:", error));
}

function getSchedule() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert("Please enter your city.");
        return;
    }

    // Get weather
    fetch(`${BASE_URL}/api/plants/weather?city=${city}`)
        .then(response => response.text())
        .then(weather => {
            document.getElementById("weatherDisplay").innerText = `🌤️ Current Weather: ${weather}`;
        });

    // Get watering schedule
    fetch(`${BASE_URL}/api/plants/schedule?city=${city}`)
        .then(response => {
            if (!response.ok) throw new Error("Error fetching schedule");
            return response.json();
        })
        .then(schedule => {
            const list = document.getElementById("scheduleList");
            list.innerHTML = "";
            Object.entries(schedule).forEach(([plant, message]) => {
                const li = document.createElement("li");
                li.textContent = `${plant}: ${message}`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error("Error getting schedule:", error));
}
