import AuthForm from "../components/Form/AuthForm";
import FormInput from "../components/Form/FormInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { signup } from "../api";

function Signup() {
    const nav = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        
        const submitButton = document.querySelector('button[type="submit"]');
        const username = document.querySelector('input#username').value;
        const email = document.querySelector('input#email').value;
        const password = document.querySelector('input#password').value;
        const errorText = document.querySelector('.error-text');

        if (username === "") {
            errorText.textContent = "Please enter a username";
            return;
        }
        if (email === "") {
            errorText.textContent = "Please enter an email";
            return;
        }
        if (password === "") {
            errorText.textContent = "Please enter a password";
            return;
        }
        errorText.textContent = '';
        submitButton.disabled = true;

        signup(username, email, password)
            .then(() => {
                nav("/login");
            })
            .catch((error) => {
                errorText.textContent = error.message;
                submitButton.disabled = false;
            });

    }

    return (
        <AuthForm title="Create A New Account" onSubmit={handleSubmit}>
            <FormInput id="username" label="Username" placeholder="Enter Username"/>
            <FormInput id="email" label="Email" type="email" placeholder="Enter Your Email"/>
            <FormInput id="password" type="password" label="Password" placeholder="Enter Password"/>



            <button type="submit"> Sign Up </button>
            <p className="error-text"></p>

        </AuthForm>
    );
}

export default Signup;