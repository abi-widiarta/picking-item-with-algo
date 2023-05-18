const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

const allItemsContainer = document.querySelector(".all-items-box-container");

// class="box-all"
// data-bs-toggle="tooltip"
// data-bs-placement="left"
// data-bs-html="true"
// data-bs-title="<p class='tooltip-title'>Imperial Sword</p>
// <p>Stat +200%</p>
// <p>Req mana : 20</p>
// <p>Class : Rare</p>"
// data-bs-custom-class="custom-tooltip"

// const btn = document.createElement("button");
// btn.className = "btn btn-primary";
// btn.textContent = "Button";

// for (let i = 1; i <= 12; i++) {
//   const boxContainerAll = document.createElement("div");
//   const boxAll = document.createElement("div");

//   boxContainerAll.classList.add("box-container-all");
//   boxAll.classList.add("box-all");

//   boxAll.setAttribute("data-bs-toggle", "tooltip");
//   boxAll.setAttribute("data-bs-placement", "left");
//   boxAll.setAttribute("data-bs-html", "true");
//   boxAll.setAttribute("data-bs-title", "tes");
//   boxAll.setAttribute("data-bs-custom-class", "custom-tooltip");

//   boxContainerAll.append(boxAll);

//   allItemsContainer.append(boxContainerAll);
// }
