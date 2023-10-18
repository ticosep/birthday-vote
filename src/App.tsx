import { AppBar, Toolbar, Container, Box } from '@mui/material';
import { useAppSelector } from './store/hooks';
import Login from './components/Login';
import CandidatesList from './components/CandidatesList';

function App() {
    const isAuth = useAppSelector((state) => state.auth.token);

    return (
        <>
            <AppBar position="static">
                <Toolbar>Melhor fantasia!</Toolbar>
            </AppBar>
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="calc(100vh - 64px)"
                >
                    {!isAuth ? <Login /> : <CandidatesList />}
                </Box>
            </Container>
        </>
    );
}

export default App;
