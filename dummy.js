const slotBtns = document.querySelectorAll(".slotBtn"); //It will give the array of elements
const form = document.getElementById("form");

form.addEventListener("submit", formSubmitHandler);

// console.log(slotBtns);
const availableSlots = {};
slotBtns.forEach((slotBtn) => {
  const slotTime = slotBtn.querySelector("span").innerText;
  const slotCount = parseInt(slotBtn.querySelector("input").value, 10);
  availableSlots[slotTime] = slotCount; //storing all slots and time inside an availableSlots object
  slotBtn.addEventListener("click", slotBtnHandler); //Adding event listner using forEach Method
});
// console.log(availableSlots);

function slotBtnHandler(e) {
  const slotTime = e.currentTarget.querySelector("span").innerText;

  console.log(slotTime);
  console.log(availableSlots);
}

function formSubmitHandler(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const details = {
    name: name,
    email: email,
  };
  console.log(details);
}
