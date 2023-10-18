import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../store/hooks';
import { setToken } from '../features/auth';

const Login = () => {
    const dispatch = useAppDispatch();

    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                        dispatch(setToken(credentialResponse.credential));
                        console.log(credentialResponse);
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            <main>This app is using the dark mode</main>
        </>
    );
};

export default Login;
