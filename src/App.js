import React from 'react';

import {Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css';
import covidImage from './images/titleImg.png';

import {fetchData} from './API'
//When we have imports from index file we dont need to specify api/index bcz it directly searches for the index file

class App extends React.Component {

    state ={
        //initially data is empty
        data: {},
        country: '',
    }

    //ComponentDidMount() : As the name suggests, after all the elements of the page is rendered correctly, this method is called.
    async componentDidMount()
    {
        const fetchedData = await fetchData();

        ///Here we are setting the populated data to state --> Universal Storage place
       this.setState({data: fetchedData});

    }
    //Capture country change method
    handleCountryChange = async (country) => {
        //fetch the data
        const fetchedData = await fetchData(country);
        //Set the state
        this.setState({data: fetchedData, country: country });
    }

    render() {
        //demistify data from state above
        const { data, country } = this.state

        return(
            <div className={styles.container}>
                <img className={styles.image} src={covidImage} alt="COVID-19" />
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;