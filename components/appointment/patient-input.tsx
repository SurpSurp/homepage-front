import React from "react";

interface IPatientInputProps {
  text: string;
  inputFor: string;
  type: string;
  placeholder: string;
}

const PatientInput: React.FC<IPatientInputProps> = ({
  text,
  inputFor,
  type,
  placeholder,
}) => {
  if (type == "textarea") {
    return (
      <div className="relative space-y-0.5">
        <label
          htmlFor={`${inputFor}-input`}
          className="text-gray-600 font-medium"
        >
          {text}
        </label>
        <textarea
          name={inputFor}
          id={`${inputFor}-input`}
          placeholder={placeholder}
          rows={7}
          className="w-full border border-[#B3B3B3] focus:outline-none px-2.5 py-1.5 text-sm"
        ></textarea>
      </div>
    );
  }
  return (
    <div className="relative space-y-0.5">
      <label
        htmlFor={`${inputFor}-input`}
        className="text-gray-600 font-medium"
      >
        {text}
      </label>
      <input
        type={type}
        name={inputFor}
        id={`${inputFor}-input`}
        placeholder={placeholder}
        className="w-full border border-[#B3B3B3] focus:outline-none px-2.5 py-1.5 text-sm"
        required
      />
      <span className="absolute right-0 bottom-0 pb-1.5 pr-2.5 text-sm text-red-400 font-medium">
        필수
      </span>
    </div>
  );
};

export default PatientInput;
