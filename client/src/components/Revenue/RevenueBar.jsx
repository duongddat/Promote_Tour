import { defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function RevenueBar({
  type = "bar",
  label,
  data,
  backgroundColor,
  borderColor,
  borderWidth,
  title,
  text,
  xTitle,
  yTitle,
}) {
  const chartData = {
    labels: label,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        borderRadius: 5,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        text: text,
      },
    },
    aspectRatio: 2,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: xTitle,
        },
      },
      x: {
        title: {
          display: true,
          text: yTitle,
        },
      },
    },
  };

  return (
    <>
      {type === "bar" && <Bar data={chartData} options={chartOptions} />}
      {type === "line" && <Line data={chartData} options={chartOptions} />}
    </>
  );
}

export default RevenueBar;
