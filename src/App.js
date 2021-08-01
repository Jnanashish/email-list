import {useState} from "react"
import {v4} from "uuid";
import validator from 'validator'
import './App.css';
import db from "./firebase_config"

function App() {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(''); 
  const [flag, setFlag] = useState(true); 

  const addemail = (e) =>{
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setEmailError('* Enter valid Email!')
    }

    else{
        try { 
            db.database().ref('email/' + v4()).set({email})
        } catch (error) { console.log(error);}   
    
        setFlag(false);
    }
  }

  return (
    <div className="App">
      <h1>SOMETHING BIG IS COMMING...</h1>
      <p>Hello👋, We are currently working on creating a amazing platoform for a codergeek. Sign up to join our exclusive email list and be the first to know when it’s released!</p>
      <p className="error-msg">{emailError}</p>
      {(flag === true) && <div className="form">
        <input 
          type="email" 
          placeholder="yourname@gmail.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />

        <button 
          type="submit" 
          onClick={addemail}>Get Updates
        </button>
      </div>
      }
      {(flag === false) && <h3 className="thank">Thank You ❤️</h3>} 
    </div>
  );
}

export default App;
