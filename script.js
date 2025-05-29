function moveNext(current, nextId) {
    if (current.value.length === current.maxLength) {
      document.getElementById(nextId).focus();
    }
  }
  
  function calculateLogoutTime() {
    const loginHour = document.getElementById("loginHour").value.trim();
    const loginMinute = document.getElementById("loginMinute").value.trim();
    const breakTime = document.getElementById("breakTime").value.trim();
    const ampmRadios = document.getElementsByName("ampm");
  
    // Validate login hour
    if (!loginHour) {
      alert("Please enter Login Hour");
      return;
    }
    if (isNaN(loginHour) || loginHour < 1 || loginHour > 12) {
      alert("Login Hour must be a number between 1 and 12");
      return;
    }
  
    // Validate login minute
    if (!loginMinute) {
      alert("Please enter Login Minute");
      return;
    }
    if (isNaN(loginMinute) || loginMinute < 0 || loginMinute > 59) {
      alert("Login Minute must be a number between 0 and 59");
      return;
    }
  
    // Validate break time
    if (!breakTime) {
      alert("Please enter Break Time");
      return;
    }
    if (isNaN(breakTime) || breakTime < 0) {
      alert("Break Time must be a positive number");
      return;
    }
  
    // Validate AM/PM radio buttons
    let ampmSelected = null;
    for (const radio of ampmRadios) {
      if (radio.checked) {
        ampmSelected = radio.value;
        break;
      }
    }
    if (!ampmSelected) {
      alert("Please select AM or PM");
      return;
    }
  
    // Convert login hour to 24-hour format
    let hour24 = parseInt(loginHour, 10);
    if (ampmSelected === "PM" && hour24 !== 12) hour24 += 12;
    if (ampmSelected === "AM" && hour24 === 12) hour24 = 0;
  
    let minute = parseInt(loginMinute, 10);
    let breakMins = parseInt(breakTime, 10);
  
    // Create a Date object for today with login time
    let loginDate = new Date();
    loginDate.setHours(hour24, minute, 0, 0);
  
    // Total required work time in minutes (8 hours)
    const workMins = 8 * 60;
  
    // Calculate logout time in milliseconds
    let logoutDate = new Date(loginDate.getTime() + (workMins + breakMins) * 60000);
  
    // Format logout time HH:MM AM/PM
    let logoutHour = logoutDate.getHours();
    let logoutMinute = logoutDate.getMinutes();
  
    let suffix = logoutHour >= 12 ? "PM" : "AM";
    logoutHour = logoutHour % 12;
    if (logoutHour === 0) logoutHour = 12;
  
    let logoutHourStr = logoutHour.toString().padStart(2, "0");
    let logoutMinuteStr = logoutMinute.toString().padStart(2, "0");
  
    // Display logout time in the output textbox
    document.getElementById("logoutTime").value = `${logoutHourStr}:${logoutMinuteStr} ${suffix}`;
  
    // Display greeting
    const greetEl = document.getElementById("greeting");
    if (greetEl) {
      greetEl.textContent = "Have a great day!";
    }
  }
  