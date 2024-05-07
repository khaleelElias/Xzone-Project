import { DocumentData, collection, getDocs } from "firebase/firestore"; // Make sure this import is correct based on your project setup
import { useEffect, useState } from "react";
import db from "../../firebase/firebase";

interface Week {
  id: string;
  data: DocumentData;
}

function AdminHistoricalBetslip() {
  const [weeks, setWeeks] = useState<Week[]>([]); // Explicitly type the state as an array of 'Week'

  useEffect(() => {
    const fetchWeeks = async () => {
      const weekCollectionRef = collection(db, "Games");
      const snapshot = await getDocs(weekCollectionRef);
      const weeksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data() as DocumentData, // Ensure the data is treated as DocumentData
      }));
      setWeeks(weeksData);
    };

    console.log(weeks, "kalle");
    fetchWeeks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {weeks.length > 0 ? (
        weeks.map((week) => (
          <div
            key={week.id}
            className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold">Week {week.id}</h3>
            <p>Additional data here</p> // Customize as needed
          </div>
        ))
      ) : (
        <p>No weeks data found.</p>
      )}
    </div>
  );
}

export default AdminHistoricalBetslip;
