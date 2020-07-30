import axios from "axios";

export const getVotes = () => async dispatch => {
  try {
    const res = await axios.get(
      "https://sheets.googleapis.com/v4/spreadsheets/11V6hm37zJ54fvkDUlGkhrAtRwPI_7ej0E_NzI5-79-U/values/A2:C5?key=AIzaSyBMsiWU9qSpl6ISOyZMNSFkIKAc1VjuenA"
    );
    const votes = res.data.values;
    dispatch({
      type: "SAVE_VOTES",
      data: votes
    });
  } catch (err) {
    console.log(err);
  }
};
