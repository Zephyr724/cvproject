import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/projects/1");
  //redireact to project/1

  return <div>Page is loading...</div>;
};

export default page;
