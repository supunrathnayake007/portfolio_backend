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
    if (Router.query.authorized) {
      setPageMessage(Router.query.message);
    }
  }, [Router.query.authorized]);

  const updateUserName = (Username) => {
    setUserName(Username);
  };
  const updatePassword = (Password) => {
    setPassword(Password);
  };

  // in this place we should call api and get a jwt and decode here
  async function onLoginClick() {
    try {
      let pushHome = false;
      setPageMessage("Authorizing ...");
      const loginRes = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      const loginResponseData = await loginRes.json();
      const jsonWebToken = loginResponseData.token;
      debugger;
      const verifyRes = await fetch("/api/verifyJwt", {
        method: "POST",
        body: JSON.stringify({ jsonWebToken }),
      });
      const verifyResponseData = await verifyRes.json();
      const decodedToken = verifyResponseData.decodedToken;
      //debugger;

      if (decodedToken.valid) {
        if (decodedToken.payload.authorized) {
          setPageMessage("Authorized !");
          localStorage.setItem("smc_jwtToken", jsonWebToken);
          pushHome = true;
        } else setPageMessage("Authorization failed !");
      } else setPageMessage(decodedToken.error);

      if (pushHome) {
        Router.push(
          {
            pathname: "/",
            query: { username: username },
          },
          "/"
        );
      }
    } catch (error) {
      setPageMessage(error.message);
      console.log("login page catch error - " + error.message);
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
