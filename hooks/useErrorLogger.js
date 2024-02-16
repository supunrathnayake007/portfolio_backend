import { useState } from "react";

export default function useErrorLogger() {
  const [errors, setErrors] = useState([]);

  const logError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
    console.error(error);
  };

  return {
    errors,
    logError,
  };
}
