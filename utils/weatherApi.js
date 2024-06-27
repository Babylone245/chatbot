export class WeatherApi {
    constructor() {
        this.baseurl = 'http://api.weatherapi.com/v1/current.json?key=2001f7638aca40ddbfb82513242606'
    }

    async fetchData(city) {
        try {
            const url = `${this.baseurl}&q=${city}`
            const response = await fetch(url, {
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getWeather(city){
        const response = await this.fetchData(city);
        return response;
    }
}
