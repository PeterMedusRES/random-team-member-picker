import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  Tooltip,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(Colors, ArcElement, Tooltip, ChartDataLabels);

const TeamPie = () => {
  const data: ChartData<"pie"> = {
    labels: ["Peter", "Kieran", "Eddie", "Juan", "Callum"],
    datasets: [
      {
        label: "Chance of getting picked",
        data: [1, 2, 3, 4, 5],
      },
    ],
  };

  const options: ChartOptions = {
    plugins: {
      datalabels: {
        formatter: (_value, context: Context) => {
          const label = context.chart.data.labels![context.dataIndex] as string;
          return label;
        },
        backgroundColor: "white",
        borderRadius: 5,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default TeamPie;
