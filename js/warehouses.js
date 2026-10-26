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

    var formOverlay = document.getElementById("wh-form-overlay");
    var viewOverlay = document.getElementById("wh-view-overlay");
    var deleteOverlay = document.getElementById("wh-delete-overlay");
    var form = document.getElementById("wh-form");
    var formTitle = document.getElementById("wh-form-title");
    var nameField = document.getElementById("wh-name-field");
    var editing = null;

    function cell(row, key) {
        var node = row.querySelector('[data-col="' + key + '"]');
        return node ? node.textContent : "";
    }
    function setCell(row, key, value) {
        var node = row.querySelector('[data-col="' + key + '"]');
        if (node) node.textContent = value;
    }
    function field(name) {
        return form.elements[name];
    }
    function closeAll() {
        [formOverlay, viewOverlay, deleteOverlay].forEach(function (overlay) {
            if (overlay) overlay.classList.remove("is-open");
        });
        editing = null;
    }
    function open(overlay) {
        closeAll();
        overlay.classList.add("is-open");
        document.querySelectorAll(".wh-menu.is-open").forEach(function (menu) {
            menu.classList.remove("is-open");
        });
    }
    function paintNameState() {
        var empty = !field("name").value.trim();
        nameField.classList.toggle("is-error", empty);
        nameField.classList.toggle("is-required", empty);
    }
    function fillForm(row) {
        field("name").value = row ? cell(row, "name") : "";
        field("email").value = row ? (row.getAttribute("data-email") || "") : "";
        field("city").value = row ? cell(row, "city") : "";
        field("state").value = row ? cell(row, "state") : "";
        field("empire").checked = row ? row.getAttribute("data-empire") === "1" : false;
        field("street").value = row ? cell(row, "street") : "";
        field("zip").value = row ? cell(row, "zip") : "";
        field("extra").value = row ? (row.getAttribute("data-extra") || "") : "";
        field("contact").value = row ? cell(row, "contact") : "";
        field("phone").value = row ? cell(row, "phone") : "";
        field("cell").value = row ? (row.getAttribute("data-cell") || "") : "";
        field("note").value = row ? (row.getAttribute("data-note") || "") : "";
        paintNameState();
    }
    function readForm(row) {
        setCell(row, "name", field("name").value.trim());
        setCell(row, "street", field("street").value.trim());
        setCell(row, "city", field("city").value.trim());
        setCell(row, "state", field("state").value.trim());
        setCell(row, "zip", field("zip").value.trim());
        setCell(row, "contact", field("contact").value.trim());
        setCell(row, "phone", field("phone").value.trim());
        row.setAttribute("data-email", field("email").value.trim());
        row.setAttribute("data-extra", field("extra").value.trim());
        row.setAttribute("data-cell", field("cell").value.trim());
        row.setAttribute("data-note", field("note").value.trim());
        row.setAttribute("data-empire", field("empire").checked ? "1" : "0");
    }
    function blankRow() {
        var source = document.querySelector(".wh-row");
        var row = source.cloneNode(true);
        row.hidden = false;
        ["name", "street", "city", "state", "zip", "contact", "phone"].forEach(function (key) {
            setCell(row, key, "");
        });
        row.setAttribute("data-email", "");
        row.setAttribute("data-extra", "");
        row.setAttribute("data-cell", "");
        row.setAttribute("data-note", "");
        row.setAttribute("data-empire", "0");
        row.classList.remove("is-open");
        var menu = row.querySelector(".wh-menu");
        if (menu) menu.classList.remove("is-open");
        return row;
    }

    document.getElementById("wh-create").addEventListener("click", function () {
        editing = null;
        formTitle.textContent = "Add warehouse";
        fillForm(null);
        open(formOverlay);
    });

    field("name").addEventListener("input", paintNameState);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!field("name").value.trim()) {
            paintNameState();
            field("name").focus();
            return;
        }
        var row = editing || blankRow();
        readForm(row);
        if (!editing) document.querySelector(".wh-rows").prepend(row);
        filterRows();
        closeAll();
    });

    document.getElementById("wh-delete-confirm").addEventListener("click", function () {
        if (editing) editing.remove();
        closeAll();
    });

    document.addEventListener("click", function (event) {
        var closer = event.target.closest("[data-wh-close]");
        if (closer) {
            closeAll();
            return;
        }
        if (event.target.classList.contains("emp-overlay")) {
            closeAll();
            return;
        }
        var action = event.target.closest("[data-act]");
        if (action) {
            var row = action.closest(".wh-row");
            var kind = action.getAttribute("data-act");
            if (kind === "view") {
                document.getElementById("wh-view-name").textContent = cell(row, "name") || "—";
                document.getElementById("wh-view-street").textContent = cell(row, "street") || "—";
                document.getElementById("wh-view-extra").textContent = row.getAttribute("data-extra") || "—";
                document.getElementById("wh-view-city").textContent = cell(row, "city") || "—";
                document.getElementById("wh-view-state").textContent = cell(row, "state") || "—";
                document.getElementById("wh-view-zip").textContent = cell(row, "zip") || "—";
                document.getElementById("wh-view-contact").textContent = cell(row, "contact") || "—";
                document.getElementById("wh-view-phone").textContent = cell(row, "phone") || "—";
                document.getElementById("wh-view-empire").textContent = row.getAttribute("data-empire") === "1" ? "Yes" : "No";
                open(viewOverlay);
                return;
            }
            if (kind === "update") {
                editing = row;
                formTitle.textContent = "Update Warehouse";
                fillForm(row);
                open(formOverlay);
                editing = row;
                return;
            }
            if (kind === "delete") {
                editing = row;
                document.getElementById("wh-delete-name").textContent = cell(row, "name");
                open(deleteOverlay);
                editing = row;
                return;
            }
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeAll();
    });
})();
