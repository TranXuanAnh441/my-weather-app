import React, {useState} from 'react';
import Modal from 'react-modal';
import {AsyncPaginate} from 'react-select-async-paginate';
import {Button, TextField} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { fetchCities } from '../api/fetchGeo';

const loadOptions = async(inputValue) => {
    const citiesList = await fetchCities(inputValue);
    return {
        options: citiesList
            .data
            .map((city) => {
                return {lat: city.latitude, lon: city.longitude, label: `${city.name}, ${city.countryCode}`};
            })
    };
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '50vw',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const UserSetting = (props) => {
    Modal.setAppElement('#root');
    const [citySearchValue,
        setSearchValue] = useState({lat: 35.689444444, lon: 139.691666666, label: 'Tokyo, JP'});
    const [age,
        setAge] = useState(22);
    const [health,
        setHealth] = useState('');
    const [transportation,
        setTransportation] = useState('');
    const [activities,
        setActivities] = useState('');

    const submitModal = (e) => {
        e.preventDefault();
        props.refreshUserSetting({
            'activities': activities,
            'health': health,
            'age': age,
            'transportation': transportation,
            'lat': citySearchValue.lat,
            'lon': citySearchValue.lon,
            'city': citySearchValue.label
        });
        props.closeModal();
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onAfterOpen={props.afterOpenModal}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="User Setting Modal">
            <IconButton onClick={props.closeModal} style={{float: 'right'}}>
                <CloseIcon/>
            </IconButton>
            <form
                onSubmit={submitModal}
                style={{
                m: 1,
                width: '100%'
            }}>
                <InputLabel id="citySearch">Name</InputLabel>
                <AsyncPaginate
                    id="citySearch"
                    placeholder="Search for cities"
                    debounceTimeout={600}
                    value={citySearchValue}
                    onChange={(enteredData) => setSearchValue(enteredData)}
                    loadOptions={loadOptions}/>
                <InputLabel id="age">Age</InputLabel>
                <TextField
                    id="age"
                    variant="outlined"
                    type="number"
                    name="age"
                    value={age}
                    fullWidth
                    onChange={(event) => {
                    setAge(event.target.value)
                }}/>
                <InputLabel id="health">Health</InputLabel>
                <TextField
                    id="health"
                    variant="outlined"
                    name="health"
                    placeholder='any health problem you have ?'
                    value={health}
                    onChange={(event) => {
                    setHealth(event.target.value)
                }}
                    fullWidth/>
                <InputLabel id="transportation">Transportation</InputLabel>
                <Select
                    labelId="transportation"
                    id="transportation"
                    value={transportation}
                    label="Transportation"
                    onChange={(event) => {
                    setTransportation(event.target.value)
                }}
                    fullWidth>
                    <MenuItem value={'public(bus, train)'}>public (bus, train)</MenuItem>
                    <MenuItem value={'driving(car)'}>driving(car)</MenuItem>
                    <MenuItem value={'outdoor(walk, bicycle)'}>outdoor(walk, bicycle)</MenuItem>
                </Select>
                <InputLabel id="activities">Activities</InputLabel>
                <Select
                    labelId="activities"
                    id="activities"
                    value={activities}
                    label="Activities"
                    onChange={(event) => {
                    setActivities(event.target.value)
                }}
                    fullWidth>
                    <MenuItem value={'indoor'}>indoor</MenuItem>
                    <MenuItem value={'outdoor'}>outdoor</MenuItem>
                    <MenuItem value={'hybrid(both indoor and outdoor)'}>hybrid(both indoor and outdoor)</MenuItem>
                </Select>
                <Button
                    variant="contained"
                    type='submit'
                    sx={{
                    marginTop: 3
                }}>Submit</Button>
            </form>
        </Modal>
    )
}
export default UserSetting;