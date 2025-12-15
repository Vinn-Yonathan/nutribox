import React from "react";

const ProfileField = ({ label, value }) => {
  return (
    <div className="md:basis-1/2 md:px-8">
      <h2 className="font-semibold mb-2">{label}</h2>
      <p>{value}</p>
      <hr />
    </div>
  );
};

export default ProfileField;
