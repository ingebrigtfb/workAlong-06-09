import { fetchCountries } from '../api/countries.js';
import { fetchWeather } from '../api/weather.js';

export async function createContent() {
  const content = document.createElement('main');
  content.classList.add('content');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search for a country...';
  searchInput.classList.add('search-input');
  content.appendChild(searchInput);

  const countryList = document.createElement('ul');
  content.appendChild(countryList);

  const countries = await fetchCountries();

  function displayCountries(filteredCountries) {
    countryList.innerHTML = '';

    filteredCountries.forEach((country) => {
      const li = document.createElement('li');

      const flagImg = document.createElement('img');
      flagImg.src = country.flags.png;
      flagImg.alt = `${country.name.common} flag`;
      flagImg.style.width = '30px';
      flagImg.style.marginRight = '10px';

      const countryName = document.createElement('span');
      countryName.textContent = country.name.common;

      const weatherInfo = document.createElement('span');
      weatherInfo.textContent = '';
      weatherInfo.style.marginLeft = '10px';

      li.appendChild(flagImg);
      li.appendChild(countryName);
      li.appendChild(weatherInfo);

      let weatherVisible = false;

      li.addEventListener('click', async () => {
        if (weatherVisible) {
          weatherInfo.textContent = '';
          weatherVisible = false;
        } else {
          if (country.capitalInfo && country.capitalInfo.latlng) {
            const [lat, lon] = country.capitalInfo.latlng;
            const weather = await fetchWeather(lat, lon);

            weatherInfo.textContent = ` - Weather in ${
              country.capital ? country.capital[0] : 'Capital'
            }: ${weather.current_weather.temperature}°C, Code: ${
              weather.current_weather.weathercode
            }`;
          } else {
            weatherInfo.textContent = ' - Weather data not available for this country.';
          }
          weatherVisible = true;
        }
      });

      countryList.appendChild(li);
    });
  }

  displayCountries(countries);

  searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery)
    );

    displayCountries(filteredCountries);
  });

  return content;
}