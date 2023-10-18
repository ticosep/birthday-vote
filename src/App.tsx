import { AppBar, Toolbar, Container, Box } from '@mui/material';
import { fetchCandidates } from './features/candidates';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Login from './components/Login';

function App() {
    const isAuth = useAppSelector((state) => state.auth.token);

    return (
        <>
            <AppBar position="static">
                <Toolbar>Costume Contest!</Toolbar>
            </AppBar>
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    {!isAuth ? <Login /> : <>VOTOS</>}
                </Box>
            </Container>
        </>
    );
}

export default App;
