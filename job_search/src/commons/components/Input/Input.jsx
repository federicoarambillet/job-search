import React from 'react';

function Input({ attribute, checked, onChange }) {
  return (
    <div>
      <input
        id={attribute.id}
        name={attribute.name}
        placeholder={attribute.placeholder}
        type={attribute.type}
        className={attribute.className}
        required={attribute.required}
        value={null ? "" : attribute.value}
        ref={null ? "" : attribute.ref}
        checked={null ? "" : checked}
        onChange={null ? "" : onChange}
      />
    </div>
  )
}

export default Input;



