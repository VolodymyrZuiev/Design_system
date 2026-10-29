(function () {
    var patterns = [
        {
            name: "Central Hub",
            location: "Carretera Ciudad Victoria-Matamoros Km 18",
            street: "Calle de la Esperanza 456, San Pedro Garza García",
            extra: "Cielo Verde",
            country: "Mexico",
            city: "Ciudad Victoria",
            state: "TM",
            zip: "87000",
            lat: "21.7543",
            lng: "-51.234",
            email: "hub@central.mx",
            contact: "Luis Hernández",
            phone: "(528) 112-3456"
        },
        {
            name: "Logistics Hub",
            location: "Avenida Libertad 456, Ciudad Juárez",
            street: "Avenida de los Mártires, Ciudad Victoria",
            extra: "La Esperanza",
            country: "Mexico",
            city: "Ciudad Juárez",
            state: "CH",
            zip: "32000",
            lat: "21.9821",
            lng: "-45.078",
            email: "desk@logistics.mx",
            contact: "Maria Gonzalez",
            phone: "(656) 555-0142"
        },
        {
            name: "Supply Chain Center",
            location: "Calle Independencia 789, Tijuana",
            street: "Calle de la Libertad, Matamoros",
            extra: "El Sol",
            country: "Mexico",
            city: "Tijuana",
            state: "BC",
            zip: "22000",
            lat: "21.4568",
            lng: "-38.956",
            email: "yard@supply.mx",
            contact: "Sofia Ramirez",
            phone: "(664) 555-0190"
        }
    ];

    var rows = document.getElementById("sr-rows");
    var nextId = 1;

    function menu() {
        return '<div class="emp-amenu"><button class="emp-amenu__hit" type="button" aria-label="Actions" aria-expanded="false"><span class="emp-amenu__dots"></span></button><span class="emp-amenu__list"><button class="emp-amenu__item" type="button" data-act="view"><img src="icons/action-menu/view.svg" alt="" width="16" height="16">View</button><button class="emp-amenu__item" type="button" data-act="update"><img src="icons/action-menu/edit.svg" alt="" width="16" height="16">Update</button><button class="emp-amenu__item emp-amenu__item--red" type="button" data-act="delete"><img src="icons/action-menu/delete.svg" alt="" width="16" height="16">Delete</button></span></div>';
    }

    function esc(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    }

    function rowHtml(item) {
        var id = item.id || nextId++;
        return '<div class="emp-table__row" role="row" data-id="' + id + '" data-country="' + esc(item.country) + '" data-city="' + esc(item.city) + '" data-state="' + esc(item.state) + '" data-zip="' + esc(item.zip) + '" data-email="' + esc(item.email) + '" data-contact="' + esc(item.contact) + '" data-phone="' + esc(item.phone) + '">' +
            '<span data-col="name">' + esc(item.name) + '</span>' +
            '<span data-col="location">' + esc(item.location) + '</span>' +
            '<span data-col="street">' + esc(item.street) + '</span>' +
            '<span data-col="extra">' + esc(item.extra) + '</span>' +
            '<span data-col="lat">' + esc(item.lat) + '</span>' +
            '<span data-col="lng">' + esc(item.lng) + '</span>' +
            menu() +
            '</div>';
    }

    var seed = [];
    for (var i = 0; i < 20; i += 1) seed.push(patterns[i % patterns.length]);
    rows.innerHTML = seed.map(rowHtml).join("");

    var filters = document.querySelectorAll("[data-sr-filter]");
    var pageSizeValue = document.getElementById("sr-page-size-value");
    var pageRange = document.getElementById("sr-range");
    var pageTotal = document.getElementById("sr-total");

    function filterRows() {
        var query = {};
        filters.forEach(function (input) {
            query[input.getAttribute("data-sr-filter")] = input.value.trim().toLowerCase();
        });
        var size = Number(pageSizeValue.value) || 20;
        var matched = [];
        rows.querySelectorAll(".emp-table__row").forEach(function (row) {
            var show = true;
            Object.keys(query).forEach(function (key) {
                if (!query[key]) return;
                var cellNode = row.querySelector('[data-col="' + key + '"]');
                if (!cellNode || cellNode.textContent.toLowerCase().indexOf(query[key]) === -1) show = false;
            });
            row.hidden = !show;
            if (show) matched.push(row);
        });
        matched.forEach(function (row, index) {
            row.hidden = index >= size;
        });
        var shown = Math.min(size, matched.length);
        var filtering = Object.keys(query).some(function (key) { return query[key]; });
        pageRange.textContent = shown ? "1-" + (filtering ? shown : size) : "0";
        pageTotal.textContent = filtering ? String(matched.length) : "670";
    }

    filters.forEach(function (input) {
        input.addEventListener("input", filterRows);
    });

    var formOverlay = document.getElementById("sr-form-overlay");
    var viewOverlay = document.getElementById("sr-view-overlay");
    var deleteOverlay = document.getElementById("sr-delete-overlay");
    var form = document.getElementById("sr-form");
    var formTitle = document.getElementById("sr-form-title");
    var nameField = document.getElementById("sr-name-field");
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
        window.empCloseMenus();
    }
    function open(overlay) {
        closeAll();
        overlay.classList.add("is-open");
    }
    function paintNameState(showError) {
        var empty = !field("name").value.trim();
        var invalid = !!showError && empty;
        nameField.classList.toggle("is-error", invalid);
        nameField.classList.toggle("is-required", invalid);
        var help = nameField.querySelector(".emp-field__help");
        if (help) help.textContent = invalid ? "This field is required" : "";
    }
    function locationText(city, state, zip) {
        return [city, state, zip].filter(Boolean).join(", ");
    }
    function fillForm(row) {
        field("name").value = row ? cell(row, "name") : "";
        field("street").value = row ? cell(row, "street") : "";
        field("extra").value = row ? cell(row, "extra") : "";
        field("country").value = row ? (row.getAttribute("data-country") || "") : "";
        field("city").value = row ? (row.getAttribute("data-city") || "") : "";
        field("state").value = row ? (row.getAttribute("data-state") || "") : "";
        field("zip").value = row ? (row.getAttribute("data-zip") || "") : "";
        field("email").value = row ? (row.getAttribute("data-email") || "") : "";
        field("contact").value = row ? (row.getAttribute("data-contact") || "") : "";
        field("phone").value = row ? (row.getAttribute("data-phone") || "") : "";
        paintNameState(false);
    }
    function readForm(row) {
        var city = field("city").value.trim();
        var state = field("state").value.trim();
        var zip = field("zip").value.trim();
        setCell(row, "name", field("name").value.trim());
        setCell(row, "street", field("street").value.trim());
        setCell(row, "extra", field("extra").value.trim());
        if (city || state || zip) setCell(row, "location", locationText(city, state, zip));
        row.setAttribute("data-country", field("country").value.trim());
        row.setAttribute("data-city", city);
        row.setAttribute("data-state", state);
        row.setAttribute("data-zip", zip);
        row.setAttribute("data-email", field("email").value.trim());
        row.setAttribute("data-contact", field("contact").value.trim());
        row.setAttribute("data-phone", field("phone").value.trim());
    }
    function blankRow() {
        var holder = document.createElement("div");
        holder.innerHTML = rowHtml({
            name: "",
            location: "",
            street: "",
            extra: "",
            country: "",
            city: "",
            state: "",
            zip: "",
            lat: "",
            lng: "",
            email: "",
            contact: "",
            phone: ""
        });
        return holder.firstChild;
    }
    function viewValue(value) {
        return value ? value : "";
    }
    function paintView(row) {
        var pairs = [
            ["sr-view-id", row.getAttribute("data-id")],
            ["sr-view-name", cell(row, "name")],
            ["sr-view-street", cell(row, "street")],
            ["sr-view-extra", cell(row, "extra")],
            ["sr-view-city", row.getAttribute("data-city")],
            ["sr-view-state", row.getAttribute("data-state")],
            ["sr-view-zip", row.getAttribute("data-zip")],
            ["sr-view-lat", cell(row, "lat")],
            ["sr-view-lng", cell(row, "lng")],
            ["sr-view-contact", row.getAttribute("data-contact")],
            ["sr-view-phone", row.getAttribute("data-phone")]
        ];
        pairs.forEach(function (pair) {
            document.getElementById(pair[0]).textContent = viewValue(pair[1]);
        });
    }

    document.getElementById("sr-create").addEventListener("click", function () {
        editing = null;
        formTitle.textContent = "Create Shipper/Receiver";
        fillForm(null);
        open(formOverlay);
    });

    field("name").addEventListener("input", function () {
        if (field("name").value.trim()) paintNameState(false);
        else if (nameField.classList.contains("is-error")) paintNameState(true);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!field("name").value.trim()) {
            paintNameState(true);
            field("name").focus();
            return;
        }
        var row = editing || blankRow();
        readForm(row);
        if (!editing) rows.prepend(row);
        filterRows();
        closeAll();
    });

    document.getElementById("sr-delete-confirm").addEventListener("click", function () {
        if (editing) editing.remove();
        filterRows();
        closeAll();
    });

    document.addEventListener("click", function (event) {
        var closer = event.target.closest("[data-sr-close]");
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
            var row = action.closest(".emp-table__row");
            var kind = action.getAttribute("data-act");
            if (kind === "view") {
                paintView(row);
                open(viewOverlay);
                return;
            }
            if (kind === "update") {
                editing = row;
                formTitle.textContent = "Update Shipper/Receiver";
                fillForm(row);
                open(formOverlay);
                editing = row;
                return;
            }
            if (kind === "delete") {
                editing = row;
                document.getElementById("sr-delete-name").textContent = cell(row, "name");
                open(deleteOverlay);
                editing = row;
            }
        }
    });

    pageSizeValue.addEventListener("change", filterRows);
})();
