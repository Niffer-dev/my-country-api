import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const CountryDetail = () => {
    const {countryname} = useParams()
    const [countryData, setCountryData] = useState()
    const navigate = useNavigate()

    console.log(countryname);

    async function getCountryDetail(){
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryname}`)
        const data = await response.json()
        if(response.ok){
            setCountryData(data[0])
        }
        console.log(data);
    }

    useEffect(() => {
        getCountryDetail()
    },[])

  return (
    <div className='individual-country'>
        <button onClick={() => navigate('/')} className='btn'>Back</button>
        {countryData && 
        <div className='eachcountryImg'>
            <img src={countryData.flags.svg} width="50%" alt="" />
            <div>
                <h2>{countryData.name.common}</h2>
                <div>
                    <p>Rgion</p>
                    <p>{countryData.region}</p>
                </div>
                <h2>{countryData.tld}</h2>
                <h2>{countryData.subregion}</h2>
            </div>
        </div>
        }
    </div>
  )
}

export default CountryDetail