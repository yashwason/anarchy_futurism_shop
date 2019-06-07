const checkoutForm = document.querySelector(`#checkout-form`),
    orderIdInput = document.querySelector(`#checkout-form #order_id`),
    amountInput = document.querySelector(`#checkout-form #amount`);

let options = {
    "key": "rzp_test_6oWCQRSMn64ebz",
    "amount": amountInput.value,
    "name": "Anarchy Futurism",
    "image": "/images/common/logos/black-logo.svg",
    "order_id": orderIdInput.value,
    "theme": {
        "color": "#051026"
    },
    "handler": function(response){
        checkoutForm.insertAdjacentHTML(`beforeend`, `<input type="hidden" name="payment_id" value="${response.razorpay_payment_id}" required>`);
        checkoutForm.submit();
    }
};

let rzp1 = new Razorpay(options);
checkoutForm.addEventListener(`submit`, (e) => {
    e.preventDefault();

    rzp1.open();
});