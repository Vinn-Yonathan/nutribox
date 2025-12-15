import React from "react";

const FooterInfo = () => {
  return (
    <div className="flex flex-col justify-center font-jomhuria md:flex-row md:justify-between md:items-center">
      <h2 className="text-4xl self-center md:text-5xl">NUTRIBOX</h2>
      <div className="flex justify-between md:justify-around md:gap-x-10 md:text-xl">
        <address className="not-italic">
          <p>info@nutribox.com</p>
        </address>
        <p>&copy; 2025. All rights reserved</p>
        <address className="not-italic">
          <p>+1 (000) 000-0000</p>
        </address>
      </div>
    </div>
  );
};

export default FooterInfo;
