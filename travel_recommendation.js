searchBtn = document.getElementById('searchBtn');

function searching() {
    const input = document.getElementById('searchDestination').value.toLowerCase();
    fetch("./travel_recommendation_api.json")
        .then(response => response.json())
        .then (data => {
            const condition = data.countries.find(item => item.name.toLowerCase() === input);
            if (condition){
                console.log(`Search true: ${condition.name}`);
                }
            else { 
                console.log(`Search false: ${input}`);
            }
        })
        .catch(error => {
            console.error("Error: ", error);
            alert("error");
        });
}
searchBtn.addEventListener("click",searching);