import MiddleSection from "./MiddleSection";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";


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
      <div className={`w-[20%] xs:hidden sm:hidden md:hidden lg:block`}>  
        <LeftSection scrolled={scrolled} />
      </div>
      <div className="w-[45%] px-10 py-5  ">
        <Outlet/>
      </div>
      <div className="w-[35%] pr-6 rounded-e-lg relative">
        <RightSection />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-11 bg-red-500">
        <p>testtt</p>
      </div>
    </div>
  );
};

export default HomeLayout;
