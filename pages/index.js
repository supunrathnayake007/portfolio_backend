import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Edu_QLD_Beginner, Inter } from "next/font/google";
import CreatePost from "../components/posts/createPost";
import ViewPosts from "../components/posts/viewPosts";
import { Helmet } from "react-helmet";
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
  const userGroupsOnClick = () => {
    window.location.href = "/userGroups/createUserGroups";
  };

  const wallpapersOnClick = () => {
    window.location.href = "/projects/wallpaperApp";
  };
  const CreateProjectCardOnClick = () => {
    window.location.href = "/portfolioComps/projects";
  };
  const CreateTechsOnClick = () => {
    window.location.href = "/portfolioComps/createTechs";
  };
  let a = 1;
  const logoutOnClick = () => {
    debugger;
    if (!pushLogin.push) {
      localStorage.removeItem("smc_jwtToken");
      localStorage.removeItem("smc_username");
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
        {/* update favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Helmet>
        <title>SR SMC Project</title>
      </Helmet>
      <main className="min-h-screen bg-slate-400">
        <div className="">
          <div className="float-right ">
            <p className="text-1xl font-bold underline ">
              username: {username}
            </p>
            <button
              className="m-1 bg-lime-500 px-2 py-1 rounded hover:bg-lime-600 text-white"
              onClick={logoutOnClick}
            >
              {pushLogin.push ? "Login" : "Logout"}
            </button>
          </div>
          {!pushLogin.push ? (
            <div className="flex flex-wrap pt-5 pl-5">
              <div className="w-full">
                <button
                  className="m-1 bg-lime-500 px-2 py-1 rounded hover:bg-lime-600 text-white"
                  onClick={userGroupsOnClick}
                >
                  (test)User Groups
                </button>
                <button
                  className="m-1 bg-lime-500 px-2 py-1 rounded hover:bg-lime-600 text-white"
                  onClick={wallpapersOnClick}
                >
                  (test)wallpapers
                </button>
              </div>
              <div className=" p-1 ">
                <button
                  className="m-1 bg-lime-500 px-2 py-1 rounded hover:bg-lime-600 text-white"
                  onClick={CreateProjectCardOnClick}
                >
                  Manage Project Cards
                </button>
                <button
                  className="m-1 bg-lime-500 px-2 py-1 rounded hover:bg-lime-600 text-white"
                  onClick={CreateTechsOnClick}
                >
                  Manage Saved Tachs
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {pushLogin.push ? (
            ""
          ) : (
            <div>
              <div className="flex justify-center">
                <div className="m-4 lg:w-2/3 xxxs:w-full">
                  <CreatePost />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="m-4 lg:w-2/3 xxxs:w-full">
                  <ViewPosts />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div className="m-4 lg:w-2/3 xxxs:w-full">
            <ViewPosts />
          </div>
        </div>
      </main>
    </>
  );
}
