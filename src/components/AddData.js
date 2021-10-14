import { Fragment, useState } from "react";

const shortid = require("shortid");

const AddData = () => {
  const [name, setName] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [enteredNameValid, setEnteredNamIsValid] = useState(true);
  const [enterdPriceIsValid, setEnterdPiceIsValid] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const dataHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "" || price.trim() === "") {
      setEnteredNamIsValid(false);
      setEnterdPiceIsValid(false);
      return;
    }
    setEnteredNamIsValid(true);
    setEnterdPiceIsValid(true);
    const data = {
      _id: shortid.generate(),
      EnteredName: name,
      EnteredPrice: price,
    };
    fetch(
      "https://react-practice-d43ec-default-rtdb.firebaseio.com/add-data.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res.json);
    });

    setShowModal(true);
  };

  const modalCloseHandler = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Fragment>
      <form className="addData_form">
        <h1 style={{ textAlign: "center" }}>Enter data: </h1>
        <div>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              required
              onChange={nameHandler}
            />
          </label>
        </div>
        {!enteredNameValid && (
          <p style={{ padding: "0px 20px", color: "red" }}>
            Please Enter Name.
          </p>
        )}
        <div>
          <label htmlFor="price">
            <input
              type="text"
              id="price"
              placeholder="Enter Amount"
              required
              onChange={priceHandler}
            />
          </label>
        </div>
        {!enterdPriceIsValid && (
          <p style={{ padding: "0px 20px", color: "red" }}>
            Please Enter Price.
          </p>
        )}
        <div>
          <button className="buttons" type="submit" onClick={dataHandler}>
            Add Data
          </button>
        </div>
      </form>

      {showModal && (
        <div className="overlay">
          <div className="modal">
            <h1>Data Added..!</h1>
            <button
              className="buttons"
              type="Submit"
              onClick={modalCloseHandler}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AddData;
