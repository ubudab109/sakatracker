import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartOverdue(props) {
  const labels = [props.month];

  const data = {
    labels,
    datasets: [
      {
        label: '0 - 30',
        data: labels.map(() => props.data.overdue_0_30),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '30 - 60',
        data: labels.map(() => props.data.overdue_30_60),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
    // console.log(props);
    return (
        <div className="p-3" style={{width: '400px',}}>
            <Bar data={data} />
        </div>
    );
}