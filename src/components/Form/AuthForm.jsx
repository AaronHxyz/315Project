//reusable form layout for user authentication (login and sign up)
import "./AuthForm.css";

function AuthForm({ title, children, onSubmit }) {
    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={onSubmit}>
                <h1>{title}</h1>

                {children}
            </form>
        </div>
    );
}

export default AuthForm;