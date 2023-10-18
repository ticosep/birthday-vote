import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../store/hooks';
import { setToken } from '../features/auth';
import { Box } from '@mui/material';

const Login = () => {
    const dispatch = useAppDispatch();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <h1>Bem vindo ao concurso melhor fantasia!</h1>
            <h3>Faça o login e vote na sua preferida</h3>
            <GoogleLogin
                size="large"
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
        </Box>
    );
};

export default Login;
