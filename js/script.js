const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

const allItemsContainer = document.querySelector(".all-items-box-container");
const boxs = document.querySelectorAll(".box");
const allItemBoxs = document.querySelectorAll(".box-all");

const algos = document.querySelectorAll(".dropdown-item");
const chosenAlgoUI = document.querySelector(".chosen-algo");

const allDeleteBtn = document.querySelectorAll(".delete-item-btn");

const charImg = document.querySelector(".char-img");

let chosenAlgo = "Brute force";
chosenAlgoUI.textContent = chosenAlgo;

let allowSetItem = false;
let indexItemToSet;

allDeleteBtn.forEach((element) => {
  element.addEventListener("click", () => {
    let indexItemPicked;

    element.previousElementSibling.setAttribute("src", "");
    // console.log(element.parentElement);
    // console.log(element.previousElementSibling);
    element.style.opacity = 0;
    element.style.pointerEvents = "none";

    indexItemPicked = element.previousElementSibling.getAttribute("data-item-number");

    allItemBoxs[indexItemPicked].style.opacity = 1;
    allItemBoxs[indexItemPicked].style.pointerEvents = "all";

    allItemBoxs[indexItemPicked].children[0].style.opacity = 1;
    console.log(allItemBoxs[indexItemPicked].children[0]);
  });
});

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

boxs.forEach((element) => {
  element.addEventListener("mouseover", () => {
    if (element.children[0].getAttribute("src") != "") {
      const deleteBtn = element.children[1];
      deleteBtn.style.opacity = 1;
      deleteBtn.style.pointerEvents = "all";
    }
  });
});

boxs.forEach((element) => {
  element.addEventListener("mouseleave", () => {
    if (element.children[0].getAttribute("src") != "") {
      const deleteBtn = element.children[1];
      deleteBtn.style.opacity = 0;
      deleteBtn.style.pointerEvents = "none";
    }
  });
});

boxs.forEach((element, index) => {
  element.addEventListener("click", () => {
    indexItemToSet = index;
    currPicked = element;

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

let imgSrcArr;
// let acceptGo = false;

function checkIsNotFull(imgSrcArr) {
  return imgSrcArr.includes("");
}

function checkExist(srcFromAllItem) {
  let exist = false;

  imgSrcArr = [];

  boxs.forEach((element) => {
    imgSrcArr.unshift(element.children[0].getAttribute("src"));
  });

  if (imgSrcArr.includes(srcFromAllItem)) {
    exist = true;
  }

  return exist;
}

let itemBefore;
let goFunctionCount = 0;

function setTest() {
  if (allowSetItem == true) {
    allItemBoxs.forEach((element, index) => {
      element.addEventListener("click", () => {
        let chosenItemFromAllItem = element.children[0].getAttribute("src");
        setAllowFalse();
        if (!checkExist(chosenItemFromAllItem)) {
          if (boxs[indexItemToSet].children[0].getAttribute("src") == "") {
            boxs[indexItemToSet].children[0].setAttribute("src", chosenItemFromAllItem);

            element.style.opacity = 0.4;
            element.style.pointerEvents = "none";
            itemBefore = element;

            let boxParent = element.parentElement;
            boxParent.style.opacity = 1;

            boxs[indexItemToSet].children[0].setAttribute("data-item-number", index);
          } else if (boxs[indexItemToSet].children[0].getAttribute("src") != "") {
            boxs[indexItemToSet].children[0].setAttribute("src", chosenItemFromAllItem);

            let indexItemBefore = boxs[indexItemToSet].children[0].getAttribute("data-item-number");

            console.log(allItemBoxs);
            // console.log(boxs[indexItemToSet]);

            itemBefore = allItemBoxs[indexItemBefore];

            itemBefore.style.opacity = 1;
            itemBefore.style.pointerEvents = "all";

            let itemBeforeParent = itemBefore.parentElement;
            itemBeforeParent.style.opacity = 1;

            element.style.opacity = 0.4;
            element.style.pointerEvents = "none";
            itemBefore = element;

            let boxParent = element.parentElement;
            boxParent.style.opacity = 1;

            boxs[indexItemToSet].children[0].setAttribute("data-item-number", index);
          }
        }

        if (!checkIsNotFull(imgSrcArr)) {
          if (goFunctionCount == 0) {
            goListener();
            goFunctionCount++;
          }
        }
      });
    });
  }
}

// Animation

const goBtn = document.querySelector(".go-btn");

function goListener() {
  // let bestItem;
  goBtn.style.opacity = 0.98;
  goBtn.style.pointerEvents = "all";

  console.log("yes");

  goBtn.addEventListener("click", () => {
    boxs.forEach((element) => {
      element.style.pointerEvents = "none";
    });
    goAnimation();
    setTimeout(() => {
      bestItem = getBestItem();
      highlightBestItem(bestItem);
    }, 2400);

    setTimeout(() => {
      charImg.setAttribute("src", "./img/char-power-up-slowed.gif");
    }, 3400);

    setTimeout(() => {
      charImg.setAttribute("src", "./img/char-idle.gif");
    }, 9600);
  });
}

function goAnimation() {
  let delay = 0;

  for (let i = 0; i < boxs.length; i++) {
    const element = boxs[i];

    setTimeout(() => {
      element.style.backgroundColor = "red";
    }, 0 + delay);

    setTimeout(() => {
      element.style.backgroundColor = "transparent";
    }, 90 + delay);

    delay += 90;
  }

  for (let i = boxs.length - 1; i >= 0; i--) {
    const element = boxs[i];

    setTimeout(() => {
      element.style.backgroundColor = "red";
    }, 0 + delay);

    setTimeout(() => {
      element.style.backgroundColor = "transparent";
    }, 90 + delay);

    delay += 90;
  }

  for (let i = 0; i < boxs.length; i++) {
    const element = boxs[i];

    setTimeout(() => {
      element.style.backgroundColor = "red";
    }, 0 + delay);

    setTimeout(() => {
      element.style.backgroundColor = "transparent";
    }, 90 + delay);

    delay += 90;
  }
}

// BEST ITEMS LOGIC

function getBestItem() {
  let bestItemIndex = [0, 2, 4, 6];
  return bestItemIndex;
}

function highlightBestItem(bestItemIndex) {
  for (let i = 0; i < boxs.length; i++) {
    if (!bestItemIndex.includes(i)) {
      boxs[i].style.outline = "0px solid limegreen";
      boxs[i].parentElement.style.opacity = 0.6;
    } else {
      boxs[i].style.outline = "3px solid limegreen";
    }
  }
}
