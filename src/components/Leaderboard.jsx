import { useState } from "react";
import { db } from "../firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import "./styles.css";

export default function LeaderBoard({ mapNum, time, setEnd,end }) {
  // const mapNum = 1;
  // const time = 10;
  
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [myID, setMyID] = useState("");
  const [position, setPosition] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const collectionName = "Leaderboard".concat(mapNum.toString());

  const submit = async () => {
    if (name == "") {
      alert("Please enter a name");
    } else {
      try {
        const docRef = await addDoc(collection(db, collectionName), {
          Name: name,
          Time: time,
        });
        console.log("Document written with ID: ", docRef.id);

        {
          /* need to get position of this user and top 5 scores */
        }

        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(
          query(collectionRef, orderBy("Time", "asc"))
        );
        const temp = [];
        let pos = 1;
        querySnapshot.forEach((doc) => {
          if (docRef.id == doc.id) {
            setPosition(pos);
          }
          temp.push({ Name: doc.data().Name, Time: doc.data().Time });
          pos++;
        });
        setAllScores(temp.slice(0, 5));
        setSubmitted(true);
      } catch (error) {
        alert("An error has occured, please try again");
        console.error("Error adding/retrieving document: ", error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="card-container">
        {submitted ? (
          <>
            <h1 className="bebas-neue-regular">Leaderboard</h1>
            <table className="styled-table">
              <tbody>
                <tr className="active-row">
                  {/* this is where this users score goes /*/}
                  <td>{position}</td>
                  <td>{name}</td>
                  <td>{time.toFixed(2)}s</td>
                </tr>
              </tbody>
            </table>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {/* This is where top 5 scores go, use active row for this user if they in top 5 */}
                {allScores.map((score, i) => {
                  if (position - 1 == i) {
                    return (
                      <tr className="active-row" key={i}>
                        <td>{i + 1}</td>
                        <td>{score.Name}</td>
                        <td>{score.Time.toFixed(2)}s</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{score.Name}</td>
                        <td>{score.Time.toFixed(2)}s</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <button className="styled-button" onClick={() => setEnd()}>
              Continue
            </button>
          </>
        ) : (
          <>
            <h1 className="bebas-neue-regular">Level Complete!</h1>
            <p className="custom-p">
              Enter your name to be added to the leaderboard
            </p>
            <input
              className="styled-input"
              placeholder="Player Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button className="styled-button" onClick={submit}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
// "FREE | Hummer H1 - Minecraft" (https://skfb.ly/6TLJF) by LZBlocks is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).4
// "FREE | Nissan Skyline R34 GTR V-Spec II" (https://skfb.ly/6RCPz) by LZBlocks is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).