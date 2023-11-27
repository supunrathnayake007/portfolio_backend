import { useState } from "react";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";

function CreateUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const updateUserName = (Username) => {
    setUserName(Username);
  };
  const updatePassword = (Password) => {
    setPassword(Password);
  };
  const updateConfirmationPassword = (ConfirmationPassword) => {
    setConfirmationPassword(ConfirmationPassword);
  };
  const onCreateClick = () => {};
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
        id={"password"}
        labelText={"Confirmation Password:"}
        callbackValue={updateConfirmationPassword}
      />

      <div>
        <Button buttonText="Create" onButtonClick={onCreateClick} />
      </div>
    </div>
  );
}
export default CreateUser;
