const body = document.querySelector("body");
const buttonsOpenModal = document.querySelectorAll("[data-button]");

const menu = document.getElementById("menu");

const arrCities = [
  "Москва",
  "Нижний",
  "Владимир",
  "Гороховец",
  "Уфа",
  "Иваново",
  "Вологодск",
  "Ростов",
  "Казань",
  "Питер",
  "Москва",
  "Нижний",
  "Владимир",
  "Гороховец",
  "Уфа",
  "Иваново",
  "Вологодск",
  "Ростов",
  "Казань",
  "Питер",
];

function noScroll() {
  const isActiveMenu = menu.classList.contains("active");
  if (!isActiveMenu) {
    const bodyWidth = body.offsetWidth;
    const windowWidth = window.innerWidth;
    const scrollWidth = windowWidth - bodyWidth;
    body.classList.add("noscroll");
    body.style.paddingRight = scrollWidth + "px";
  }
}

function handlerToggle(event) {
  const button = event.target;
  button.removeEventListener("click", handlerToggle); //отписываюсь от открытия меню
  const handleClose = () => {
    modal.classList.remove("active");
    button.classList.remove("active");
    body.style.paddingRight = 0;
    body.classList.remove("noscroll");

    buttonClose.removeEventListener("click", handleClose); //отписываюсь от кнопки закрытия
    console.log("отписка", button);
    button.removeEventListener("click", handleClose); //отписываюсь от кнопки закрытия которая раньше была открытием
    button.addEventListener("click", handlerToggle); //навешиваю событие на кнопку открытия меню
  };
  noScroll();

  const getSearchModal = button.getAttribute("data-button");
  const modal = document.getElementById(getSearchModal);
  const buttonClose = modal.querySelector("[data-close]");

  button.classList.add("active");

  modal.classList.add("active");
  console.log("подписка", button);
  button.addEventListener("click", handleClose); //навешиваю событие закрытия на кнопку которая раньше была открытием
  buttonClose.addEventListener("click", handleClose); //навешиваю событие на кнопку закрытия меню
}

function createModal(event) {
  const title = event.target.getAttribute("data-title");
  console.log("1111", event.target);
  console.log(title);
  function handleClose(event) {
    const close = event.target;
    if (
      close.classList.contains("modal") ||
      close.classList.contains("close")
    ) {
      const isActiveMenu = menu.classList.contains("active");
      if (!isActiveMenu) {
        body.style.paddingRight = 0;
        body.classList.remove("noscroll");
      }
      modalWrapper.removeEventListener("click", handleClose);
      modalWrapper.remove();
    }
  }

  const modalWrapper = document.createElement("div");
  const modalContent = document.createElement("div");
  const buttonClose = document.createElement("button");
  const mainTitle = document.createElement("h2");

  modalWrapper.classList.add("modal");
  modalContent.classList.add("content");
  buttonClose.classList.add("close");

  modalWrapper.addEventListener("click", handleClose);

  mainTitle.textContent = title;

  modalContent.prepend(mainTitle);

  switch (event.target.getAttribute("data-button")) {
    case "city":
      const [searchInput, listCities] = createCityModal(arrCities);
      modalContent.append(searchInput, listCities);
      break;

    default:
      break;
  }

  modalContent.append(buttonClose);
  modalWrapper.prepend(modalContent);
  body.prepend(modalWrapper);
  noScroll();
}

function createCityModal(arrCities) {
  const searchInput = document.createElement("input");
  searchInput.classList.add("modal__search-input");
  const listCities = document.createElement("ul");
  listCities.classList.add("city__list");
  arrCities.forEach((city) => {
    const itemCity = document.createElement("li");
    itemCity.classList.add("city__item");
    itemCity.textContent = city;
    listCities.append(itemCity);
  });

  return [searchInput, listCities];
}

buttonsOpenModal.forEach((button) => {
  if (button.getAttribute("data-button") === "menu") {
    button.addEventListener("click", handlerToggle);
  } else {
    button.addEventListener("click", createModal);
    console.log("1");
  }
});
