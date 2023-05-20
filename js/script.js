const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

const allItemsContainer = document.querySelector(".all-items-box-container");
const boxs = document.querySelectorAll(".box");
const allItemBoxs = document.querySelectorAll(".box-all");

let allowSetItem = false;
let indexItemToSet;

function setAllowTrue() {
  allowSetItem = true;
}

function setAllowFalse() {
  allowSetItem = false;
}

boxs.forEach((element, index) => {
  element.addEventListener("click", () => {
    indexItemToSet = index;
    setAllowTrue();
    setTest();
  });
});

function checkExist() {
  let imgSrcArr = [];

  boxs.forEach((element) => {
    imgSrcArr.unshift(element.children[0].getAttribute("src"));
  });

  console.log(imgSrcArr);
}

function setTest() {
  if (allowSetItem == true) {
    allItemBoxs.forEach((element, index) => {
      element.addEventListener("click", () => {
        let chosenItemFromAllItem = element.children[0].getAttribute("src");
        boxs[indexItemToSet].children[0].setAttribute("src", chosenItemFromAllItem);
        setAllowFalse();
        checkExist();
      });
    });
  }
}
