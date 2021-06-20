import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";

function App() {
  const [{ data, loading, error }, refetch] = useAxios("https://api.publicapis.org/categories");
  const [items, setItem] = useState([]);
  const [txtFilter , setTxtFilter] = useState('')
  const [showData , setShowdata ] = useState([])

  useEffect(() => {
    setItem(data)
    setShowdata(data);
  }, [data])

  useEffect(() => {
    if(txtFilter !== '') {
      let regString = `${txtFilter}`;
      let regexp = new RegExp(regString, "i");
      const result = items.filter((r) => {
        if (regexp.test(r)) return r;
      });
      setShowdata(result);
    } else {
      setShowdata(items);
    }
  }, [txtFilter]);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={txtFilter}
          onChange={(e) => {
            setTxtFilter(e.target.value);
          }}
        />
      </div>
      <table style = {{paddingTop : '10px'}}>
        {showData ? showData.map((val) =>
        <tbody><div style={{border: '1px solid #dddddd' , width :'15rem'}} key={val}> {val}</div></tbody>) : null}
      </table>
    </div>
  );
}

export default App;
