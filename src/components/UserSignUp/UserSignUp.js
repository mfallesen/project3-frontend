import React, {useState} from 'react';
import API from "../../utils/API";

function UserSignUp() {
    const [signUpFormState, setUserSignUpFormState] = useState({
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: ""
    })
    const inputChange = event =>{
      const {name,value} = event.target;
      setUserSignUpFormState({
        ...signUpFormState,
        [name]:value
      })
    }

    const handleFormSubmit = event => {
      event.preventDefault();
      API.registerUser(signUpFormState).then(userData=>{
        console.log(userData);
      })
    }
  
  return (
    <div className="signUp">
        <form onSubmit={handleFormSubmit}>
            <input onChange = {inputChange} value ={signUpFormState.first_name} name ="first_name" placeholder = "First Name" />
            <input onChange = {inputChange} value ={signUpFormState.last_name} name ="last_name" placeholder = "Last Name" />
            <input onChange = {inputChange} value ={signUpFormState.email} name ="email" placeholder = "Email" />
            <input onChange = {inputChange} value ={signUpFormState.username} name ="username" placeholder = "username" />
            <input onChange = {inputChange} value ={signUpFormState.password} name ="password" placeholder = "password" />
            <input type = "submit" value="register"/>
        </form>
    </div>
  );
}

export default UserSignUp;
