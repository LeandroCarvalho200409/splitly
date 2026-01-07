import { Link } from "react-router-dom";

export function RegisterConfirm() {
    return(
        <div className="flex justify-center h-screen">
            <h1>Thank you for signing up to Splitly!</h1>
            <p>You should receive an E-mail-Confirmation Mail in a few instants. Please confirm your E-mail Address and enjoy your experience with Splitly</p>
            <Link to='/login'>Login</Link>
        </div>
    );
}