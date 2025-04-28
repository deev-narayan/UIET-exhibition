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
  var barColor = ["#145239", "#1F6B4D","#2E8B57","#3FA26D","50C878"];

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