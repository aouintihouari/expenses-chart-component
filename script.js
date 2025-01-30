const ctx = document.getElementById("weekChart");

const weekChartData = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", async () => {
  const weekData = await weekChartData();
  const maxAmount = Math.max(...weekData.map((data) => data.amount));

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: weekData.map((data) => data.day),
      datasets: [
        {
          data: weekData.map((data) => data.amount),
          backgroundColor: weekData.map((data) =>
            data.amount === maxAmount ? "#76b5bc" : "#ec775f"
          ),
          borderRadius: 3,
          borderSkipped: false,
          barThickness: 35,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
          ticks: {
            color: "#382314",
          },
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#382314",
          titleColor: "white",
          bodyColor: "white",
          displayColors: false,
          callbacks: {
            title: () => "",
            label: (context) => `$${context.raw}`,
          },
        },
      },
      onHover: (event, chartElement) => {
        if (chartElement.length > 0)
          event.native.target.style.cursor = "pointer";
        else event.native.target.style.cursor = "default";
      },
    },
  });
});
