(function () {
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

    function applyFilters(panel) {
        var fields = panel.querySelectorAll("[data-bl-filter]");
        var rows = panel.querySelectorAll(".emp-table__row");
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
            closeOverlay(button.closest(".emp-overlay"));
        });
    });
    document.querySelectorAll(".emp-overlay:not(#preview-overlay)").forEach(function (overlay) {
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
            pendingRow = open.closest(".emp-table__row");
            openOverlay(kind === "return-driver" ? "bl-return-driver" : "bl-return-owner");
        }
    });

    document.querySelectorAll("[data-bl-archive]").forEach(function (button) {
        button.addEventListener("click", function () {
            if (pendingRow) pendingRow.remove();
            closeOverlay(button.closest(".emp-overlay"));
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

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        document.querySelectorAll(".emp-overlay.is-open:not(#preview-overlay)").forEach(closeOverlay);
    });
})();
