import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

//To create an async function: all we need to do is add the async keyword
//before the function definition, like this:
//await: while fetching data it pauses the function execution and resume after the data comes in

//https://scotch.io/tutorials/asynchronous-javascript-using-async-await

//Cards Data
export const fetchData = async (country) => {
    //Change the data as soon as we select some country dynamically
    let changeableUrl = url;

    //If specific country is selected then change
    if(country){
        changeableUrl = `${url}/countries/${country}`
    }

    try{
        //destructure data from api
        const {data} = await axios.get(changeableUrl);

        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        return modifiedData;

    }catch(error){
        console.log(error);

    }
}

//Chart Data
//In url to got to the second part i.e daily report we use this code syntax --> `${url}/daily`
export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);

        //A Map object iterates its elements in insertion order
        const modifiedData = data.map((dailyData)=> ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))

        return modifiedData;

    }catch(error){

    }
}

//Country Picker
export const fetchCountries = async () => {
    try{
        const {data : { countries }} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);

    }catch(error){
        console.log(error);

    }
}