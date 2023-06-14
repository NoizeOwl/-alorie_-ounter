import { male, weight, height, age } from "./script.js";

const caloriesNorm = document.querySelector("#calories-norm");
const caloriesMin = document.querySelector("#calories-minimal");
const caloriesMax = document.querySelector("#calories-maximal");

const resultCalculate = (coefficient) => {
  const rate = male.checked ? 5 : -161;
  const finalResult =
    Math.ceil(10 * weight.value + 6.25 * height.value - 5 * age.value + rate) *
    coefficient;
  caloriesNorm.textContent = finalResult.toFixed(2);
  caloriesMin.textContent = Math.ceil(finalResult - finalResult * 0.15).toFixed(
    2
  );
  caloriesMax.textContent = Math.ceil(finalResult + finalResult * 0.15).toFixed(
    2
  );
};

export { resultCalculate };
