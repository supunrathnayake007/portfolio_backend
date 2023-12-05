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
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const responseData = await res.json();
    if (responseData.authorized) setPageMessage("Authorized !");
    else setPageMessage("Authorization failed !");
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
