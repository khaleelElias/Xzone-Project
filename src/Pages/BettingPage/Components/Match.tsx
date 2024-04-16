const Match = () => {
  return (
    <>
      <div className="relative w-full max-w-xl md:max-w-4xl">
        <div className="relative m-4 md:m-8 space-y-4">
          <div className="flex items-center justify-between space-x-4 md:space-x-8 rounded-lg bg-white p-4 md:p-8">
            <div className="flex flex-1 items-center justify-between">
              <div className="h-3 w-32 md:h-4 md:w-48 rounded bg-blue-300">
                <div>
                  <span> FA Club</span>
                  <div>
                    <img
                      src="/images/logos/Ajax.png"
                      alt="logo"
                      className=" md:w-4 h-4"
                    />
                  </div>
                </div>
                <div>te</div>
              </div>
              <div className="h-5 w-16 md:h-6 md:w-24 rounded-lg bg-purple-300"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Match;
