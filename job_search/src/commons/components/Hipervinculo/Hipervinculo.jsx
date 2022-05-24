import React from "react";

function Hipervinculo({ attribute, onClick, text }) {
    return (
        <>
            <a
                href={null ? "" : attribute.href}
                name={null ? "" : attribute.name}
                id={null ? "" : attribute.id}
                className={attribute.className}
                onClick={null ? "" : onClick}

            >{text}
            </a>
        </>
    )
}

export default Hipervinculo;