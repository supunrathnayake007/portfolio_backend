import { useState } from "react";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";
import Router from "next/router";

function CreateUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [pageMessage, setPageMessage] = useState("");

  const updateUserName = (Username) => {
    setUserName(Username);
  };
  const updatePassword = (Password) => {
    setPassword(Password);
  };
  const updateConfirmationPassword = (ConfirmationPassword) => {
    setConfirmationPassword(ConfirmationPassword);
  };
  async function onCreateClick() {
    //check password and confirm password are same
    if (password !== confirmationPassword) {
      setPageMessage("confirm password does not match");
      return;
    }
    // debugger;
    //call api
    const res = await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());

    let title = "came from login/createUser";
    if (res.message) {
      title = res.message;
    }
    //get the result and push to the login page with relavant data

    Router.push(
      {
        pathname: "/login",
        query: { title: title },
      },
      "/"
    );
  }
  return (
    <div>
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

      <InputField
        id={"cPassword"}
        labelText={"Confirmation Password:"}
        callbackValue={updateConfirmationPassword}
      />

      <div>
        <Button buttonText="Create" onButtonClick={onCreateClick} />
        <h3>{pageMessage}</h3>

        {/* this is only for testing */}
        <p>username:{username}</p>
      </div>
    </div>
  );
}
export default CreateUser;
