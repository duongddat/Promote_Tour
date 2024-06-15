import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const error = useRouteError();
  let message = "Something went wrong!";

  if (error.status === 404) {
    message = "This page could not be found";
  }

  return (
    <div className="h-100vh d-flex justify-content-center align-items-center">
      <h1 className="error-status">{error.status}</h1>
      <div className="error-message">{message}</div>
    </div>
  );
}

export default ErrorPage;
