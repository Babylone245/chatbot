export class LolApi {
    constructor() {
        this.proxyUrl = 'http://localhost:3000/api'; 
    }

    async getSummonerByName(summonerName,tag) {
        const url = `${this.proxyUrl}/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}`;
        return this.fetchData(url);
    }

    async getMatchListByAccountId(encryptedAccountId) {
        const url = `${this.proxyUrl}/lol/match/v5/matches/by-puuid/${encryptedAccountId}/ids`;
        return this.fetchData(url);
    }

    async getMatchById(matchId) {
        const url = `${this.proxyUrl}/lol/match/v5/matches/${matchId}`;
        return this.fetchData(url);
    }

    async fetchData(url) {
        try {
            const response = await fetch(url, {
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getLastGame(summonerName, tag) {
        try {
            const summonerData = await this.getSummonerByName(summonerName,tag);
            if (!summonerData) return null;

            const matchList = await this.getMatchListByAccountId(summonerData.puuid);
            if (!matchList || matchList.length === 0) return null;

            const lastMatchId = matchList[0];
            const lastMatch = await this.getMatchById(lastMatchId);
            if (!lastMatch) {
                return `Aucun match trouvé pour ${summonerName} et pour tag ${tag}.`;       
            }
            
            const participants = lastMatch.info.participants;
            const participant = participants.find(participant => 
                participant.riotIdGameName.toLowerCase() === summonerName.toLowerCase()
            );

            if (!participant) {
                return `Impossible de trouver ${summonerName} dans le dernier match.`;
                
            }
            const win = participant.win;
            const kills = participant.kills;
            const deaths = participant.deaths;

            if (win) {
                return `${summonerName} a gagné la dernière partie avec ${kills} kills et ${deaths} deaths.`;
                
            } else {
                return `${summonerName} a perdu la dernière partie avec ${kills} kills et ${deaths} deaths.`; 
            }
        } catch (error) {
            console.error('Error getting last game:', error);
            throw error;
        }
    }
}
