import React, {useEffect, useRef, useState} from 'react';
import styles from './chart.module.css';
import {Bar} from "react-chartjs-2";
import {useStores} from "../../../../store/use-stores";
import {observer} from "mobx-react-lite";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';

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
    plugins: {},
};

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const Chart = observer(() => {
    const {taskListStore, statisticStore} = useStores()
    const [dataset, setDataset] = useState<Array<ITaskItem>>([]);
    const chartRef = useRef(null)

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
    const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (chartRef.current) {
            //statisticStore.setCurrentDayOfWeek(chartRef.current)
        }
    }

    return (
        <div className={styles.chart}>
            <Bar
                options={options}
                data={data}
                ref={chartRef}
                onClick={onClick}
            />
        </div>
    );
})