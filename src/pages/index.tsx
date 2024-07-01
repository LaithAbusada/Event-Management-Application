import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/Navbar";

function index() {
  // const { user, error, isLoading } = useUser();

  // if (error) return <div> {error.message}</div>;
  // if (isLoading) return <div>Loading</div>;
  // if (user) {
  //   console.log(user);
  //   return (
  //     <>
  //       <Navbar />
  //       <div>
  //         Welcome {user.name}, you can <a href="/api/auth/logout">Logout</a>
  //       </div>
  //     </>
  //   );

  return <p>Home page</p>;
}

export default index;
