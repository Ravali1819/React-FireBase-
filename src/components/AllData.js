import { Fragment, useEffect, useState } from "react";

const AllData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://react-practice-d43ec-default-rtdb.firebaseio.com/add-data.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((output) => {
        const data = [];
        for (const key in output) {
          const data1 = { key, ...output[key] };
          data.push(data1);
        }
        setData(data);
        setLoading(false);
      });
  }, []);

  const allData = data.map((dat) => (
    <div className="main_cards" key={dat._id}>
      <div>
        <h1>Name: {dat.EnteredName}</h1>
      </div>
      <div>
        <h3>Price: {dat.EnteredPrice}</h3>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className="all_cards">{allData}</div>
    </Fragment>
  );
};

export default AllData;
