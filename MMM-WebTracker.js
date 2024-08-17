Module.register("MMM-WebTracker", {
    // Default module config
    defaults: {
        url: "https://example.com",
        querySelector: "body > div > p:nth-child(2)",
        updateInterval: 7200, // Default: 2 hours,
        loadingMessage: "", // Default: none
    },

    // Start
    start: function () {
        this.trackedData = this.loadingMessage;
        this.sendSocketNotification("WEBTRACKER_START", this.config);
        this.scheduleUpdate();
    },

    // Notification handler
    socketNotificationReceived: function (notification, payload) {
        if (notification === "WEBTRACKER_DATA_UPDATED" && payload.url === this.config.url) {
            this.trackedData = payload.data;
            this.updateDom();
        }
    },

    // Styles
    getStyles: function () {
        return ["MMM-WebTracker.css"];
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
        }, (this.config.updateInterval < 15 || 15) * 1000); // Custom interval, at least 15 seconds
    },

    // Update tracked data
    updateData: function () {
        this.sendSocketNotification("WEBTRACKER_UPDATE", this.config);
    },
});
