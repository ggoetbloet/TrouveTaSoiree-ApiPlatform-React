import React from 'react';

const Field = ({ name, label, value, onChange, placeholder, type= "text", error= "" }) => {
    return ( 
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input 
            value={value} 
            onChange={onChange}
            id={name} 
            type={type} 
            className={"form-control" + (error && " is-invalid") }  
            name={name} 
            placeholder={placeholder}
        />
    {error && <p className="invalid-feedback"> {error} </p>}
    </div>
    );
}

 
export default Field;