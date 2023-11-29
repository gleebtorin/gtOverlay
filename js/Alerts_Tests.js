function testFollowAlert() {
    // Call Alerts.handleFollow with a fake data object
    alerts.handleFollow({
        "user_id": "1234",
        "user_login": "cool_user",
        "user_name": "Cool_User",
        "followed_at": "2020-07-15T18:16:11.17106713Z"
    });
}

function testCheerAlert() {
    // Call Alerts.handleCheer with a fake data object
    alerts.handleCheer({
        "is_anonymous": false,
        "user_id": "1234",          // null if is_anonymous=true
        "user_login": "cool_user",  // null if is_anonymous=true
        "user_name": "Cool_User",   // null if is_anonymous=true
        "broadcaster_user_id": "1337",
        "broadcaster_user_login": "cooler_user",
        "broadcaster_user_name": "Cooler_User",
        "message": "pogchamp",
        "bits": 1000
    });
}

function testRaidAlert() {
    // Call Alerts.handleRaid with a fake data object
    alerts.handleRaid({
        "from_broadcaster_user_id": "6060252",
        "from_broadcaster_user_login": "shenious",
        "from_broadcaster_user_name": "Shenious",
        "to_broadcaster_user_id": "35865554",
        "to_broadcaster_user_login": "gleebtorin",
        "to_broadcaster_user_name": "GleebTorin",
        "viewers": 8
    });
}

function testSubAlert() {
    // Call Alerts.handleSub with a fake data object
    alerts.handleSub({
        "user_id": "1234",
        "user_login": "cool_user",
        "user_name": "Cool_User",
        "broadcaster_user_id": "1337",
        "broadcaster_user_login": "cooler_user",
        "broadcaster_user_name": "Cooler_User",
        "tier": "1000",
        "is_gift": false
    });
}

function testResubAlert() {
    // Call Alerts.handleResub with a fake data object
    alerts.handleResub({
        "user_id": "1234",
        "user_login": "cool_user",
        "user_name": "Cool_User",
        "broadcaster_user_id": "1337",
        "broadcaster_user_login": "cooler_user",
        "broadcaster_user_name": "Cooler_User",
        "tier": "1000",
        "message": {
            "text": "Love the stream! FevziGG",
            "emotes": [
                {
                    "begin": 23,
                    "end": 30,
                    "id": "302976485"
                }
            ]
        },
        "cumulative_months": 15,
        "streak_months": 1, // null if not shared
        "duration_months": 6
    });
}

function testGiftSubAlert() {
    // Call Alerts.handleGiftSub with a fake data object
    alerts.handleGiftSub({
        "user_id": "1234",
        "user_login": "cool_user",
        "user_name": "Cool_User",
        "broadcaster_user_id": "1337",
        "broadcaster_user_login": "cooler_user",
        "broadcaster_user_name": "Cooler_User",
        "tier": "1000",
        "is_gift": true
    });
}

function testGiftBombAlert() {
    // Call Alerts.handleGiftBomb with a fake data object
    alerts.handleGiftBomb({
        "user_id": "1234",
        "user_login": "cool_user",
        "user_name": "Cool_User",
        "broadcaster_user_id": "1337",
        "broadcaster_user_login": "cooler_user",
        "broadcaster_user_name": "Cooler_User",
        "total": 2,
        "tier": "1000",
        "cumulative_total": 284, //null if anonymous or not shared by the user
        "is_anonymous": false
    });
}