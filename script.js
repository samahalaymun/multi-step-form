const backBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
const confirmBtn = document.querySelector(".confirm-btn");
const personalInfoSection = document.querySelector(".personal-info");
const personalPlanSection = document.querySelector(".personal-plan");
const addOnsSection = document.querySelector(".add-ons");
const finishingUp = document.querySelector(".finishing-up");
const confirmSection = document.querySelector(".confirm-section");
const plan = document.getElementsByName("plan");
const addOnsCheckboxes = document.getElementsByName("add-ons");
const billingType = document.querySelector(".checkbox");
const planYearly = document.querySelectorAll(".plan-yearly");
const planMonthly = document.querySelectorAll(".plan-monthly");
const planPerYearly = document.querySelectorAll(".plan-per-year");
const addOnsMonthly = document.querySelectorAll(".add-ons-monthly");
const addOnsYearly = document.querySelectorAll(".add-ons-yearly");
const changePrice = document.querySelector(".summery-plan-change");
const stepNum1 = document.querySelector(".step-num-1");
const stepNum2 = document.querySelector(".step-num-2");
const stepNum3 = document.querySelector(".step-num-3");
const stepNum4 = document.querySelector(".step-num-4");
const addOnsSummery = document.querySelector(".add-ons-summery");

let counter = 0;
let planType;
let type;
let addOns = [];
let addOnsMonthlyPrices = {
  "online services": 1,
  "larger storage": 2,
  "customize profile": 2,
};
let addOnsYearlyPrices = {
  "online services": 10,
  "larger storage": 20,
  "customize profile": 20,
};
let planeTypeMonthlyPrice = {
  arcade: 9,
  advanced: 12,
  pro: 15,
};
let planeTypeYearlyPrice = {
  arcade: 90,
  advanced: 120,
  pro: 150,
};
function init() {
  indicateBtns();
  indicateSections();
  indicateStepNumber();
  nextBtn.addEventListener("click", (e) => {
    if (counter === 0 && handlePersonalSectionValidation()) {
      counter++;
    } else if (counter === 1) {
      selectYourPlanValidation();
      counter++;
    } else if (counter === 2) {
      addOnsValidation();
      counter++;
    }

    if (counter === 3) {
      finishingUpValidation();
    }
    indicateBtns();
    indicateSections();
    indicateStepNumber();
  });
  backBtn.addEventListener("click", (e) => {
    counter--;
    indicateBtns();
    indicateSections();
    indicateStepNumber();
  });

  billingType.addEventListener("click", (e) => {
    handlebillingTypeValidation();
  });
  changePrice.addEventListener("click", (e) => {
    counter = 1;
    selectYourPlanValidation();
    indicateBtns();
    indicateSections();
    indicateStepNumber();
  });

  confirmBtn.addEventListener("click", (e) => {
    finishingUp.classList.add("hidden");
    confirmSection.classList.remove("hidden");
    document.querySelector(".footer").classList.add("hidden");
  });
  addOnsCheckboxes.forEach((item) => {
    item.addEventListener("click", (e) => {
      let id = item.id;
      let label = document.querySelector(`label[for=${id}]`);
      if(e.target.checked){
        label.classList.add("add-ons-checked");
      }else{
        label.classList.remove("add-ons-checked");
      }
      
    });
  });
}

init();
function indicateBtns() {
  if (counter === 0) {
    backBtn.classList.add("hidden");
    confirmBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else if (counter === 1 || counter === 2) {
    backBtn.classList.remove("hidden");
    confirmBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else if (counter === 3) {
    backBtn.classList.remove("hidden");
    confirmBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  }
}
function indicateSections() {
  if (counter === 0) {
    personalInfoSection.classList.remove("hidden");
    addOnsSection.classList.add("hidden");
    personalPlanSection.classList.add("hidden");
    finishingUp.classList.add("hidden");
    confirmSection.classList.add("hidden");
  } else if (counter === 1) {
    personalInfoSection.classList.add("hidden");
    personalPlanSection.classList.remove("hidden");
    addOnsSection.classList.add("hidden");
    finishingUp.classList.add("hidden");
    confirmSection.classList.add("hidden");
  } else if (counter === 2) {
    personalInfoSection.classList.add("hidden");
    personalPlanSection.classList.add("hidden");
    addOnsSection.classList.remove("hidden");
    finishingUp.classList.add("hidden");
    confirmSection.classList.add("hidden");
  } else if (counter === 3) {
    personalInfoSection.classList.add("hidden");
    personalPlanSection.classList.add("hidden");
    addOnsSection.classList.add("hidden");
    finishingUp.classList.remove("hidden");
    confirmSection.classList.add("hidden");
  }
}

function handlePersonalSectionValidation() {
  let flag = true;
  const firstName = document.getElementById("user-name");
  const email = document.getElementById("user-email");
  const phoneNumber = document.getElementById("user-phone");
  const nameError = document.querySelector(".name-error-message");
  const emailError = document.querySelector(".email-error-message");
  const phoneError = document.querySelector(".phone-error-message");
  if (!firstName.value) {
    flag = false;
    firstName.style.border = "2px solid red";
    nameError.classList.remove("hidden");
  }
  if (!email.value) {
    flag = false;
    email.style.border = "2px solid red";
    emailError.classList.remove("hidden");
  }
  if (!phoneNumber.value) {
    flag = false;
    phoneNumber.style.border = "2px solid red";
    phoneError.classList.remove("hidden");
  }
  if (firstName.value) {
    firstName.style.border = "1px solid #9699AB";
    nameError.classList.add("hidden");
  }
  if (email.value) {
    email.style.border = "1px solid #9699AB";
    emailError.classList.add("hidden");
  }
  if (phoneNumber.value) {
    phoneNumber.style.border = "1px solid #9699AB";
    phoneError.classList.add("hidden");
  }

  return flag;
}

function indicateStepNumber() {
  if (counter === 0) {
    stepNum1.classList.add("hover");
    stepNum2.classList.remove("hover");
    stepNum3.classList.remove("hover");
    stepNum4.classList.remove("hover");
  } else if (counter === 1) {
    stepNum1.classList.remove("hover");
    stepNum2.classList.add("hover");
    stepNum3.classList.remove("hover");
    stepNum4.classList.remove("hover");
  } else if (counter === 2) {
    stepNum1.classList.remove("hover");
    stepNum2.classList.remove("hover");
    stepNum3.classList.add("hover");
    stepNum4.classList.remove("hover");
  } else if (counter === 3) {
    stepNum1.classList.remove("hover");
    stepNum2.classList.remove("hover");
    stepNum3.classList.remove("hover");
    stepNum4.classList.add("hover");
  }
}
function selectYourPlanValidation() {
  handlebillingTypeValidation();
  for (let i = 0, length = plan.length; i < length; i++) {
    if (plan[i].checked) {
      planType = plan[i].value;
      break;
    }
  }
  if (billingType.checked) {
    type = "yearly";
  } else {
    type = "monthly";
  }
}

function addOnsValidation() {
  addOns = [];
  addOnsCheckboxes.forEach((item) => {
    if (item.checked) {
      addOns.push(item.value);
    }
  });
}
function finishingUpValidation() {
  let planPrice = 0;
  let addOnsPrice = 0;
  let html = "";
  document.querySelector(
    ".summery-plan-title"
  ).innerHTML = `${planType}(${type})`;

  if (type === "yearly") {
    html = getAddOnsHtml(addOns, addOnsYearlyPrices, planeTypeYearlyPrice);
    addOnsSummery.innerHTML = html;
    addOnsPrice = getAddOnsPrice(addOns, addOnsYearlyPrices);
    planPrice = planeTypeYearlyPrice[planType];
  } else {
    html = getAddOnsHtml(addOns, addOnsMonthlyPrices, planeTypeMonthlyPrice);
    addOnsSummery.innerHTML = html;
    addOnsPrice = getAddOnsPrice(addOns, addOnsMonthlyPrices);
    planPrice = planeTypeMonthlyPrice[planType];
  }
  displayTotalPrice(addOnsPrice + planPrice);
}

function handlebillingTypeValidation() {
  if (billingType.checked) {
    planYearly.forEach((item) => {
      item.classList.remove("hidden");
    });
    planPerYearly.forEach((item) => {
      item.classList.remove("hidden");
    });
    planMonthly.forEach((item) => {
      item.classList.add("hidden");
    });
    addOnsMonthly.forEach((item) => {
      item.classList.add("hidden");
    });
    addOnsYearly.forEach((item) => {
      item.classList.remove("hidden");
    });

    document.querySelector(".monthly").style.color = "#9699AB";
  } else {
    planYearly.forEach((item) => {
      item.classList.add("hidden");
    });
    planPerYearly.forEach((item) => {
      item.classList.add("hidden");
    });
    planMonthly.forEach((item) => {
      item.classList.remove("hidden");
    });

    addOnsMonthly.forEach((item) => {
      item.classList.remove("hidden");
    });
    addOnsYearly.forEach((item) => {
      item.classList.add("hidden");
    });
    document.querySelector(".monthly").style.color = "#02295A";
  }
}
function getAddOnsPrice(addOns, addOnsType) {
  let price = 0;
  addOns.forEach((item) => {
    price += addOnsType[item];
  });
  return price;
}

function getAddOnsHtml(addOns, addOnsType, planTypeObj) {
  let html = "";
  document.querySelector(".summery-plan-price").innerHTML = `$${
    planTypeObj[planType]
  }/${type === "yearly" ? "yr" : "mo"}`;

  html = addOns
    .map((item) => {
      return `
       <div class="add-ons-summery-item">
                  <span class="add-ons-summery-item-title">$${item}</span>
                  <span  class="add-ons-summery-item-price">+$${
                    addOnsType[item]
                  }/${type === "yearly" ?"yr" :"mo"}</span>
                 </div>
      `;
    })
    .join("");

  return html;
}

function displayTotalPrice(price) {
  document.querySelector(".total-price .total").innerHTML = `Total (per ${
    type === "yearly" ? "year" : "month"
  })`;

  document.querySelector(".total-price .price").innerHTML = `+$${price}/${
    type === "yearly" ? "yr" : "mo"
  }`;
}
