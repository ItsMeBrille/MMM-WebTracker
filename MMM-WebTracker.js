Module.register("MMM-WebTracker", {
    // Default module config
    defaults: {
        url: "https://example.com",
        querySelector: "h1", // Example: fetches the first <h1> element
        updateInterval: 10 * 60 * 1000, // every 10 minutes
    },

    // Override start method
    start: function () {
        this.trackedData = ""; // Initialize tracked data
        this.sendSocketNotification("START_TRACKING", this.config);
        this.scheduleUpdate();
    },

    // Override notification handler
    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATA_UPDATED" && payload.url === this.config.url) {
            this.trackedData = payload.data;
            this.updateDom();
        }
    },

    // Override DOM generator
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
        }, this.config.updateInterval);
    },

    // Update tracked data
    updateData: function () {
        this.sendSocketNotification("UPDATE_TRACKING", this.config);
    },
});
