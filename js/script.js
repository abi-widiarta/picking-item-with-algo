const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

const allItemsContainer = document.querySelector(".all-items-box-container");
const boxs = document.querySelectorAll(".box");
const allItemBoxs = document.querySelectorAll(".box-all");

const algos = document.querySelectorAll(".dropdown-item");
const chosenAlgoUI = document.querySelector(".chosen-algo");

let chosenAlgo = "Brute force";
chosenAlgoUI.textContent = chosenAlgo;

let allowSetItem = false;
let indexItemToSet;

algos.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element.dataset.algo);
    chosenAlgoUI.textContent = element.dataset.algo;
  });
});

function setAllowTrue() {
  allowSetItem = true;
}

function setAllowFalse() {
  allowSetItem = false;
}

let currOutline;

boxs.forEach((element, index) => {
  element.addEventListener("click", () => {
    indexItemToSet = index;

    if (currOutline == undefined) {
      element.style.outline = "3px solid orange";
      currOutline = element;
    } else {
      currOutline.style.outline = "0px solid orange";
      element.style.outline = "3px solid orange";
      currOutline = element;
    }

    setAllowTrue();
    setTest();
  });
});

function checkExist(srcFromAllItem) {
  let imgSrcArr = [];
  let exist = false;

  boxs.forEach((element) => {
    imgSrcArr.unshift(element.children[0].getAttribute("src"));
  });

  if (imgSrcArr.includes(srcFromAllItem)) {
    exist = true;
  }

  return exist;
}

function setTest() {
  if (allowSetItem == true) {
    allItemBoxs.forEach((element, index) => {
      element.addEventListener("click", () => {
        let chosenItemFromAllItem = element.children[0].getAttribute("src");
        setAllowFalse();
        if (!checkExist(chosenItemFromAllItem)) {
          boxs[indexItemToSet].children[0].setAttribute("src", chosenItemFromAllItem);
          element.style.opacity = 0.4;
          element.style.pointerEvents = "none";

          let boxParent = element.parentElement;
          boxParent.style.opacity = 0.3;
          console.log(boxParent);
        }
      });
    });
  }
}
