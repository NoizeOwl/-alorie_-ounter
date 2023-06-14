import { age, height, weight, resetButton, resultButton } from "./script.js";

const resetForm = () => {
  if (age.value !== "" || height.value !== "" || weight.value !== "") {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
  if (age.value !== "" && height.value !== "" && weight.value !== "") {
    resultButton.disabled = false;
  } else {
    resultButton.disabled = true;
  }
};

export { resetForm };
