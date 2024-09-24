import React from "react";
import css from "../ErrorMessage/ErrorMessage.module.css";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <h2 className={css.errorMessage}>
      {error}. Please, try again later or reload the peage.
    </h2>
  );
};

export default ErrorMessage;
