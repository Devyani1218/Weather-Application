
import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { Api_url,geoApiOptions } from "../../api"



const Search=({onSearchchange} ) => {

    const [search, setSearch] = useState(null)


    const handleonchange=(searchData)=>{
        setSearch(searchData)
        onSearchchange(searchData)

    }
    const loadOptions = (inputValue) => {
        return fetch(
          `${Api_url}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
          geoApiOptions
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
                };
              }),
            };
          });
      };

      
        return(
            <AsyncPaginate 
                placeholder="Search the city"
                debounceTimeout={600}
                value={search}
                onChange={handleonchange}
                loadOptions={loadOptions}

            />
            
            
            
            )
}

export default Search;