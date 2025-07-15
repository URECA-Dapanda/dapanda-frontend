import { Fragment } from "react";
import CurrentCashCard from "./sections/CurrentCashCard";

export default function MyPageContent() {
  return (
    <Fragment>
      <CurrentCashCard isInterection={true} />
      <CurrentCashCard />
    </Fragment>
  );
}
