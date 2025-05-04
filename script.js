

let menu = document.querySelector("#hamburgicon");
let rutein = document.querySelector("#timetablefortoday");
menu.addEventListener("click", () => {
  if (document.querySelector("#side-menu").style.display === "flex") {
    document.querySelector("#side-menu").style.display = "none";
    menu.classList.add("ri-menu-2-line");
    menu.classList.remove("ri-close-large-line");
  } else {
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
    cutoutPercentage: 70,
    legend: {
      display: false
    }
  }
});



var xValue = ["ES-101", "BS-102", "BS-201", "MNC-101", "HSMC-101"];
var yValue = [90, 85, 76, 98, 65, 0];
var barColor = ["#145239", "#1F6B4D", "#2E8B57", "#3FA26D", "#50C878"];

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
  "Monday": [
    ["MNC-101", "UIET-002"],
    ["BS-102 P G1 (RS)", "ES-101 P G2 (SS)", "ES-102 P G3", "ES-103 P G4"],
    ["BS-102 P G1 (RS)", "ES-101 P G2 (SS)", "ES-102 P G3", "ES-103 P G4"],
    ["HSMC-101"],
    ["Lunch"],
    ["BS-102"],
    ["BS-201"],
    ["BS-102 T (AK) (G3+G4)", "Library (G1+G2)"]
  ],
  "Tuesday": [
    ["MNC-101", "UIET-002"],
    ["HSMC-101"],
    ["BS-102 P G2 (RS)", "ES-101 P G1 (SS)", "ES-102 P G4", "ES-103 P G3"],
    ["BS-102 P G2 (RS)", "ES-101 P G1 (SS)", "ES-102 P G4", "ES-103 P G3"],
    ["Lunch"],
    ["BS-102"],
    ["BS-201"],
    ["ES-101"]
  ],
  "Wednesday": [
    ["BS-201", "UIET-002"],
    ["HSMC-101"],
    ["BS-102 P G3 (AK)", "ES-101 P G4", "ES-102 P G2", "ES-103 P G1"],
    ["BS-102 P G3 (AK)", "ES-101 P G4", "ES-102 P G2", "ES-103 P G1"],
    ["Lunch"],
    ["CC-101"],
    ["ES-101"],
    ["ES-101 T (G3+G4)", "Library (G1+G2)"]
  ],
  "Thursday": [
    ["BS-102 T (G1+G2) (AK)", "Library (G3+G4)", "UIET-002"],
    ["HSMC-101"],
    ["ES-101"],
    ["ES-101 T (G1+G2)", "Library (G3+G4)"],
    ["Lunch"],
    ["BS-201"],
    ["ES-101"],
    ["BS-201 T (G3+G4)", "Library (G1+G2)"]
  ],
  "Friday": [
    ["BS-102 P G4 (AK)", "ES-101 P G3", "ES-102 P G1", "ES-103 P G2"],
    ["BS-102 P G4 (AK)", "ES-101 P G3", "ES-102 P G1", "ES-103 P G2"],
    ["CC-101"],
    ["BS-102"],
    ["Lunch"],
    ["BS-102"],
    ["BS-201 T (G1+G2)", "Library (G3+G4)"],
    ["Library"]
  ]
};

function generateTimetableForDay() {
  const todaysdate = new Date;
  const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let nowday = weeks[todaysdate.getDay()];
  var daySchedule = timetable[nowday];
  if (!daySchedule) {
    rutein.innerHTML = `<p>No timetable available for ${nowday}</p>`;
    return;
  }
  let timetableHTML = `<h3>Timetable for ${nowday}</h3><table>`;
  timetableHTML += `<tr><th>Timing</th><th>Classes</th></tr>`;
  console.log(daySchedule);
  const timeSlot = ["9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30"]

  for (let index = 0; index < timeSlot.length - 1; index++) {

    timetableHTML += `<tr><td>${timeSlot[index]}-${timeSlot[index + 1]} </td><td>${daySchedule[index].join(", ")}</td></tr>`;
  }


  timetableHTML += `</table>`;
  rutein.innerHTML = timetableHTML;
}

function generateTimetable() {
  const todaysdate = new Date;
  const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let nowday = weeks[todaysdate.getDay()];
  let nowmin = todaysdate.getMinutes();
  let nowhrs = todaysdate.getHours();
  let nowclass = nowmin > 30 ? nowhrs - 10 + 1 : nowhrs - 10;
  if (nowday == "Sunday" || nowday == "Saturday" || nowclass < 0 || nowclass > 7) {
    var classrunning = "No Class Running";
  } else {
    var classrunning = timetable[nowday][nowclass].join(", ");
  }
  document.getElementById("running_class").innerText = classrunning;
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(gotlocation, errorgettinglocation);
  }
}
function gotlocation(position) {
  console.log(position.coords.latitude, position.coords.longitude)
}
function errorgettinglocation(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      notification("Denied the Geolocation.", error)
      break;
    case error.POSITION_UNAVAILABLE:

      notification("Location unavailable.", error)
      break;
    case error.TIMEOUT:
      notification("Location timed out.", error)
      break;
    case error.UNKNOWN_ERROR:
      notification("An unknown error occurred.", error)
      break;
  }
}

function removethis(element) {
  element.parentElement.style = "display : none;"
}
function notification(text, type) {
  var cont = document.getElementById("notification")
  if (type == "error") {
    cont.innerHTML += ` <span class="errornotif notif"><i class="ri-error-warning-fill"></i></i><span>${text}</span><i class="ri-close-fill" onclick="removethis(this)"></i></span>`
  } else if (type =="success") {
    cont.innerHTML += ` <span class="successnotif notif"><i class="ri-checkbox-circle-fill"></i><span>${text}</span><i class="ri-close-fill" onclick="removethis(this)"></i></span>`
  } else if (type == "warning") {
    cont.innerHTML += ` <span class="warningnotif notif"><i class="ri-error-warning-fill"></i><span>${text}</span><i class="ri-close-fill" onclick="removethis(this)"></i></span>`
  }
}





function markattendence() {
  getLocation()
  fetch('http://172.21.5.77:8888/markattendence', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      studentId: '12345',
      status: 'present',
      timestamp: new Date().toISOString()
    })
  })
  .then(response => response.json())
  .then(data => {
  console.log(data);
    notification('Attendance marked successfully!', 'success');
  })
  .catch(error => {
    notification('Failed to mark attendance.', 'error');
  });
}



markattendence();
generateTimetable()
generateTimetableForDay()