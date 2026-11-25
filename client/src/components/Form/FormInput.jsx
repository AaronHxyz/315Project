// a reusable input field with a label for forms
function FormInput({ label, type = "text", placeholder, id }) {
    return (
        <div className="form-input">
            <label>{label}</label>
            <input type={type} placeholder={placeholder} id={id} />
        </div>
    );
}

export default FormInput;