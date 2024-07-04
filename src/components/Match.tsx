const Match = () => {
  return (
    <>
      <p className="p-14">hello</p>
      {/* Mamman */}
      <div className="bg-blue-500 p-4 grid grid-cols-1">
        {/* första div med match info, tid status */}
        <div className="text-white rounded-md mb-1 p-1 bg-purple-600 ">
          Break 1 '45
        </div>
        {/* mycket händer här */}
        <div className="bg-green-600 md:grid-cols-7">
          {/* all match info, vilka möter varandra, logo flagga, status på matchen,
          vilka som har gjort mål och en fotbolls logo valbart */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p>real madrid</p>
              <p>psg</p>
            </div>
            <div>
              <p className="text-right pr-7">2</p>
              <p className="text-right pr-7">1</p>
            </div>
          </div>
          {/* här har vi valen, buttons och ovan för knapparna har vi lite text */}

          <p className="text-center">Match info</p>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-red-400 rounded-lg">1</button>
            <button className="bg-red-400 rounded-lg">X</button>
            <button className="bg-red-400 rounded-lg">2</button>
          </div>
        </div>
      </div>
      <p className="p-14">hello</p>

      <div className="bg-blue-500 p-4">
        <div className="bg-red-500 p-4 grid"></div>
      </div>
    </>
  );
};

export default Match;
