let key = "d3df0c1f3f491c40d89510e9ede3bca3";
let cityName = "London";
const searchbar = document.querySelector(".searchbar");

function weatherUpdate(cityName) {
	console.log(cityName);
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
	$(".humidity").text(data.main.humidity);
	$(".wind").text(data.wind.speed + " m/s");
}

function searchCity(e) {
	if (e.keyCode == "13") {
		weatherUpdate($(".searchbar").val());
		searchbar.value = "";
	}
}

$(".searchbar").keypress(searchCity);
