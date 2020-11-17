import React, {useState} from 'react';
import API from "../../utils/API";

function UserLogin() {
    const [loginFormState, setUserLoginFormState] = useState({
      username: "",
      password: "",
    })
    const [loggedInState, setLoggedInState] = useState(false);
    const inputChange = event =>{
      const {name,value} = event.target;
      setUserLoginFormState({
        ...loginFormState,
        [name]:value
      })
    }

    const handleFormSubmit = event => {
      event.preventDefault();
      API.login(loginFormState).then(loginData=>{
        console.log("You logged in");
        
      }).then(function(){
        setLoggedInState(true)
      }).catch((err) => console.log(err));
    };


    if(!loggedInState){
      return (
        <div className="login">
            <form onSubmit={handleFormSubmit}>
                <input onChange = {inputChange} value ={loginFormState.username} name ="username" placeholder = "username" />
                <input onChange = {inputChange} value ={loginFormState.password} name ="password" placeholder = "password" />
                <input type = "submit" value="submit"/>
            </form>
        </div>
      );
    } else {
      return null
    }
}

export default UserLogin;
