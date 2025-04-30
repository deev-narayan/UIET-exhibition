const xValues = ["Present", "Absent"];
  const yValues = [0, 0];
  const barColors = [
    "mediumseagreen",
    "white"
  ];

  const chart = new Chart("present", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues,
        borderWidth: 1.8, // Makes the graph thin
        borderColor: "#FFFFFF59", // Adds a thin border around the doughnut
      }]
    },
    options: {
      cutoutPercentage: 70 // Adjusts the thickness of the doughnut
    }
  });
  let presentValue = 0;
  let absentValue = 0;

  function animateChart() {
    if (presentValue < 55) {
      presentValue++;
      chart.data.datasets[0].data[0] = presentValue;
    } else if (absentValue < 45) {
      absentValue++;
      chart.data.datasets[0].data[1] = absentValue;
    }
    chart.update();

    if (presentValue < 55 || absentValue < 45) {
      requestAnimationFrame(animateChart);
    }
  }

  window.onload = animateChart; 
  
  var xValue = ["ES-101", "BS-102", "BS-201", "MNC-101", "HSMC-101"];
  var yValue = [90, 85, 76, 98, 65, 0];
  var barColor = ["#145239", "#1F6B4D","#2E8B57","#3FA26D","#50C878"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValue,
      datasets: [{
        backgroundColor: barColor,
        data: yValue
      }]
    },

  });

  //for date and time

  const timetable = {
    "Monday": {
      "9:30AM-10:30AM": ["MNC-101", "UIET-002"],
      "10:30AM-11:30AM": ["BS-102 P G1 (RS)", "ES-101 P G2 (SS)", "ES-102 P G3", "ES-103 P G4"],
      "11:30AM-12:30PM": ["HSMC-101"],
      "12:30PM-01:30PM": ["HSMC-101"],
      "01:30PM-02:30PM": [],
      "02:30PM-03:30PM": ["BS-102"],
      "03:30PM-04:30PM": ["BS-201"],
      "04:30PM-05:30PM": ["BS-102 T (AK) (G3+G4)", "Library (G1+G2)"]
    },
    "Tuesday": {
      "9:30AM-10:30AM": ["MNC-101", "UIET-002"],
      "10:30AM-11:30AM": ["HSMC-101"],
      "11:30AM-12:30PM": ["BS-102 P G2 (RS)", "ES-101 P G1 (SS)", "ES-102 P G4", "ES-103 P G3"],
      "12:30PM-01:30PM": [],
      "01:30PM-02:30PM": [],
      "02:30PM-03:30PM": ["BS-102"],
      "03:30PM-04:30PM": ["BS-201"],
      "04:30PM-05:30PM": ["ES-101"]
    },
    "Wednesday": {
      "9:30AM-10:30AM": ["BS-201", "UIET-002"],
      "10:30AM-11:30AM": ["HSMC-101"],
      "11:30AM-12:30PM": ["BS-102 P G3 (AK)", "ES-101 P G4", "ES-102 P G2", "ES-103 P G1"],
      "12:30PM-01:30PM": [],
      "01:30PM-02:30PM": [],
      "02:30PM-03:30PM": ["CC-101"],
      "03:30PM-04:30PM": ["ES-101"],
      "04:30PM-05:30PM": ["ES-101 T (G3+G4)", "Library (G1+G2)"]
    },
    "Thursday": {
      "9:30AM-10:30AM": ["BS-102 T (G1+G2) (AK)", "Library (G3+G4)"],
      "10:30AM-11:30AM": ["HSMC-101"],
      "11:30AM-12:30PM": ["ES-101"],
      "12:30PM-01:30PM": ["ES-101 T (G1+G2)", "Library (G3+G4)"],
      "01:30PM-02:30PM": [],
      "02:30PM-03:30PM": ["BS-201"],
      "03:30PM-04:30PM": ["ES-101"],
      "04:30PM-05:30PM": ["BS-201 T (G3+G4)", "Library (G1+G2)"]
    },
    "Friday": {
      "9:30AM-10:30AM": ["BS-102 P G4 (AK)", "ES-101 P G3", "ES-102 P G1", "ES-103 P G2"],
      "10:30AM-11:30AM": ["CC-101"],
      "11:30AM-12:30PM": ["BS-102"],
      "12:30PM-01:30PM": [],
      "01:30PM-02:30PM": ["BS-102"],
      "02:30PM-03:30PM": ["BS-102"],
      "03:30PM-04:30PM": ["BS-201 T (G1+G2)", "Library (G3+G4)"],
      "04:30PM-05:30PM": ["Library"]
    }
  };

  let today = document.querySelector("#day");
  function updateTime() {
    let time = document.querySelector("#Time");
    let date = new Date();
    let dayIndex = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let session = "AM";

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dayIndex];

    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      hours = hours - 12;
      session = "PM";
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    time.innerHTML = hours + ":" + minutes + ":" + seconds + " " + session;
    today.innerHTML = day;

    let runningClass = document.querySelector("#running_class");
    if (runningClass) {
      const currentClass = getClassAtTime(day, hours + ":" + minutes + " " + session);
      runningClass.innerHTML = Array.isArray(currentClass) && currentClass.length > 0 ? currentClass.join(", ") : "No class running";
    }
  
  function getClassAtTime(day, time) {
    const daySchedule = timetable[day];
    if (!daySchedule) return null;
  
    for (const [timeRange, classes] of Object.entries(daySchedule)) {
      const [startTime, endTime] = timeRange.split("-");
      const start = new Date(`1970-01-01T${convertTo24Hour(startTime)}`);
      const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}`);
      const current = new Date(`1970-01-01T${convertTo24Hour(time)}`);
  
      if (current >= start && current <= end) {
        return classes;
      }
    }
    return "No any class is running";
  }
  
  function convertTo24Hour(time) {
    const [hours, minutes] = time.slice(0, -2).split(":");
    const period = time.slice(-2);
    let hour = parseInt(hours, 10);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  }
  
  // Example usage:
  const currentDay = day; // Replace with dynamic day if needed
  const currentTime = hours + ":" + minutes; // Replace with dynamic time if needed
  const currentClass = getClassAtTime(currentDay, currentTime);
  runningClass.innerHTML = currentClass;
  }

  setInterval(updateTime, 1000);
  updateTime();