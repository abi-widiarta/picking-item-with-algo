const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

const allItemsContainer = document.querySelector(".all-items-box-container");
const boxs = document.querySelectorAll(".box");
const allItemBoxs = document.querySelectorAll(".box-all");

const algos = document.querySelectorAll(".dropdown-item");
const chosenAlgoUI = document.querySelector(".chosen-algo");
const dropDown = document.querySelector(".dropdown-toggle");

const allDeleteBtn = document.querySelectorAll(".delete-item-btn");

const charImg = document.querySelector(".char-img");
const charImgAvatar = document.querySelector(".char-img-avatar");

const itemChosenWrapper = document.querySelector(".chosen-wrapper");

let chosenAlgo = "Brute force";
chosenAlgoUI.textContent = chosenAlgo;

let allowSetItem = false;
let indexItemToSet;

allDeleteBtn.forEach((element) => {
  element.addEventListener("click", () => {
    let indexItemPicked;

    element.previousElementSibling.setAttribute("src", "");
    element.style.opacity = 0;
    element.style.pointerEvents = "none";

    indexItemPicked = element.previousElementSibling.getAttribute("data-item-number");

    allItemBoxs[indexItemPicked].style.opacity = 1;
    allItemBoxs[indexItemPicked].style.pointerEvents = "all";

    allItemBoxs[indexItemPicked].parentElement.style.opacity = 1;

    allItemBoxs[indexItemPicked].children[0].style.opacity = 1;
  });
});

algos.forEach((element) => {
  element.addEventListener("click", () => {
    chosenAlgoUI.textContent = element.dataset.algo;
    chosenAlgo = element.dataset.algo;
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

    console.log(element.getAttribute("data-tier"));
    disableOtherTier(element.getAttribute("data-tier"));

    // console.log(allItemBoxs.getAttribute("data-tier"));
    // console.log(Array.from(allItemBoxs));

    if (currOutline == undefined) {
      element.style.outline = "4px solid white";
      currOutline = element;
    } else {
      currOutline.style.outline = "0px solid white";
      element.style.outline = "4px solid white";
      currOutline = element;
    }

    setAllowTrue();
    setTest();
  });
});

let prevtier;
function disableOtherTier(tier) {
  if (prevtier == undefined) {
    allItemBoxs.forEach((element) => {
      if (element.getAttribute("data-tier") != tier) {
        element.parentElement.style.pointerEvents = "none";
        element.parentElement.style.opacity = "0.4";
      }
    });
  } else if (prevtier == tier) {
    allItemBoxs.forEach((element) => {
      if (element.getAttribute("data-tier") != tier) {
        element.parentElement.style.pointerEvents = "none";
        element.parentElement.style.opacity = "0.4";
      }
    });
  } else if (prevtier != tier) {
    console.log("yes");
    allItemBoxs.forEach((element) => {
      if (element.getAttribute("data-tier") == tier) {
        element.parentElement.style.pointerEvents = "all";
        element.parentElement.style.opacity = "1";

        if (element.style.opacity == "0.4") {
          element.parentElement.style.opacity = "0.4";
        }
      }
    });

    allItemBoxs.forEach((element) => {
      if (element.getAttribute("data-tier") != tier) {
        element.parentElement.style.pointerEvents = "none";
        element.parentElement.style.opacity = "0.4";
      }
    });
  }

  prevtier = tier;
}

let imgSrcArr;

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
let currItemParent;

function setTest() {
  if (allowSetItem == true) {
    allItemBoxs.forEach((element, index) => {
      element.addEventListener("click", () => {
        let chosenItemFromAllItem = element.children[0].getAttribute("src");
        setAllowFalse();
        if (!checkExist(chosenItemFromAllItem)) {
          if (boxs[indexItemToSet].children[0].getAttribute("src") == "") {
            boxs[indexItemToSet].children[0].setAttribute("src", chosenItemFromAllItem);
            boxs[indexItemToSet].setAttribute("data-item-name", element.getAttribute("data-item-name"));
            boxs[indexItemToSet].setAttribute("data-stat", element.getAttribute("data-stat"));
            boxs[indexItemToSet].setAttribute("data-mana", element.getAttribute("data-mana"));

            console.log("tes", boxs[indexItemToSet]);
            console.log("el", element);

            element.style.opacity = "0.4";
            element.style.pointerEvents = "none";
            currItemParent = element.parentElement;

            currItemParent.style.opacity = "0.4";

            itemBefore = element;

            boxs[indexItemToSet].children[0].setAttribute("data-item-number", index);
          } else if (boxs[indexItemToSet].children[0].getAttribute("src") != "") {
            boxs[indexItemToSet].children[0].setAttribute("src", chosenItemFromAllItem);
            boxs[indexItemToSet].setAttribute("data-item-name", element.getAttribute("data-item-name"));
            boxs[indexItemToSet].setAttribute("data-stat", element.getAttribute("data-stat"));
            boxs[indexItemToSet].setAttribute("data-mana", element.getAttribute("data-mana"));

            let indexItemBefore = boxs[indexItemToSet].children[0].getAttribute("data-item-number");

            itemBefore = allItemBoxs[indexItemBefore];

            itemBefore.style.opacity = 1;
            itemBefore.style.pointerEvents = "all";

            let itemBeforeParent = itemBefore.parentElement;
            itemBeforeParent.style.opacity = 1;

            element.style.opacity = "0.4";
            element.style.pointerEvents = "none";
            currItemParent = element.parentElement;

            currItemParent.style.opacity = "0.4";

            itemBefore = element;

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
let allSelectedItems = [];

function goListener() {
  goBtn.style.opacity = 0.98;
  goBtn.style.pointerEvents = "all";

  goBtn.addEventListener("click", () => {
    boxs.forEach((element) => {
      allSelectedItems.push({ Name: element.getAttribute("data-item-name"), Tier: element.getAttribute("data-tier"), Value: Number(element.getAttribute("data-stat")), Weight: Number(element.getAttribute("data-mana")) });
    });

    if (chosenAlgo == "D.programming") {
      masterDynamicP(allSelectedItems);
    }

    boxs.forEach((element) => {
      element.style.pointerEvents = "none";
    });

    allItemBoxs.forEach((element) => {
      element.style.pointerEvents = "none";
    });

    goBtn.style.opacity = 0.4;
    goBtn.style.pointerEvents = "none";
    dropDown.setAttribute("disabled", "");

    goAnimation();

    setTimeout(() => {
      highlightBestItem(chosenItemIndex);
      createBoxChosenItem();
    }, 2400);

    setTimeout(() => {
      effectChosenItem();
      populateEffectChosenItem();
    }, 3400);

    if (chosenItemIndex.length == 4) {
      console.log("4");
      setTimeout(() => {
        charImg.setAttribute("src", "./img/char-power-up-slowed.gif");
        charImg.style.animationName = "";
        charImgAvatar.setAttribute("src", "./img/char-power-up-slowed-avatar.gif");
      }, 3400);

      setTimeout(() => {
        charImgAvatar.setAttribute("src", "./img/char-idle-avatar.gif");
        charImg.setAttribute("src", "./img/char-idle.gif");
        charImg.style.animationName = "float";
      }, 11800);

      setTimeout(() => {
        showModal();
      }, 11800);
    } else if (chosenItemIndex.length == 3) {
      console.log("3");
      setTimeout(() => {
        charImg.setAttribute("src", "./img/char-power-up-slowed.gif");
        charImg.style.animationName = "";
        charImgAvatar.setAttribute("src", "./img/char-power-up-slowed-avatar.gif");
      }, 3400);

      setTimeout(() => {
        charImgAvatar.setAttribute("src", "./img/char-idle-avatar.gif");
        charImg.setAttribute("src", "./img/char-idle.gif");
        charImg.style.animationName = "float";
      }, 9800);

      setTimeout(() => {
        showModal();
      }, 9800);
    }
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
let chosenItemIndex = [];
function masterDynamicP(allSelectedItems) {
  const maxWeight = 200;
  const [maxValue, set] = dynamicP(allSelectedItems, maxWeight);
  console.log(returnIndex(allSelectedItems, set));
  console.log("Value =", maxValue);
  chosenItemIndex = returnIndex(allSelectedItems, set);
}

function dynamicP(coins, maxWeight) {
  const n = coins.length;
  if (n === 0) {
    return [0, []];
  } else if (n === 1) {
    if (coins[0].Weight <= maxWeight) {
      return [coins[0].Value, [coins[0]]];
    } else {
      return [0, []];
    }
  } else {
    if (coins[0].Weight <= maxWeight) {
      const [value1, coins1] = dynamicP(coins.slice(2), maxWeight - coins[0].Weight);
      const newValue1 = value1 + coins[0].Value;

      const [value2, coins2] = dynamicP(coins.slice(1), maxWeight);

      if (newValue1 > value2) {
        coins1.unshift(coins[0]);
        return [newValue1, coins1];
      } else {
        return [value2, coins2];
      }
    } else {
      return dynamicP(coins.slice(1), maxWeight);
    }
  }
}

function search(coins, cari) {
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].Weight === cari.Weight && coins[i].Value === cari.Value && coins[i].Tier === cari.Tier) {
      return i;
    }
  }
  return -1;
}

function returnIndex(coins, selec) {
  const indexes = [];
  for (let i = 0; i < selec.length; i++) {
    const index = search(coins, selec[i]);
    if (index !== -1) {
      indexes.push(index);
    }
  }
  return indexes;
}

// function getBestItem() {
//   let bestItemIndex = [0, 2, 4, 6];
//   return bestItemIndex;
// }

function extractBestItemSrc(chosenItemIndex) {
  let bestItemSrc = [];

  boxs.forEach((element, index) => {
    if (chosenItemIndex.includes(index)) {
      bestItemSrc.push(element.children[0].getAttribute("src"));
    }
  });

  return bestItemSrc;
}

function highlightBestItem(chosenItemIndex) {
  for (let i = 0; i < boxs.length; i++) {
    if (!chosenItemIndex.includes(i)) {
      boxs[i].style.outline = "0px solid limegreen";
      boxs[i].parentElement.style.opacity = 0.6;
    } else {
      boxs[i].style.outline = "5px solid limegreen";
    }
  }
}

// Effect

function populateEffectChosenItem() {
  const boxContainerChosen = document.querySelectorAll(".box-container-chosen");
  let chosenItemSrc = extractBestItemSrc(chosenItemIndex);
  console.log(chosenItemSrc);

  boxContainerChosen.forEach((element, index) => {
    element.children[0].children[0].setAttribute("src", chosenItemSrc[index]);
  });
}

function createBoxChosenItem() {
  for (const i in chosenItemIndex) {
    itemChosenWrapper.innerHTML += `<div class="box-container-chosen">
      <div class="box-chosen">
        <img src="./img/item-1.png" alt="" />
      </div>
    </div>`;
  }
}

function effectChosenItem() {
  const boxContainerChosen = document.querySelectorAll(".box-container-chosen");
  let delay = 0;
  let animDelay = 0;
  boxContainerChosen.forEach((element) => {
    setTimeout(() => {
      element.style.opacity = 1;
      element.style.transform = "translateY(-20px)";
    }, 500 + delay);
    delay += 2000;
    animDelay += 1;
  });
}

// Modal

const modalToggleBtn = document.querySelector(".modal-toggle");

const modalAlgo = document.querySelector(".modal-algo-use");

const boxModalAll = document.querySelectorAll(".box-modal");

function showModal() {
  populateEffectChosenItemModal();
  modalAlgo.textContent = chosenAlgo;
  modalToggleBtn.click();
}

function populateEffectChosenItemModal() {
  let chosenItemSrc = extractBestItemSrc(chosenItemIndex);

  boxModalAll.forEach((element, index) => {
    element.children[0].setAttribute("src", chosenItemSrc[index]);
  });
}

// Buff stat

const statBuff = document.querySelector(".stat-buff-container");
const closeModalBtn = document.querySelector(".close-modal-btn");

function showBuffStat() {
  statBuff.style.transform = "translateY(-20px)";
  statBuff.style.opacity = 1;
}

closeModalBtn.addEventListener("click", () => {
  setTimeout(() => {
    showBuffStat();
  }, 350);
});
