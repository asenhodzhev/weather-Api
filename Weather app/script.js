const weather = {
    "apiKey": "ee25e673cc1776d661d1c2881bad0a2b",
    fetchWeather: (city) => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
            console.log(error)
        });
    },
    displayWeather: (data) => {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        //document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        //document.main.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.querySelector("#main-content").style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: () => {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav__links");

document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        weather.search();
    }
});

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

document.querySelectorAll("li").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

document.querySelector(".footer-text").innerText = "Copyright \u00a9, " + new Date().getFullYear() + ", SoftServe Academy";

weather.fetchWeather("Plovdiv");