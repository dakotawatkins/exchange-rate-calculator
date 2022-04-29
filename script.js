const currencyEl_one = document.getElementById("currency-1");
// console.log(currencyEl_one.value); // ==> USD (default)
const amountEl_one = document.getElementById("amount-1");
const currencyEl_two = document.getElementById("currency-2");
const amountEl_two = document.getElementById("amount-2");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchane rate and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = amountEl_one.value * rate.toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
