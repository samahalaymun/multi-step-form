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
const stepNum = document.querySelectorAll(".step-num");
const addOnsSummery = document.querySelector(".add-ons-summery");
const allSection=document.querySelectorAll("section")

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
  } else if (counter === 1 || counter === 2){
    backBtn.classList.remove("hidden");
    confirmBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else if (counter === 3){
   backBtn.classList.remove("hidden");
    confirmBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  }
}
function indicateSections() {
  allSection.forEach((section,id)=>{
    if(counter === id){
      section.classList.remove("hidden")
    }else{
      section.classList.add("hidden");
    }
  })
}

function handlePersonalSectionValidation() {
  let flag = true;
  const firstName = document.getElementById("user-name");
  const email = document.getElementById("user-email");
  const phoneNumber = document.getElementById("user-phone");
  const nameError = document.querySelector(".name-error-message");
  const emailError = document.querySelector(".email-error-message");
  const phoneError = document.querySelector(".phone-error-message");
  if (!firstName.value.trim()) {
    flag = false;
    setErrorFor(firstName,nameError,'This field is required')
  }
  if (!email.value.trim()) {
    flag = false;
     setErrorFor(email, emailError,'This field is required');
  }
  if (!phoneNumber.value.trim()) {
    flag = false;
     setErrorFor(phoneNumber, phoneError,'This field is required');
  }
  if (firstName.value.trim()) {
    removeErrorFrom(firstName, nameError);
  }
  if (email.value.trim()) {
    removeErrorFrom(email, emailError);
  }
  if (phoneNumber.value.trim()) {
    removeErrorFrom(phoneNumber, phoneError);
  }

  return flag;
}

function indicateStepNumber() {
   stepNum.forEach((num,index)=>{
    if(counter === index){
       num.classList.add("hover")
    }else{
      num.classList.remove("hover")
    }
   })
}
function selectYourPlanValidation() {
  handlebillingTypeValidation();
  for (let i = 0, length = plan.length; i < length; i++) {
    if (plan[i].checked) {
      planType = plan[i].value;
      break;
    }
  }
  if(billingType.checked){
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
function setErrorFor(element,error,message){
   element.style.border = "2px solid #e74c3c";
   error.classList.remove("hidden");
   error.innerText = message;
}
function removeErrorFrom(element,error){
    element.style.border = "1px solid #9699AB";
    error.classList.add("hidden");
}
