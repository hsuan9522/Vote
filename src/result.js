import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const Result = props => {
  const data = useSelector(state => state.votes);
  const [open, setOpen] = useState(false);
  const [bar, setBar] = useState([]);
  const [max, setMax] = useState([]);
  // const data = [
  //   ["vue", "10", "success"],
  //   ["react", "25", "info"],
  //   ["angular", "25", "danger"],
  //   ["total", "59"]
  // ];
  useEffect(() => {
    if (data.length === 0) return false;
    setOpen(false);
    const tmp = [...data].splice(0, 3);
    setBar(tmp);
    const num = tmp[0][1];
    let max = null;
    const sameBoolean = tmp.every(
      el => parseInt(el[1], 10) === parseInt(num, 10)
    );
    if (sameBoolean) {
      // 全部票數一致，要返回投票頁
      setOpen(true);
    } else {
      // 計算最多人喜歡的框架是誰
      tmp.forEach(el => {
        if (!max) {
          max = el;
        } else {
          if (parseInt(el[1], 10) > parseInt(max[1], 10)) {
            max = el;
          } else if (el[1] === max[1]) {
            max = [el, max];
          }
        }
      });
      setMax(max);
    }
  }, []);
  console.log("max", max);
  function handleClose() {
    props.history.push("/vote");
  }
  return (
    <div className="w-50">
      <h2>Result</h2>
      <hr />
      {max.length === 3 && <h3>Winner is {max[0]}</h3>}
      {max.length === 2 && (
        <h3>
          Winner is {max[0][0]} && {max[1][0]}
        </h3>
      )}
      <div>
        {bar.map(el => {
          return (
            <div className="bar" key={el[0]}>
              <div className="title">
                {el[0]} / {el[1]}
              </div>
              <div className="progress">
                <div
                  id="vue_result"
                  className={`progress-bar progress-bar-striped bg-${el[2]}`}
                  role="progressbar"
                  style={{ width: `${(el[1] / data[3][1]) * 100}%` }}
                  aria-valuenow={el[1]}
                  aria-valuemin="0"
                  aria-valuemax={data[3][1]}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Result;
