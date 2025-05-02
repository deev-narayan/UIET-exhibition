let menu = document.querySelector("#hamburgicon");
let rutein = document.querySelector("#timetablefortoday");
menu.addEventListener("click", () => {
  if(document.querySelector("#side-menu").style.display === "flex") {
    document.querySelector("#side-menu").style.display = "none";
    menu.classList.add("ri-menu-2-line");
    menu.classList.remove("ri-close-large-line");
  }else{
    menu.classList.remove("ri-menu-2-line");
    menu.classList.add("ri-close-large-line");
    document.querySelector("#side-menu").style.display = "flex";
  }
});

const xValues = ["Present", "Absent"];
  const yValues = [79, 21];
  const barColors = [
    "#50C878",
    "#145239",
  ];

  const chart = new Chart("present", {
    type: "pie",
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
      cutoutPercentage: 70 ,
      legend: {
        display: false
      }
    }
  });


  
  var xValue = ["ES-101", "BS-102", "BS-201", "MNC-101", "HSMC-101"];
  var yValue = [90, 85, 76, 98, 65, 0];
  var barColor = ["#145239", "#1F6B4D","#2E8B57","#3FA26D","#50C878"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValue,
      datasets: [{
        label: "subject wise attendance",
        backgroundColor: barColor,
        data: yValue
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: 'red' // This will change the legend (label) color
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white' // Optional: X-axis label color
          }
        },
        y: {
          ticks: {
            color: 'white' // Optional: Y-axis label color
          }
        }
      }
    }

  });

  //for date and time
  const timetable = {
    "Monday": {
      "09:30-10:30": ["MNC-101", "UIET-002"],
      "10:30-12:30": ["BS-102 P G1 (RS)", "ES-101 P G2 (SS)", "ES-102 P G3", "ES-103 P G4"],
      "12:30-13:30": ["HSMC-101"],
      "13:30-14:30": ["Lunch"],
      "14:30-15:30": ["BS-102"],
      "15:30-16:30": ["BS-201"],
      "16:30-17:30": ["BS-102 T (AK) (G3+G4)", "Library (G1+G2)"]
    },
    "Tuesday": {
      "09:30-10:30": ["MNC-101", "UIET-002"],
      "10:30-11:30": ["HSMC-101"],
      "11:30-13:30": ["BS-102 P G2 (RS)", "ES-101 P G1 (SS)", "ES-102 P G4", "ES-103 P G3"],
      "13:30-14:30": ["Lunch"],
      "14:30-15:30": ["BS-102"],
      "15:30-16:30": ["BS-201"],
      "16:30-17:30": ["ES-101"]
    },
    "Wednesday": {
      "09:30-10:30": ["BS-201", "UIET-002"],
      "10:30-11:30": ["HSMC-101"],
      "11:30-13:30": ["BS-102 P G3 (AK)", "ES-101 P G4", "ES-102 P G2", "ES-103 P G1"],
      "13:30-14:30": ["Lunch"],
      "14:30-15:30": ["CC-101"],
      "15:30-16:30": ["ES-101"],
      "16:30-17:30": ["ES-101 T (G3+G4)", "Library (G1+G2)"]
    },
    "Thursday": {
      "09:30-10:30": ["BS-102 T (G1+G2) (AK)", "Library (G3+G4)", "UIET-002"],
      "10:30-11:30": ["HSMC-101"],
      "11:30-12:30": ["ES-101"],
      "12:30-13:30": ["ES-101 T (G1+G2)", "Library (G3+G4)"],
      "13:30-14:30": ["Lunch"],
      "14:30-15:30": ["BS-201"],
      "15:30-16:30": ["ES-101"],
      "16:30-17:30": ["BS-201 T (G3+G4)", "Library (G1+G2)"]
    },
    "Friday": {
      "09:30-11:30": ["BS-102 P G4 (AK)", "ES-101 P G3", "ES-102 P G1", "ES-103 P G2"],
      "11:30-12:30": ["CC-101"],
      "12:30-13:30": ["BS-102"],
      "13:30-14:30": ["Lunch"],
      "14:30-15:30": ["BS-102"],
      "15:30-16:30": ["BS-201 T (G1+G2)", "Library (G3+G4)"],
      "16:30-17:30": ["Library"]
    }
  };

  function generateTimetableForDay(day) {
    const daySchedule = timetable[day];
    if (!daySchedule) {
      rutein.innerHTML = `<p>No timetable available for ${day}</p>`;
      return;
    }

    let timetableHTML = `<h3>Timetable for ${day}</h3><table>`;
    timetableHTML += `<tr><th>Time Slot</th><th>Classes</th></tr>`;
    console.log(daySchedule);
  
    for (const [timeSlot, classes] of Object.entries(daySchedule)) {
      timetableHTML += `<tr><td>${timeSlot}</td><td>${classes.length > 0 ? classes.join(", ") : "Free"}</td></tr>`;
    }

    timetableHTML += `</table>`;
    rutein.innerHTML = timetableHTML;
  }

  const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
  generateTimetableForDay(currentDay);

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
    function getClassAtTime(day, time24) {
      const todaySchedule = timetable[day];
      if (!todaySchedule) return [];
      const times = Object.keys(todaySchedule);
      for (let i = 0; i < times.length; i++) {
        const [startHour, startMinute] = times[i].split("-")[0].split(":").map(Number);
        const [endHour, endMinute] = times[i].split("-")[1].split(":").map(Number);
        const [currentHour, currentMinute] = time24.split(":").map(Number);

        const isAfterStart = currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute);
        const isBeforeEnd = currentHour < endHour || (currentHour === endHour && currentMinute < endMinute);

        if (isAfterStart && isBeforeEnd) {
          return todaySchedule[times[i]];
        }
      }
      return [];
    }
    
    // Example DOM interaction
    hours = new Date().getHours().toString().padStart(2, "0");
    minutes = new Date().getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    // HTML element
    if (runningClass) {
      const currentClass = getClassAtTime(day, currentTime);
      runningClass.innerHTML = Array.isArray(currentClass) && currentClass.length > 0
        ? currentClass.join(", ")
        : "No class running";
    }
  }

  setInterval(updateTime, 1000);
  updateTime();

  // if(navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // }
  // else {
  //   alert("Geolocation is not supported by this browser.");
  // } 
  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var location = lat + "," + lon;
    document.getElementById("location").innerHTML = "Location: " + location;     // Here you can send the location to your server or use it as needed
  }

  function markattendence() {
   
  }
markattendence();