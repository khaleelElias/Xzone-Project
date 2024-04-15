const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-md bg-gray-700 py-4 px-6 bg">
        <img
          src="/images/logo.png"
          alt="logo"
          className="cursor-pointer h-65 py-20 w-60 "
        />
        <h1 className="text-3xl text-white">
          Place your&nbsp;
          <span className="text-blueish">
            first
            <br /> PIX Slip for <span className="text-pinkish">free</span>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
