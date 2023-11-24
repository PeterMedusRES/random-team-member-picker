import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(Colors, ArcElement, ChartDataLabels);

type MemberProbability = {
  name: string;
  probability: number;
};

const TeamPie = ({ probabilities }: { probabilities: MemberProbability[] }) => {
  const data: ChartData<"pie"> = {
    labels: probabilities.map((member) => member.name),
    datasets: [
      {
        data: probabilities.map((member) => member.probability),
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      datalabels: {
        formatter: (value, context: Context) => {
          const name = context.chart.data.labels![context.dataIndex] as string;
          const percentage = Intl.NumberFormat(undefined, {
            maximumFractionDigits: 0,
          }).format(value * 100);

          return `${name}: ${percentage}%`;
        },
        backgroundColor: "white",
        borderRadius: 5,
        font: {
          size: 13,
          family: "system-ui",
          weight: "normal",
        },
      },
    },
  };

  return (
    <div className="aspect-square w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default TeamPie;
