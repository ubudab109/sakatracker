import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartOutstandingPercentage(props) {
    // console.log(props);
    const data = {
      labels: ['On Time', 'Late'],
      datasets: [
        {
          label: '# of Votes',
          data: [props.data.on_time, props.data.late],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
        <div className="p-3" style={{width: '300px',}}>
            <Doughnut data={data} />
        </div>
    );
}