const API_KEY = '7181cbeb84msh82625dd5a69cc12p14a2fejsnda3fd1c30214';

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const GEO_API_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

export async function fetchCities(input){
    try {
        const response = await fetch(`${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`, GEO_API_OPTIONS);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
}