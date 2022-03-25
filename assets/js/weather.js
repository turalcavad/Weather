let key = "d3df0c1f3f491c40d89510e9ede3bca3";
let cityName = "Baku";
const searchbar = document.querySelector(".searchbar");
const detailsButton = document.querySelector(".details-button");
const weatherBottom = document.querySelectorAll(".weather-bottom");

function weatherUpdate(cityName) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
	)
		.then((response) => response.json())
		.then((data) => weather(data))
		.catch((err) => alert("City not found"));
}

weatherUpdate(cityName);

function weather(data) {
	$(".city-name").text(data.name + ", " + data.sys.country);
	$(".temperature").text(Math.round(data.main.temp - 273.15) + "°C");
	$(".weather-description").text(data.weather[0].description);
	$(".humidity").text(data.main.humidity + "%");
	//convert m/s to km/h
	$(".wind").text(Math.round(data.wind.speed * 3.6) + " km/h");

	//additional
	$(".min-temp").text(Math.round(data.main.temp_min - 273.15) + "°C");
	$(".max-temp").text(Math.round(data.main.temp_max - 273.15) + "°C");
	$(".pressure").text(data.main.pressure + " hPa");
	$(".feels-like").text(Math.round(data.main.feels_like - 273.15) + "°C");
}

function searchCity(e) {
	if (e.keyCode == "13") {
		weatherUpdate($(".searchbar").val());
		searchbar.value = "";
	}
}

$(".searchbar").keypress(searchCity);

detailsButton.addEventListener("click", function () {
	$(".weather-bottom").toggleClass("active");
	if (weatherBottom[1].classList.contains("active")) {
		detailsButton.textContent = "Less Details";
	} else {
		detailsButton.textContent = "More Details";
	}
});
