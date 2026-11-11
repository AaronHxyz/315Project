import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";

function Signup() {

    function handleSubmit(event) {
        event.preventDefault();
        alert("Signup button clicked");
    }

    return (
        <AuthForm title="Create A New Account" onSubmit={handleSubmit}>
            <FormInput label="username" placeholder="Enter Username"/>
            <FormInput label="email" type="email" placeholder="Enter Your Email"/>
            <FormInput label="password" placeholder="Enter Password"/>


            <button tpye="submit"> Sign Up </button>

        </AuthForm>
    );
}

export default Signup;