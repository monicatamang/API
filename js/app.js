// Creating a function that will be used to send a request to an API, convert the returned data into a JavaScript Object which can be used to print food images to the DOM
function foodGenerator() {
    // Starting an AJAX request
    let ajax = new XMLHttpRequest();

    // Creating a function that will run when the network event finishes
    ajax.onreadystatechange = function() {
        // Creating a message that will tell the user if the page errors
        if(this.readyState == 0 || this.status >= 400) {
            let errorMessage = document.getElementById(`errorMessage`);
            errorMessage.innerText = `An error has occured.`;
        }

        // Creating a message that will tell the user when the page is loading
        if(this.readyState == 3 && this.status == 200) {
            let loadingMessage = document.getElementById(`loadingMessage`);
            loadingMessage.innerText = `Loading...`;
        }

        // Creating a function that will convert the data the API returned into a Javascript Object as a image-URL key-value pair, and use it to print each food image to the DOM once the network event has finished and there are no errors
        if(this.readyState == 4 && this.status == 200) {
            let foodObject = JSON.parse(this.responseText);
            let foodContainer = document.getElementById(`foodImageContainer`);
            foodContainer.innerHTML = `<img src="${foodObject.image}">`;
            // document.getElementById(`loadingMessage`).style.display = `none`;
        }
    }

    // Configuring the AJAX request
    ajax.open(`GET`, `https://foodish-api.herokuapp.com/api/`, true);

    // Sending the request
    ajax.send();
}

// Adding an click event to a button that will call a function that allows the user to generate random food images
let foodButton = document.getElementById(`foodButton`);
foodButton.addEventListener(`click`, foodGenerator);