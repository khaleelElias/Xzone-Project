import { collection } from "firebase/firestore";
import db from "../firebase/firebase";

export const gamesCollection = collection(db, "games");
