script.js
js
Copy
Edit
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("previewFrame").onload = function () {
        let iframe = document.getElementById("previewFrame");
        iframe.contentWindow.document.body.innerHTML += '<style>body { pointer-events: none; }</style>';
    };
});

function buyTemplate(templateName) {
    let paypalForm = `
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_xclick">
            <input type="hidden" name="business" value="your-paypal-email@example.com">
            <input type="hidden" name="item_name" value="${templateName} Template">
            <input type="hidden" name="amount" value="10.00">
            <input type="hidden" name="currency_code" value="USD">
            <input type="hidden" name="return" value="https://yourwebsite.com/success">
            <input type="submit" value="Buy Now">
        </form>
    `;
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = paypalForm;
    document.body.appendChild(tempDiv);
    tempDiv.querySelector("form").submit();
}