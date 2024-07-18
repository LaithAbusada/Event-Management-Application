import { ButtonProps } from "@/interfaces/interfaces";
import React from "react";
import LoadingIcon from "../../public/icons/Loading";

const SubmitButton = ({ loading, message }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="px-40 py-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"
      disabled={loading}
    >
      {loading ? (
        <>
          <LoadingIcon />
          Loading...
        </>
      ) : (
        message
      )}
    </button>
  );
};

export default SubmitButton;
