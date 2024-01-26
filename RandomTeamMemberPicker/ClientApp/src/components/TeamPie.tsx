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
import { useTheme, type DisplayTheme } from "~/components/ThemeProvider";

ChartJS.register(Colors, ArcElement, ChartDataLabels);

const calculatePieColors = (displayTheme: DisplayTheme) => {
  const sliceShade = displayTheme === "light" ? 400 : 600;
  const backgroundColor = colors.white;
  const foregroundColor = colors.slate[950];
  const borderColor =
    displayTheme === "light" ? colors.white : colors.slate[50];

  return {
    arc: {
      borderColor: borderColor,
    },
    label: {
      color: foregroundColor,
      backgroundColor: backgroundColor,
    },
    slices: [
      colors.blue[sliceShade],
      colors.red[sliceShade],
      colors.orange[sliceShade],
      colors.yellow[sliceShade],
      colors.teal[sliceShade],
      colors.violet[sliceShade],
      colors.green[sliceShade],
      colors.fuchsia[sliceShade],
      colors.pink[sliceShade],
      colors.slate[sliceShade],
    ],
  };
};

type MemberProbability = {
  name: string;
  probability: number;
};

const TeamPie = ({ probabilities }: { probabilities: MemberProbability[] }) => {
  const { displayTheme } = useTheme();
  const pieColors = calculatePieColors(displayTheme);

  const data: ChartData<"pie"> = {
    labels: probabilities.map((member) => member.name),
    datasets: [
      {
        data: probabilities.map((member) => member.probability),
        backgroundColor: probabilities.map((_, i) => {
          const sliceColors = pieColors.slices;
          return sliceColors[i % sliceColors.length];
        }),
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    animation: {
      animateRotate: false,
    },
    animations: {
      colors: {
        properties: [],
      },
    },
    elements: {
      arc: {
        borderColor: pieColors.arc.borderColor,
      },
    },
    plugins: {
      datalabels: {
        formatter: (value: number, context: Context) => {
          const name = context.chart.data.labels![context.dataIndex] as string;
          const percentage = Intl.NumberFormat(undefined, {
            maximumFractionDigits: 0,
          }).format(value * 100);

          return `${name}: ${percentage}%`;
        },
        color: pieColors.label.color,
        backgroundColor: pieColors.label.backgroundColor,
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
