import MiddleSection from "./MiddleSection";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { useState, useEffect } from "react";


const HomeLayout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
 

 
  

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);


  return (
    <div className="flex w-full bg-[#1B1B1B] min-h-screen">
      <div className={`w-[20%] `}>  
        <LeftSection scrolled={scrolled} />
      </div>
      <div className="w-[45%]  px-10 py-5  ">
        <MiddleSection />
      </div>
      <div className="w-[35%] pr-6 rounded-e-lg relative">
        <RightSection />
      </div>
    </div>
  );
};

export default HomeLayout;
