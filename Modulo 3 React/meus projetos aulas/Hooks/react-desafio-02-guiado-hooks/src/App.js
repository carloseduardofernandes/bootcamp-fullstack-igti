import React, { useEffect, useState } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [filter, setFilter] = useState('');

  //funcao chamada quando a variavel do vetor deeps(segundo parametro) mudar
  //(didupdate) ou se vazio chama 1x(didmount)
  //e caso returnar alguma funcao ele usara ao destroy do
  //object(didwillamount)
  useEffect(() => {
    const getCountriesApi = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      let allCountries = await res.json();

      allCountries = allCountries.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));

      const filteredPopulation = calculateTotalPopulationFrom(allCountries);

      setFilteredPopulation(filteredPopulation);
    };

    getCountriesApi();
  }, []);

  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  useEffect(() => {
    const filterLowerCase = filter.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = calculateTotalPopulationFrom(filteredCountries);

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  }, [allCountries, filter]);

  const handleChangeFilter = (newText) => {
    setFilter(newText);
  };

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Contries</h1>
      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
