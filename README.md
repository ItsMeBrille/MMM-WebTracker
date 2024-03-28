# MMM-WebTracker

MMM-WebTracker is a MagicMirror² module that fetches a specific element from a website. It then displays the inner plain text of the element. This module is also a useful foundation for other module projects that requires web scraping.

![Screenshot](screenshot.png)

## Installation

1. Clone the MMM-WebTracker repository into the `modules` directory of your MagicMirror²:
   ```shell
   cd ~/MagicMirror/modules
   git clone https://github.com/ItsMeBrille/MMM-WebTracker.git
   ```

## Configuration

To use MMM-WebTracker, add it to the `modules` array in the `config/config.js` file of your MagicMirror installation:

```javascript
{
  module: "MMM-WebTracker",
  position: "upper_third",
  config: {
    url: "https://example.com", // Webpage to fetch
    querySelector: "h1", // See https://www.w3schools.com/cssref/css_selectors.php for reference
    updateInterval: 900, // Update interval in seconds minimum 10s (default is 15 min)
  }
},
```

### Parameters

- `url`: URL of the website to track.
- `querySelector`: Query selector for the element to track. Uses CSS selectors.
- `updateInterval`: Update interval in milliseconds. Specifies how often to fetch and update the tracked data.


## Usage

MMM-WebTracker is a MagicMirror² module that fetches a specific element from a website and displays its plain text content on the Magic Mirror screen. The module will update the displayed content based on the specified update interval.

## Dependencies

* MagicMirror²
* Cheerio
* Request

## License

MMM-WebTracker is licensed under the [MIT License](LICENSE).
The MIT License (MIT)