/* Get the elemnt button for search */
searchBtn = document.getElementById('searchBtn');
/* Function to show recommedation with the weywords */
function searching() {
    /* Get the data in LowerCase */
    const input = document.getElementById('searchDestination').value.toLowerCase();
    /*Get data from the json*/
    fetch("./travel_recommendation_api.json")
        /* Take the response body as JSON */
        .then(response => response.json())
        /* Work with JSON data */
        .then(data => {
            /* Get the div to display the results */
            const results = document.getElementById('results');
            /* Delete previous results */
            results.innerHTML = "";
            /*If data is equal to any country then show it*/
            const conditioncountry = data.countries.find(item => item.name.toLowerCase() === input);
            if (conditioncountry){
                const cities = conditioncountry.cities;
                showcity(cities);
            }
            /* If data is equal to beach then show it */
            else if (input === "beach" || input === "beaches") {
                const beaches = data.beaches;
                showcity(beaches);
            }
            /* If data is equal to beach then show it */
            else if (input === "country" || input === "countries") {
                const countries = data.countries;
                for (const country of countries) {
                    const cities = country.cities;
                    showcity(cities);
                }
            }
            /* If data is equal to temple then show it */
            else if (input === "temple" || input === "temples") {
                const temples = data.temples;
                showcity(temples);
            }
            /* If data is empty show an alert */
            else if (input == '') {
                alert('Please write a keyword');
            }
            /* If it's different show a message that it doesn't match*/
            else {
                var result = document.createElement('div');
                var citydescription = document.createElement('p');
                citydescription.innerHTML = `There is no keyword with the input: <b>${input}</b>`;
                result.classList.add('result');
                results.appendChild(result);
                result.appendChild(citydescription);
            }
            /* Empty the input */
            const inputdata = document.getElementById('searchDestination');
            inputdata.value = '';
        })
        /* Catch the error */
        .catch(error => {
            console.error("Error: ", error);
            alert("error");
        });
}
/* Clear the input when the clear button is clicked */
function clearInput() {
    const input = document.getElementById('searchDestination');
    input.value = '';
}
/*Function for show the cities*/
function showcity(cities) {
    /* Create an array with all the countries and their timezones*/
    const timeZoneCountries = {
        "Australia": "Australia/Sydney",
        "Japan": "Asia/Tokyo",
        "Brazil": "America/Sao_Paulo",
        "Cambodia": "Asia/Phnom_Penh",
        "India": "Asia/Kolkata",
        "French Polynesia": "Pacific/Tahiti"
    }
    /* For to get every citi*/
    for (const city of cities) {
        /* Creates the div, img, description, time and h3 */
        var result = document.createElement('div');
        var cityimg = document.createElement('img');
        var cityname = document.createElement('h3');
        var citydescription = document.createElement('p');
        var citytime = document.createElement('p');
        var visitbutton = document.createElement('button');
        /* Get the country (everything after the ,) */
        country = city.name.split(",")[1].trim();
        /* Select the corresponding timezone for the country */
        timeZoneCountry = timeZoneCountries[country];
        /* Adding the data for the images, city name, timezone, button and description */
        cityimg.setAttribute('src', city.imageUrl);
        cityname.textContent = city.name;
        citydescription.textContent = city.description;
        /* Specify the time format */
        const options = { timeZone: timeZoneCountry, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const countrytime = new Date().toLocaleTimeString('en-US', options);
        citytime.textContent = (`Current time in ${country}: ${countrytime}`);
        /* Add button for visit */
        visitbutton.textContent = "Visit";
        /* Adding the class result to the div*/
        result.classList.add('result');
        /* Results will be parent of result */
        results.appendChild(result);
        /* Result will be the parent of all the elements */
        result.appendChild(cityimg);
        result.appendChild(cityname);
        result.appendChild(citydescription);
        result.appendChild(citytime);
        result.appendChild(visitbutton);
    }
}
/* Create events on click for search and clear buttons */
searchBtn.addEventListener("click", searching);
searchClearBtn.addEventListener("click", clearInput);