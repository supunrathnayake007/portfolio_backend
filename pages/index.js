import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Edu_QLD_Beginner, Inter } from "next/font/google";
import CreatePost from "../components/posts/createPost";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [username, setUserName] = useState("");
  const [pushLogin, setPushLogin] = useState({});

  const router = useRouter(); // Use useRouter hook here

  useEffect(() => {}, [pushLogin, router]);
  useEffect(() => {
    //setUserName(Router.query.username);
    //console.log("Home page here ---");
    validateUser();
  }, []);

  async function validateUser() {
    try {
      debugger;
      const jsonWebToken = localStorage.getItem("smc_jwtToken");
      if (jsonWebToken) {
        const verifyRes = await fetch("/api/verifyJwt", {
          method: "POST",
          body: JSON.stringify({ jsonWebToken }),
        });
        const verifyResponseData = await verifyRes.json();
        const decodedToken = verifyResponseData.decodedToken;

        if (decodedToken.valid) {
          if (!decodedToken.payload.authorized) {
            setPushLogin({
              push: true,
              message: "- authentication failed - please log in -",
            });
          } else {
            setUserName(decodedToken.payload.username);
            setPushLogin({
              push: false,
              message: "Already logged in .. ",
            });
          }
        } else {
          setPushLogin({
            push: true,
            message: decodedToken.error,
          });
        }
      } else {
        setPushLogin({
          push: true,
          message: "User Credential needed..",
        });
      }
    } catch (error) {
      console.log("home page - validateUser - " + error.message);
    }
  }

  const logoutOnClick = () => {
    debugger;
    if (!pushLogin.push) {
      localStorage.removeItem("smc_jwtToken");
      setPushLogin({
        push: true,
        message: "logout Successful..!",
      });
    } else {
      if (pushLogin.push && router) {
        setPushLogin({
          push: false,
          message: "just logged in ..",
        });
        router.push(
          {
            pathname: "/login",
            query: {
              message: pushLogin.message,
              authorized: false,
            },
          },
          "/login"
        );
      }
    }
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* update favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-400">
        <div>
          <p className="text-3xl font-bold underline">username: {username}</p>
          <button
            className="m-1 bg-lime-500 px-2 py-1 rounded hover:bg-lime-600 text-white"
            onClick={logoutOnClick}
          >
            {pushLogin.push ? "Login" : "Logout"}
          </button>
        </div>
        <div>
          {pushLogin.push ? (
            ""
          ) : (
            <div className="flex justify-center">
              <div className="m-4 lg:w-2/3 xxxs:w-full">
                <CreatePost />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
