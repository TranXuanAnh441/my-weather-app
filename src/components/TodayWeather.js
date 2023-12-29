import React from 'react';
import {Grid} from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

const TodayWeather = (props) => {
    const todayWeather = props.todayWeather;
    return (
        <Grid container spacing={0}>
            <Grid item md={6} xs={12}>
                <h1>{todayWeather.city}</h1>
                <h5>{todayWeather.time}</h5>
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
                style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div>
                    <ThermostatIcon style={{display:'inline'}}/>
                    <p style={{display:'inline'}}>{todayWeather.condition}: {todayWeather.temperature_min}°C - {todayWeather.temperature_max}°C</p>
                </div>
                <div>
                    <FilterDramaIcon style={{display:'inline'}}/>
                    <p style={{display:'inline'}}>Precipitation: {todayWeather.precipitation_probability}%</p>
                </div>
                <div>
                    <AirIcon style={{display:'inline'}}/>
                    <p style={{display:'inline'}}>Wind Speed: {todayWeather.wind_speed_max}km/h</p>
                </div>
            </Grid>
        </Grid>
    )
}
export default TodayWeather;