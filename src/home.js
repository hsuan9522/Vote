import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";

const Home = () => {
  async function login() {
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    var params = {
      client_id:
        "1027212796940-6r0shchcfq6p38alj04dr7pbhm3h4adp.apps.googleusercontent.com",
      redirect_uri: "https://0m8nz.csb.app/vote",
      response_type: "token",
      scope: "https://www.googleapis.com/auth/spreadsheets",
      include_granted_scopes: "true",
      state: "pass-through value"
    };

    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  return (
    <div>
      <h3 className="mb-4">Vote for Framework!</h3>
      <Button onClick={() => login()} variant="contained" color="primary">
        Login
      </Button>
      <div className="mt-4">
        <small>* Cause DB is from google sheet, please Login first.</small>
      </div>
    </div>
  );
};

export default Home;
