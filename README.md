# MMM-WebTracker

MMM-WebTracker is a MagicMirror² module that fetches a specific element from a website. It then displays the inner plain text of the element. This module is also a useful foundation for other module projects that requires web scraping.

![Screenshot](screenshot.png)

## Installation

Clone the MMM-WebTracker repository into the `modules` directory of your MagicMirror²:
```shell
cd MagicMirror/modules
git clone https://github.com/ItsMeBrille/MMM-WebTracker.git
```
This module requires the cheerio package to dig through the DOM. Install it in the newly created `MMM-WebTracker` directory using the following commands:
```shell
cd MMM-WebTracker
npm install cheerio
```

## Configuration

To use MMM-WebTracker, add it to the `modules` array in the `config/config.js` file of your MagicMirror installation:

```javascript
{
  module: "MMM-WebTracker",
  position: "upper_third",
  config: {
    url: "https://example.com",
    querySelector: "body > div > p:nth-child(2)",
    updateInterval: 7200, // Update interval in seconds (default is 2 hours)
    loadingMessage: "", // Message shown before other text is fetched
  }
},
```

### Parameters

- `url`: URL of the website to fetch.
- `querySelector`: Query selector for the element to track. See https://www.w3schools.com/cssref/css_selectors.php for reference
- `updateInterval`: Specifies how often to update the tracked data in seconds. Minimum 10s (default is 2 hours)

The `querySelector` can be obtained using the browser inspector tool:
1. Press `F12` to open the inspector panel.
2. Use the inspect tool in the upper left corner and click the element you want to track. Make shure you cover the entire object you want to track.
3. Right click the element highlighted in the `elements` tab of the panel and click copy -> copy selector.

![Explanation of query selector](explanation.png)

## Usage

MMM-WebTracker is a MagicMirror² module that fetches a specific element from a website and displays its plain text content on the Magic Mirror screen. The module will update the displayed content based on the specified update interval.

## Dependencies

* MagicMirror²
* Cheerio
* Request

## License

MMM-WebTracker is licensed under the [MIT License](LICENSE).
The MIT License (MIT)