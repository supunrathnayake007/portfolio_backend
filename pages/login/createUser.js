import { useState } from "react";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";
import Router from "next/router";

function CreateUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [pageMessage, setPageMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let routerPush = false;
  let title = "";

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
    if (password !== confirmationPassword) {
      setPageMessage("confirm password does not match");
      return;
    }
    //debugger;
    try {
      setLoading(true);
      const res = await fetch("/social_media_clone/api/createUser", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }).then((t) => t.json()); //don't know that this do
      setLoading(false); //this works

      //debugger;
      if (res.result.error) {
        const tempUsername = res.result.error.keyValue.username;
        setPageMessage("Username - " + tempUsername + " - Already exist");
        return;
      }
      if (res.result.acknowledged) {
        routerPush = true;
      }
      title = "came from login/createUser";
    } catch (error) {
      //debugger;
      setPageMessage(error.message);
      return;
    }

    //get the result and push to the login page with relevant data

    if (routerPush) {
      Router.push(
        {
          pathname: "/login",
          query: { title: title },
        },
        "/"
      );
    }
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
        <p>{loading ? "User inserting .. " : ""}</p>
      </div>
    </div>
  );
}
export default CreateUser;
