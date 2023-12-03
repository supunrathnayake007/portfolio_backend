import { useState, useEffect } from "react";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";
import Router from "next/router";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
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
  const onLoginClick = () => {
    Router.push(
      {
        pathname: "/",
        query: { username: username },
      },
      "/"
    );
  };
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
      <h2>{title}</h2>
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
      {/* this only for testing */}
      <p>username: {username}</p>
      <p>password: {password}</p>

      <div>
        <Button buttonText="Login" onButtonClick={onLoginClick} />
        <Button buttonText="Create User" onButtonClick={onCreateClick} />
      </div>
    </div>
  );
}
export default Login;
