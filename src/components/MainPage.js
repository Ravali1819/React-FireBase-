import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [updatedId, setUpdatedId] = useState("");
  const [key, setUpdatedKey] = useState("");
  const [loading, setLoading] = useState();
  const paramId = useParams();

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

  const [oldName, setOldName] = useState();
  const [oldPrice, setOldPrice] = useState();
  const [id, getId] = useState();

  const editHandler = (id, name, price, key) => {
    setUpdatedKey(key);
    setOldName(name);
    setOldPrice(price);
    getId(id);
  };

  const nameHandler = (e) => {
    setOldName(e.target.value);
  };

  const priceHandler = (e) => {
    setOldPrice(e.target.value);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    setUpdatedId(paramId);
    const setNewData = {
      _id: id,
      EnteredName: oldName,
      EnteredPrice: oldPrice,
    };

    fetch(
      `https://react-practice-d43ec-default-rtdb.firebaseio.com/add-data/${key}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(setNewData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
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
    });
  };

  const deleteHandler = (key) => {
    fetch(
      `https://react-practice-d43ec-default-rtdb.firebaseio.com/add-data/${key}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
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
    });
  };

  const allData = data.map((dat) => (
    <div className="main_cards" key={dat._id}>
      <div>
        <h1>Name: {dat.EnteredName}</h1>
      </div>
      <div>
        <h3>Price: {dat.EnteredPrice}</h3>
      </div>
      <div>
        <Link to={`/update-data/${dat._id}`}>
          <button
            className="buttons"
            type="button"
            onClick={() =>
              editHandler(dat._id, dat.EnteredName, dat.EnteredPrice, dat.key)
            }
          >
            Edit
          </button>
        </Link>
        <button
          className="buttons"
          type="submit"
          onClick={() => deleteHandler(dat.key)}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <form className="edit_form">
        <div>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={oldName}
              onChange={nameHandler}
            />
          </label>
        </div>
        <div>
          <label htmlFor="price">
            <input
              type="text"
              id="price"
              placeholder="Enter Amount"
              value={oldPrice}
              onChange={priceHandler}
            />
          </label>
        </div>
        <div>
          <button className="buttons" type="submit" onClick={updateHandler}>
            Update Data
          </button>
        </div>
      </form>
      {loading ? (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h1>Loading!!!</h1>
        </div>
      ) : (
        <div className="all_cards">{allData}</div>
      )}
    </Fragment>
  );
};

export default MainPage;
