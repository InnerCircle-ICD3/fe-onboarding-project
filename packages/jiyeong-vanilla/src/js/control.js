export const handleInputCoin = () => {
  const inputCoin = document.querySelector(".input-coin");
  inputCoin.addEventListener("input", (e) => e.target.value);
};
