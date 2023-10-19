import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkUserAndAdd, setToken } from '../features/auth';
import { Box, CircularProgress } from '@mui/material';

const Login = () => {
    const dispatch = useAppDispatch();
    const isAddingUser = useAppSelector((app) => app.auth.isAddingToDB);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            {isAddingUser ? (
                <CircularProgress />
            ) : (
                <>
                    <h1>Bem vindo ao concurso melhor fantasia!</h1>
                    <h3>Faça o login e vote na sua preferida</h3>
                    <GoogleLogin
                        size="large"
                        onSuccess={(credentialResponse) => {
                            if (credentialResponse.credential) {
                                dispatch(
                                    setToken(credentialResponse.credential),
                                );
                                dispatch(
                                    checkUserAndAdd(
                                        credentialResponse.credential,
                                    ),
                                );
                            }
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default Login;
