import React from "react";
import "./index.css";

export default function StockData() {
  const [date, setDate] = React.useState("");
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();

  const getData = () => {
    const pattern =
      /^\d{1,2}-(January|February|March|April|May|June|July|August|September|October|November|December)-\d{4}$/i;
    if (pattern.test(date)) {
      setError();
      const api = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`;
      fetch(api)
        .then((response) => response.json())
        .then((result) => {
          if (result.data.length === 0) {
            setData(null);
          }
          setData(result.data);
        });
    } else setError("Invalid input");
  };

  const handleChange = (e) => {
    const date = e.target.value;
    setDate(date);
  };


  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          placeholder="5-January-2000"
          id="app-input"
          data-testid="app-input"
          value={date}
          onChange={handleChange}
        />
        <button
          className=""
          id="submit-button"
          data-testid="submit-button"
          onClick={getData}
        >
          Search
        </button>
      </section>
      {error && (
        <div className="layout-column align-items-center mt-50">{error}</div>
      )}
      {!error && data && data.length >= 1 && (
        <ul
          className="mt-50 slide-up-fade-in styled"
          id="stockData"
          data-testid="stock-data"
        >
          <li className="py-10">Open: {data[0].open}</li>
          <li className="py-10">Close: {data[0].close}</li>
          <li className="py-10">High: {data[0].high}</li>
          <li className="py-10">Low: {data[0].low}</li>
        </ul>
      )}
      {!error && data?.length === 0 && (
        <div
          className="mt-50 slide-up-fade-in"
          id="no-result"
          data-testid="no-result"
        >
          No Results Found
        </div>
      )}
    </div>
  );
}
