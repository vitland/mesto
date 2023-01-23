const closeIcon = document.querySelector(".popup__close-icon");
const popUp = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const submitForm = document.querySelector(".popup__form");
const changeIcon = document.querySelector(".profile__button-change");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_occupation");
const elementsContainer = document.querySelector(".elements");


const elementsArr = [
  {
    name: "Домбай",
    url: "https://i.ibb.co/1m7JJCD/dombai.jpg",
  },
  {
    name: "Эльбрус",
    url: "https://i.ibb.co/2NmW2cp/elbrus.jpg",
  },
  {
    name: "Красноярск",
    url: "https://i.ibb.co/wWLHmvH/krasnoyarsk.jpg",
  },
  {
    name: "Москва",
    url: "https://i.ibb.co/NxXrbCV/moscow.jpg",
  },
  {
    name: "Сочи",
    url: "https://i.ibb.co/brGLRJ6/sochi.jpg",
  },
  {
    name: "Сочи, дендрарий",
    url: "https://i.ibb.co/TKL1Bnf/sochi2.jpg",
  },
];

function populateElements(elementsArr) {
  elementsArr.forEach((place) => {
    const elementTemplate = document.querySelector(
      ".elements__template"
    ).content;
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = place.url;
    element.querySelector(".element__image").alt = place.name;
    element.querySelector(".element__text").textContent = place.name;

    elementsContainer.append(element);
  });
}

populateElements(elementsArr);

function closePopup() {
  popUp.classList.remove("popup_opened");
}

function openPopup() {
  popUp.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

function submit(e) {
  e.preventDefault();
  closePopup();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
}

closeIcon.addEventListener("click", closePopup);
changeIcon.addEventListener("click", openPopup);
submitForm.addEventListener("submit", submit);
