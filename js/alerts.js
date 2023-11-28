class Alerts {
    StreamerBotClient; // The StreamerBotClient instance
    pendingAlerts = []; // The alerts waiting to be displayed
    currentAlert = null; // The alert currently being displayed
    alertRunning = false; // Whether an alert is currently being displayed

    constructor(StreamerBotClient) {
        this.StreamerBotClient = StreamerBotClient;
        StreamerBotClient.on("Twitch.Follow", (data) => this.handleFollow(data));
        StreamerBotClient.on("Twitch.Cheer", (data) => this.handleCheer(data));
        StreamerBotClient.on("Twitch.Raid", (data) => this.handleRaid(data));
        StreamerBotClient.on("Twitch.Sub", (data) => this.handleSub(data));
        StreamerBotClient.on("Twitch.Resub", (data) => this.handleResub(data));
        StreamerBotClient.on("Twitch.GiftSub", (data) => this.handleGiftSub(data));
        StreamerBotClient.on("Twitch.GiftBomb", (data) => this.handleGiftBomb(data));
    }

    queueAlert(type, headline, message, duration = 5000) {
        if (duration < 3000) {
            duration = 3000; // Minimum duration of 3 seconds
        }
        this.pendingAlerts.push({
            type: type,
            headline: headline,
            message: message,
            duration: duration
        });
        if (!this.alertRunning) {
            this.nextAlert();
        }
    }

    showAlert(type, headline, message, duration) {
        let alert = document.createElement("div");
        alert.classList.add("alert");
        alert.classList.add("alert-" + type);
        alert.innerHTML = `<h1>${headline}</h1><p>${message}</p>`;
        this.currentAlert = alert;
        document.getElementById("alerts").appendChild(alert);
        setTimeout(() => {
            this.endAlert();
        }, duration-1000);
    }

    endAlert() {
        // Fade out the alert
        this.currentAlert.classList.add("alertFadeOut");
        // Remove the alert from the DOM once it has faded out
        setTimeout(() => {
            this.currentAlert.remove();
            this.currentAlert = null;
            this.nextAlert();
        }, 1000);
    }

    nextAlert() {
        if (this.pendingAlerts.length > 0) {
            this.alertRunning = true;
            let alert = this.pendingAlerts.shift();
            this.showAlert(alert.type, alert.headline, alert.message, alert.duration);
        } else {
            this.alertRunning = false;
        }
    }

    handleFollow(data) {
        console.log("Follow:");
        console.log(JSON.stringify(data, null, 2));

        let headline = "New Follower!";
        let message = `${data.displayName} has followed!`;
        this.queueAlert("follow", headline, message);
    }

    handleCheer(data) {
        console.log("Cheer:");
        console.log(JSON.stringify(data, null, 2));

        let headline = `${data.message.displayName} has cheered ${data.message.bits} bits!`;
        let message = this.StreamerBotClient.parseMessageInData(data).innerHTML;
        console.log(this.StreamerBotClient.parseMessageInData(data).innerHTML);
        this.queueAlert("cheer", headline, message);
    }

    handleRaid(data) {
        console.log("Raid:");
        console.log(JSON.stringify(data, null, 2));

        let headline = `${data.displayName} is raiding!`;
        let message = `Hello to ${data.viewerCount} raiders!`;
        this.queueAlert("raid", headline, message);
    }

    handleSub(data) {
        console.log("Sub:");
        console.log(JSON.stringify(data, null, 2));

        let tierNames = ["Prime", "Tier 1", "Tier 2", "Tier 3"];

        let headline = `New ${tierNames[data.subTier]} Sub: ${data.displayName}!`;
        let message = `Welcome to The Crate!`;

        // If data.message is not "", replace the message
        if (data.message) {
            message = data.message;
        }

        this.queueAlert("sub", headline, message);
    }

    handleResub(data) {
        console.log("Resub:");
        console.log(JSON.stringify(data, null, 2));

        let tierNames = ["Prime", "Tier 1", "Tier 2", "Tier 3"];

        let headline = `${tierNames[data.subTier]} Resub: ${data.displayName} for ${data.cumulativeMonths} months!`;
        let message = `Welcome back to The Crate!`;

        // If data.message is not "", replace the message
        if (data.message) {
            message = data.message;
        } else if ((data.streakMonths) > 1 && (data.shareStreak)) {
            message = `That's ${data.cumulativeMonths} months in a row!`;
        }

        this.queueAlert("resub", headline, message);
    }

    handleGiftSub(data) {
        console.log("Gift Sub:");
        console.log(JSON.stringify(data, null, 2));

        if (data.fromSubBomb) {
            return; // Don't show alerts for sub bombs, they're handled by handleSubBomb
        }

        let headline = `${data.displayName} has gifted a sub to ${data.recipientDisplayName}!`;
        let message = `Thanks for your generosity!`;

        if (data.isAnonymous) {
            headline = `Who gifted a sub to ${data.recipientDisplayName}?`;
            message = `Thanks, kind stranger!`
        }

        if (data.totalSubsGifted > 1) {
            message = `That's ${data.totalSubsGifted} months gifted in total!`;
        }
        
        this.queueAlert("giftsub", headline, message);
    }

    handleGiftBomb(data) {
        console.log("Sub Bomb:");
        console.log(JSON.stringify(data, null, 2));

        let headline = `${data.displayName} has gifted ${data.gifts} subs!`;
        let message = `Thanks for your generosity!`;

        if (data.isAnonymous) {
            headline = `Who gifted ${data.gifts} subs?`;
            message = `Thanks, kind stranger!`
        }

        if (data.totalSubsGifted > 1) {
            message = `That's ${data.totalGifts} months gifted in total!`;
        }
        
        this.queueAlert("subbomb", headline, message);
    }
}