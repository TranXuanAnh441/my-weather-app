import React from 'react';
import {Grid} from '@mui/material';

const DailyWeather = (props) => {
    const dailyWeather = props.dailyWeather;

    return (
        <React.Fragment>
            <Grid container spacing={2} style={{margin:'15px'}}>
                {dailyWeather.map((item, key) => {
                    return <Grid
                        item
                        md={3}
                        xs={6}
                        sx={{ border: 0.3, borderColor: 'white' }} 
                        style={{
                        fontSize:'13px',
                    }}>
                        <img src={item.image}/>
                        <p>{item.time}</p>
                    </Grid>
                })}
            </Grid>
        </React.Fragment>
    )
}
export default DailyWeather;