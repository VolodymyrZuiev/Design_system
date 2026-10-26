(function () {
    var form = document.getElementById("login-form");
    var password = document.getElementById("login-password");
    var eye = document.getElementById("login-eye");

    eye.addEventListener("click", function () {
        var shown = password.type === "text";
        password.type = shown ? "password" : "text";
        eye.setAttribute("aria-pressed", shown ? "false" : "true");
        eye.setAttribute("aria-label", shown ? "Show password" : "Hide password");
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        window.location.href = "warehouses.html";
    });
})();
