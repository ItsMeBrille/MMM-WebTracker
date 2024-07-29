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
                // Generate output html
                const html = (() => {
                    const $ = cheerio.load(body);
                    const pointedElement = $(self.config.querySelector);
                    
                    // Remove inline styling
                    pointedElement.find('[style]').removeAttr('style');

                    // Remove link tags
                    pointedElement.find('a').each(function() {
                        $(this).replaceWith($(this).html());
                    });

                    // Check if the selected element is a table
                    if (['tr', 'th', 'table'].includes(pointedElement.prop('tagName').toLowerCase())) {
                        // Remove formatting tags (and the table tag)
                        pointedElement.find('b, i, strong, table').each(function() {
                            $(this).replaceWith($(this).html());
                        });
                        return `<table class="webtracker-table">${pointedElement.html()}</table>`;
                    }
                    return pointedElement.html();
                })();

                // Send the modified HTML content in the notification
                self.sendSocketNotification("DATA_UPDATED", {
                    url: self.config.url,
                    data: html
                });
            } else {
                console.error("Error fetching data:", error);
            }
        });
    },
});