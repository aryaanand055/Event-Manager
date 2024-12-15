fetch('/api/getEvents')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);  // Display events
        // Add logic to display events dynamically on your page
    });
