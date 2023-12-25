import LeftSection from "../HomeLayout/LeftSection";
import MiddleSectionDetails from "./MiddleSectionDetails";
import RightSection from "../HomeLayout/RightSection";
import { useState, useEffect } from "react";

const DetailLayout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const position = window.scrollY;
    const handleScroll = () => {
      if (position > 0) {
        setScrolled(true);
        console.log("scrolled");
      } else {
        setScrolled(false);
      }
      window.addEventListener("scroll", handleScroll);
    };
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex w-full min-h-screen bg-[#1B1B1B] ">
      <div className={`w-[20%] `}>
        <LeftSection scrolled={scrolled} />
      </div>
      <div className="w-[45%]  px-10 py-5">
        <MiddleSectionDetails />
      </div>
      <div className="w-[35%]  pr-6 rounded-e-lg">
        <RightSection />
      </div>
    </div>
  );
};

export default DetailLayout;
