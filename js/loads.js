(function () {
    var rows = document.getElementById("ld-rows");
    if (!rows) return;

    var MENU = [
        ["check-call.svg", "Check call", "ld-check"],
        ["documents.svg", "Documents", "preview"],
        ["edit-load.svg", "Edit load", "ld-load"],
        ["edit-dispatch.svg", "Edit dispatch", "ld-load"],
        ["ap-ar.svg", "AP / AR", "ld-apar"],
        ["exclude-profit.svg", "Exclude profit", "ld-exclude"],
        ["change-profit.svg", "Change profit", "ld-profit"],
        ["split.svg", "Split the load", "ld-split"]
    ];

    var LOADS = [
        { pro: "UA1| JSn", num: "17013", truck: "123456", miles: "1234", pay: "otr", payLabel: "OTR (received)", status: "Paid", canceled: "No", mine: true },
        { pro: "UA1| JSn", num: "17013", group: true, truck: "52356", miles: "512", truck2: "123456", miles2: "344", pay: "direct", payLabel: "Direct", status: "En Route", canceled: "No", mine: false },
        { pro: "UA1| JSn", num: "17013", truck: "123456", miles: "2512", pay: "otr", payLabel: "OTR (received)", status: "New", canceled: "No", mine: true },
        { pro: "UA1| JSn", num: "17013", truck: "123456", miles: "1234", pay: "direct", payLabel: "Direct", status: "Paid", canceled: "No", mine: false },
        { pro: "UA1| JSn", num: "17013", truck: "123456", miles: "1234", pay: "otr", payLabel: "OTR (received)", status: "Paid", canceled: "No", mine: true }
    ];

    var extras = [
        { truck: "220184", miles: "860", pay: "otr", payLabel: "OTR (received)", status: "Paid", canceled: "No", mine: false },
        { truck: "220185", miles: "1402", pay: "direct", payLabel: "Direct", status: "En Route", canceled: "Yes", mine: true },
        { truck: "220186", miles: "640", pay: "otr", payLabel: "OTR (received)", status: "New", canceled: "No", mine: false },
        { truck: "220187", miles: "980", pay: "direct", payLabel: "Direct", status: "Paid", canceled: "No", mine: true },
        { truck: "220188", miles: "2100", pay: "otr", payLabel: "OTR (received)", status: "Paid", canceled: "No", mine: false },
        { truck: "220189", miles: "455", pay: "direct", payLabel: "Direct", status: "New", canceled: "Yes", mine: false },
        { truck: "220190", miles: "1670", pay: "otr", payLabel: "OTR (received)", status: "En Route", canceled: "No", mine: true },
        { truck: "220191", miles: "320", pay: "direct", payLabel: "Direct", status: "Paid", canceled: "No", mine: false },
        { truck: "220192", miles: "1188", pay: "otr", payLabel: "OTR (received)", status: "Paid", canceled: "No", mine: true },
        { truck: "220193", miles: "740", pay: "direct", payLabel: "Direct", status: "New", canceled: "No", mine: false },
        { truck: "220194", miles: "2560", pay: "otr", payLabel: "OTR (received)", status: "En Route", canceled: "No", mine: false },
        { truck: "220195", miles: "910", pay: "direct", payLabel: "Direct", status: "Paid", canceled: "Yes", mine: true },
        { truck: "220196", miles: "1330", pay: "otr", payLabel: "OTR (received)", status: "Paid", canceled: "No", mine: false },
        { truck: "220197", miles: "505", pay: "direct", payLabel: "Direct", status: "New", canceled: "No", mine: true },
        { truck: "220198", miles: "1788", pay: "otr", payLabel: "OTR (received)", status: "Paid", canceled: "No", mine: false }
    ];
    extras.forEach(function (item) {
        LOADS.push({ pro: "UA1| JSn", num: "17013", truck: item.truck, miles: item.miles, pay: item.pay, payLabel: item.payLabel, status: item.status, canceled: item.canceled, mine: item.mine });
    });

    function party() {
        return '<div class="emp-table__cell"><p class="emp-table__link">MX New Carrier</p><p>Rep: Jorge Martínez</p><p>Driver: <span class="emp-table__link">wer</span></p></div>';
    }

    function stop() {
        return '<div class="emp-table__cell ld-stop"><span><p class="emp-table__link">Miami, FL 33133</p><p>Wt 1 plt 1 Pcs 1</p></span><span><p>12/02/2025 06:16</p><p>12/02/2025 07:20</p></span></div>';
    }

    function menu() {
        var items = MENU.map(function (item) {
            return '<button class="emp-amenu__item" type="button" data-ld-open="' + item[2] + '"><img src="icons/action-menu/' + item[0] + '" alt="" width="16" height="16">' + item[1] + '</button>';
        }).join("");
        return '<div class="emp-amenu"><button class="emp-amenu__hit" type="button" aria-label="Actions" aria-expanded="false"><span class="emp-amenu__dots"></span></button><span class="emp-amenu__list">' + items + '</span></div>';
    }

    function textCell(value, span) {
        return '<div class="emp-table__cell' + (span ? " ld-span" : "") + '"><p>' + value + '</p></div>';
    }

    function rowHtml(load) {
        var pay = '<div class="emp-table__cell ld-span"><span class="emp-pill emp-pill--' + load.pay + '">' + load.payLabel + '</span></div>';
        var tail = textCell("$20,000.00", true) + textCell("$20,000.00", true) + pay + textCell(load.status, true) + textCell(load.canceled, true) + menu();
        var pro = '<div class="emp-table__cell ld-span"><p>' + load.pro + '<br>' + load.num + '</p></div>';
        var body;
        if (load.group) {
            body = textCell(load.truck) + party() + party() + textCell(load.miles) + stop() + stop()
                + textCell(load.truck2) + party() + party() + textCell(load.miles2) + stop() + stop();
        } else {
            body = textCell(load.truck) + party() + party() + textCell(load.miles) + stop() + stop();
        }
        return '<div class="emp-table__row' + (load.group ? " is-group" : "") + '" role="row" data-pro="' + load.pro + " " + load.num + '" data-truck="' + load.truck + (load.truck2 ? " " + load.truck2 : "") + '" data-party="mx new carrier jorge martinez wer" data-place="miami fl 33133" data-pay="' + load.payLabel + '" data-status="' + load.status + '" data-canceled="' + load.canceled + '" data-mine="' + (load.mine ? "1" : "0") + '">' + pro + body + tail + '</div>';
    }

    function value(name) {
        var node = document.querySelector("[data-ld-filter=\"" + name + "\"]");
        return node ? node.value.trim().toLowerCase().replace(/í/g, "i").replace(/á/g, "a") : "";
    }

    function paint() {
        var pro = value("pro");
        var truck = value("truck");
        var driver = value("driver");
        var customer = value("customer");
        var pick = value("pick");
        var drop = value("drop");
        var payment = value("payment");
        var status = value("status");
        var canceled = value("canceled");
        var mine = document.getElementById("ld-mine");
        var onlyMine = mine && mine.checked;
        Array.prototype.forEach.call(rows.children, function (row) {
            var ok = true;
            if (pro && row.getAttribute("data-pro").toLowerCase().indexOf(pro) === -1) ok = false;
            if (truck && row.getAttribute("data-truck").toLowerCase().indexOf(truck) === -1) ok = false;
            if (driver && row.getAttribute("data-party").indexOf(driver) === -1) ok = false;
            if (customer && row.getAttribute("data-party").indexOf(customer) === -1) ok = false;
            if (pick && row.getAttribute("data-place").indexOf(pick) === -1) ok = false;
            if (drop && row.getAttribute("data-place").indexOf(drop) === -1) ok = false;
            if (payment && row.getAttribute("data-pay").toLowerCase() !== payment) ok = false;
            if (status && row.getAttribute("data-status").toLowerCase() !== status) ok = false;
            if (canceled && row.getAttribute("data-canceled").toLowerCase() !== canceled) ok = false;
            if (onlyMine && row.getAttribute("data-mine") !== "1") ok = false;
            row.hidden = !ok;
        });
    }

    rows.innerHTML = LOADS.map(rowHtml).join("");
    document.querySelectorAll("[data-ld-filter]").forEach(function (input) {
        input.addEventListener("input", paint);
    });
    var mineToggle = document.getElementById("ld-mine");
    if (mineToggle) mineToggle.addEventListener("change", paint);
    paint();

    function closeOpen() {
        document.querySelectorAll(".emp-overlay.is-open").forEach(function (overlay) {
            overlay.classList.remove("is-open");
        });
        document.body.style.overflow = "";
    }

    function openOverlay(overlay) {
        closeOpen();
        overlay.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    document.addEventListener("click", function (event) {
        var opener = event.target.closest("[data-ld-open]");
        if (!opener) return;
        var id = opener.getAttribute("data-ld-open");
        if (window.empCloseMenus) window.empCloseMenus();
        if (id === "preview") {
            var seed = document.getElementById("ld-preview-open");
            if (seed) seed.click();
            return;
        }
        var overlay = document.getElementById(id === "ld-new" ? "ld-load" : id);
        if (!overlay) return;
        if (id === "ld-load" || id === "ld-new") {
            var isNew = id === "ld-new";
            document.getElementById("ld-load-title").textContent = isNew ? "New load" : "Update load";
            document.getElementById("ld-load-extra").hidden = !isNew;
            document.getElementById("ld-load-submit").textContent = isNew ? "Save" : "Submit";
        }
        openOverlay(overlay);
    });

    document.addEventListener("submit", function (event) {
        var form = event.target.closest(".emp-overlay form");
        if (!form) return;
        event.preventDefault();
        closeOpen();
    });
})();
