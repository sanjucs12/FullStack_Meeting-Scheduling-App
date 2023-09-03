const slots = document.querySelectorAll(".slot");
const slotForm = document.querySelector(".slot-form");
const bookingForm = document.getElementById("booking-form");
const bookedSlots = document.querySelector(".bookings-list");
let updatedSlots = [...slots];

///SLOTS BUTTONS HANDLE
let selectedSlot = null;
slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    if (!slot.classList.contains("booked")) {
      selectedSlot = slot;
      slotForm.style.display = "block";
      //   console.log(selectedSlot);
    }
  });
});

//FORM SUBMIT HANDLE

bookingForm.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const time = selectedSlot.dataset.time;

  const bookingDetails = {
    name: name,
    email: email,
    time: time,
    link: "https://meet.google.com",
  };
  console.log(bookingDetails);
  displayBookings(bookingDetails);
  bookingForm.reset();
  selectedSlot = null;
  slotForm.style.display = "none";
}

//DISPLAY ON SCREEN HANDLE

function displayBookings(obj) {
  const bookedSlot = document.createElement("ul");
  bookedSlot.classList.add("booked-slot");
  bookedSlot.innerHTML = `
  <li>Name  : ${obj.name}</li>
  <li>Email : ${obj.email}</li>
  <li>Time  : ${obj.time}</li>
  <li><a href=${obj.link}>click here to join</a></li>
  <button id="delete-slot-btn">Cancel Meeting</button>
  `;
  bookedSlots.appendChild(bookedSlot);
  const deleteSlotBtn = bookedSlot.querySelector("#delete-slot-btn");
  deleteSlotBtn.addEventListener("click", (e) => {
    cancelMeetingHandler(e, obj);
  });

  //UPDATE AVAILABLE SLOTS

  const availableSlots = parseInt(selectedSlot.dataset.available);
  selectedSlot.dataset.available = availableSlots - 1;
  selectedSlot.textContent = `${obj.time} (${
    availableSlots - 1
  } slots available)`;
  //   console.log(selectedSlot.dataset.available);
  if (selectedSlot.dataset.available == 0) {
    // selectedSlot.remove();
    selectedSlot.style.display = "none";
    updatedSlots = updatedSlots.filter((slot) => {
      return slot != selectedSlot;
    });
    console.log(updatedSlots);
  }
}

//CANCEL MEETING HANDLER FUNCTION

function cancelMeetingHandler(e, obj) {
  //   console.log(e.target.closest(".booked-slot"));
  const slotSelectedToDelete = e.target.closest(".booked-slot");
  console.log(slotSelectedToDelete);
  slotSelectedToDelete.remove();

  // UPDATE AVAILABLE SLOTS
  console.log(updatedSlots);
  const time = obj.time;
  const slot = Array.from(slots).find((s) => s.dataset.time === time);
  console.log(slot);
  if (updatedSlots.includes(slot)) {
    const available = parseInt(slot.dataset.available);
    slot.dataset.available = available + 1;
    slot.textContent = `${time} (${available + 1} slots available)`;
  } else {
    slot.style.display = "inline-block";
    const available = parseInt(slot.dataset.available);
    slot.dataset.available = available + 1;
    slot.textContent = `${time} (${available + 1} slots available)`;
    updatedSlots.push(slot);
  }
  console.log(updatedSlots);
}
