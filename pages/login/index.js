import { useState, useEffect } from "react";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";

import Router from "next/router";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [pageMessage, setPageMessage] = useState("");
  useEffect(() => {
    setTitle(Router.query.result);
  }, []);

  const updateUserName = (Username) => {
    setUserName(Username);
  };
  const updatePassword = (Password) => {
    setPassword(Password);
  };

  // in this place we should call api and get a jwt and decode here
  async function onLoginClick() {
    let pushHome = false;
    setPageMessage("Authorizing ...");
    const loginRes = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const loginResponseData = await loginRes.json();
    const jsonWebToken = loginResponseData.token;
    const verifyRes = await fetch("/api/verifyJwt", {
      method: "POST",
      body: JSON.stringify({ jsonWebToken }),
    });
    const verifyResponseData = await verifyRes.json();
    const decodedToken = verifyResponseData.decodedToken;
    debugger;
    //token can save in local storage here
    /////

    if (decodedToken.valid) {
      if (decodedToken.payload.authorized) setPageMessage("Authorized !");
      else setPageMessage("Authorization failed !");
    } else setPageMessage(decodedToken.error);
    //debugger;
    if (pushHome) {
      Router.push(
        {
          pathname: "/",
          query: { username: username },
        },
        "/"
      );
    }
  }
  const onCreateClick = () => {
    Router.push(
      {
        pathname: "/login/createUser",
        query: { username: username },
      },
      "/"
    );
  };

  return (
    <div>
      <h2>{pageMessage}</h2>
      <InputField
        id={"username"}
        labelText={"User Name:"}
        callbackValue={updateUserName}
      />

      <InputField
        id={"password"}
        labelText={"Password:"}
        callbackValue={updatePassword}
      />

      <div>
        <Button buttonText="Login" onButtonClick={onLoginClick} />
        <Button buttonText="Create User" onButtonClick={onCreateClick} />
      </div>
    </div>
  );
}
export default Login;
