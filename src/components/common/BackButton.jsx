import React from "react";
import { useNavigate } from "react-router";

const BackButton = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={className}>
      ⟵ Back
    </button>
  );
};

export default BackButton;
