import React from "react";
import PropTypes from "prop-types";
import "./selectFormInput.css";

const SelectFormInput = ({ label, name, value, onChange, disabled, categories }) => {
  const inputClassName = disabled ? 'edit-containerinput disabled' : 'edit-containerinput';

  return (
    <div className="edit-containersectioninput">
      <div className="edit-containermaininput">
        <div className="edit-containersectionlabel">
          <span className="edit-text04">
            <span>{label}</span>
          </span>
        </div>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClassName}
          disabled={disabled}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

SelectFormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      categoryName: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default SelectFormInput;
