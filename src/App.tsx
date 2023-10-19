import { Container, Box } from '@mui/material';
import { useAppSelector } from './store/hooks';
import Login from './components/Login';
import CandidatesList from './components/CandidatesList';
import Header from './components/Header';

function App() {
    const token = useAppSelector((state) => state.auth.token);

    return (
        <>
            <Header />
            <Container>
                <Box
                    display="flex"
                    justifyContent={!!token ? 'flex-start' : 'center'}
                    alignItems={!!token ? 'flex-start' : 'center'}
                    minHeight="calc(100vh - 64px)"
                >
                    {!token ? <Login /> : <CandidatesList />}
                </Box>
            </Container>
        </>
    );
}

export default App;
