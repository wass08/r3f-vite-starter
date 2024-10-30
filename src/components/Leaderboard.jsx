import { useState } from 'react';
import { db } from '../firebase.config'
import { collection, addDoc } from 'firebase/firestore';
import './styles.css'

export default function LeaderBoard() {
    const mapNum = 1;
    const time = 5;
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [position, setPosition] = useState(0);
    const [topTen, setTopTen] = useState([]);
    const collectionName = 'Leaderboard'.concat(mapNum.toString());

    const submit = async () => {
        if (name == '') {
            alert("Please enter a name");
        }
        else {
            try {
            const docRef = await addDoc(collection(db, collectionName), {
                Name: name,
                Time: time
              });
            console.log("Document written with ID: ", docRef.id);
            {/* need to get position of this user and top 10 scores */}
            setSubmitted(true);
            }
            catch (error) {
                alert("An error has occured, please try again");
                console.error("Error adding document: ", error);
            }
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <div className='card-container'>
                {submitted ? (
                    <>
                    <h1 className='bebas-neue-regular'>Leaderboard</h1>
                    <table className='styled-table'>
                        <tbody>
                            <tr className='active-row'>
                                {/* this is where this users score goes /*/}
                                <td>10</td>
                                <td>Yusuf</td>
                                <td>{time}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Name</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* This is where top 10 scores go, use active row for this user if they in top 10 */}
                        </tbody>
                    </table>
                    </>
                ) : (
                    <>
                    <h1 className='bebas-neue-regular'>Level Complete!</h1>
                    <p className='custom-p'>Enter your name to be added to the leaderboard</p>
                    <input className='styled-input' placeholder='Player Name' onChange={(e) => setName(e.target.value)} />
                    <button className='styled-button' onClick={submit}>Submit</button>
                    </>
                )}
            </div>
        </div>
    );

}