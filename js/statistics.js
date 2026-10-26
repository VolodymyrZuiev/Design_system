(function () {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var LINE_LABELS = MONTHS.slice(0, 8);
    var OFFICES = ["MX1", "MX2", "MX3"];

    var USERS = {
        MX1: [
            ["Caleb Thornton", "2314", "$27,512,355.68", "$2,400"],
            ["Isla Montgomery", "24", "$2,125.68", "$3,800"],
            ["Jasper Caldwell", "1", "$13.68", "$1,800"],
            ["Lila Prescott", "1256", "$2,112,325.68", "$2,400"],
            ["Miles Donovan", "543211", "$5,551,525.68", "$3,800"],
            ["Sophie Langley", "215315235", "$27,512,231,355.68", "$2,400"],
            ["Eliot Ramsey", "213", "$2,125.68", "$1,800"]
        ],
        MX2: [
            ["Nora Hale", "880", "$1,240,110.40", "$1,410"],
            ["Elena Voss", "146", "$86,440.12", "$592"],
            ["Chris Hale", "54", "$12,880.00", "$239"],
            ["Mina Ortega", "1904", "$4,552,010.55", "$2,390"],
            ["Paul Ibarra", "12", "$640.20", "$53"],
            ["Helen Cho", "733", "$990,125.00", "$1,351"],
            ["Owen Blake", "5", "$88.40", "$18"],
            ["Rita Solano", "266", "$44,120.18", "$166"],
            ["Ivan Petrov", "41", "$3,210.00", "$78"],
            ["Grace Nguyen", "618", "$220,450.90", "$357"],
            ["Theo Marsh", "90", "$8,640.00", "$96"],
            ["Ada Kowalski", "1502", "$2,880,640.22", "$1,918"],
            ["Leo Park", "27", "$1,104.50", "$41"],
            ["Nina Berg", "333", "$76,200.00", "$229"],
            ["Samir Shah", "8", "$210.00", "$26"],
            ["Vera Lind", "470", "$155,900.40", "$332"],
            ["Hugo Martin", "61", "$4,880.00", "$80"],
            ["Cora Diaz", "1290", "$3,410,220.10", "$2,644"],
            ["Felix Grant", "19", "$760.00", "$40"],
            ["June Adler", "255", "$33,400.00", "$131"],
            ["Omar Said", "102", "$9,450.75", "$93"],
            ["Pia Rossi", "640", "$410,880.00", "$642"],
            ["Ned Carter", "3", "$42.00", "$14"]
        ],
        MX3: [
            ["Elena Voss", "40", "$18,220.00", "$456"],
            ["Chris Hale", "6", "$540.00", "$90"],
            ["Mina Ortega", "210", "$96,400.50", "$459"]
        ]
    };

    var AMOUNT = {
        MX1: [
            ["1", "2314", "$275,355.68", "$2,400"],
            ["2", "24", "$2,125.11", "$3,800"],
            ["3", "124", "$4,125.12", "$110"],
            ["4", "345", "$6,125.03", "$440"],
            ["5", "2", "$5.68", "$12"],
            ["6", "0", "0", "0"],
            ["7", "0", "0", "0"],
            ["8", "0", "0", "0"],
            ["9", "0", "0", "0"],
            ["10", "0", "0", "0"],
            ["11", "0", "0", "0"],
            ["12", "0", "0", "0"]
        ]
    };

    var LINES = {
        MX1: { "2026": [8, 14, 20, 18, 20, 18, 20, 10], "2025": [4, 9, 12, 16, 14, 11, 9, 6], "2024": [2, 6, 8, 10, 9, 12, 15, 11] },
        MX2: { "2026": [12, 18, 16, 22, 19, 21, 17, 13], "2025": [6, 8, 11, 9, 14, 16, 12, 8], "2024": [3, 5, 7, 6, 8, 10, 9, 4] },
        MX3: { "2026": [5, 7, 9, 11, 10, 8, 12, 6], "2025": [10, 12, 15, 18, 16, 14, 11, 9], "2024": [1, 3, 5, 4, 6, 8, 7, 2] }
    };

    var GENERAL = [
        ["January", "0", "0", "0", "$8,245,712.43", "$31,245,678.90", "$27,654,321.09", "$27,654,321.12", "$4,820"],
        ["February", "4", "3", "1", "$5,634,812.29", "$2,345.78", "$2,145.89", "$2,145.67", "$3,950"],
        ["March", "6", "5", "0", "$17.45", "$14.92", "$15.23", "$16.78", "$1,670"],
        ["April", "3", "4", "0", "$2,112,987.54", "$2,112,345.67", "$2,112,987.65", "$2,112,345.89", "$2,590"],
        ["May", "6", "2", "0", "$6,112,345.67", "$5,551,234.56", "$5,551,987.65", "$5,551,234.78", "$4,210"],
        ["June", "3", "1", "0", "$29,512,345,678.90", "$28,123,456,789.01", "$27,512,345,678.90", "$27,512,345,679.12", "$2,375"],
        ["July", "1", "1", "0", "$4,987,654.32", "$2,198.76", "$2,198.54", "$2,198.67", "$1,930"],
        ["August", "12", "11", "0", "$7,654,321.09", "$2,198.76", "$2,198.45", "$2,198.90", "$1,890"],
        ["September", "4", "2", "0", "$2,198.67", "$2,198.54", "$2,198.76", "$2,198.89", "$1,875"],
        ["October", "2", "1", "0", "$2,198.65", "$2,198.77", "$2,198.88", "$2,198.69", "$1,895"],
        ["November", "5", "3", "0", "$2,198.70", "$2,198.71", "$2,125.68", "$2,198.72", "$1,880"],
        ["December", "11", "10", "0", "$2,198.73", "$2,198.74", "$2,198.75", "$2,198.76", "$1,865"]
    ];

    var TEAMS = {
        MX1: [["Tom Bob", "$2,400"]],
        MX2: [["Tom Bob", "$1,850"], ["Elena Voss", "$3,100"]],
        MX3: [["Chris Hale", "$960"]]
    };

    var TEAM_ROWS = {
        MX1: [
            ["Tom Bob", "$4,732,981.56", "$9,384,210.47", "$6,157,493.28", "$8,245,712.43", "0", "$27,654,321.09", "0", "$27,654,321.12", "$4,820.00", "$4,820.00", "$0.00"],
            ["Robert Bobson", "$3,210,456.78", "$2,987,654.32", "$1,234,567.89", "$5,634,812.29", "0", "$2,145.89", "0", "$2,145.67", "$3,950.00", "$3,950.00", "$3,950.00"],
            ["Bob Robertson", "$7,123,456.78", "$6,987,654.32", "$5,432,109.87", "$7,654,321.09", "0", "$2,198.45", "0", "$2,198.90", "$1,890.00", "$1,890.00", "$1,890.00"]
        ],
        MX2: [
            ["Nora Hale", "$1,102,440.00", "$2,440,000.00", "$880,120.00", "$640,000.00", "2", "$12,440.00", "4", "$1,240.00", "$1,410.00", "$1,850.00", "$440.00"],
            ["Elena Voss", "$640,220.10", "$1,100,000.00", "$220,450.00", "$310,000.00", "1", "$8,640.00", "2", "$860.00", "$980.00", "$1,200.00", "$220.00"]
        ],
        MX3: [
            ["Chris Hale", "$96,400.00", "$180,000.00", "$40,200.00", "$55,000.00", "0", "$1,240.00", "1", "$420.00", "$510.00", "$640.00", "$0.00"]
        ]
    };

    var LEAD_ROWS = {
        MX1: [
            ["Robert Oldman", "$1,214,880.32", "$2,104,550.00", "$654,812.29", "$890,440.10", "1", "$2,145.89", "0", "$2,198.54", "$1,670.00", "$1,880.00", "$210.00"]
        ],
        MX2: [
            ["Helen Cho", "$540,220.00", "$980,000.00", "$210,440.00", "$300,000.00", "0", "$4,120.00", "1", "$760.00", "$890.00", "$1,040.00", "$150.00"],
            ["Owen Blake", "$88,400.00", "$140,000.00", "$22,100.00", "$40,000.00", "0", "$640.00", "0", "$210.00", "$260.00", "$300.00", "$0.00"]
        ],
        MX3: []
    };

    var SUB_ROWS = {
        MX1: [
            ["DAT Dispatchers", "$8,812,556.78", "$12,987,654.32", "$4,245,678.90", "$6,112,345.67", "3", "$27,654,321.09", "6", "$5,551,987.65", "$4,820.00", "$5,100.00", "$280.00"],
            ["TOTAL", "$8,812,556.78", "$12,987,654.32", "$4,245,678.90", "$6,112,345.67", "3", "$27,654,321.09", "6", "$5,551,987.65", "$4,820.00", "$5,100.00", "$280.00"]
        ],
        MX2: [
            ["DAT Dispatchers", "$2,440,110.00", "$4,100,000.00", "$980,220.00", "$1,240,000.00", "2", "$12,440.00", "5", "$1,860.00", "$1,410.00", "$1,850.00", "$440.00"],
            ["Night desk", "$640,000.00", "$900,000.00", "$120,000.00", "$210,000.00", "0", "$2,145.00", "1", "$540.00", "$610.00", "$700.00", "$90.00"],
            ["TOTAL", "$3,080,110.00", "$5,000,000.00", "$1,100,220.00", "$1,450,000.00", "2", "$14,585.00", "6", "$2,400.00", "$2,020.00", "$2,550.00", "$530.00"]
        ],
        MX3: [
            ["DAT Dispatchers", "$180,400.00", "$260,000.00", "$40,200.00", "$55,000.00", "0", "$1,240.00", "1", "$420.00", "$510.00", "$640.00", "$0.00"],
            ["TOTAL", "$180,400.00", "$260,000.00", "$40,200.00", "$55,000.00", "0", "$1,240.00", "1", "$420.00", "$510.00", "$640.00", "$0.00"]
        ]
    };

    var CHANGE = {
        MX1: [],
        MX2: [["Nora Hale", "18"], ["Elena Voss", "6"]],
        MX3: [["Chris Hale", "2"]]
    };

    var DONUT_AMOUNT = {
        MX1: [
            { name: "Posted loads - Miguel Sanchez", value: 124, color: "#e07a6f", legend: false },
            { name: "Carlos Mendoza Loads", value: 42, color: "#e7a397", legend: true },
            { name: "Isabella Ramirez Loads", value: 109, color: "#8fd19e", legend: true },
            { name: "En Route - Diego Torres", value: 12, color: "#f0c24b", legend: true },
            { name: "Delivered by Sofia Morales", value: 6, color: "#c9b6e4", legend: true },
            { name: "Cancelled - Luis Fernandez", value: 44, color: "#e6c15a", legend: true },
            { name: "Issue reported by Ana Gutierrez", value: 2, color: "#8d8d8d", legend: true }
        ],
        MX2: [
            { name: "Posted loads - Nora Hale", value: 86, color: "#e07a6f", legend: false },
            { name: "Helen Cho Loads", value: 28, color: "#e7a397", legend: true },
            { name: "Owen Blake Loads", value: 64, color: "#8fd19e", legend: true },
            { name: "En Route - Rita Solano", value: 9, color: "#f0c24b", legend: true },
            { name: "Delivered by Ivan Petrov", value: 15, color: "#c9b6e4", legend: true },
            { name: "Cancelled - Ada Kowalski", value: 21, color: "#e6c15a", legend: true },
            { name: "Issue reported by Leo Park", value: 4, color: "#8d8d8d", legend: true }
        ],
        MX3: [
            { name: "Posted loads - Elena Voss", value: 18, color: "#e07a6f", legend: false },
            { name: "Chris Hale Loads", value: 6, color: "#e7a397", legend: true },
            { name: "Mina Ortega Loads", value: 22, color: "#8fd19e", legend: true },
            { name: "En Route - Paul Ibarra", value: 3, color: "#f0c24b", legend: true },
            { name: "Delivered by Grace Nguyen", value: 8, color: "#c9b6e4", legend: true },
            { name: "Cancelled - Theo Marsh", value: 5, color: "#e6c15a", legend: true },
            { name: "Issue reported by June Adler", value: 1, color: "#8d8d8d", legend: true }
        ]
    };

    var DONUT_LOADS = {
        MX1: [
            { name: "Posted loads - Mariana Lopez", value: 124, color: "#e07a6f", legend: false },
            { name: "Posted Loads - Lucie Herrera", value: 42, color: "#e7a397", legend: true },
            { name: "Booked Loads - Javier Cruz", value: 109, color: "#8fd19e", legend: true },
            { name: "En Route - Valeria Diaz", value: 12, color: "#f0c24b", legend: true },
            { name: "Delivered - Mateo Vargas", value: 6, color: "#e6c15a", legend: true },
            { name: "Cancelled - Gabriela Rios", value: 44, color: "#d4a017", legend: true },
            { name: "Issue - Alejandro Castillo", value: 2, color: "#8d8d8d", legend: true }
        ],
        MX2: [
            { name: "Posted loads - Helen Cho", value: 70, color: "#e07a6f", legend: false },
            { name: "Posted Loads - Nora Hale", value: 30, color: "#e7a397", legend: true },
            { name: "Booked Loads - Elena Voss", value: 81, color: "#8fd19e", legend: true },
            { name: "En Route - Rita Solano", value: 14, color: "#f0c24b", legend: true },
            { name: "Delivered - Ivan Petrov", value: 9, color: "#e6c15a", legend: true },
            { name: "Cancelled - Ada Kowalski", value: 26, color: "#d4a017", legend: true },
            { name: "Issue - Leo Park", value: 5, color: "#8d8d8d", legend: true }
        ],
        MX3: [
            { name: "Posted loads - Mina Ortega", value: 16, color: "#e07a6f", legend: false },
            { name: "Posted Loads - Chris Hale", value: 8, color: "#e7a397", legend: true },
            { name: "Booked Loads - Elena Voss", value: 19, color: "#8fd19e", legend: true },
            { name: "En Route - Paul Ibarra", value: 4, color: "#f0c24b", legend: true },
            { name: "Delivered - Grace Nguyen", value: 2, color: "#e6c15a", legend: true },
            { name: "Cancelled - Theo Marsh", value: 7, color: "#d4a017", legend: true },
            { name: "Issue - June Adler", value: 1, color: "#8d8d8d", legend: true }
        ]
    };

    var charts = {};

    function text(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function money(value) {
        var negative = value < 0;
        var abs = Math.abs(value);
        var parts = abs.toFixed(2).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (negative ? "-$" : "$") + parts.join(".");
    }

    function plain(value) {
        return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function scaleCell(value, factor) {
        if (value === "0") return "0";
        var numeric = Number(String(value).replace(/[$,]/g, ""));
        if (!isFinite(numeric)) return value;
        if (String(value).charAt(0) === "$") {
            var next = numeric * factor;
            if (String(value).indexOf(".") === -1) return money(next).replace(/\.00$/, "");
            return money(next);
        }
        return plain(numeric * factor);
    }

    function scaleRows(rows, factor) {
        if (factor === 1) return rows;
        return rows.map(function (row) {
            return row.map(function (cell, index) {
                return index === 0 ? cell : scaleCell(cell, factor);
            });
        });
    }

    function yearFactor(year) {
        if (year === "2025") return 0.62;
        if (year === "2024") return 0.34;
        return 1;
    }

    function fieldValue(name) {
        var node = document.querySelector('[data-st="' + name + '"]');
        return node ? node.value.trim() : "";
    }

    function monthIndex(name) {
        return MONTHS.indexOf(name) + 1;
    }

    function inDateRange(name) {
        var start = readDate().start;
        var end = readDate().end;
        if (!start || !end) return true;
        var month = monthIndex(name);
        var startMonth = Number(start.slice(0, 2));
        var endMonth = Number(end.slice(0, 2));
        if (startMonth === endMonth && start.slice(0, 5) === end.slice(0, 5) && start === "07/18/2024" && end === "07/18/2024") return true;
        var from = Math.min(startMonth, endMonth);
        var to = Math.max(startMonth, endMonth);
        return month >= from && month <= to;
    }

    function readDate() {
        var node = document.querySelector("[data-st-date] .emp-date__value");
        var label = node ? node.textContent.trim() : "";
        var parts = label.split(" - ");
        if (parts.length !== 2 || label.indexOf("MM/DD") !== -1) return { start: "", end: "" };
        return { start: parts[0].trim(), end: parts[1].trim() };
    }

    function matches(row, query) {
        if (!query) return true;
        return String(row[0]).toLowerCase().indexOf(query) !== -1;
    }

    function fill(id, rows, columns, tone) {
        var body = document.getElementById(id);
        if (!body) return;
        if (!rows.length) {
            body.innerHTML = '<tr class="st-empty-row"><td colspan="' + columns + '">No result</td></tr>';
            return;
        }
        body.innerHTML = rows.map(function (row) {
            var total = row[0] === "TOTAL" ? " is-total" : "";
            var cells = row.map(function (cell, index) {
                var kind = tone ? tone(cell, index, row) : "";
                return "<td" + (kind ? ' class="st-tone-' + kind + '"' : "") + ">" + text(cell) + "</td>";
            }).join("");
            return "<tr" + (total ? ' class="is-total"' : "") + ">" + cells + "</tr>";
        }).join("");
    }

    function teamTone(cell, index) {
        if (index === 3 || index === 4) return "warm";
        if (index === 11) return cell === "$0.00" ? "warm" : "good";
        return "";
    }

    function monthTone(cell, index) {
        return index === 8 ? "warm" : "";
    }

    function legend(id, slices) {
        var list = document.getElementById(id);
        if (!list) return;
        var swatch = {
            "#e7a397": "st-swatch-salmon",
            "#8fd19e": "st-swatch-green",
            "#f0c24b": "st-swatch-yellow",
            "#c9b6e4": "st-swatch-lilac",
            "#e6c15a": "st-swatch-gold",
            "#d4a017": "st-swatch-amber",
            "#8d8d8d": "st-swatch-gray"
        };
        list.innerHTML = slices.filter(function (slice) { return slice.legend; }).map(function (slice) {
            return '<li class="st-legend__item"><span class="st-legend__swatch ' + (swatch[slice.color] || "") + '"></span><span>' + text(slice.name) + " " + text(slice.value) + "</span></li>";
        }).join("");
    }

    function line(name, who, year) {
        var series = (LINES[who] || LINES.MX1)[year] || LINES.MX1["2026"];
        var chart = charts[name];
        if (!chart) return;
        chart.data.datasets[0].data = series.slice();
        chart.data.datasets[0].label = who;
        chart.update();
    }

    function donut(name, slices) {
        var chart = charts[name];
        if (!chart) return;
        chart.data.labels = slices.map(function (slice) { return slice.name; });
        chart.data.datasets[0].data = slices.map(function (slice) { return slice.value; });
        chart.data.datasets[0].backgroundColor = slices.map(function (slice) { return slice.color; });
        chart.update();
    }

    function render() {
        var office = fieldValue("office") || "MX1";
        if (OFFICES.indexOf(office) === -1) office = "MX1";
        var query = fieldValue("search").toLowerCase();
        var size = Number(fieldValue("page-size")) || 20;
        var amountYear = fieldValue("amount-year") || "2026";
        var lineWho = fieldValue("line-who") || office;
        var lineYear = fieldValue("line-year") || "2026";
        var monthWho = fieldValue("month-who") || office;
        var monthYear = fieldValue("month-year") || "2026";
        var teamWho = fieldValue("team-who") || office;
        var teamYear = fieldValue("team-year") || "2026";
        var leadWho = fieldValue("lead-who") || office;
        var leadYear = fieldValue("lead-year") || "2026";
        var subWho = fieldValue("sub-who") || office;
        var subYear = fieldValue("sub-year") || "2026";

        var users = (USERS[office] || []).filter(function (row) { return matches(row, query); }).slice(0, size);
        fill("st-users", users, 4);
        var range = document.getElementById("st-range");
        var totalNode = document.getElementById("st-total");
        var matched = (USERS[office] || []).filter(function (row) { return matches(row, query); }).length;
        var total = query || office !== "MX1" ? matched : 670;
        var shown = Math.min(size, query || office !== "MX1" ? matched : size);
        if (!matched) shown = 0;
        if (range) range.textContent = shown ? "1-" + shown : "0";
        if (totalNode) totalNode.textContent = String(total);

        fill("st-amount", scaleRows(AMOUNT.MX1, yearFactor(amountYear)), 4);

        var generalRows = scaleRows(GENERAL, yearFactor(monthYear)).filter(function (row) { return inDateRange(row[0]); });
        if (monthWho !== "MX1") generalRows = scaleRows(generalRows, monthWho === "MX2" ? 0.72 : 0.41);
        fill("st-general", generalRows, 9, monthTone);

        fill("st-office", (TEAMS[office] || []).filter(function (row) { return matches(row, query); }), 2);
        var change = (CHANGE[office] || []).filter(function (row) { return matches(row, query); });
        var changeEmpty = document.getElementById("st-change-empty");
        var changeBody = document.getElementById("st-change");
        if (!change.length) {
            if (changeBody) changeBody.innerHTML = "";
            if (changeEmpty) changeEmpty.hidden = false;
        } else {
            fill("st-change", change, 2);
            if (changeEmpty) changeEmpty.hidden = true;
        }

        fill("st-team", scaleRows(TEAM_ROWS[teamWho] || [], yearFactor(teamYear)).filter(function (row) { return matches(row, query); }), 12, teamTone);
        var lead = scaleRows(LEAD_ROWS[leadWho] || [], yearFactor(leadYear)).filter(function (row) { return matches(row, query); });
        fill("st-lead", lead, 12, teamTone);
        fill("st-sub", scaleRows(SUB_ROWS[subWho] || [], yearFactor(subYear)).filter(function (row) { return matches(row, query); }), 12, teamTone);

        line("left", lineWho, lineYear);
        line("right", office, amountYear);
        var amountSlices = (DONUT_AMOUNT[office] || DONUT_AMOUNT.MX1).map(function (slice) {
            return { name: slice.name, value: slice.value, color: slice.color, legend: slice.legend };
        });
        var loadSlices = (DONUT_LOADS[office] || DONUT_LOADS.MX1).map(function (slice) {
            return { name: slice.name, value: slice.value, color: slice.color, legend: slice.legend };
        });
        legend("st-legend-amount", amountSlices);
        legend("st-legend-loads", loadSlices);
        donut("amount", amountSlices);
        donut("loads", loadSlices);
    }

    function makeLine(canvas) {
        return new Chart(canvas, {
            type: "line",
            data: {
                labels: LINE_LABELS,
                datasets: [{
                    label: "MX1",
                    data: LINES.MX1["2026"].slice(),
                    borderColor: "#5B9BD5",
                    backgroundColor: "#5B9BD5",
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 12,
                    tension: 0.15,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: "index", intersect: false },
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            boxWidth: 18,
                            boxHeight: 10,
                            color: "#101112",
                            font: { family: "Noto Sans", size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: "#ffffff",
                        titleColor: "#101112",
                        bodyColor: "#535353",
                        borderColor: "#d2d2d2",
                        borderWidth: 1,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 24,
                        ticks: { stepSize: 6, color: "#8a8a8a", font: { family: "Noto Sans", size: 12 } },
                        grid: { color: "#e6eef6" },
                        border: { display: false }
                    },
                    x: {
                        ticks: { color: "#8a8a8a", font: { family: "Noto Sans", size: 12 } },
                        grid: { color: "#e6eef6" },
                        border: { display: false }
                    }
                }
            }
        });
    }

    function makeDonut(canvas) {
        return new Chart(canvas, {
            type: "doughnut",
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: "#ffffff",
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "64%",
                rotation: -40,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: "#ffffff",
                        titleColor: "#101112",
                        bodyColor: "#535353",
                        borderColor: "#d2d2d2",
                        borderWidth: 1,
                        padding: 10,
                        displayColors: true,
                        boxWidth: 10,
                        boxHeight: 10,
                        boxPadding: 4,
                        titleFont: { family: "Noto Sans", size: 16, weight: "700" },
                        bodyFont: { family: "Noto Sans", size: 12 },
                        callbacks: {
                            title: function (items) { return String(items[0].raw); },
                            label: function (item) { return item.label; }
                        }
                    }
                }
            }
        });
    }

    function paintClock() {
        var node = document.getElementById("st-clock");
        if (!node) return;
        node.textContent = new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timeZone: "America/New_York"
        });
    }

    var dateValue = document.querySelector("[data-st-date] .emp-date__value");
    if (dateValue) {
        dateValue.textContent = "07/18/2024 - 07/18/2024";
        dateValue.classList.remove("is-empty");
    }

    if (window.Chart) {
        charts.left = makeLine(document.getElementById("st-chart-left"));
        charts.right = makeLine(document.getElementById("st-chart-right"));
        charts.amount = makeDonut(document.getElementById("st-chart-amount"));
        charts.loads = makeDonut(document.getElementById("st-chart-loads"));
    }

    document.addEventListener("input", function (event) {
        var input = event.target.closest("[data-st]");
        if (!input) return;
        if (input.getAttribute("data-st") === "office") {
            document.querySelectorAll("[data-st$='-who']").forEach(function (node) {
                node.value = input.value;
            });
        }
        render();
    });

    if (dateValue && window.MutationObserver) {
        new MutationObserver(render).observe(dateValue, { childList: true, characterData: true, subtree: true });
    }

    var pageSize = document.getElementById("st-page-size");
    if (pageSize) {
        var pageSizeBtn = pageSize.querySelector(".emp-input__chevron-btn");
        pageSize.addEventListener("click", function (event) {
            var item = event.target.closest("[data-size]");
            if (item) {
                document.getElementById("st-page-size-value").value = item.getAttribute("data-size");
                pageSize.querySelectorAll(".emp-drop__item").forEach(function (entry) {
                    entry.classList.toggle("is-selected", entry === item);
                });
                pageSize.classList.remove("is-open");
                pageSizeBtn.setAttribute("aria-expanded", "false");
                render();
                return;
            }
            var open = !pageSize.classList.contains("is-open");
            pageSize.classList.toggle("is-open", open);
            pageSizeBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });
        document.addEventListener("click", function (event) {
            if (!pageSize.contains(event.target)) {
                pageSize.classList.remove("is-open");
                pageSizeBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    paintClock();
    setInterval(paintClock, 30000);
    render();
})();
