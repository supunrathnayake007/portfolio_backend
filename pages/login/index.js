import { useState, useEffect } from "react";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [pageMessage, setPageMessage] = useState("");
  useEffect(() => {
    if (Router.query.authorized) {
      toast.error(Router.query.message, { autoClose: 5000 });
    }
  }, [Router.query.authorized]);
  debugger;
  const updateUserName = (Username) => {
    setUserName(Username);
  };
  const updatePassword = (Password) => {
    setPassword(Password);
  };
  const passwordEnter = (event) => {
    if (event.key === "Enter") {
      onLoginClick();
    }
  };
  // var input = document.getElementById("password");
  // input.addEventListener("keypress", function (event) {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     onLoginClick();
  //   }
  // });
  async function onLoginClick() {
    try {
      let pushHome = false;
      toast.dark("Authorizing ...", { autoClose: 2000 });
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
          localStorage.setItem("smc_jwtToken", jsonWebToken);
          pushHome = true;
        } else {
          toast.error("Authorization failed !", { autoClose: 5000 });
        }
      } else {
        toast.error(decodedToken.error, { autoClose: 5000 });
      }

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
      toast.error(error.message, { autoClose: 5000 });
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
        onKeyDown={passwordEnter}
        onChange={(e) => {
          updatePassword(e.target.value);
        }}
      />

      <div>
        <Button buttonText="Login" onButtonClick={onLoginClick} />
        <Button buttonText="Create User" onButtonClick={onCreateClick} />
      </div>

      <ToastContainer />
    </div>
  );
}
export default Login;
