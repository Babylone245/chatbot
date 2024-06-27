export class JokeApi {
    constructor() {
        this.url = 'https://v2.jokeapi.dev/joke/Any?lang=fr'
    }

    async fetchData() {
        try {
            const response = await fetch(this.url, {
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getJoke(){
        const response = await this.fetchData();
        return response;
    }
}
