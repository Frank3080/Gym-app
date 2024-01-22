import React from "react";

const Button = (props) => {
  const { text, func } = props;
  return (
    <button
      onClick={func}
      className="px-8 mx-auto py-4 rounded-md border-[2px] bg-slate-950 border-purple-600 border-solid purpleShadow duration-200"
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
