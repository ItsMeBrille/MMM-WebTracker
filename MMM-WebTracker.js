Module.register("MMM-WebTracker", {
    // Default module config
    defaults: {
        url: "https://example.com",
        querySelector: "body > div > p:nth-child(2)",
        updateInterval: 7200, // Default: 2 hours
    },

    // Start function
    start: function () {
        this.trackedData = ""; // Initialize tracked data
        this.sendSocketNotification("START_TRACKING", this.config);
        this.scheduleUpdate();
    },

    // Notification handler
    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATA_UPDATED" && payload.url === this.config.url) {
            this.trackedData = payload.data;
            this.updateDom();
        }
    },

    // Styles
    getStyles: function () {
        return ["MMM-WebTracker.css"]; // Add your CSS file name here
    },

    // DOM generator
    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "small";
        wrapper.innerHTML = this.trackedData;
        return wrapper;
    },

    // Schedule module update
    scheduleUpdate: function () {
        var self = this;
        setInterval(function () {
            self.updateData();
        }, (this.config.updateInterval < 10 || 10) * 1000); // At least 10 seconds
    },

    // Update tracked data
    updateData: function () {
        this.sendSocketNotification("UPDATE_TRACKING", this.config);
    },
});
