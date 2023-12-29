import './App.css';
import React, {useState, useEffect} from 'react';
import vmo_data from "./static/wmo.json"
import {Button} from '@mui/material';

import HourlyWeather from './components/HourlyWeather';
import TodayWeather from './components/TodayWeather';
import DailyWeather from './components/DailyWeather';
import UserSetting from './components/UserSetting';
import ChatGPT from './components/ChatGPTModal';
import {processMessageToChatGPT} from './api/fetchChatGPTAPI';
import {fetchWeatherData} from './api/fetchWeatherData';
import {Grid, Container, Box} from '@mui/material';

function App() {
    const [todayWeather,
        setTodayWeather] = useState({});
    const [dailyWeather,
        setDailyWeather] = useState([]);
    const [hourlyWeather,
        setHourlyWeather] = useState([]);
    const [didFetch,
        setDidFetch] = useState(false);
    const [modalIsOpen,
        setIsOpen] = useState(false);
    const [userSetting,
        setUserSetting] = useState({});
    const [chatGPTModalIsOpen,
        setChatGPTModalIsOpen] = useState(false);
    const [message,
        setMessages] = useState('provide your personal data in user setting and press generate to start');

    const getChatGPTRequest = async() => {
        try {
            setMessages('loading...');
            const response = await processMessageToChatGPT(JSON.stringify(userSetting), JSON.stringify(todayWeather));
            const content = response.choices[0].message.content;
            if (content) {
                setMessages(content);
            }
        } catch (error) {
            console.error("Error processing message:", error);
        }
    }

    const setWeatherData = async(setting) => {
        try {
            const lat = setting.lat || 35.689444444;
            const lon = setting.lon || 139.691666666;
            const data = await fetchWeatherData(lat, lon);
            setTodayWeather({
                'city': setting.city || 'Tokyo, JP',
                'time': data.daily.time[0],
                'condition': vmo_data[data.daily.weather_code[0]].day.description,
                'image': vmo_data[data.daily.weather_code[0]].day.image,
                'precipitation_probability': data.daily.precipitation_probability_mean[0],
                'wind_speed_max': data.daily.wind_speed_10m_max[0],
                'temperature_max': data.daily.temperature_2m_max[0],
                'temperature_min': data.daily.temperature_2m_min[0]
            });

            const hourlyData = [];
            for (let i = 0; i < 24; i++) {
                let time = data.hourly.time[i];
                let temperature = data.hourly.temperature_2m[i];
                hourlyData.push({'time': time, 'temperature': temperature});
            }
            setHourlyWeather(hourlyData);

            const dailyData = []
            for (let i = 1; i < 5; i++) {
                dailyData.push({
                    'time': data.daily.time[i],
                    'image': vmo_data[data.daily.weather_code[i]].day.image
                });
            }
            setDailyWeather(dailyData);
        } catch (error) {
            console.error("Error processing message:", error);
        }
    }

    const refreshUserSetting = (settingData) => {
        setWeatherData(settingData);
        setUserSetting(settingData);
    }

    useEffect(() => {
        if (!didFetch) {
            setWeatherData(userSetting);
            setDidFetch(true);
        }
    }, []);

    return (
        <div className="App">
            <main>
                <Container
                  style={{
                      height:'100%',
                      width:'50vw',
                    }}
                    container
                  >
                    <Grid
                        item
                        md={12}
                        style={{
                        marginTop: '30px'
                    }}>
                        <Button
                            onClick={() => {
                            setIsOpen(true)
                        }}>User Setting</Button>
                        <Button
                            onClick={() => {
                            setChatGPTModalIsOpen(true)
                        }}>ChatGPT</Button>
                    </Grid>
                    <Grid item md={9}>
                        <UserSetting
                            modalIsOpen={modalIsOpen}
                            openModal={() => setIsOpen(true)}
                            closeModal={() => setIsOpen(false)}
                            afterOpenModal={() => {}}
                            refreshUserSetting={refreshUserSetting}/>
                        <ChatGPT
                            modalIsOpen={chatGPTModalIsOpen}
                            openModal={() => setChatGPTModalIsOpen(true)}
                            closeModal={() => setChatGPTModalIsOpen(false)}
                            afterOpenModal={() => {}}
                            message={message}
                            getChatGPTMessage={getChatGPTRequest}/>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TodayWeather todayWeather={todayWeather}/>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <DailyWeather dailyWeather={dailyWeather}/>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <HourlyWeather hourlyWeather={hourlyWeather}/>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default App;
