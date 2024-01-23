
  // Wait for the document to be ready
  $(document).ready(function () {
    // Get the current date using Day.js
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");

    // Display the current date in the element with the id "currentDay"
    $("#currentDay").text("Today is " + currentDate);
  });

// Wait for the document to be ready
$(document).ready(function () {
  // Get the container for timeblocks
  var timeBlockContainer = $(".time-block-container");

  // Define business hours
  var businessHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

  // Function to generate timeblocks
  function generateTimeblocks() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Loop through business hours and generate timeblocks
    for (var i = 0; i < businessHours.length; i++) {
      // Create a timeblock div
      var timeBlock = $("<div>").addClass("row time-block");

      // Create an hour div
      var hourDiv = $("<div>").addClass("col-md-1 hour").text(businessHours[i]);

      // Create a textarea for user input
      var textArea = $("<textarea>").addClass("col-md-10 description");

      // Set the initial value of textarea from local storage
      textArea.val(localStorage.getItem(businessHours[i]));

      // Create a save button
      var saveBtn = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');

      // Append elements to the timeblock div
      timeBlock.append(hourDiv, textArea, saveBtn);

      // Append the timeblock div to the container
      timeBlockContainer.append(timeBlock);

      // Compare the current hour with the hour of the timeblock
      if (currentHour > i + 9) {
        // Past hour
        timeBlock.addClass("past");
      } else if (currentHour === i + 9) {
        // Present hour
        timeBlock.addClass("present");
      } else {
        // Future hour
        timeBlock.addClass("future");
      }
    }
  }

  // Function to handle click event on timeblocks
  function handleTimeblockClick() {
    // Event delegation to handle dynamically created elements
    timeBlockContainer.on("click", ".time-block", function () {
      // Find the textarea within the clicked timeblock
      var textArea = $(this).find("textarea");

      // Allow user to enter event details
      textArea.prop("readonly", false);
    });
  }

  // Function to handle click event on save button
  function handleSaveButtonClick() {
    // Event delegation to handle dynamically created elements
    timeBlockContainer.on("click", ".saveBtn", function () {
      // Find the textarea within the clicked timeblock
      var textArea = $(this).siblings("textarea");

      // Get the value entered by the user
      var enteredEvent = textArea.val();

      // Get the associated hour from the timeblock
      var associatedHour = $(this).siblings(".hour").text().trim();

      // Save the entered event to local storage
      localStorage.setItem(associatedHour, enteredEvent);

      // Disable further editing after saving
      textArea.prop("readonly", true);
    });
  }

  // Call the function to generate timeblocks when the document is ready
  generateTimeblocks();

  // Call the function to handle click event on timeblocks
  handleTimeblockClick();

  // Call the function to handle click event on save button
  handleSaveButtonClick();

  // Function to handle scroll event
  $(window).scroll(function () {
    // Check if the user has scrolled down
    if ($(window).scrollTop() > 0) {
      // If scrolled, display the timeblocks (adjust visibility class as needed)
      timeBlockContainer.addClass("visible");
    } else {
      // If at the top, hide the timeblocks (adjust visibility class as needed)
      timeBlockContainer.removeClass("visible");
    }
  });
});
