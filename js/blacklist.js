(function () {
    var clock = document.getElementById("bl-clock");
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
    setInterval(paintClock, 30000);

    var tabs = document.querySelectorAll("[data-bl-tab]");
    var panels = document.querySelectorAll("[data-tab]");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            var name = tab.getAttribute("data-bl-tab");
            tabs.forEach(function (item) {
                var on = item === tab;
                item.classList.toggle("is-active", on);
                item.setAttribute("aria-selected", on ? "true" : "false");
            });
            panels.forEach(function (panel) {
                panel.hidden = panel.getAttribute("data-tab") !== name;
            });
        });
    });

    var pageSize = document.getElementById("bl-page-size");
    var pageSizeValue = document.getElementById("bl-page-size-value");
    var pageRange = document.getElementById("bl-range");
    var pageSizeBtn = pageSize.querySelector(".emp-input__chevron-btn");
    function setPageSizeOpen(open) {
        pageSize.classList.toggle("is-open", open);
        pageSizeBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    pageSize.addEventListener("click", function (event) {
        var item = event.target.closest("[data-size]");
        if (item) {
            var size = item.getAttribute("data-size");
            pageSizeValue.value = size;
            pageRange.textContent = "1-" + size;
            pageSize.querySelectorAll(".emp-drop__item").forEach(function (entry) {
                entry.classList.toggle("is-selected", entry === item);
            });
            setPageSizeOpen(false);
            return;
        }
        setPageSizeOpen(!pageSize.classList.contains("is-open"));
    });

    function applyFilters(panel) {
        var fields = panel.querySelectorAll("[data-bl-filter]");
        var rows = panel.querySelectorAll(".bl-row");
        rows.forEach(function (row) {
            var show = true;
            fields.forEach(function (field) {
                var query = field.value.trim().toLowerCase();
                if (!query) return;
                var key = field.getAttribute("data-bl-filter");
                var cell = row.querySelector('[data-col="' + key + '"]');
                var text = cell ? cell.textContent.toLowerCase() : "";
                if (text.indexOf(query) === -1) show = false;
            });
            panel.querySelectorAll(".emp-date").forEach(function (date) {
                var value = date.querySelector(".emp-date__value");
                if (!value || value.classList.contains("is-empty")) return;
                var picked = value.textContent.trim();
                var key = date.getAttribute("data-bl-date");
                var cell = row.querySelector('[data-col="' + key + '"]');
                if (!cell) return;
                var parts = picked.split("/");
                var table = cell.textContent.trim();
                var swapped = parts.length === 3 ? parts[1] + "/" + parts[0] + "/" + parts[2] : picked;
                if (table.indexOf(picked) === -1 && table.indexOf(swapped) === -1) show = false;
            });
            row.hidden = !show;
        });
    }
    document.querySelectorAll(".bl-panel").forEach(function (panel) {
        panel.addEventListener("input", function () { applyFilters(panel); });
    });
    document.addEventListener("click", function (event) {
        document.querySelectorAll(".bl-panel").forEach(applyFilters);
        if (!pageSize.contains(event.target)) setPageSizeOpen(false);
    });

    var pendingRow = null;
    function openOverlay(id) {
        var overlay = document.getElementById(id);
        if (!overlay) return;
        overlay.classList.add("is-open");
        overlay.removeAttribute("hidden");
    }
    function closeOverlay(overlay) {
        overlay.classList.remove("is-open");
        overlay.hidden = true;
        pendingRow = null;
    }
    document.querySelectorAll("[data-bl-close]").forEach(function (button) {
        button.addEventListener("click", function () {
            closeOverlay(button.closest(".bl-overlay"));
        });
    });
    document.querySelectorAll(".bl-overlay").forEach(function (overlay) {
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) closeOverlay(overlay);
        });
    });

    document.addEventListener("click", function (event) {
        var open = event.target.closest("[data-open]");
        if (!open) return;
        var kind = open.getAttribute("data-open");
        if (kind === "rating") openOverlay("bl-rating");
        if (kind === "report") openOverlay("bl-report");
        if (kind === "driver") openOverlay("bl-driver");
        if (kind === "return-driver" || kind === "return-owner") {
            pendingRow = open.closest(".bl-row");
            openOverlay(kind === "return-driver" ? "bl-return-driver" : "bl-return-owner");
        }
    });

    document.querySelectorAll("[data-bl-archive]").forEach(function (button) {
        button.addEventListener("click", function () {
            if (pendingRow) pendingRow.remove();
            closeOverlay(button.closest(".bl-overlay"));
        });
    });

    var rateTabs = document.querySelectorAll("[data-rate-tab]");
    var ratePanels = document.querySelectorAll("[data-rate-panel]");
    rateTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            var name = tab.getAttribute("data-rate-tab");
            rateTabs.forEach(function (item) {
                var on = item === tab;
                item.classList.toggle("is-active", on);
                item.setAttribute("aria-selected", on ? "true" : "false");
            });
            ratePanels.forEach(function (panel) {
                panel.hidden = panel.getAttribute("data-rate-panel") !== name;
            });
        });
    });

    var viewTabs = document.querySelectorAll("[data-view-tab]");
    var viewPanels = document.querySelectorAll("[data-view-panel]");
    viewTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            var name = tab.getAttribute("data-view-tab");
            viewTabs.forEach(function (item) {
                var on = item === tab;
                item.classList.toggle("is-active", on);
                item.setAttribute("aria-selected", on ? "true" : "false");
            });
            viewPanels.forEach(function (panel) {
                panel.hidden = panel.getAttribute("data-view-panel") !== name;
            });
        });
    });

    function fallbackCopy(value) {
        var area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.className = "emp-copy-sink";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } catch (error) { /* clipboard blocked */ }
        area.remove();
    }
    function copyValue(value) {
        function copied() { window.empToast("copied"); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value).then(copied, function () {
                fallbackCopy(value);
                copied();
            });
            return;
        }
        fallbackCopy(value);
        copied();
    }
    document.addEventListener("click", function (event) {
        var button = event.target.closest(".bl-copy, .bl-title-copy");
        if (!button) return;
        var holder = button.closest(".bl-field, .bl-contact, .bl-report__row, .emp-mw__head");
        var target = holder ? holder.querySelector("[data-copy]") : null;
        if (!target) return;
        copyValue(target.textContent.trim());
    });

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        if (pageSize.classList.contains("is-open")) {
            setPageSizeOpen(false);
            return;
        }
        document.querySelectorAll(".bl-overlay.is-open").forEach(closeOverlay);
    });
})();
