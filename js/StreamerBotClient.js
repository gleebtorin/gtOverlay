class StreamerBotClient {
    ws;
    events = {};
    eventTriggers = {}; // { "event": [callback1, callback2, ...] }

    constructor(events) {
        this.events = events;
        this.connect();
    }

    connect() {
        console.log("Connecting to Streamer.bot WebSocket server");
        this.ws = new WebSocket("ws://localhost:8080/");
        this.ws.onopen = () => this.handleConnected();
        this.ws.onerror = (error) => this.handleError(error);
        this.ws.onmessage = (message) => this.handleMessage(message);
        this.ws.onclose = () => this.handleDisconnect();
    }

    handleConnected() {
        console.log("Connected to Streamer.bot WebSocket server");

        // Subscribe to alerts
        this.ws.send(JSON.stringify({
            "request": "Subscribe",
            "id": "alerts",
            "events": this.events
        }));
    }

    handleError(error) {
        console.log("WebSocket error: " + error);
    }

    handleMessage(message) {
        let data = JSON.parse(message.data);
        // If data.id exists, it's not an event
        // Just log it for now
        if (data.id) {
            console.log("WebSocket Reply:");
            console.log(JSON.stringify(data, null, 2));
        }

        // If data.event exists, trigger the event
        else if (data.event) {
            console.log("WebSocket Event:");
            let event = `${data.event.source}.${data.event.type}`;
            this.trigger(event, data);
        }

        else {
            console.log("Unknown WebSocket Message:");
            console.log(JSON.stringify(data, null, 2));

        }
    }

    handleDisconnect() {
        console.log("Disconnected from Streamer.bot WebSocket server");
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
            this.connect();
        }, 3000);
    }

    on(event, callback) {
        // If there are no callbacks for this event yet
        if (!this.eventTriggers[event]) {
            // Create array for callbacks
            this.eventTriggers[event] = [];
        }

        // Add callback to event
        this.eventTriggers[event].push(callback);
    }

    trigger(event, data) {
        console.log(`Triggering event: ${event}`);

        // If there are callbacks for this event
        if (this.eventTriggers[event]) {
            // Call each callback
            this.eventTriggers[event].forEach(callback => {
                callback(data.data);
            });
        }
    }

    parseMessage(message, emotes) {
        // Split the message into an array, based on emotes.startIndex and emotes.endIndex

        console.log("Parsing message:");
        console.log(message.toString());

        // Sort the emotes array by startIndex
        emotes.sort((a, b) => {
            return a.startIndex - b.startIndex;
        });

        console.log(emotes);

        let splitMessage = [];
        let lastIndex = 0;
        let twemojiHeckOffset = 0;

        emotes.forEach(emote => {
            // If the config for this emote type is disabled, skip it
            if (!config.emoteProviders[emote.type].enabled) {
                return;
            }

            splitMessage.push(message.slice(lastIndex, emote.startIndex + twemojiHeckOffset)); // Add the part of the message before the emote
            lastIndex = emote.endIndex + twemojiHeckOffset + 1;
            if (emote.type == "CheerEmote") {
                let cheerAmountText = document.createElement("span");
                cheerAmountText.innerText = emote.bits;
                cheerAmountText.style.color = emote.color;
                splitMessage.push(emote.bits); // Add the emote bits
            }

            // Twemoji may have offset emote.name, so we need to account for that
            if (twemojiHeckOffset > 0) {
                emote.name = message.slice(emote.startIndex + twemojiHeckOffset, emote.endIndex + twemojiHeckOffset + 1);
            }

            if (emote.type === "Twemoji" && config.emojiTwemojiHack) {
                twemojiHeckOffset++; // Twemoji is broken, so we need to offset the indexes by 1 every time we come across a twemoji
            }

        });
        splitMessage.push(message.slice(lastIndex)); // Add the last part of the message

        let outputMessage = document.createElement("span");

        // Loop through the splitMessage array and append each part to the messageElement, followed by the emote image
        splitMessage.forEach((part, index) => {
            outputMessage.innerHTML += part;

            // If there's no emote at this index, skip it
            if (!emotes[index]) {
                return;
            }

            if (config.emoteProviders[emotes[index].type].showEmoteImage) {
                let img = document.createElement("img");
                img.src = emotes[index].imageUrl;
                img.title = emotes[index].name;
                img.classList.add("emote");
        
                switch (emotes[index].type) {
                    case "Twitch":
                        // Get the smallest version of the emote
                        img.src = img.src.slice(0, -3) + "1.0";
                        break;
                    case "BTTVChannel":
                    case "BTTVGlobal":
                        // Get the smallest version of the emote
                        img.src = img.src.slice(0, -2) + "1x";
                        break;
                    case "FFZChannel":
                    case "FFZGlobal":
                        // Get the smallest version of the emote
                        img.src = img.src.slice(0, -1) + "1";
                        break;

                    case "7TVChannel":
                    case "7TVGlobal":
                        // Get the smallest version of the emote
                        img.src = img.src.replace(/(\d+)x\./, "1x.");
                        break;

                    case "Twemoji":
                        break; 
                    default:
                        break;
                }

                outputMessage.appendChild(img);
            } else {
                // Display the emote name instead of the image
                outputMessage.innerHTML += emotes[index].name;
            }
        });

        return outputMessage;
    }

    parseMessageInData(data) {
        let message = data.message.message;
        let emotes = data.message.emotes.concat(data.message.cheerEmotes); // Combine emotes and cheerEmotes
        return this.parseMessage(message, emotes);
    }

}
