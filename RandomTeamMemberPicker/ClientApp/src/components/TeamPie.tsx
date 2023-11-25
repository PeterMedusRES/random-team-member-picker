import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import colors from "tailwindcss/colors";

ChartJS.register(Colors, ArcElement, ChartDataLabels);

const pieColors = [
  colors.blue[400],
  colors.red[400],
  colors.orange[400],
  colors.yellow[400],
  colors.teal[400],
  colors.violet[400],
  colors.green[400],
  colors.fuchsia[400],
  colors.pink[400],
  colors.slate[400],
];

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
        backgroundColor: probabilities.map(
          (_, i) => pieColors[i % pieColors.length],
        ),
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    animation: {
      animateRotate: false,
    },
    plugins: {
      datalabels: {
        formatter: (value, context: Context) => {
          const name = context.chart.data.labels![context.dataIndex] as string;
          const percentage = Intl.NumberFormat(undefined, {
            maximumFractionDigits: 0,
          }).format(value * 100);

          return `${name}: ${percentage}%`;
        },
        backgroundColor: colors.white,
        color: colors.slate[900],
        borderRadius: 4,
        font: {
          size: 12,
          family: "system-ui",
          weight: "normal",
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default TeamPie;
