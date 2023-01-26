import { SignInForm } from "../AuthForms/SignInForm";
import { decodeToken } from "react-jwt";
import { Profile } from "../AuthForms/Profile";


export const SignInPage = ({ token }) => {
    const decodedToken = decodeToken(token);

    return (
        <>
           { decodedToken ? <Profile user={decodedToken} /> : <SignInForm />}
        </>
    );
}