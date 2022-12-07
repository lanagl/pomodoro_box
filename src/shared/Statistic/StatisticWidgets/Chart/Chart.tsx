import React, {useEffect, useState} from 'react';
import styles from './chart.module.css';
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {useStores} from "../../../../store/use-stores";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function Chart() {
    const {taskListStore} = useStores()
    const [dataset, setDataset] = useState<Array<ITaskItem>>([]);

    useEffect(() => {
        setDataset(taskListStore.finishedList)
    }, [taskListStore.finishedList]);

    const data = {
        labels,
        datasets: [
            {
                data: [10, 14, 15, 55, 44, 0, 0],
                backgroundColor: 'rgba(234, 137, 121, 1)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },
        ],
    };
    return (
        <div className={styles.chart}>
            <Bar options={options} data={data}/>
        </div>
    );
}