const checkoutForm = document.querySelector(`#checkout-form`),
    amountInput = document.querySelector(`#checkout-form #amount`);

checkoutForm.addEventListener(`submit`, async (e) => {
    e.preventDefault();
    
    let rzp1 = new Razorpay({
        key: `rzp_test_6oWCQRSMn64ebz`,
        amount: amountInput.value * 100, // converting to indian paisa
        name: `Anarchy Futurism`,
        currency: `INR`, // Optional. Same as the Order currency
        description: `Payment of Rs.${amountInput.value}`,
        image: `/images/common/logos/black-logo.svg`,
        theme: {
            color: `#051026`
        },
        handler: function(response){
            checkoutForm.insertAdjacentHTML(`beforeend`, `<input type="hidden" name="payment_id" value="${response.razorpay_payment_id}" required>`);
            checkoutForm.submit();
        }
    });
    rzp1.open();
});