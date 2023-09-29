import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import ChartDataLabels, { type Context } from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { type RouterOutputs } from "~/utils/api";

ChartJS.register(Colors, ArcElement, ChartDataLabels);

type Team = RouterOutputs["teams"]["getById"];

const TeamPie = ({ team }: { team: Team }) => {
  const eligibleMembers = team.members.filter(
    (member) => member.name != team.lastPicked,
  );
  const chances = calculateChances(eligibleMembers);

  const data: ChartData<"pie"> = {
    labels: eligibleMembers.map((member) => member.name),
    datasets: [
      {
        data: chances,
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

  return <Pie data={data} options={options} />;
};

const calculateChances = (members: Team["members"]) => {
  // The chance of getting picked is inversely proportional to the number of times a member was picked in the past.
  const inverseProportions = members.map(
    (member) => 1 / (member.timesPicked + 1),
  );

  // Calculate the chance as a fraction
  const denominator = inverseProportions.reduce((a, b) => a + b, 0);
  return inverseProportions.map((x) => x / denominator);
};

export default TeamPie;
