var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var classes = ["today forecast-item", "forecast-item special-item", "forecast-item"]
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var menu = document.getElementById("mob-menu");
var logo = document.getElementById("mob-menu");


async function search(city) {
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    let data = await result.json();
    displayCurrent(data.location, data.current);
    displayNextDays(data.forecast.forecastday);
    console.log(data.forecast.forecastday);
}


document.getElementById("search").addEventListener("keyup", e => {
    search(e.target.value)
});



function displayCurrent(loc, curr) {
    if (null != curr) {
        var e = new Date(curr.last_updated.replace(" ", "T"));
        let cartona = `  <div class="today forecast-item">
            <div class="forecast-start d-flex justify-content-between" id="today">
                <div class="day">${days[e.getDay()]}</div>
                <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>
            </div> 
            <div class="forecast-content" id="current">
                <div class="location">${loc.name}</div>
                <div class="degree d-flex justify-content-center align-items-center flex-wrap">
                    <div class="num">${curr.temp_c}<sup>o</sup>C</div>

                    <div class="forecast-icon">
                        <img src="https:${curr.condition.icon}" alt="" width="90">
                    </div>

                </div>
                <div class="w-desc">${curr.condition.text}</div>
                <span><img src="imgs/icon-umberella.png" alt="">20%</span>
                <span><img src="imgs/icon-wind.png" alt="">18km/h</span>
                <span><img src="imgs/icon-compass.png" alt="">East</span>
            </div>
        </div>`


        document.getElementById("forecast").innerHTML = cartona;
    }
}


function displayNextDays(arr) {
    let container = ``
    
    for (let i = 1; i < arr.length; i++) 
    container += `<div class= "${classes[i]}">
    <div class="forecast-start">
        <div class="day">${days[new Date(arr[i].date.replace(" ", "T")).getDay()]}</div>
    </div> <!-- .forecast-start -->
    <div class="forecast-content mt-5">
        <div>
            <div class="forecast-icon">
                <img src="https:${arr[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${arr[i].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${arr[i].day.mintemp_c}<sup>o</sup></small>
            <div class="w-desc">${arr[i].day.condition.text}</div>
        </div>
    </div>
</div>`


    document.getElementById("forecast").innerHTML += container;
    console.log(container);
}
search("cairo");


document.getElementById("mob-btn").addEventListener('click', function(){

    if (menu.style.display === 'none') {
        menu.style.display = 'block';
        logo.style.display = 'block'
      } else {
        menu.style.display = 'none';
      }
})
