import { useState, useEffect } from "react";
import Image from "next/image";
import InputField from "../../components/input_components/inputField";
import Button from "../../components/input_components/button";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// tailwind classNames
const commonButton =
  "m-1 px-2 py-1 bg-lime-500 rounded hover:bg-lime-600  text-white ";
const commonInput = "m-1 w-full px-3 py-2 border rounded-md ";
///

function Login() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [pageMessage, setPageMessage] = useState("");
  useEffect(() => {
    if (router.query.authorized) {
      toast.error(router.query.message, { autoClose: 5000 });
    }
  }, [router.query.authorized]);
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
        body: JSON.stringify({ username, password, expiresIn: "1m" }),
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
        router.push(
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
    router.push(
      {
        pathname: "/login/createUser",
        query: { username: username },
      },
      "/"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="-mt-60">
        <div className="flex justify-center m-10 ">
          <Image
            className="rounded-xl"
            src="/supunLogo.jpeg"
            alt="Supun Logo"
            width={300} // Set the width of the image
            height={300} // Set the height of the image
          />
        </div>
        <div className="block">
          <input
            id="username"
            className={"mb-2 placeholder:italic" + commonInput}
            placeholder="User Name"
            onChange={(e) => {
              updateUserName(e.target.value);
            }}
          />
          <input
            id="password"
            className={"mb-2 placeholder:italic" + commonInput}
            placeholder="Password"
            type="password"
            onKeyDown={passwordEnter}
            onChange={(e) => {
              updatePassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center">
          <button className={commonButton + "w-24"} onClick={onLoginClick}>
            Login
          </button>
          <button className={commonButton + ""} onClick={onCreateClick}>
            Create User
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Login;
