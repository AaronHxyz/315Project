import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";

function Login() {

    function handleSubmit(event) {
        event.preventDefault();
        alert("Login button clicked");
    }

    return (
        <AuthForm title="Welcome Back" onSubmit={handleSubmit}>
            <FormInput label="username" placeholder="Enter Username"/>

            <div className="password-group">
                <FormInput label="password" placeholder="Enter Password"/>
                <a href="/forgot password"> Forgot Password? </a>
            </div>

            <button tpye="submit"> Log In </button>

        </AuthForm>
    );
}

export default Login;