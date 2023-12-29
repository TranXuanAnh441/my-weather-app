import React from 'react';
import Chart from 'chart.js/auto';
import {Line} from "react-chartjs-2";

const HourlyWeather = (props) => {
    const timeList = props
        .hourlyWeather
        .map((item) => item.time.slice(-5));
    const temperatureList = props
        .hourlyWeather
        .map((item) => item.temperature);

    Chart.defaults.font.family = "Poppins";
    Chart.defaults.color = "#fff";

    return (
        <React.Fragment>
            <Line
                options={{
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }}
                data={{
                labels: timeList,
                datasets: [
                    {
                        label: "temperature (°C) by hour today",
                        data: temperatureList,
                        fill: true,
                        borderWidth: 4,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        responsive: true,
                    }
                ]
            }}/>
        </React.Fragment>
    )
}

export default HourlyWeather;