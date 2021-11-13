import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState(" "); // to save "name" in new variable for uploading in database
  const [newAge, setNewAge] = useState(" "); // to save "age" in new variable for uploading in database
  const [users, setUsers] = useState([]); // state is used to fetch dynamic data from db during page reload
  const usersCollectionRef = collection(db, "users"); // to specify the collection from firebase

  // useEffect is used to get data every time page is refreshed
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef); // fetched data from "users" document
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //fetches final refined data
    };

    getUsers();
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  }; // write to db, by creating new document

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id); //get a specific user inside userDoc
    const newField = { age: age + 1 }; //specify the new age
    await updateDoc(userDoc, newField); //userDoc is the  user & newField is the updated age
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id); //get a specific user inside userDoc
    await deleteDoc(userDoc); // delete the user
  };

  // ** few function calls are directly done, few function calls are done by arrow functions inside the buttons,
  // functions are called with arrow functions if there's any parameter assosiated with the func.
  //  else, the functions are called diirectly. **

  return (
    <div className="App">
      <input
        type="text"
        name=""
        id=""
        placeholder="Name..."
        onChange={(event) => setNewName(event.target.value)} // for taking input, will accept the age input from input box
      />
      <input
        type="number"
        name=""
        id=""
        placeholder="age..."
        onChange={(event) => setNewAge(event.target.value)} // for taking input, will accept the age input from input box
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div className="card">
            <div>
              <h1>name: {user.name}</h1>
              <h1>age: {user.age}</h1>
              <h1>id: {user.id}</h1>
            </div>

            <p>
              <button
                onClick={() => {
                  updateUser(user.id, user.age);
                }}
              >
                {" "}
                increase age +1
              </button>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete User
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
