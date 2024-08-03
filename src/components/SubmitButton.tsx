import { ButtonProps } from "@/interfaces";
import React from "react";
import Loading from "../../public/icons/Loading.svg";

const SubmitButton = ({ loading, message }: ButtonProps) => {
  return (
    <button
      type="submit"
      className=" w-72 sm:w-96 py-5  text-purple bg-darkpurple hover:bg-purple hover:shadow-lg font-semibold text-white border border-purple hover:border-transparent rounded"
      disabled={loading}
    >
      {loading ? (
        <>
          Loading...
          <Loading className="inline  w-4 h-4 text-gray-200 animate-spin" />
        </>
      ) : (
        message
      )}
    </button>
  );
};

export default SubmitButton;
