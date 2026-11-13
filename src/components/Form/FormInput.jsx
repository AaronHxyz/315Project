// a reusable input field with a label for forms
function FormInput({ label, type = "text", placeholder }) {
    return (
        <div className="form-input">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}

export default FormInput;