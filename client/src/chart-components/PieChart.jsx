import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

function PieChart({ param1, param2, lebel }) {
  Chart.register(...registerables);

  const colors = [
    "#ffe04c", // Blue
    "#ff864c",
    "#204368",
    "#5de7fd",
    "#f94e4e",
  ]

  const data = {
    labels: param1,
    datasets: [
      {
        label: lebel,
        data: param2,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRation: 2,
    plugins: {
      title: {
        display: true,
        text: "",
        font: {
          size: 20,
        },
      },
      legend: {
        display: false,
        position: "right",
      },
      tooltip: {
        mode: "index",
        intersect: true,
      },
    },
    scales: {
      x: {
        display: false,
        title: {
          display: false,
          text: "Year",
        },
      },
      y: {
        display: false,
        title: {
          display: false,
          text: "Intensity",
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    elements: {
      point: {
        radius: 5,
        borderWidth: 7,
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      line: {
        tension: 0.4,
        borderWidth: 6,
        borderColor: "#0E46A3",
        backgroundColor: "#0E46A3",
      },
    },
  };

  return (
    <div>
      <div className="flex justify-center gap-3 mt-10">
        {param1.map((e, index) => {
          return (
            <section key={index} className="flex justify-center items-center gap-1">
              <div className={`w-[10px] h-[10px] rounded-full`} style={{backgroundColor: `${colors[index]}`}}></div>
              <p className="opacity-70 text-[14px]">{e}</p>
            </section>
          );
        })}
      </div>
      <Pie data={data} options={options} />
    </div>
  );
}

//${colors[index]}

export default PieChart;
