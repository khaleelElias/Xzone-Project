
const HomePage = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-md  py-4 px-6 bg">
          <img
            src="/images/logo.png"
            alt="logo"
            className="cursor-pointer h-65 py-10 w-60 "
          />
          <h1 className="text-3xl text-white pb-12 font-Book">
            Place your{" "}
            <span className="text-blueish front-HeavyOblique italic">
              first
              <br /> PIX Slip{" "}
              <span className="text-white font-Book not-italic">for </span>
              <span className="text-pinkish front-HeavyOblique italic">
                free
              </span>
            </span>
          </h1>
          <h2 className="text-white text-sm	 items-left justify-left font-ProLight">
            Test your intuition and skills. Try to{" "}
            <span className="font-Modern">beat </span>
            <span className="text-transparent bg-clip-text font-Amsi italic bg-gradient-to-r to-blue-500 from-pink-500">
              EVERYONE
            </span>
          </h2>

          <a
            href="/pixslip"
            className="my-4 inline-flex items-center justify-center p-3 text-base  rounded-lg bg-gradient-to-r from-btncol to-btncol2 hover:from-btncol2 hover:to-btncol"
          >
            <img className="w-5 h-5 me-3" src="/images/arrow.png" alt="img" />{" "}
            <span className=" font-ProLight italic">
              Get <span className="font-bold not-italic ">Started</span>
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default HomePage;
