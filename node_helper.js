const NodeHelper = require("node_helper");
const request = require("request");
const cheerio = require("cheerio");

module.exports = NodeHelper.create({
    // Override start method
    start: function () {
        console.log("MMM-WebTracker helper started...");
    },

    // Handle socket notifications
    socketNotificationReceived: function (notification, payload) {
        if (notification === "START_TRACKING") {
            this.config = payload;
            this.getData();
        }
        if (notification === "UPDATE_TRACKING") {
            this.getData();
        }
    },

    // Fetch data from the URL and emit to the main module
    getData: function () {
        const self = this;
        request(this.config.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                const selectedElement = $(self.config.querySelector).text().trim();
                self.sendSocketNotification("DATA_UPDATED", {
                    url: self.config.url,
                    data: selectedElement,
                });
            } else {
                console.error("Error fetching data:", error);
            }
        });
    },
});
