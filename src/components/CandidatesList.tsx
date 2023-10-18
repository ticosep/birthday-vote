import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Box, CircularProgress } from '@mui/material';
import { fetchCandidates } from '../features/candidates';
import { useEffect } from 'react';

const CandidatesList = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, [dispatch]);

    const isLoading = useAppSelector((state) => state.candidates.isLoading);
    const candidates = useAppSelector((state) => state.candidates.value);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
        >
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <h1>Selecione apenas uma!</h1>
                    <h3>
                        Não tente roubar, nós temos um sistema de auditoria{' '}
                    </h3>
                    {Object.entries(candidates).map(([a, b]) => (
                        <span>{a}</span>
                    ))}
                </>
            )}
        </Box>
    );
};

export default CandidatesList;
