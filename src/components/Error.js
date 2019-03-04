import React from "react";

const Errors = ({ errors }) => (
    <pre className="error">
        {errors.map((err, i) => (
            <div key={i}>{err.message}</div>
        ))}
    </pre> 
);

export default Errors;
