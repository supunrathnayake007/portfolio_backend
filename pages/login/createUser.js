import { useState } from "react";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateUser() {
  const Router = useRouter();
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
  const cPasswordEnter = (event) => {
    if (event.key === "Enter") {
      onCreateClick();
    }
  };
  async function onCreateClick() {
    if (!isPasswordComplex(password)) {
      toast.error(
        "Password does not meet complexity requirements. - length 8 , letters ,numbers special characters",
        {
          autoClose: 5000,
        }
      );
      return;
    } else {
      if (password !== confirmationPassword) {
        //setPageMessage("confirm password does not match");
        toast.error("confirm password does not match", { autoClose: 5000 });
        return;
      }
    }
    //debugger;
    try {
      setLoading(true);
      toast.dark("User inserting .. ", { autoClose: 5000 });
      const res = await fetch("/api/createUser", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }).then((t) => t.json()); //don't know that this do
      setLoading(false); //this works

      //debugger;
      if (res.result.error) {
        const tempUsername = res.result.error.keyValue.username;
        //setPageMessage("Username - " + tempUsername + " - Already exist");
        toast.error("Username - " + tempUsername + " - Already exist", {
          autoClose: 5000,
        });
        return;
      }
      if (res.result.acknowledged) {
        routerPush = true;
      }
      title = "came from login/createUser";
    } catch (error) {
      //debugger;
      //setPageMessage(error.message);
      toast.error(error.message, { autoClose: 5000 });
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
      <input
        id="username"
        placeholder="User Name"
        onChange={(e) => {
          updateUserName(e.target.value);
        }}
      />
      <input
        id="password"
        placeholder="Password"
        type="password"
        onChange={(e) => {
          updatePassword(e.target.value);
        }}
      />
      <input
        id="cPassword"
        placeholder="Confirmation Password"
        type="password"
        onKeyDown={cPasswordEnter}
        onChange={(e) => {
          updateConfirmationPassword(e.target.value);
        }}
      />

      <div>
        <Button buttonText="Create" onButtonClick={onCreateClick} />
        {/* <h3>{pageMessage}</h3> */}

        {/* this is only for testing */}
        <p>username:{username}</p>
        <p>{loading ? "User inserting .. " : ""}</p>
      </div>
      <ToastContainer />
    </div>
  );
}

const isPasswordComplex = (password) => {
  // Password complexity requirements
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  // Check if the password meets all complexity requirements
  const isComplex =
    password.length >= minLength &&
    // hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar;

  return isComplex;
};
export default CreateUser;
