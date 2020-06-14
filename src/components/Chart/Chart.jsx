import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../API';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data, country }) => {
    //useState is a Hook that allows you to have state variables in functional components.
    //useEffect is a hook for encapsulating code that has 'side effects,' and is like a combination of componentDidMount , componentDidUpdate , and componentWillUnmount

    const [dailyData, setDailyData] = useState([]);
   //1st dailyData = state Variable
   //2nd setDailyData = state method
   useEffect(() => {
       const fetchAPI = async () => {
           setDailyData(await fetchDailyData());
       }

       fetchAPI();
   }, []);

   const lineChart = (
       //If 1st day of daily data is availabe then show it
       //If not available then show null
    dailyData.length //if some number comes then 1st part executed else null
    ? (
        //Line Graph
        <Line
        data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
            }, {
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
            }],
        }}
        />) : null
   );

   const barChart = (
       data.confirmed
       ? (
           <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(50,205,50, 0.5)',
                        'rgba(255, 0, 0, 0.5)',

                    ],
                    data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                }]
            }}
            options={{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country}`},
            }}
           />
       ) : null
   );

   //If there is country show barChart else show lineChart
    return(
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}

export default Chart;