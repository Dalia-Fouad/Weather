

const apiKey = "a190e8b774a9408090a124259242806";
const baseUrl = "http://api.weatherapi.com/v1/forecast.json";
var locationn = document.getElementById("locationn");



getWeather();
async function getWeather(location='cairo') {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a190e8b774a9408090a124259242806&q=${location}&days=3&aqi=no&alerts=no`);  
    if(response.status == 400) return;
    const result = await response.json();
    displayWeather(result);
}


function findWeather(){
    getWeather(locationn.value);
}

function displayWeather(weatherData) {

    const days = weatherData.forecast.forecastday;
    const now = new Date(weatherData.location.localtime);
    const date = new Date(days[0].date);
    const dayName = date.toLocaleDateString("en-us", { weekday: 'long' });
    const daynum = date.toLocaleDateString("en-us", { day: 'numeric' });
    const Month = date.toLocaleDateString("en-us", { month: 'long' });
    let dir=days[0].hour[now.getHours()].wind_dir;

    let weatherCard = `<div class=" col-lg-4 weather-card  px-0 ">
                        <div class=" overflow-hidden border-0  ">
                            <div class="card_header d-flex justify-content-between p-2">
                                <div class="day"> ${dayName} </div>
                                <div class="date">${daynum} ${Month}</div>
                            </div>
                            <div class="card_body  p-3">
                                <div class="location">${weatherData.location.name}</div>
                                <div class="degree text-white ">
                                    <div class="temp-c mb-0 pb-0 fw-bold ">
                                        ${days[0].hour[now.getHours()].temp_c}&deg C
                                    </div>
                                    <div class="icon">
                                        <img src="https:${days[0].hour[now.getHours()].condition.icon}" class="w-25 h-25" alt="weather icon">
                                    </div>
                                </div>
                                
                                <div class="condition text-info  mb-4">${days[0].hour[now.getHours()].condition.text}</div>
                                <span class=" me-2">
                                    <img src="./images/asset2.png"  alt="umberella">
                                     ${days[0].hour[now.getHours()].chance_of_rain}%

                                </span>
                                <span class=" me-2">
                                    <img src="./images/asset3.png" alt="wind">
                                    ${days[0].hour[now.getHours()].wind_kph}Km/h
                                </span >
                                <span>
                                    <img src="./images/asset4.png" alt="compass">
                                    ${dir=="E"?"East": dir=="N" ?"North": dir=="NW" ? "Northwest" :dir=="W"?"West" : dir=="S"?"South"
                                        : dir=="NE"?"Northeast" : dir=="SE"?"Southeast" : dir=="SW"?"Southwest" :dir
                                    }
                                </span>
                            </div>
                        </div>
                    </div>`;


    for (let i = 1; i < days.length; i++) {
        const date = new Date(days[i].date);
        const dayName = date.toLocaleDateString("en-us", { weekday: 'long' });

        weatherCard += `                    
                    
                    <div class="col-lg-4 weather-card px-0  ">
                        <div class=" overflow-hidden border-0  ">
                            <div class="card_header text-center p-2">
                                <div class="day"> ${dayName} </div>
                                
                            </div>
                            <div class="card_body ">

                                <div class=" text-white d-flex flex-column text-center py-3 ">
                                    <div class="icon my-3">
                                        <img src="https:${days[i].day.condition.icon}" class="w-25 h-25" alt="weather icon">
                                    </div>
                                    <div class="temp-c fs-4 text-white d-flex flex-column text-center mb-3">
                                        <span class="fs-2 fw-semibold"> ${days[i].day.maxtemp_c}&deg C</span>
                                        <span> ${days[i].day.mintemp_c}&deg C </span>
 
                                    </div>
                                     
                                    <div class="condition text-info my-3">${days[i].day.condition.text}</div>
                                </div>
                                
                               

                            </div>
                        </div>
                    </div>
                    
                    `
    }
    document.querySelector(".weather-table").innerHTML = weatherCard;
}
