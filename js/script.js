const form = document.querySelector("form");
const inputAnnualIncome = document.querySelector(
  ".form__fieldset--annual-income"
);
const inputExtraIncome = document.querySelector(
  ".form__fieldset--extra-income"
);
const inputAgeGroup = document.querySelector(".form__fieldset--age-group");
const inputDeduction = document.querySelector(".form__fieldset--deduction");
const inputs = document.querySelectorAll(".form__fieldset--input");
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);

class App {
  constructor() {
    // initialize tooltips
    this._initTooltip();

    // user actions

    // on input change
    inputs.forEach((input) => this._handleInputChange.apply(this, [input]));

    // on submit
    form.addEventListener("submit", this.submitForm.bind(this));
  }

  _handleInputChange(...[input]) {
    const annul = this._getIncome.bind(this);
    const extra = this._getExtraIncome.bind(this);
    const age = this._getAgeGroup.bind(this);
    const deduction = this._getDeduction.bind(this);

    input.addEventListener("input", function () {
      if (this === inputAnnualIncome) annul();
      if (this === inputExtraIncome) extra();
      if (this === inputAgeGroup) age();
      if (this === inputDeduction) deduction();
    });
  }

  _initTooltip() {
    [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    ); // Initialize Bootstrap tooltips
  }

  submitForm(e) {
    // console.log(e);
    // e.preventDefault();
    e?.type === "submit" && e.preventDefault();
    this._getIncome() &&
      this._getExtraIncome() &&
      this._getAgeGroup() &&
      this._getDeduction() &&
      e?.type === "submit" &&
      this._showResult();
  }

  _ToggleTooltip(element) {
    const show = (ele) => {
      // Create a new mouseover event
      const event = new MouseEvent("mouseover", {
        bubbles: true, // mouseover bubbles up through the DOM
        cancelable: true,
        relatedTarget: document.body, // You can set relatedTarget to the element you are coming from
      });

      // Dispatch the mouseover event to the element
      ele.dispatchEvent(event);
    };

    const hide = () => {
      [...document.querySelectorAll(".tooltip")].map((tooltip) =>
        tooltip.remove()
      );
    };

    show(element);

    setTimeout(() => {
      hide(element);
    }, 1000);
  }

  _validation() {
    /*
    - inputAnnualIncome and inputExtraIncome validation 
        - Ensure it is a numeric value (integer or floating point).
        - Ensure it is greater than 0.
    - inputDeduction validation
        - Same validation as inputAnnualIncome and inputExtraIncome
        - Ensure it doesn't exceed the total annual income, as deductions cannot exceed income.
    - inputAgeGroup validation
        - Ensure it is one of the options.
    */
    const isValid = (val) =>
      Number.isFinite(parseFloat(val)) && parseFloat(val) > 0;
    if (this === inputAnnualIncome || this === inputExtraIncome) {
      return isValid(this.value);
    }

    if (this === inputDeduction) {
      console.log(this.income);
      return isValid(this.value) && this.value <= +inputAnnualIncome.value;
    }

    if (this === inputAgeGroup) {
      return this.value !== "";
    }
  }

  _alert(msg, element) {
    // access the tooltip
    const tooltip = element
      .closest(".d-flex")
      .querySelector(".form__fieldset--label__tooltip");

    // render tooltip icon
    tooltip.classList.remove("hidden");
    // set tooltip message
    tooltip.setAttribute("data-bs-title", msg);
    this._initTooltip();

    // show tooltip and hide after 2 seconds
    this._ToggleTooltip(tooltip);

    return false;
  }

  _getIncome() {
    if (!this._validation.call(inputAnnualIncome))
      return this._alert(
        "Enter annual income, must be a number greater than 0",
        inputAnnualIncome
      );

    this._removeError(inputAnnualIncome);
    this.income = parseInt(inputAnnualIncome.value);
    return true;
  }

  _getExtraIncome() {
    if (!this._validation.call(inputExtraIncome))
      return this._alert(
        "Enter extra income, must be a number greater or equal 0",
        inputExtraIncome
      );

    this._removeError(inputExtraIncome);

    this.extraIncome = parseInt(inputExtraIncome.value);
    return true;
  }
  _getAgeGroup() {
    if (!this._validation.call(inputAgeGroup))
      return this._alert(
        "Enter age group, must be one of the options",
        inputAgeGroup
      );

    this._removeError(inputAgeGroup);

    this.ageGroup = inputAgeGroup.value;
    return true;
  }

  _getDeduction() {
    if (!this._validation.call(inputDeduction))
      return this._alert(
        "Enter annual income, must be a number greater than 0 and less than or equal to annual income",
        inputDeduction
      );

    this._removeError(inputDeduction);

    this.deduction = parseInt(inputDeduction.value);
    return true;
  }

  _removeError(element) {
    element
      .closest(".d-flex")
      .querySelector(".form__fieldset--label__tooltip")
      .classList.add("hidden");
    [...document.querySelectorAll(".tooltip")].map((tooltip) =>
      tooltip.remove()
    );
  }

  _calcResult() {
    this.incomeOver = this.income + this.extraIncome - this.deduction;
    const calcTax = (percentage, amount) =>
      ((percentage / 100) * amount).toFixed(2);
    if (this.incomeOver <= 8) {
      this.tax = 0;
      return;
    }
    if (this.ageGroup === "<40") {
      this.tax = calcTax(10, this.incomeOver);
    }

    if (this.ageGroup === " ≥ 40 & < 60") {
      this.tax = calcTax(40, this.incomeOver);
    }

    if (this.ageGroup === "≥ 60") {
      this.tax = calcTax(10, this.incomeOver);
    }
  }

  _renderModal() {
    document.querySelector(".render__tax").textContent = `${this.tax}`;
    document.querySelector("#modalBtn").click();
  }

  _showResult() {
    this._calcResult();
    this._renderModal();
    form.reset();
  }
}

const app = new App();
