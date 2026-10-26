(function () {
    var clock = document.getElementById("wh-clock");
    function paintClock() {
        if (!clock) return;
        var parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).formatToParts(new Date());
        var hour = "";
        var minute = "";
        var day = "";
        parts.forEach(function (part) {
            if (part.type === "hour") hour = part.value;
            if (part.type === "minute") minute = part.value;
            if (part.type === "dayPeriod") day = part.value;
        });
        clock.textContent = hour + ":" + minute + " " + day;
    }
    paintClock();
    setInterval(paintClock, 1000);

    var inputs = document.querySelectorAll("[data-wh-filter]");
    inputs.forEach(function (input) {
        input.addEventListener("input", filterRows);
    });
    function filterRows() {
        var query = {};
        inputs.forEach(function (input) {
            query[input.getAttribute("data-wh-filter")] = input.value.trim().toLowerCase();
        });
        document.querySelectorAll(".wh-row").forEach(function (row) {
            var show = true;
            Object.keys(query).forEach(function (key) {
                if (!query[key]) return;
                var cell = row.querySelector('[data-col="' + key + '"]');
                if (!cell || cell.textContent.toLowerCase().indexOf(query[key]) === -1) show = false;
            });
            row.hidden = !show;
        });
    }

    document.addEventListener("click", function (event) {
        var button = event.target.closest(".wh-menu");
        document.querySelectorAll(".wh-menu.is-open").forEach(function (open) {
            if (open !== button) open.classList.remove("is-open");
        });
        if (!button) return;
        if (event.target.closest(".wh-act")) return;
        button.classList.toggle("is-open");
    });
})();
