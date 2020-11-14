import React, {useState} from 'react';

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
  
  return (
    <div className="signUp">
        <form>

            <input onChange = {inputChange} value ={signUpFormState.first_name} name ="first_name" placeholder = "First Name" />
            <input onChange = {inputChange} value ={signUpFormState.last_name} name ="last_name" placeholder = "Last Name" />
            <input onChange = {inputChange} value ={signUpFormState.email} name ="email" placeholder = "Email" />
            <input onChange = {inputChange} value ={signUpFormState.username} name ="username" placeholder = "username" />
            <input onChange = {inputChange} value ={signUpFormState.password} name ="password" placeholder = "password" />

        </form>
    </div>
  );
}

export default UserSignUp;
