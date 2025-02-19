import { useNavigate, useRouteError } from "react-router";

export const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

    return(
        <>
                <section className="error-section">
                <div id="error-text">
                    <figure>
                        <img src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif" 
                        alt="404-page" />
                    </figure>
                    <div className="text-center">
                        <p className="p-a">
                        Sorry, an unexpected error has occurred.
                        </p>
                        <p className="p-b">{error.statusText || error.message}</p>
                    </div>
                </div>
        <button className="btn-error" onClick={handleGoBack}>
          Go Back
        </button>
            </section>
    </>
)
    
    // return <h1> The Page you are looking does not exist </h1>
};