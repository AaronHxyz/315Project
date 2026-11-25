import AuthForm from "../components/Form/AuthForm";
import FormInput from "../components/Form/FormInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { login, getMe } from "../api";
import { setUser } from "../App";

function Login() {
    const nav = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        
        const submitButton = document.querySelector('button#login-button');
        const username = document.querySelector('input#username').value;
        const password = document.querySelector('input#password').value;
        const errorText = document.querySelector('.error-text');

        if (username === "") {
            errorText.textContent = "Please enter a username";
            return;
        }
        if (password === "") {
            errorText.textContent = "Please enter a password";
            return;
        }
        errorText.textContent = '';
        submitButton.disabled = true;
        

        try{
            await login(username, password)
            getMe()
                .then((userData) => {
                if (active) setUser(userData);
                })
                .catch(() => {
                if (active) setUser(null);
                });
            nav("/");
        } catch (error) {
            errorText.textContent = error.message;
            submitButton.disabled = false;
            return
        }
    }

    return (
        <AuthForm title="Welcome Back" onSubmit={handleSubmit}>
            <FormInput label="Username" placeholder="Enter Username" id="username"/>

            <div className="password-group">
                <FormInput label="Password" type="password" placeholder="Enter Password" id="password"/>
                <Link to="/forgot password"> Forgot Password? </Link>
            </div>

            <button type="submit" id="login-button"> Log In </button>
            <p className="error-text"></p>

        </AuthForm>
    );
}

export default Login;