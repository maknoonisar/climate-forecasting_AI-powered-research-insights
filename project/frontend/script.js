document.getElementById("singleDateForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    let date = document.getElementById("singleDate").value;
    
    if (!date) {
        alert("Please select a date!");
        return;
    }

    let apiUrl = `http://127.0.0.1:5000/predict?date=${date}`;
    console.log("Fetching Single Date Prediction:", apiUrl);

    try {
        let response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        let data = await response.json();
        console.log("Single Date API Response:", data);

        if (!data.date || !data.predicted_temperature) {
            throw new Error("Invalid API response format");
        }

        document.getElementById("singleResult").innerHTML = `
            <h3>Predicted Temperature on ${data.date}:</h3>
            <p><strong>${data.predicted_temperature}°C</strong></p>
        `;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("singleResult").innerHTML = `<p>API Request Failed: ${error.message}</p>`;
    }
});

document.getElementById("rangeForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
        alert("Please select both start and end dates!");
        return;
    }

    let apiUrl = `http://127.0.0.1:5000/predict_range?start_date=${startDate}&end_date=${endDate}`;
    console.log("Fetching Range Prediction:", apiUrl);

    try {
        let response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        let data = await response.json();
        console.log("Range API Response:", data);

        if (!data.forecast || data.forecast.length === 0) {
            throw new Error("API returned empty forecast data");
        }

        let dates = data.forecast.map(entry => entry.date);
        let temperatures = data.forecast.map(entry => {
            let temp = parseFloat(entry.predicted_temperature);
            return isNaN(temp) ? null : temp;
        }).filter(temp => temp !== null);  // Remove null values

        console.log("Extracted Dates:", dates);
        console.log("Extracted Temperatures:", temperatures);

        if (dates.length === 0 || temperatures.length === 0) {
            throw new Error("Processed data is empty or invalid");
        }

        drawLineChart(dates, temperatures);
    } catch (error) {
        console.error("Error Fetching Data:", error);
        document.getElementById("rangeResult").innerHTML = `<p>API Request Failed: ${error.message}</p>`;
    }
});





async function fetchDataAndRender() {
    let apiUrl = "http://127.0.0.1:5000/predict_range?start_date=2025-02-01&end_date=2025-03-31"; // Example range

    try {
        console.log("Fetching Initial Data:", apiUrl);
        let response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        let data = await response.json();
        console.log("Initial API Response:", data);

        if (!data.forecast || data.forecast.length === 0) {
            throw new Error("API returned empty forecast data");
        }

        let dates = data.forecast.map(entry => entry.date);
        let temperatures = data.forecast.map(entry => {
            let temp = parseFloat(entry.predicted_temperature);
            return isNaN(temp) ? null : temp;
        }).filter(temp => temp !== null);

        console.log("Processed Dates:", dates);
        console.log("Processed Temperatures:", temperatures);

        if (dates.length === 0 || temperatures.length === 0) {
            throw new Error("Processed data is empty or invalid");
        }

        drawLineChart(dates, temperatures);
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
}

// Call function on load
fetchDataAndRender();

function drawLineChart(labels, data) {
    let ctx = document.getElementById("timeSeriesChart").getContext("2d");

    if (window.lineChartInstance) {
        window.lineChartInstance.destroy();
    }

    window.lineChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Temperature (°C)",
                data: data,
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.1)",
                borderWidth: 3,
                tension: 0.4, // Smooth line
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: "rgba(200, 200, 200, 0.2)" } },
                y: { grid: { color: "rgba(200, 200, 200, 0.2)" } }
            }
        }
    });
}



function showResult(elementId, message) {
    const resultDiv = document.getElementById(elementId);
    if (resultDiv) {
      resultDiv.textContent = message; // Set the result message
      resultDiv.classList.add("show-result"); // Add animation class
  
      // Optional: Remove animation after 3s for reset effect
      setTimeout(() => {
        resultDiv.classList.remove("show-result");
      }, 8000);
    }
  }
  
  // Example usage when fetching data
  document.getElementById("singleDateForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Simulating an API call result
    showResult("singleResult", "Predicted Temperature: 25°C");
  });
  