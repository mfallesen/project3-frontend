import React, {useState} from 'react';

function UserLogin(props) {
    
      return (
        <div className="login">
            <form onSubmit={props.handleFormSubmit}>
                <input onChange = {props.inputChange} value ={props.form.username} name ="username" placeholder = "username" />
                <input onChange = {props.inputChange} value ={props.form.password} name ="password" placeholder = "password" />
                <input type = "submit" value="submit"/>
            </form>
        </div>
      );
    
}

export default UserLogin;
