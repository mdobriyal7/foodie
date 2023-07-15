import React, { ReactNode } from "react";

const FormWrapper=({ children })=> {
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {children}
      </div>
    </>
  );
}

export default FormWrapper;