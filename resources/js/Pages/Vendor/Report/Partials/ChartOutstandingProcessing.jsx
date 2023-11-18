import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function ChartOutstandingProcessing(props) {
  // console.log(props);
  const data = {
      labels: ['Reject', 'In Progress', 'Payment'],
      datasets: [
        {
          label: '# of Votes',
          data: [props.data.rejected, props.data.progress, props.data.payment],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
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