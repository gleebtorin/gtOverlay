class Chat {
    StreamerBotClient;
    ChatContainer;

    constructor(StreamerBotClient, ChatContainer) {
        this.StreamerBotClient = StreamerBotClient;
        this.ChatContainer = ChatContainer;
        StreamerBotClient.on("Twitch.ChatMessage", (data) => this.chatMessage(data));
    }

    chatMessage(data) {
        //console.log("Chat Message:");
        //console.log(JSON.stringify(data, null, 2));

        let messageElement = document.createElement("div");
        // Construct the message for display
        // Array of badges
        let badges = data.message.badges;

        // If the badges array exists, loop through it and append each badge to the message
        if (badges) { 
            badges.forEach(badge => {
                badge.imageUrl = badge.imageUrl.slice(0, -1) + "1"; // Replace the last character of the image URL with a 1, this gets the smallest version of the image
                let img = document.createElement("img");
                img.src = badge.imageUrl;
                img.title = badge.name;
                messageElement.appendChild(img);
            });
        }

        // Append the username to the message
        let username = document.createElement("span");
        if (data.message.color) {
            username.style.color = data.message.color;
        } else {
            username.style.color = "#FFFFFF";
        }

        if (data.message.displayName) {
            username.innerText = data.message.displayName;
        } else {
            username.innerText = data.message.username;
        }
        messageElement.appendChild(username);
        messageElement.innerHTML += ": ";

        messageElement.appendChild(this.StreamerBotClient.parseMessageInData(data));

        messageElement.id = data.message.msgId;

        messageElement.setAttribute("data-username", data.message.username);
        messageElement.setAttribute("data-userId", data.message.userId);

        if (data.message.isHighlighted) {
            messageElement.classList.add("chatHighlighted");
        }

        if (data.message.isCustomReward) {
            messageElement.classList.add("chatCustomReward");
        }

        let roleClasses = [
            "chatFromInvalid",
            "chatFromViewer",
            "chatFromVIP",
            "chatFromModerator",
            "chatFromBroadcaster"
        ]

        messageElement.classList.add(roleClasses[data.message.role]);

        messageElement.classList.add("chatMessage");

        // Check if ChatContainer is defined before appending the message
        if (this.ChatContainer) {
            console.log("Appending message to ChatContainer");
            this.ChatContainer.appendChild(messageElement);
        } else {
            console.log("ChatContainer is not defined, not appending message");
        }

        // If there are more than 100 messages in the ChatContainer, remove the first one
        if (this.ChatContainer.children.length > 20) {
            this.ChatContainer.removeChild(this.ChatContainer.children[0]);
        }

        // Scroll to the bottom of the ChatContainer
        this.ChatContainer.scrollTop = this.ChatContainer.scrollHeight;

    }
}