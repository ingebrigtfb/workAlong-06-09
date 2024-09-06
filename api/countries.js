// api/countries.js
export async function fetchCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Failed to fetch country data');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching countries:', error);
  return []; }
  }