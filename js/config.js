let config = {
    "emoteProviders": {
        // Use `showEmoteImage` to determine whether to use the emoteProvider or not, as setting `enabled` to false will disable the emote provider entirely, and neither the emote image nor the emote text will be shown.
        "Twitch": {
            "enabled": true,
            "showEmoteImage": true,
        },
        "BTTVChannel": {
            "enabled": true,
            "showEmoteImage": true,
        },
        "BTTVGlobal": {
            "enabled": true,
            "showEmoteImage": true,
        },
        "FFZChannel": {
            "enabled": true,
            "showEmoteImage": true,
        },
        "FFZGlobal": {
            "enabled": true,
            "showEmoteImage": true,
        },
        "7TVChannel": {
            "enabled": true,
            "showEmoteImage": false,
        },
        "7TVGlobal": {
            "enabled": true,
            "showEmoteImage": false,
        },
        "Twemoji": {
            "enabled": true,
            "showEmoteImage": false,
        }
    },
    "emoteTwemojiHack": true // Due to a bug with the way Twemoji are parsed in a message, there is a dirty hack in place to make other emotes work. Do not set this to false unless you know what you're doing.
}