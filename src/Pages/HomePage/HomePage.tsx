import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <nav className="w-full flex md:justify-center justify-between object-center	">
        <img src="/images/logo.png" alt="logo" className="cursor-pointer" />
      </nav>
      <div className="flex w-full justify-center items-center ">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-ceter flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white ">
              Place your first <br /> Betslip for free
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Test your intuition and skills. Try to beat everyone.
            </p>
          </div>
          <div className="py-10">
            <a href="/betting" className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
              Get Started
            </a></div>
        </div>
      </div>
    </div>
  );

};

export default HomePage;