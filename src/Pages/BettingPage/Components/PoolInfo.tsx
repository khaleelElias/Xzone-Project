import React, { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import db from "../../../firebase/firebase";

const PoolInfo = () => {
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    const fetchParticipantCount = async () => {
      const collectionRef = collection(db, "betslips");
      const snapshot = await getDocs(collectionRef);
      setParticipantCount(snapshot.size);
    };

    fetchParticipantCount();

    // Set up Firestore snapshot listener
    const unsubscribe = onSnapshot(collection(db, "betslips"), (snapshot) => {
      setParticipantCount(snapshot.size);
    });

    // Unsubscribe from snapshot listener when component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <>
      <div className=" grid grid-flow-col auto-cols-max gap-10 justify-center items-center	">
        <div>
          <img src="/images/userw.png" alt="logo" className=" w-10 h-10" />
        </div>
        <div className="font-ProLight text-white">
          Number of <br />
          Participants
        </div>
        <div className="font-ProBlackOblique text-blueish text-5xl">
          {participantCount}
        </div>
        <div>
          <h1 className="text-5xl text-transparent bg-clip-text font-ProLight italic bg-gradient-to-r to-blue-500 from-pink-500">
            :
          </h1>
        </div>
        <div>
          <img src="/images/moneyw.png" alt="logo" className=" w-12 h-12" />
        </div>
        <div className="font-ProLight text-white">
          Current <br />
          Pool Size:
        </div>
        <div className="font-ProBlackOblique text-blueish text-5xl ">
          20.000 *
        </div>
      </div>
    </>
  );
};

export default PoolInfo;
