# MMM-Today

MMM-Today is a MagicMirror² module that displays historical events from the current date.

## Installation
1. Clone the MMM-Today repository into the `modules` directory of your MagicMirror²:
   ```shell
   cd ~/MagicMirror/modules
   git clone https://github.com/ItsMeBrille/MMM-Today.git
   ```

## Configuration
To use MMM-Today, add it to the `modules` array in the `config/config.js` file of your MagicMirror installation:

```javascript
{
  module: "MMM-Today",
  position: "bottom_left",
  config: {
    fetchInterval: 1, // Fetch file every hour
    changeInterval: 15, // In seconds
  }
},
```

## Usage
MMM-Today is a MagicMirror² module that displays historical events from the current date. The module will cycle through the articles with the specified intervals.

## Dependencies
* MagicMirror² (not tested on versions below 2.12.0)

## License
MMM-Today is licensed under the [MIT License](LICENSE).
The MIT License (MIT)
