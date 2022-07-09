const body = document.querySelector("body");
const buttonsOpenModal = document.querySelectorAll("[data-button]");

const menu = document.getElementById("menu");
const isActiveMenu = menu.classList.contains("active");

function noScroll() {
  if (!isActiveMenu) {
    const bodyWidth = body.offsetWidth;
    const windowWidth = window.innerWidth;
    const scrollWidth = windowWidth - bodyWidth;
    body.classList.add("noscroll");
    body.style.paddingRight = scrollWidth + "px";
  }
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
  function handleClose() {
    console.log('lol');
    if (!isActiveMenu) {
      body.style.paddingRight = 0;
      body.classList.remove("noscroll");
    }

    buttonClose.removeEventListener("click", handleClose);
    modalWrapper.remove();
  }

  const modalWrapper = document.createElement("div");
  const modalContent = document.createElement("div");
  const buttonClose = document.createElement("button");
  const mainTitle = document.createElement("h2");

  modalWrapper.classList.add("modal");
  modalContent.classList.add("content");
  buttonClose.classList.add("close");

  buttonClose.addEventListener("click", handleClose);

  mainTitle.textContent = title;

  modalContent.prepend(mainTitle);
  modalContent.append(buttonClose);
  modalWrapper.prepend(modalContent);

  body.prepend(modalWrapper);
  noScroll();
}
