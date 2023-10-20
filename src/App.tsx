import { Container, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Login from './components/Login';
import CandidatesList from './components/CandidatesList';
import Header from './components/Header';
import { fetchCandidates } from './features/candidates';
import { useEffect } from 'react';

function App() {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchCandidates());
        }
    }, [dispatch, token]);

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
