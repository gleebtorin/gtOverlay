class Chat {
    StreamerBotClient;
    ChatContainer;

    constructor(ChatContainer) {
        this.StreamerBotClient = new StreamerBotClient({
            "Twitch": [
                "ChatMessage",
                "ChatMessageDeleted",
                "ChatCleared",
                "UserTimedOut",
                "UserBanned"
            ]
        });
        this.ChatContainer = ChatContainer;
        this.StreamerBotClient.on("Twitch.ChatMessage", (data) => this.chatMessage(data));
        this.StreamerBotClient.on("Twitch.ChatMessageDeleted", (data) => this.chatMessageDeleted(data));
        this.StreamerBotClient.on("Twitch.ChatCleared", (data) => this.chatCleared(data));
        this.StreamerBotClient.on("Twitch.UserTimedOut", (data) => this.userTimedOut(data));
        this.StreamerBotClient.on("Twitch.UserBanned", (data) => this.userBanned(data));
    }

    chatMessage(data) {
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
            this.ChatContainer.appendChild(messageElement);
        }

        // If there are more than 100 messages in the ChatContainer, remove the first one
        if (this.ChatContainer.children.length > 20) {
            this.ChatContainer.removeChild(this.ChatContainer.children[0]);
        }

        // Scroll to the bottom of the ChatContainer
        this.ChatContainer.scrollTop = this.ChatContainer.scrollHeight;

    }

    chatMessageDeleted(data) {
        let messageElement = document.getElementById(data.targetMessageId);
        messageElement.remove();
    }

    chatCleared(data) {
        this.ChatContainer.innerHTML = "";
    }

    userTimedOut(data) {
        // Find all elements with the data-username attribute equal to the username of the user that was timed out
        let messages = document.querySelectorAll("[data-userId='" + data.target_user_id + "']");
        messages.forEach(message => {
            message.remove();
        });
    }

    userBanned(data) {
        // Find all elements with the data-username attribute equal to the username of the user that was banned
        let messages = document.querySelectorAll("[data-userId='" + data.target_user_id + "']");
        messages.forEach(message => {
            message.remove();
        });
    }
}