const body = document.querySelector("body");
const buttonsOpenModal = document.querySelectorAll("[data-button]");

function noScroll() {
  const bodyWidth = body.offsetWidth;
  const windowWidth = window.innerWidth;
  const scrollWidth = windowWidth - bodyWidth;
  body.classList.add("noscroll");
  body.style.paddingRight = scrollWidth + "px";
}

function handlerToggle(button) {
  noScroll();

  const getSearchModal = button.getAttribute("data-button");
  const modal = document.getElementById(getSearchModal);
  const buttonClose = modal.querySelector("[data-close]");
  console.log(buttonClose);
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
  let title = "";
  switch (button.getAttribute("data-button")) {
    case "menu":
      button.addEventListener("click", () => handlerToggle(button));
      break;
    case "city":
      title = "Выберете город";
      button.addEventListener("click", () => createModal(title));
      break;

    case "registration":
      title = "Регистрация";
      button.addEventListener("click", () => createModal(title));
      break;

    case "login":
      title = "Вход";
      button.addEventListener("click", () => createModal(title));
      break;

    default:
      title = "Нет контента";
      button.addEventListener("click", () => createModal(title));
      break;
  }
});

function createModal(title) {
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("content");

  const buttonClose = document.createElement("button");
  buttonClose.classList.add("close");

  const mainTitle = document.createElement("h2");
  mainTitle.textContent = title;

  modalContent.prepend(mainTitle);
  modalContent.append(buttonClose);

  modalWrapper.prepend(modalContent);

  body.prepend(modalWrapper);
  noScroll();
}
