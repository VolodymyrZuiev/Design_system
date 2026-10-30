(function () {
    var form = document.getElementById("br-search");
    var input = document.getElementById("br-mc");
    var note = document.getElementById("br-note");
    var error = document.getElementById("br-error");
    var label = document.getElementById("br-label");
    var result = document.getElementById("br-result");
    if (!form || !input || !result) return;

    function mcDigits(value) {
        return String(value || "").trim().replace(/^MC\s*/i, "").replace(/\s+/g, "");
    }

    function showError(on) {
        label.textContent = on ? "Broker\u2019s MC" : "Find Broker by MC";
        note.hidden = on;
        error.hidden = !on;
        input.setAttribute("aria-invalid", on ? "true" : "false");
        if (on) input.setAttribute("aria-describedby", "br-error");
        else input.removeAttribute("aria-describedby");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var mc = mcDigits(input.value);
        var formatOk = /^\d{6}$/.test(mc);
        if (!formatOk) {
            showError(true);
            result.hidden = true;
            return;
        }
        showError(false);
        var shown = result.querySelector("[data-br-mc]");
        if (shown) shown.textContent = mc;
        result.hidden = false;
    });

    var years = document.getElementById("br-years");
    if (!years) return;
    years.addEventListener("click", function (event) {
        var tab = event.target.closest("[data-year]");
        if (!tab || !years.contains(tab)) return;
        years.querySelectorAll("[data-year]").forEach(function (item) {
            var on = item === tab;
            item.classList.toggle("is-active", on);
            item.setAttribute("aria-selected", on ? "true" : "false");
        });
    });
})();
