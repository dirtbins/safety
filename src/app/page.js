import { Fragment } from "react";
import SignIn from "./components/login";

export const metadata = {
  title: "OSHPORTAL solutions",
  description:
    "This site is operated by oshportal solutions in paterneship with Moore Automation Limited",
};
export default async function Home() {
  return (
    <Fragment>
      <SignIn />
    </Fragment>
  );
}
