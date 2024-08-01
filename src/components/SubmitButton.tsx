import { ButtonProps } from "@/interfaces";
import React from "react";
import Loading from "../../public/icons/Loading.svg";

const SubmitButton = ({ loading, message }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="px-40 py-5 bg-transparent hover:bg-purple text-purple font-semibold hover:text-white border border-purple hover:border-transparent rounded"
      disabled={loading}
    >
      {loading ? (
        <>
          Loading...
          <Loading className="inline mr-2 w-4 h-4 text-gray-200 animate-spin" />
        </>
      ) : (
        message
      )}
    </button>
  );
};

export default SubmitButton;
