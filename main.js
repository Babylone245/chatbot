
import { Bot } from './class/bot.js';
import { User } from './class/user.js';
import { Utils } from './utils/utils.js';
import { LolApi } from './utils/lolApi.js';
import { JokeApi } from './utils/jokeApi.js';
import { WeatherApi } from './utils/weatherApi.js';

document.addEventListener('DOMContentLoaded', function() {
    const user = new User('Utilisateur', '/profil.png');

    const bots = [
        new Bot('bot1', '/logo.png'),
        new Bot('bot2', '/joker.png'),
        new Bot('bot3', '/meteo.png')
    ];

    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    loadMessages();
    sendBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            user.sendMessage(message); 
            messageInput.value = '';

            setTimeout(() => {
                handleUserCommand(message);
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendBtn.click();
        }
    });


    function loadMessages() {
            const messages = Utils.loadMessages();
            messages.forEach(({ message, messageType, iconPath }) => {
                const messageElement = Utils.createMessageElement(message, messageType, iconPath);
                chatBox.appendChild(messageElement);
            });
            Utils.scrollToBottom()
    }

    const handleUserCommand = async (message)  => {
        const commandPattern = /^!(\w+)\s*(.*)$/;
        const match = message.match(commandPattern);
    
        if (match) {
            const command = match[1];
            const argument = match[2];
    
            switch (command.toLowerCase()) {
                case 'lol':
                    if(argument){
                    await handleLeagueOfLegendsCommand(argument,bots[0]);
                    }
                    else{
                    bots[0].sendMessage("Tu es nul à league of legend abandonne.");
                    }
                    break;
                case 'joke':
                    if(argument){
                    bots[0].sendMessage("Arrête l'humour sérieux.");
                    }
                    else{
                    await handleJokeCommand(bots[1]);
                    }
                    break;
                case 'meteo':
                    if(argument == 'Paris'){
                    bots[2].sendMessage("Encore un parigo...")
                    }
                    else{
                    await handleWeatherCommand(argument, bots[2]);
                    }
                    break;
                case 'help':
                    bots[0].sendMessage('Ecrire !lol tagRiot PseudoRiot pour avoir le recap de votre dernier match ou !lol pour surprise');
                    bots[1].sendMessage('Ecrire !joke pour avoir une blague ou !joke ecrit ta blague et il va te répondre.');
                    bots[2].sendMessage('Ecrire !meteo Ville pour la température actuel de la ville ou !meteo Paris tu auras une surprise :)');
                    break;    
                default:
                    alert("Faites !help pour avoir toutes les commandes existantes"); 
                    break;
            }
        }
        else{
            alert("Faites !help pour avoir toutes les commandes existantes");
        }
    }
    
    const handleLeagueOfLegendsCommand = async (argument,bot) => {
        const lolCommandPattern = /^(\w+)\s+(.+)$/;
        const match = argument.match(lolCommandPattern);
        
        if (match) {
            const tag = match[1].toUpperCase();
            const summonerName = match[2];

            try {
                const lolApi = new LolApi();
                const matchData = await lolApi.getLastGame(summonerName,tag);
                highlightBot(bot.name);
                bot.sendMessage(matchData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
                bot.sendMessage(`Erreur lors de la récupération des données pour ${summonerName} et pour tag ${tag}`);
            }
        } else {
            bot.sendMessage(`Format de commande invalide pour !lol.`);
        }
    }
    
    const handleJokeCommand = async (bot) => {
        try {
            highlightBot(bot.name);
            const jokeApi = new JokeApi();
            const joke = await jokeApi.getJoke();
            bot.sendMessage(joke.setup);
            bot.sendMessage(joke.delivery);
        } catch (error) {
            bot.sendMessage('Erreur lors de la récupération de la blague.');
            console.error('Error handling joke command:', error);
        }
    }
    
    
    const handleWeatherCommand = async (argument,bot) => {
        const wheatherApi = new WeatherApi();
        try{
            const result = await wheatherApi.getWeather(argument);
            if(result){
            highlightBot(bot.name);
            bot.sendMessage(`Il fait ${result.current.temp_c} degrès à ${argument}`);
            }
        }
        catch(error){
        bot.sendMessage(`Aucune données météorologique !`);
        }

    }


    function highlightBot(botId) {
        const botElement = document.getElementById(botId);
        if (botElement) {
            botElement.classList.add('bot-highlight');
            setTimeout(() => {
                botElement.classList.remove('bot-highlight');
            }, 3000);
        }
    }
});