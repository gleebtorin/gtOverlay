function testFollowAlert() {
    // Generate a random name for the test user
    let randomName = "TestUser" + Math.floor(Math.random() * 100000);

    // Call Alerts.handleFollow with a fake data object
    alerts.handleFollow({
        "userId": 0,
        "userName": randomName,
        "displayName": randomName+"Display",
        "isTest": true
    });
}

function testCheerAlert() {
    // Generate a random name for the test user
    let randomName = "TestUser" + Math.floor(Math.random() * 100000);

    console.log("Test user name: " + randomName);

    // Call Alerts.handleCheer with a fake data object
    alerts.handleCheer({
        "message": {
            "msgId": "21605e47-16d2-4496-8001-509438e1b41c",
            "userId": 0,
            "username": "gleebtorin",
            "role": 1, /* 1 - Viewer, 2 - VIP, 3 - Moderator, 4 - Broadcaster  */
            "subscriber": true,
            "displayName": "GleebTorin",
            "channel": "gleebtorin",
            "message": "cheer42 Text",
            "isHighlighted": false,
            "isMe": false,
            "isCustomReward": false,
            "isAnonymous": false,
            "isReply": false,
            "bits": 42,
            "hasBits": true,
            "emotes": [],
            "cheerEmotes": [
                {
                    "bits": 42,
                    "color": "#979797",
                    "type": "CheerEmote",
                    "name": "Cheer",
                    "startIndex": 0,
                    "endIndex": 6,
                    "imageUrl": "<url to cheer emote>"
                }
            ]
        }
    });
}

function testRaidAlert() {
    // Generate a random name for the test user
    let randomName = "TestUser" + Math.floor(Math.random() * 100000);

    // Generate a random viewer count
    let viewerCount = Math.floor(Math.random() * 1000);

    // Call Alerts.handleRaid with a fake data object
    alerts.handleRaid({
        "viewerCount": viewerCount,
        "profileImage": "test.png",
        "userId": 0,
        "userName": randomName,
        "displayName": randomName+"Display",
        "role": 1 /* 1 - Viewer, 2 - VIP, 3 - Moderator, 4 - Broadcaster  */
    });
}

function testSubAlert() {
    let randomName = "TestUser" + Math.floor(Math.random() * 100000);
    let randomMessage = "Test message " + Math.floor(Math.random() * 100000);
    let randomSubTier = Math.floor(Math.random() * 4);

    alerts.handleSub({
        "subTier": randomSubTier, /* 0 - Prime, 1 - Tier 1, 2 - Tier 2, 3 - Tier 3 */
        "color": "#008D99",
        "emotes": [],
        "message": randomMessage,
        "userId": 0,
        "userName": randomName,
        "displayName": randomName+"Display",
        "role": 1 /* 1 - Viewer, 2 - VIP, 3 - Moderator, 4 - Broadcaster  */
    });
}

function testResubAlert() {
    let randomMonths = Math.floor(Math.random() * 24 + 1);
    let randomMessage = "Test message " + Math.floor(Math.random() * 100000);
    let randomSubTier = Math.floor(Math.random() * 4);

    alerts.handleResub({
        "cumulativeMonths": randomMonths,
        "shareStreak": true,
        "streakMonths": randomMonths,
        "subTier": randomSubTier, /* 0 - Prime, 1 - Tier 1, 2 - Tier 2, 3 - Tier 3 */
        "color": "#FF4500",
        "emotes": randomMessage,
        "message": "",
        "userId": 162909743,
        "userName": "admiralai",
        "displayName": "AdmiralAI",
        "role": 1 /* 1 - Viewer, 2 - VIP, 3 - Moderator, 4 - Broadcaster  */
      });
}

function testGiftSubAlert() {
    let randomGifterName = "Gifter" + Math.floor(Math.random() * 100000);
    let randomRecipientName = "Recipient" + Math.floor(Math.random() * 100000);
    let randomSubTier = Math.floor(Math.random() * 4);

    alerts.handleGiftSub({
        "isAnonymous": false,
        "totalSubsGifted": 1,
        "cumulativeMonths": 4,
        "monthsGifted": 1,
        "fromSubBomb": false,
        "subBombCount": 1,
        "recipientUserId": 1,
        "recipientUsername": randomRecipientName,
        "recipientDisplayName": randomRecipientName+"Display",
        "subTier": randomSubTier, /* 0 - Prime, 1 - Tier 1, 2 - Tier 2, 3 - Tier 3 */
        "userId": 0,
        "userName": randomGifterName,
        "displayName": randomGifterName+"Display",
        "role": 1 /* 1 - Viewer, 2 - VIP, 3 - Moderator, 4 - Broadcaster  */
      });
}

function testGiftBombAlert() {
    let randomGifterName = "Gifter" + Math.floor(Math.random() * 100000);
    let randomRecipientName = "Recipient" + Math.floor(Math.random() * 100000);
    let randomSubTier = Math.floor(Math.random() * 4);
    let randomSubBombCount = Math.floor(Math.random() * 100);

    alerts.handleGiftBomb({
        "isAnonymous": false,
        "gifts": randomSubBombCount,
        "totalGifts": 0,
        "subTier": randomSubTier, /* 0 - Prime, 1 - Tier 1, 2 - Tier 2, 3 - Tier 3 */
        "userId": 0,
        "userName": randomGifterName,
        "displayName": randomGifterName+"Display",
        "role": 1 /* 1 - Viewer, 2 - VIP, 3 - Moderator, 4 - Broadcaster  */
      });
}