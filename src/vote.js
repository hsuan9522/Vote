import React, { useState, useEffect } from "react";
import axios from "axios";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { getVotes } from "./redux/action";

const Vote = props => {
  const data = useSelector(state => state.votes);
  const [value, setValue] = useState("");
  // const [data, setData] = useState([]);
  const map = {
    vue: "B2",
    react: "B3",
    angular: "B4"
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVotes());
  }, []);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const res = await axios.get(
  //         "https://sheets.googleapis.com/v4/spreadsheets/11V6hm37zJ54fvkDUlGkhrAtRwPI_7ej0E_NzI5-79-U/values/A2:C5?key=AIzaSyBMsiWU9qSpl6ISOyZMNSFkIKAc1VjuenA"
  //       );
  //       setData(res.data.values);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getData();
  //   // const fake = [
  //   //   ["vue", "1", "success"],
  //   //   ["react", "23", "info"],
  //   //   ["angular", "4", "danger"],
  //   //   ["total", "28"]
  //   // ];
  //   // setData(fake);
  // }, []);

  function makeData(select) {
    let tmp = [...data].splice(0, 3); // 把total拿掉
    const index = tmp.findIndex(el => el[0] === select); // 找到使用者投票的語言
    const value = parseInt(tmp[index][1], 10) + 1; // 將原本的數字+1
    tmp[index][1] = parseInt(tmp[index][1], 10) + 1; // 想說保持一致一起+1，不然是可以不理，因為不會再拿這個做事
    return value;
  }

  const handleChange = event => {
    setValue(event.target.value);
  };

  async function submit() {
    if (!value) return false;
    const updateValue = makeData(value);
    const formId = map[value];
    const values = { values: [[updateValue]] };

    if (props.location.hash) {
      const token = props.location.hash
        .split("&")[1]
        .replace("access_token=", "");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const res = await axios.put(
        `https://sheets.googleapis.com/v4/spreadsheets/11V6hm37zJ54fvkDUlGkhrAtRwPI_7ej0E_NzI5-79-U/values/${formId}?valueInputOption=RAW&alt=json&key=AIzaSyBMsiWU9qSpl6ISOyZMNSFkIKAc1VjuenA`,
        values
      );
      props.history.push("/result");
    } catch (err) {
      console.log(err);
    }
  }

  if (!data || data.length === 0)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4">Which framework do you like the most?</h2>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select one</FormLabel>
        <RadioGroup
          aria-label="framework"
          name="framework"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="vue" control={<Radio />} label="Vue" />
          <FormControlLabel value="react" control={<Radio />} label="React" />
          <FormControlLabel
            value="angular"
            control={<Radio />}
            label="Angular"
          />
        </RadioGroup>
      </FormControl>
      <Button onClick={submit} className="mt-4 w-50" variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default Vote;
