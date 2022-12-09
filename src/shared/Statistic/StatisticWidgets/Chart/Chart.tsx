import React, {useEffect, useRef} from 'react';
import styles from './chart.module.css';
import {Bar, getElementAtEvent} from "react-chartjs-2";
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
    const {statisticStore} = useStores()
    const chartRef = useRef(null)

    useEffect(() => {
        statisticStore.setCurrentPeriod(statisticStore.currentPeriod)
    }, [statisticStore.currentPeriod]);


    const data = {
        labels,
        datasets: [
            {
                data: statisticStore.statisticWeekList,
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
            const element = getElementAtEvent(chartRef.current, event)
            statisticStore.setCurrentDayOfWeek(element[0].index)
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