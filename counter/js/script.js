import { resetForm } from "./resetForm";
import { resultCalculate } from "./resultCalculate";

const male = document.querySelector("#gender-male");
const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const active = document.querySelector(".radios-group");
const activityMinimal = document.querySelector("#activity-minimal");
const resultButton = document.querySelector(".form__submit-button");
const resetButton = document.querySelector(".form__reset-button");
const resultsBlock = document.querySelector(".counter__result");

let coefficient = 1.2;

age.addEventListener("input", () => {
  resetForm();
});

height.addEventListener("input", () => {
  resetForm();
});

weight.addEventListener("input", () => {
  resetForm();
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

resetButton.addEventListener("click", () => {
  male.checked = true;
  age.value = "";
  height.value = "";
  weight.value = "";
  activityMinimal.checked = true;
  resetButton.disabled = true;
  resultButton.disabled = true;
  resultsBlock.classList.add("counter__result--hidden");
});

resultButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  resultCalculate(coefficient);
  resultsBlock.classList.remove("counter__result--hidden");
});

export { age, height, weight, resultButton, resetButton, male };
