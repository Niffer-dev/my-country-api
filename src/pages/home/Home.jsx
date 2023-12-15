import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    const [allCountries, setAllCountries] = useState()
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("Filter By Region")
    const [openDropDown, setOpenDropDown] = useState(false)
    const regionsArray = ["All","Africa", "America", "Asia", "Europe", "Oceania"]
    
    async function getCountries (){
        setLoading(true)
        const link = `https://restcountries.com/v3.1/all`
        const response = await fetch (link, {
            method:"GET"
        })
        if(response) setLoading(false)
        const data = await response.json()
        setAllCountries(data)
        console.log(data)
    }

    useEffect(() =>{
        getCountries()
    },[])
    console.log(searchText)

    async function getCountriesByRegion(region){
        setOpenDropDown(false)
        setSelectedRegion(region);
        setLoading(true)
        if(region === "All"){
            getCountries()
        }else{
            const link = `https://restcountries.com/v3.1/region/${region}`
            const response = await fetch (link, {
                method:"GET"
            })
            if(response) setLoading(false)
            const data = await response.json()
            setAllCountries(data)
            console.log(data)
        }
    }

  return (
    <section className='home'>
        <div className='home1'>
            <input type="text" onChange={e => setSearchText(e.target.value)} placeholder='search for a country...' />
            <div style={{ display:"flex", width:"170px", justifyContent:"space-between", border:"1px solid black", cursor:"pointer", padding:"7px" }} onClick={() => setOpenDropDown(!openDropDown)}>
                <p>{selectedRegion}</p>
                <p>V</p>
            </div>
            {openDropDown && 
                <div style={{ border:"1px solid black" }} className='drop-down'>
                    {regionsArray.map(region => (
                    <p onClick={() => getCountriesByRegion(region)} style={{ cursor:"pointer" }}>{region}</p>
                    ))}
                </div>
            }
        </div>

        {loading && <p>Loading...</p>}
        <div className='homeBody'>
            {allCountries && allCountries.filter(country => {
                if(searchText === "") return country
                else if(country.name.common.toLowerCase().includes(searchText.toLowerCase())) return country
            })
            .map((country, index) =>(
                <Link to={`/countrydetail/${country.name.common}`} key={index} className="body">
                    <img src={country.flags.svg} alt="" />
                    <div className='body-info'>
                        <p>{country.name.common}</p>
                        <p>Population: <span>{country.population}</span> </p>
                        <p>Region: <span>{country.region}</span> </p>
                        <p>Capital: <span>{country.capital}</span> </p>
                    </div>
                </Link>
            ))}
        </div>
    </section>
  )
}

export default Home