import './LoginForm.css';

import {useState} from 'react'
const LoginForm = () => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const changeHandler = (e) => {
        //set all the values we get form the input field to the state
        setFormValues((prevState) =>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    function validate(values){
        //this function will return errors if any
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        
        if(!values.username){
            errors.username = 'User is required';
            setFormValues((prevState) => ({
                ...prevState,
                username: ''
            }))
        }
        if(!values.email){
            errors.email = 'Email is required';
            setFormValues((prevState) => ({
                ...prevState,
                email: ''
            }))
        }else if(!emailRegex.test(values.email)){
            errors.email = 'This is not a valid email format';
            setFormValues((prevState) => ({
                ...prevState,
                email: ''
            }))
        }
        if(!values.password){
            errors.password = 'Password is required';
            setFormValues((prevState) => ({
                ...prevState,
                password: ''
            }))
        }
        return errors;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);

        if(Object.keys(errors).length === 0){
            //since formErrors is an object, it will not have
            // a length property
            console.log('Form Data is ', formValues);
            setFormValues({
                username: "",
                email: "",
                password: "",
            })
        
        }
        // currently all values reset
        
    }
   
    return(
        <div className="main-container">
            <form className="login-form">
                <h2>Login Form</h2>
                <div className="ui-divider"></div>
                <div className="ui-form">
                    <div className="field">
                        <label>Username</label>
                        <input type="text" name="username" value={formValues.username} placeholder="Username" onChange={changeHandler}/>
                        {formErrors.username && <p className='error'>{formErrors.username}</p>}
                    </div>
                    <div className="ui-divider"></div>
                    {/* Email Field */}
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" value={formValues.email} placeholder="Email" onChange={changeHandler}/>
                        {formErrors.email && <p className='error'>{formErrors.email}</p>}
                    </div>
                    <div className="ui-divider"></div>
                    {/* Password Field */}
                    <div className="field">
                        <label>Password</label>
                        <input type="text" name="password" value={formValues.password} placeholder="Password" onChange={changeHandler}/>
                        {formErrors.password && <p className='error'>{formErrors.password}</p>}
                    </div>
                    <button className="submit-btn" onClick={submitHandler}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;