const Walletcode = () => {
  return (
    <>
      <div className="m-4 rounded bg-[#1D0A31] p-5">
        <div>
          <button className="text-white bg-blue-700 m-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit
          </button>
        </div>
        <div className="rounded-t-lg  bg-[#452069] p-2">
          <input
            type="text"
            id="fotbollclub1"
            className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
            placeholder="Time"
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="items-center p-3 grid grid-cols-3   bg-white">
            <div>
              <input
                type="text"
                id="fotbollclub1"
                className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                placeholder="club1"
                required
              />
            </div>
            <span className="text-center text-2xl">vs</span>
            <input
              type="text"
              id="fotbollclub2"
              className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
              placeholder="club2"
              required
            />
          </div>
          <div className="flex min-h-[100px] items-center justify-center gap-10 bg-white">
            <span>current resalts:</span>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              1
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              X
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              2
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Walletcode;
