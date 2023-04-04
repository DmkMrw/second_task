import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import shortid from "shortid";

const App = () => {


  const [data, setData] = useState([]);
  const [city, setCity] = useState('');

  const appid = "b6907d289e10d714a6e88b30761fae22";
  const url = `https://samples.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${appid}`;

  //Set interval after choosen city

  useEffect(() => {
    let interval;
    if (city !== '') {
      interval = setInterval(() => {
        fetch(url)
          .then(res => res.json())
          .then(res => setData(res.list))
      }, 10000);
    }
    return () => clearInterval(interval);
    }, [city]);

  //Fetch data first time render

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => setData(res.list))
  }, [])

  const handleChangeCity = (city) => {
    setCity(city)
  }

  return (
    <>
      <div style={{textAlign:"center"}}>
        <button onClick={e => handleChangeCity(e.target.innerHTML)}>London</button>
        <button onClick={e => handleChangeCity(e.target.innerHTML)}>München</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>dt_txt</th>
            <th>humidity</th>
            <th>temp</th>
          </tr>
        </thead>
        <tbody>
              {data.map((e) => (
                <tr>
                  <td key={shortid()}>({e.dt_txt})</td>
                  <td key={shortid()}>({e.main.humidity})</td>
                  <td key={shortid()}>({e.main.temp})</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;