import { Container, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Login from './components/Login';
import CandidatesList from './components/CandidatesList';
import Header from './components/Header';
import { fetchCandidates } from './features/candidates';
import { useEffect } from 'react';

function App() {
    const dispatch = useAppDispatch();
    const { token, uid } = useAppSelector((state) => state.auth);
    const candidates = useAppSelector((state) => state.candidates.value);
    const voted = candidates[uid]?.voted;

    console.log(voted);

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
                    justifyContent="center"
                    alignItems={!!token ? 'flex-start' : 'center'}
                    minHeight="calc(100vh - 64px)"
                >
                    {!token ? (
                        <Login />
                    ) : (
                        <>
                            {voted ? (
                                <h1>
                                    Obrigado pelo voto! Aguarde o resultado 👻
                                </h1>
                            ) : (
                                <CandidatesList />
                            )}
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default App;
