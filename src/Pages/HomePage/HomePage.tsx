const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-md  py-4 px-6 bg">
        <img
          src="/images/logo.png"
          alt="logo"
          className="cursor-pointer h-65 py-10 w-60 "
        />
        <h1 className="text-3xl text-white pb-12">
          Place your{" "}
          <span className="text-blueish">
            first
            <br /> PIX Slip for <span className="text-pinkish">free</span>
          </span>
        </h1>
        <h2 className="text-white text-sm	 items-left justify-left">
          Test your intuition and skills. Try to <span>beat </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-pink-500">
            Everyone
          </span>
        </h2>

        <a
          href="href=/pixslip"
          className="my-4 inline-flex items-center justify-center p-3 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <img className="w-5 h-5 me-3" src="/images/arrow.png" alt="logo" />{" "}
          <span className="w-full">Get Started</span>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
