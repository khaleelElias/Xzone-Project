import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../../../firebase/firebase';

const PoolInfo = () => {
    const [participantCount, setParticipantCount] = useState(0);

    useEffect(() => {
        const fetchParticipantCount = async () => {
            const collectionRef = collection(db, 'betslips');
            const snapshot = await getDocs(collectionRef);
            setParticipantCount(snapshot.size);
        };

        fetchParticipantCount();

        // Set up Firestore snapshot listener
        const unsubscribe = onSnapshot(collection(db, 'betslips'), (snapshot) => {
            setParticipantCount(snapshot.size);
        });

        // Unsubscribe from snapshot listener when component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array to run effect only once on mount

    return (
        <div className="flex flex-wrap gap-4 justify-center pt-32">
            <div className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 min-w-64 bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                <div className="font-semibold text-lg">Number of Participants:</div>
                <div className="font-semibold text-4xl tracking-tight">{participantCount}</div>
            </div>
            <div className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 min-w-64 bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                <div className="font-semibold text-lg">Current Pool Size:</div>
                <div className="font-semibold text-4xl tracking-tight">$9.524</div>
                <div className="font-normal"></div>
            </div>
            <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base ">
              Please insert you wallet adress and the rearly access code below 
            </p>
        </div>
    );
};

export default PoolInfo;