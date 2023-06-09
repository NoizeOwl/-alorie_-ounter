const male = document.querySelector("#gender-male");
const female = document.querySelector("#gender-female");

const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");

const active = document.querySelector(".radios-group");

const resultBut = document.querySelector(".form__submit-button");
const resetBut = document.querySelector(".form__reset-button");

const results = document.querySelector(".counter__result");

const caloriesNorm = results.querySelector("#calories-norm");
const caloriesMin = results.querySelector("#calories-minimal");
const caloriesMax = results.querySelector("#calories-maximal");
let coefficient = 1.2;

const reset = () => {
  if (age.value !== "" || height.value !== "" || weight.value !== "") {
    resetBut.removeAttribute("disabled", "true");
  } else {
    resetBut.setAttribute("disabled", "true");
  }
  if (age.value !== "" && height.value !== "" && weight.value !== "") {
    resultBut.removeAttribute("disabled", "true");
  } else {
    resultBut.setAttribute("disabled", "true");
  }
};

age.addEventListener("input", () => {
  reset();
});

height.addEventListener("input", () => {
  reset();
});

weight.addEventListener("input", () => {
  reset();
});

active.addEventListener("change", (evt) => {
  switch (evt.target.id) {
    case "activity-minimal":
      coefficient = 1.2;
      break;
    case "activity-low":
      coefficient = 1.375;
      break;
    case "activity-medium":
      coefficient = 1.55;
      break;
    case "activity-high":
      coefficient = 1.725;
      break;
    case "activity-maximal":
      coefficient = 1.9;
      break;
  }
});

resetBut.addEventListener("click", () => {
  resetBut.setAttribute("disabled", "true");
  resultBut.setAttribute("disabled", "true");
  male.setAttribute("checked", "true");
  female.removeAttribute("checked", "true");
  age.value = "";
  height.value = "";
  weight.value = "";
  active.querySelector("#activity-minimal").setAttribute("checked", "true");
  active.querySelector("#activity-low").removeAttribute("checked", "true");
  active.querySelector("#activity-medium").removeAttribute("checked", "true");
  active.querySelector("#activity-high").removeAttribute("checked", "true");
  active.querySelector("#activity-maximal").removeAttribute("checked", "true");
  results.classList.add("counter__result--hidden");
});

resultBut.addEventListener("click", (evt) => {
  evt.preventDefault();
  const rate = male.checked ? 5 : -161;
  const finalResult =
    Math.ceil(10 * weight.value + 6.25 * height.value - 5 * age.value + rate) *
    coefficient;
  results.classList.remove("counter__result--hidden");
  caloriesNorm.textContent = finalResult;
  let minResult = finalResult - finalResult * 0.15;
  let maxResult = finalResult + finalResult * 0.15;
  caloriesMin.textContent = Math.ceil(minResult);
  caloriesMax.textContent = Math.ceil(maxResult);
});
