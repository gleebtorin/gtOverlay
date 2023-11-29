class Alerts {
    streamerBotClient; // The StreamerBotClient instance
    alertsElement; // The alerts container
    pendingAlerts = []; // The alerts waiting to be displayed
    currentAlert = null; // The alert currently being displayed
    alertRunning = false; // Whether an alert is currently being displayed

    constructor(AlertsElement) {
        this.streamerBotClient = new StreamerBotClient({
            "Twitch": [
                "Follow",
                "Cheer",
                "Raid",
                "Sub",
                "ReSub",
                "GiftSub",
                "GiftBomb"
            ]
        });
        this.alertsElement = AlertsElement;
        this.streamerBotClient.on("Twitch.Follow", (data) => this.handleFollow(data));
        this.streamerBotClient.on("Twitch.Cheer", (data) => this.handleCheer(data));
        this.streamerBotClient.on("Twitch.Raid", (data) => this.handleRaid(data));
        this.streamerBotClient.on("Twitch.Sub", (data) => this.handleSub(data));
        this.streamerBotClient.on("Twitch.ReSub", (data) => this.handleResub(data));
        this.streamerBotClient.on("Twitch.GiftSub", (data) => this.handleGiftSub(data));
        this.streamerBotClient.on("Twitch.GiftBomb", (data) => this.handleGiftBomb(data));
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
        this.alertsElement.appendChild(alert);
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
        let message = `${data.user_name} has followed!`;
        this.queueAlert("follow", headline, message);
    }

    handleCheer(data) {
        console.log("Cheer:");
        console.log(JSON.stringify(data, null, 2));

        let headline = `${data.user_name} has cheered ${data.bits} bits!`;
        let message = data.message;

        if (data.is_anonymous) {
            headline = `Anonymous has cheered ${data.message.bits} bits!`;
        }

        this.queueAlert("cheer", headline, message);
    }

    handleRaid(data) {
        console.log("Raid:");
        console.log(JSON.stringify(data, null, 2));

        let headline = `${data.from_broadcaster_user_name} is raiding!`;
        let message = `Hello to ${data.viewers} raiders!`;
        this.queueAlert("raid", headline, message);
    }

    handleSub(data) {
        console.log("Sub:");
        console.log(JSON.stringify(data, null, 2));

        let tierNames = {
            "1000": "",
            "2000": "Tier 2",
            "3000": "Tier 3"
        };

        let headline = `New ${tierNames[data.tier]} Sub: ${data.user_name}!`;
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

        let tierNames = {
            "1000": "",
            "2000": "Tier 2",
            "3000": "Tier 3"
        };

        let headline = `${tierNames[data.tier]} Resub: ${data.user_name} for ${data.cumulative_months} months!`;
        let message = `Welcome back to The Crate!`;

        // If data.message is not "", replace the message
        if (data.message) {
            message = data.message.text;
        } else if (data.streak_months) {
            message = `That's ${data.streak_months} months in a row!`;
        }

        this.queueAlert("resub", headline, message);
    }

    handleGiftSub(data) {
        console.log("Gift Sub:");
        console.log(JSON.stringify(data, null, 2));

        if (data.fromSubBomb) {
            return; // Don't show alerts for sub bombs, they're handled by handleSubBomb
        }

        let headline = `${data.user_name} received a gift sub!`;
        let message = `Welcome to The Crate`;

        this.queueAlert("giftsub", headline, message);
    }

    handleGiftBomb(data) {
        console.log("Sub Bomb:");
        console.log(JSON.stringify(data, null, 2));

        let headline = `${data.user_name} has gifted ${data.total} subs!`;
        let message = `Thanks for your generosity!`;

        if (data.is_anonymous) {
            headline = `Who gifted ${data.total} subs?`;
            message = `Thanks, kind stranger!`
        }

        if (data.cumulative_total > 1) {
            message = `That's ${data.cumulative_total} months gifted in total!`;
        }
        
        this.queueAlert("subbomb", headline, message);
    }
}