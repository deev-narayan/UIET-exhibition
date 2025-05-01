const xValues = [
  "monday",
  "tuesday",
  "monday",
  "monday",
  "monday",
  "monday",
  "tuesday",
  "monday",
  "monday",
  "monday",
  "tuesday",
  "monday",
  "tuesday",
  "monday",
  "monday",
];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: "Class A",
        data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
        borderColor: "red",
        fill: false,
      },
      {
        label: "Class A",
        data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Class A",
        data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Class A",
        data: [860, 110, 1060, 1060, 170, 1110, 130, 2210, 780, 2478],
        borderColor: "#256256",
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: false },
  },
});
