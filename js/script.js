
  // Wait for the document to be ready
  $(document).ready(function () {
    // Get the current date using Day.js
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");

    // Display the current date in the element with the id "currentDay"
    $("#currentDay").text("Today is " + currentDate);
  });

  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
$("#currentDay").text("Today is " + currentDate);

var timeBlockContainer = $(".time-block-container");
var businessHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

function generateTimeblocks() {
  var currentHour = dayjs().hour();
  for (var i = 0; i < businessHours.length; i++) {
    var timeBlock = $("<div>").addClass("row time-block");
    var hourDiv = $("<div>").addClass("col-md-1 hour").text(businessHours[i]);
    var textArea = $("<textarea>").addClass("col-md-10 description");
    textArea.val(localStorage.getItem(businessHours[i]));
    var saveBtn = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
    timeBlock.append(hourDiv, textArea, saveBtn);
    timeBlockContainer.append(timeBlock);
    if (currentHour > i + 9) {
      timeBlock.addClass("past");
    } else if (currentHour === i + 9) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }
  }
}

function handleTimeblockClick() {
  timeBlockContainer.on("click", ".time-block", function () {
    var textArea = $(this).find("textarea");
    textArea.prop("readonly", false);
  });
}

function handleSaveButtonClick() {
  timeBlockContainer.on("click", ".saveBtn", function () {
    var textArea = $(this).siblings("textarea");
    var enteredEvent = textArea.val();
    var associatedHour = $(this).siblings(".hour").text().trim();
    localStorage.setItem(associatedHour, enteredEvent);
    textArea.prop("readonly", true);
  });
}

function displaySavedEvents() {
  for (var i = 0; i < businessHours.length; i++) {
    var savedEvent = localStorage.getItem(businessHours[i]);
    if (savedEvent) {
      var textArea = timeBlockContainer.find(`.hour:contains('${businessHours[i]}')`).siblings("textarea");
      textArea.val(savedEvent);
    }
  }
}

generateTimeblocks();
handleTimeblockClick();
handleSaveButtonClick();
displaySavedEvents();

$(window).scroll(function () {
  if ($(window).scrollTop() > 0) {
    timeBlockContainer.addClass("visible");
  } else {
    timeBlockContainer.removeClass("visible");
  }
});

