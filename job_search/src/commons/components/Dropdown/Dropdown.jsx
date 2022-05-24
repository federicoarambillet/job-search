import React from "react";

export function Dropdown(props) {
    return (
        <>
            <select onChange={props.onChange} className={props.className}>
                {props.children}
            </select>
        </>
    );
}

export function Option(props) {

    return (
        <option value={props.value}>
         {props.children}
        </option>
    );
}