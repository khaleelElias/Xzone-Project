
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <nav className="w-full flex md:justify-center justify-between object-center">
        <img src="/images/logo.png" alt="logo" className="cursor-pointer h-65 py-20 w-60 md:w-10 lg:w-48"  />
      </nav>
      <div className="flex w-full justify-center items-center ">
        <div className="">
          <div className="flex flex-1 justify-start items-ceter flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white ">
              Place your first <br /> PIX slip for free
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Test your intuition and skills. Try to beat everyone.
            </p>
          </div>
          <div className="py-10">
            <a href="/pixslip" className="bg-[#e4e4e4] py-2 px-7 mx-4 rounded-full cursor-pointer">
              Get Started
            </a></div>
        </div>
      </div>
    </div>
  );

};

export default HomePage;