const body = document.querySelector("body");
const buttonsOpenModal = document.querySelectorAll("[data-button]");

function handlerToggle(button) {
  button.removeEventListener("click", () => handlerToggle(button));

  const bodyWidth = body.offsetWidth;
  const windowWidth = window.innerWidth;
  const scrollWidth = windowWidth - bodyWidth;
  body.style.paddingRight = scrollWidth + "px";
  body.classList.add("noscroll");

  const getSearchModal = button.getAttribute("data-button");
  const modal = document.getElementById(getSearchModal);
  const buttonClose = modal.querySelector("[data-close]");
  button.classList.add("active");

  const handleClose = () => {
    modal.classList.remove("active");
    button.classList.remove("active");
    body.style.paddingRight = 0;
    body.classList.remove("noscroll");
    buttonClose.removeEventListener("click", handleClose);
  };

  modal.classList.add("active");

  buttonClose.addEventListener("click", handleClose);
}

buttonsOpenModal.forEach((button) => {
  button.addEventListener("click", () => handlerToggle(button));
});
