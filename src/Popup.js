import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";

const Popup = ({ click }) => {
  const [options, setoptions] = React.useState([
    { label: "First Name", value: "first name" },
    { label: "Last Name", value: "last name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ]);
  // const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState([]);
  const [arr, setarr] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [value1, setValue1] = React.useState([]);
  const [text, setText] = React.useState("");
  const handleClick = (i) => {
    console.log(i);
    arr.splice(i, 1);
    const a = [...arr];
    setarr(a);
    const opt = [...options];
    console.log(value);
    opt.push(value);
    console.log("opt", opt);
    setoptions(opt);
  };
  const handleLink = () => {
    console.log(value);
    const a1 = [...arr];
    if (inputValue !== "") {
      a1.push(value);
      console.log(a1);
      let uniqueOptions = [...new Set(a1)];
      setarr(uniqueOptions);
      const ar = options.filter((val) => val.value !== value.value);
      console.log("ty", ar);
      setoptions(ar);
      setValue1("");
    }
  };
  const handleInput = (e, newInputValue) => {
    setInputValue(newInputValue);
    setValue1(newInputValue);
    console.log("e", newInputValue);
  };

  const handleInput1 = (e, newValue) => {
    setValue(newValue);
    console.log("d", newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(options);
    postUser();
  };

  const handleClic = () => {
    console.log("hiii");
    click("right", false);
  };

  async function postUser() {
    console.log("hello");
    let payload = {
      segment_name: text,
      schema: arr
    };

    axios
      .post(
        "https://webhook.site/3b144348-9bd4-4839-ad5f-bb687bfee3c1",
        payload
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div style={{ height: "90vh" }}>
          <diV
            style={{
              display: "flex",
              backgroundColor: "lightblue",
              height: "80px"
            }}
          >
            <Button style={{ color: "white" }} onClick={handleClic}>
              <ArrowBackIosIcon /> Saving Segment
            </Button>
          </diV>
          <div style={{ height: "auto", margin: "25px", overflowY: "hidden" }}>
            <Typography>Enter the Name of the segment</Typography>
            <br />
            <div>
              <TextField
                size="small"
                style={{ width: "450px" }}
                placeholder="Name of the segment"
                onChange={handleChange}
              ></TextField>{" "}
            </div>
            <br />
            <Typography>
              To save your segment, you need to add the schemas to build the
              query
            </Typography>
            <br />
            <div style={{ border: arr.length ? "3px solid lightblue" : "" }}>
              {arr.map((a, i) => {
                return (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Autocomplete
                      size="small"
                      value={a.label}
                      disablePortal
                      style={{ margin: "10px" }}
                      id="combo-box-demo"
                      options={options}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          style={{
                            width: "400px"
                          }}
                          {...params}
                          // label={a.label}
                          // defaultValue={a.value}
                        />
                      )}
                    />
                    <Button onClick={() => handleClick(i)}>
                      <RemoveIcon />
                    </Button>
                  </div>
                );
              })}
            </div>
            <br />
            <div style={{ border: "3px solid white" }}>
              <Autocomplete
                value={value1}
                // clearText={value}
                // defaultValue={inputValue}
                // selectOnFocus={value}
                onChange={(event, newValue) => {
                  handleInput1(event, newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  handleInput(event, newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                style={{ margin: "10px" }}
                sx={{ width: 300 }}
                getOptionDisabled={(option) => option === inputValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    style={{ width: "400px" }}
                    label="Add a new segment"
                  />
                )}
              />
            </div>
            <br />
            <Button>
              <Link onClick={() => handleLink()}>+ Add new schema</Link>
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "lightgrey",
            height: "10vh"
          }}
        >
          <Button
            type="submit"
            style={{
              color: "white",
              backgroundColor: "lightblue",
              marginLeft: "10px"
            }}
          >
            Save the segment
          </Button>
          <Button
            style={{
              color: "red",
              backgroundColor: "white",
              marginLeft: "10px"
            }}
            onClick={handleClic}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
