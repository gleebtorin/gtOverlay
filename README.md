# gtOverlays

gtOverlays is a project to help you run your stream overlays as independantly as possible, relying only on [Streamer.bot](https://streamer.bot/) for providing the connection to Twitch.

## Current overlays available

* Chat
    * Unique colors for Chatters, VIPs, Moderators, the Broadcaster, and Highlighted Messages.
    * Supports moderation actions such as Message Deletion, Timeouts and User Bans, to ensure that unwanted content can be removed from your stream in a timely fashion.
* Alerts
    * **Warning**: Alerts are not working 100%
    * Supports Follows, Cheers, Raids, Subs, Resubs, Gift Subs and Gift Bombs.


## Requirements

You will need the following things to make this work.
* Any Streaming software that can use locally saved web pages as a source.
    * This was tested on [OBS Studio](https://obsproject.com/) v30.0. It may work on older versions, and should work on newer versions.
* [Streamer.bot](https://streamer.bot).
    * This was tested on v0.2.1. It may work on older versions, and should work on newer versions.

## Getting Started

Assuming that you have OBS Studio and Streamer.bot installed, follow these steps to get started:

1. Clone the repository to your local machine, or download a copy.
2. Configure Streamer.bot's Websocket Server.
    * Under the `Servers/Clients` tab, select the `Websocket Server` tab, and enable `Auto Start`. Then, click Start Server.
3. Configure OBS Studio.
    * Add a Browser source to your scene. In the properties of the Browser source, enable `Local File`, click `Browse` next to `Local File`, and select the file for the overlay you want to set up.

This will add the overlay to your scene. There is some styling provided, but it is strongly recommended that you customise the colors to match your own theme. This can be done using the files in `css/`.

## Dependencies

This project has the following dependencies:

* [Streamer.bot](https://streamer.bot/) >= 0.2.1


## Usage

These overlays are not designed to be interactive when in active use on stream, other than their realtime display of information. Use the files in `css/` to customise the appearance of your overlays.

## Known Issues

* Some debug options hide themselves only when it detects OBS as the current browser. You will need to remove or hide the debug options if you aren't using a browser that reports itself as OBS, such as Xsplit or Twitch Studio.

## Contributing

If you'd like to contribute to this project, pull requests are very welcome. You are also welcome to submit feature suggestions and bug reports via GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.