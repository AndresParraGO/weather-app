

const $searchForm = document.getElementById('search-form');
const $myWeather = document.getElementById('my-weather');

function kelvinToCelcius(tempKelvin) {
	return parseInt(tempKelvin - 273.15);
}

function renderMyWeather(data) {
	let iconWeather;

    if(data.weather[0].main === 'Clouds') iconWeather = '/assets/clouds.svg';
    else if(data.weather[0].main === 'Rain') iconWeather = '/assets/rain.svg';
    else if(data.weather[0].main === 'Snow') iconWeather = '/assets/snow.svg';
    else if(data.weather[0].main === 'Clear') iconWeather = '/assets/clear.svg';

	let div = document.createElement('div');
	div.className = 'animate__animated animate__wobble';
	div.innerHTML = `
		<img src=${iconWeather} class="d-block" alt="Logo del clima - weather" />
		<span class="fs-1">${kelvinToCelcius(data.main.temp)}C</span>
		<p>${data.name} / ${data.sys.country}</p>
	`;
	$myWeather.appendChild(div);
}

async function getMyWeather(){
	navigator.geolocation.getCurrentPosition(function(position) {
		fetch(`/api/city/coords?lat=${position.coords.latitude}&lon=${position.coords.longitude}`, { method: 'POST' })
			.then(res => res.json())
			.then(data => renderMyWeather(data))
	});
}


if($searchForm) {
	$searchForm.addEventListener('submit', e => {
		e.preventDefault();
		if(e.target.children[0].value !== '') {
			location.pathname = `/city/${e.target.children[0].value}`;
		}
	});
}

document.addEventListener('DOMContentLoaded', getMyWeather());

