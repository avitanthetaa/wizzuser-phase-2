import React from "react";
import MainTitle from '../MainTitle/MainTitle'
import CustomizedAccordions from "./Accordion/Accordion";
function FAQ() {
  return (
    <>
      <div className="container mx-auto ">
        <MainTitle title={"FAQ"} />
        <CustomizedAccordions/>
      </div>
    </>
  );
}

export default FAQ;
