const slots = document.querySelectorAll(".slot");
const slotForm = document.querySelector(".slot-form");
const bookingForm = document.getElementById("booking-form");
const bookedSlots = document.querySelector(".bookings-list");
let updatedSlots = [...slots];

///SLOTS BUTTONS HANDLER FUNCTION
let selectedSlot = null;
slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    selectedSlot = slot;
    slotForm.style.display = "block";
  });
});

//FORM SUBMIT HANDLER FUNCTION

bookingForm.addEventListener("submit", formSubmitHandler);

async function formSubmitHandler(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const time = selectedSlot.dataset.time;

  if (name && email && time) {
    const bookingDetails = {
      name: name,
      email: email,
      time: time,
      link: "https://meet.google.com",
    };
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/f250da4f356046ec89fbb8c35f975a2a/slots",
        bookingDetails
      );
      console.log(response.data);
      displayBookings(response.data);
      updateSlotsOnFormSubmit(response.data); //update slots on form submit
      bookingForm.reset();
      selectedSlot = null;
      slotForm.style.display = "none";
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("PLEASE ENTER REQUIRED FIELDS...!");
  }
}

//DISPLAY ON SCREEN HANDLER FUNCTION

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
}

//UPDATE AVAILABLE SLOTS ON FORM SUBMIT FUNCTION

function updateSlotsOnFormSubmit(obj) {
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
    // console.log(updatedSlots);
  }
}

//CANCEL MEETING HANDLER FUNCTION

function cancelMeetingHandler(e, obj) {
  const slotSelectedToDelete = e.target.closest(".booked-slot");
  //   console.log(slotSelectedToDelete);
  axios
    .delete(
      `https://crudcrud.com/api/f250da4f356046ec89fbb8c35f975a2a/slots/${obj._id}`
    )
    .then((res) => {
      //   console.log(res);
      slotSelectedToDelete.remove();
      updateSlotsOnCancelMeet(obj); // UPDATE AVAILABLE SLOTS
    })
    .catch((err) => {
      console.log(err);
    });
}

// UPDATES AVAILABLE SLOTS ON CANCEL MEETING FUNCTION

function updateSlotsOnCancelMeet(obj) {
  const time = obj.time;
  const slot = Array.from(slots).find((s) => s.dataset.time === time);
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
  //   console.log(updatedSlots);
}

// >>>>>DOM CONTENT LOADED<<<<<<<////

window.addEventListener("DOMContentLoaded", getRequest);
async function getRequest() {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/f250da4f356046ec89fbb8c35f975a2a/slots"
    );
    // console.log(response.data);
    updateSlotsOnGetRequest(response.data);
    response.data.map((slot) => {
      displayBookings(slot);
    });
  } catch (err) {
    console.log(err);
  }
}

function updateSlotsOnGetRequest(arr) {
  const retrievedSlots = {};
  for (let i = 0; i < arr.length; i++) {
    let time = arr[i].time;
    if (retrievedSlots[time]) {
      retrievedSlots[time] += 1;
    } else {
      retrievedSlots[time] = 1;
    }
  }
  //   console.log(retrievedSlots);

  slots.forEach((slot) => {
    const slotTime = slot.getAttribute("data-time");
    if (retrievedSlots[slotTime]) {
      const available = parseInt(slot.dataset.available);
      const remaining = available - retrievedSlots[slotTime];
      if (remaining === 0) {
        slot.style.display = "none";
      } else {
        slot.dataset.available = remaining;
        slot.textContent = `${slotTime} (${remaining} slots available)`;
      }
    }
  });
}
