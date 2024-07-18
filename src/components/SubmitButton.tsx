import { ButtonProps } from "@/interfaces/interfaces";
import React from "react";
import Loading from "../../public/icons/Loading.svg";

const SubmitButton = ({ loading, message }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="px-40 py-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loading className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" />
          Loading...
        </>
      ) : (
        message
      )}
    </button>
  );
};

export default SubmitButton;
