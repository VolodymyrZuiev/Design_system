(function () {
    var rows = [
        { id: 1, unit: "", driver: "", owner: "", reportCode: "", reportLoad: "", deductedCode: "", deductedLoad: "", date: "05/25/2026", category: ["Application usage"], amount: "$30.00", status: "Charged", hint: "", support: "", office: "MX1", hr: "MX1", when: "04/02/2026 07:42 AM", pro: "46697", user: "Test Admin", sub: "Impatience at PU/DEL", note: "-" },
        { id: 2, unit: "3667", driver: "Andrew Jameson", owner: "Oliver Koelpin", reportCode: "UA1| JSn", reportLoad: "57632", deductedCode: "", deductedLoad: "", date: "05/25/2026", category: ["Possible claim", "Load damaged"], amount: "$30.00", status: "Deducted", hint: "Load isn't set", support: "Matthew Hyde", office: "MX1", hr: "MX2", when: "05/25/2026 09:14 AM", pro: "57632", user: "Test Admin", sub: "Load damaged", note: "Waiting for photos.", files: [{ name: "4k.png", src: "icons/upload/photo.jpeg.png" }] },
        { id: 3, unit: "1199", driver: "Andrew Jameson", owner: "Andrew Jameson", reportCode: "UA1| JSn", reportLoad: "34545", deductedCode: "UA1| JSn", deductedLoad: "34545", date: "05/25/2026", category: ["Failed to provide constant updates"], amount: "$50.00", status: "Charged", hint: "", support: "Matthew Hyde", office: "MX2", hr: "MX1", when: "05/18/2026 11:02 AM", pro: "34545", user: "Test Admin", sub: "No status update", note: "-" },
        { id: 4, unit: "1199", driver: "Andrew Jameson", owner: "Mrs. Mathew Emard", reportCode: "UA1| JSn", reportLoad: "94985", deductedCode: "", deductedLoad: "", date: "05/25/2026", category: ["Application usage"], amount: "$10.00", status: "Charged", hint: "", support: "Matthew Hyde", office: "MX2", hr: "MX2", when: "05/12/2026 04:40 PM", pro: "94985", user: "Test Admin", sub: "Application usage", note: "-" },
        { id: 5, unit: "2526", driver: "Andrew Jameson", owner: "Beulah Idling", reportCode: "UA1| JSn", reportLoad: "82047", deductedCode: "", deductedLoad: "", date: "05/25/2026", category: ["Application usage"], amount: "$120.00", status: "Charged", hint: "", support: "", office: "MX3", hr: "MX1", when: "05/09/2026 08:20 AM", pro: "82047", user: "Test Admin", sub: "Application usage", note: "-" },
        { id: 6, unit: "0097", driver: "Andrew Jameson", owner: "Rodolfo Ratke", reportCode: "UA1| JSn", reportLoad: "20439", deductedCode: "", deductedLoad: "", date: "05/25/2026", category: ["Non-standard issues", "Driver canceled the load"], amount: "$350.00", status: "Deducted", hint: "Load isn't set", support: "Matthew Hyde", office: "MX1", hr: "MX3", when: "05/04/2026 01:15 PM", pro: "20439", user: "Test Admin", sub: "Driver canceled the load", note: "-" },
        { id: 7, unit: "2467", driver: "Andrew Jameson", owner: "Carlton Monitz", reportCode: "UA1| JSn", reportLoad: "64895", deductedCode: "UA1| JSn", deductedLoad: "34545", date: "05/25/2026", category: ["Possible claim", "Load damaged"], amount: "$70.00", status: "Deducted", hint: "", support: "Matthew Hyde", office: "MX3", hr: "MX2", when: "04/28/2026 06:05 PM", pro: "64895", user: "Test Admin", sub: "Load damaged", note: "-" },
        { id: 8, unit: "1199", driver: "Andrew Jameson", owner: "Andrew Jameson", reportCode: "UA1| JSn", reportLoad: "34545", deductedCode: "UA1| JSn", deductedLoad: "34545", date: "05/25/2026", category: ["Application usage"], amount: "$80.00", status: "Deducted", hint: "", support: "", office: "MX2", hr: "MX3", when: "04/21/2026 10:44 AM", pro: "34545", user: "Test Admin", sub: "Application usage", note: "-" },
        { id: 9, unit: "2467", driver: "Andrew Jameson", owner: "Andrew Jameson", reportCode: "UA1| JSn", reportLoad: "34545", deductedCode: "UA1| JSn", deductedLoad: "34545", date: "05/25/2026", category: ["Application usage"], amount: "$140.00", status: "Charged", hint: "", support: "Matthew Hyde", office: "MX1", hr: "MX1", when: "04/16/2026 03:30 PM", pro: "34545", user: "Test Admin", sub: "Application usage", note: "-" },
        { id: 10, unit: "1234", driver: "Andrew Jameson", owner: "Marianne Weissnat", reportCode: "UA1| JSn", reportLoad: "89060", deductedCode: "", deductedLoad: "", date: "05/25/2026", category: ["Application usage"], amount: "$130.00", status: "Charged", hint: "", support: "", office: "MX3", hr: "MX3", when: "04/11/2026 12:00 PM", pro: "89060", user: "Test Admin", sub: "Application usage", note: "-" }
    ];

    var list = document.getElementById("ch-rows");
    var rangeNode = document.getElementById("ch-range");
    var totalNode = document.getElementById("ch-total");
    var pageSizeValue = document.getElementById("ch-page-size-value");
    var viewOverlay = document.getElementById("ch-view-overlay");
    var deductOverlay = document.getElementById("ch-deduct-overlay");
    var deleteOverlay = document.getElementById("ch-delete-overlay");
    var current = null;
    var sortDir = "";

    function esc(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    }

    function menu() {
        return '<div class="emp-amenu"><button class="emp-amenu__hit" type="button" aria-label="Actions" aria-expanded="false"><span class="emp-amenu__dots"></span></button><span class="emp-amenu__list"><button class="emp-amenu__item" type="button" data-act="view"><img src="icons/action-menu/view.svg" alt="" width="16" height="16">View report</button><button class="emp-amenu__item" type="button" data-act="update"><img src="icons/action-menu/edit.svg" alt="" width="16" height="16">Update check call</button></span></div>';
    }

    function lines(parts, extra) {
        if (!parts || !parts.length || !parts[0]) return "";
        return parts.map(function (part, index) {
            return "<span" + (index && extra ? ' class="' + extra + '"' : "") + ">" + esc(part) + "</span>";
        }).join("");
    }

    function loadBlock(code, load) {
        if (!load) return "";
        return "<span>" + esc(code) + '</span><span class="emp-table__link">' + esc(load) + "</span>";
    }

    function pillClass(status) {
        return "emp-pill emp-pill--" + (status === "Deducted" ? "alarm" : "success");
    }

    function rowHtml(row) {
        var unit = row.unit ? esc(row.unit) : '<span class="emp-table__unset">(not set)</span>';
        var who = lines([row.driver, row.owner].filter(Boolean), "emp-table__muted");
        var deducted = row.deductedLoad
            ? loadBlock(row.deductedCode, row.deductedLoad)
            : '<button class="emp-plus" type="button" data-act="deduct" aria-label="Set deducted load"><svg class="emp-icon" viewBox="0 0 16 16" aria-hidden="true"><use href="#i-plus"></use></svg></button>';
        var status = '<span class="' + pillClass(row.status) + '">' + esc(row.status) + "</span>" +
            (row.hint ? '<span class="emp-hint">' + esc(row.hint) + "</span>" : "");
        function cell(content, extra) {
            return '<div class="emp-table__cell' + (extra ? " " + extra : "") + '">' + content + "</div>";
        }
        return '<div class="emp-table__row" data-id="' + row.id + '">' +
            cell(unit) +
            cell(who) +
            cell(loadBlock(row.reportCode, row.reportLoad)) +
            cell(deducted) +
            cell('<span class="emp-table__muted">' + esc(row.date) + "</span>") +
            cell(lines(row.category)) +
            cell('<span class="emp-table__money">' + esc(row.amount) + "</span>") +
            cell(status, "emp-table__cell--center") +
            cell(esc(row.support)) +
            menu() +
            "</div>";
    }

    function valueOf(name) {
        var node = document.querySelector('[data-ch-filter="' + name + '"]');
        return node ? node.value.trim() : "";
    }

    function dateValue() {
        var node = document.querySelector("[data-ch-date] .emp-date__value");
        if (!node || node.classList.contains("is-empty")) return "";
        var text = node.textContent.trim();
        return text === "MM/DD/YYYY" ? "" : text;
    }

    function matches(row) {
        function has(query, text) {
            return !query || String(text || "").toLowerCase().indexOf(query.toLowerCase()) !== -1;
        }
        var date = dateValue();
        var category = valueOf("category");
        var status = valueOf("status");
        var support = valueOf("support");
        var office = valueOf("office");
        var hr = valueOf("hr");
        return has(valueOf("unit"), row.unit || "(not set)") &&
            (has(valueOf("who"), row.driver) || has(valueOf("who"), row.owner)) &&
            (has(valueOf("report"), row.reportCode) || has(valueOf("report"), row.reportLoad)) &&
            (has(valueOf("deducted"), row.deductedCode) || has(valueOf("deducted"), row.deductedLoad)) &&
            (!date || row.date === date) &&
            (!category || row.category.join(" ").indexOf(category) !== -1) &&
            (!status || row.status === status) &&
            (!support || row.support === support) &&
            (!office || row.office === office) &&
            (!hr || row.hr === hr);
    }

    function paint() {
        var size = parseInt(pageSizeValue.value, 10) || 20;
        var visible = rows.filter(matches);
        if (sortDir === "asc") visible = visible.slice().reverse();
        list.innerHTML = visible.slice(0, size).map(rowHtml).join("");
        var shown = Math.min(size, visible.length);
        rangeNode.textContent = shown ? "1-" + shown : "0";
        totalNode.textContent = visible.length === rows.length ? "670" : String(visible.length);
    }

    function find(id) {
        return rows.filter(function (row) { return String(row.id) === String(id); })[0];
    }

    function fileCard(file) {
        var item = document.createElement("article");
        item.className = "emp-file";
        item.innerHTML =
            '<img class="emp-file__img" src="' + esc(file.src) + '" alt="">' +
            '<div class="emp-file__shade">' +
                '<div class="emp-file__top">' +
                    '<span class="emp-file__line"><svg class="emp-file__type" viewBox="0 0 12 12" aria-hidden="true"><use href="#i-file-image"></use></svg><span class="emp-file__name"></span></span>' +
                    '<span class="emp-file__kind">Attachment type</span>' +
                "</div>" +
                '<div class="emp-file__mid"><button class="emp-file__act emp-file__act--open" type="button" aria-label="Open"><svg viewBox="0 0 20 20" aria-hidden="true"><use href="#i-file-open"></use></svg></button></div>' +
                '<div class="emp-file__bot">' +
                    '<button class="emp-file__act emp-file__act--delete" type="button" aria-label="Delete"><svg viewBox="0 0 20 20" aria-hidden="true"><use href="#i-trash"></use></svg></button>' +
                    '<button class="emp-file__act" type="button" aria-label="Download"><svg viewBox="0 0 20 20" aria-hidden="true"><use href="#i-download"></use></svg></button>' +
                    '<button class="emp-file__act" type="button" aria-label="More"><svg viewBox="0 0 20 20" aria-hidden="true"><use href="#i-dots"></use></svg></button>' +
                "</div>" +
            "</div>";
        item.querySelector(".emp-file__name").textContent = file.name;
        item.querySelector(".emp-file__act--delete").addEventListener("click", function (event) {
            event.stopPropagation();
            item.remove();
        });
        return item;
    }

    function paintFiles(row) {
        var content = document.querySelector("#ch-photos .emp-upload__content");
        var drop = content.querySelector(".emp-upload__drop");
        content.querySelectorAll(".emp-file").forEach(function (node) { node.remove(); });
        (row.files || []).forEach(function (file) {
            content.insertBefore(fileCard(file), drop);
        });
    }

    function open(overlay) {
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        overlay.classList.add("is-open");
    }

    function closeAll() {
        document.querySelectorAll(".emp-overlay.is-open").forEach(function (overlay) {
            overlay.classList.remove("is-open");
        });
    }

    function fillReport(row, mode) {
        current = row;
        document.querySelector("[data-ch-dialog-title]").textContent = mode === "update" ? "Update report check calls" : "Report";
        document.querySelector("[data-ch-name]").textContent = row.category[0] || "Report";
        var pill = document.querySelector("[data-ch-status]");
        pill.textContent = row.status;
        pill.className = pillClass(row.status);
        var hint = document.querySelector("[data-ch-hint]");
        hint.textContent = row.hint;
        hint.hidden = !row.hint;
        document.querySelector("[data-ch-when]").textContent = row.when;
        document.querySelector("[data-ch-pro]").textContent = row.pro;
        document.querySelector("[data-ch-user]").textContent = row.user;
        document.querySelector("[data-ch-driver]").textContent = row.driver || "-";
        document.querySelector("[data-ch-unit]").textContent = row.unit || "(not set)";
        document.querySelector("[data-ch-category]").textContent = row.category[0] || "-";
        document.querySelector("[data-ch-sub]").textContent = row.sub || "-";
        document.querySelector("[data-ch-note]").textContent = row.note || "-";
        var area = document.getElementById("ch-note");
        area.value = row.note === "-" ? "" : row.note;
        area.readOnly = mode !== "update";
        paintFiles(row);
        document.getElementById("ch-view-foot").hidden = mode !== "update";
        open(viewOverlay);
    }

    list.addEventListener("click", function (event) {
        var action = event.target.closest("[data-act]");
        if (!action) return;
        var rowNode = action.closest(".emp-table__row");
        var row = find(rowNode.getAttribute("data-id"));
        var kind = action.getAttribute("data-act");
        if (kind === "view") fillReport(row, "view");
        if (kind === "update") fillReport(row, "update");
        if (kind === "deduct") {
            current = row;
            document.getElementById("ch-load").value = "All";
            open(deductOverlay);
        }
        if (kind === "delete") {
            current = row;
            document.getElementById("ch-delete-name").textContent = row.unit || row.driver || "this report";
            open(deleteOverlay);
        }
    });

    document.getElementById("ch-view-save").addEventListener("click", function () {
        if (!current) return;
        var note = document.getElementById("ch-note").value.trim();
        current.note = note || "-";
        closeAll();
        if (window.empToast) window.empToast("updated");
    });

    document.getElementById("ch-deduct-form").addEventListener("submit", function (event) {
        event.preventDefault();
        if (!current) return;
        var load = document.getElementById("ch-load").value.trim();
        if (!load) return;
        current.deductedLoad = load === "All" ? (current.reportLoad || "34545") : load;
        current.deductedCode = current.reportCode || "UA1| JSn";
        current.hint = "";
        current.status = "Deducted";
        closeAll();
        paint();
        if (window.empToast) window.empToast("saved");
    });

    document.getElementById("ch-delete-confirm").addEventListener("click", function () {
        if (!current) return;
        rows = rows.filter(function (row) { return row !== current; });
        current = null;
        closeAll();
        paint();
        if (window.empToast) window.empToast("deleted");
    });

    document.querySelectorAll("[data-ch-close]").forEach(function (button) {
        button.addEventListener("click", closeAll);
    });
    [viewOverlay, deductOverlay, deleteOverlay].forEach(function (overlay) {
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) closeAll();
        });
    });

    document.querySelector(".ch").addEventListener("input", paint);
    document.querySelector(".ch").addEventListener("click", function (event) {
        if (!event.target.closest("[data-ch-sort]")) return;
        event.preventDefault();
        sortDir = sortDir === "asc" ? "desc" : "asc";
        document.querySelectorAll("[data-ch-sort]").forEach(function (node) {
            node.classList.toggle("is-asc", sortDir === "asc");
        });
        paint();
    });
    document.addEventListener("click", function (event) {
        if (event.target.closest("[data-act='apply']")) {
            requestAnimationFrame(paint);
        }
    });

    viewOverlay.addEventListener("click", function (event) {
        var trigger = event.target.closest(".emp-accordion__trigger");
        if (trigger) {
            trigger.closest(".emp-accordion__item").classList.toggle("is-open");
        }
    });

    pageSizeValue.addEventListener("change", paint);
    paint();
})();
