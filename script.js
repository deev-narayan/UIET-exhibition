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