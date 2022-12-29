import { useState, Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
// import "./FAQS.css";

export default function Example() {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  const Accordiondata = [
    {
      id: 1,
      title: "What is Aalpha Mining Hash?",
      content: `Aalpha Mining is the utility to mine and get passive income.`,
    },
    {
      id: 2,
      title: "What is Aalpha Hash Node?",
      content: `Aalpha hash is the first step to mining. Aalpha Hash holders will be rewarded every day for up to 10 years depending on the 2% of deposits.`,
    },
    {
      id: 3,
      title: "What are the requirements to run an Aalpha hash mining node? ",
      content: `No specification or no setup to run aalpha nodes. all nodes run as mining hash. Buy and run. `,
    },
    {
      id: 4,
      title: "How many mining hash nodes one account holder can buy? ",
      content: `As of now, a limited number 1000 of nodes can be created per wallet. `,
    },
    {
      id: 5,
      title: "Which wallets is aalpha we DApp support? ",
      content: `We strongly recommend using TronLink Pro as it causes the least issues `,
    },
  ];
  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 mt-10">
        {Accordiondata?.map((items) => (
          <>
            <Accordion
              open={open === items.id}
              animate={customAnimation}
              className="py-2"
            >
              <div className="nodetype-bg    rounded-md  Accordiondata py-1">
                <AccordionHeader
                  onClick={() => handleOpen(items.id)}
                  className="Accordiondata text-white border-none"
                >
                  <div className="rewardstextcolor font-medium  flex items-center ">
                    <p>{items.title}</p>
                  </div>
                </AccordionHeader>
                {/* <i className="fa-solid fa-caret-up absolute top-4 right-6 text-3xl"></i> */}
              </div>
              <AccordionBody className="text-white flex justify-start items-center text-base p-8">
                {items.content}
              </AccordionBody>
            </Accordion>
          </>
        ))}
      </div>
    </>
  );
}
