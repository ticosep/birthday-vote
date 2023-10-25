import {
    Box,
    CircularProgress,
    Card,
    CardContent,
    LinearProgress,
} from '@mui/material';
import { useCallback } from 'react';
import { useAppSelector } from '../store/hooks';

const MIN = 0;

const Votes = () => {
    const isLoading = useAppSelector((state) => state.candidates.isLoading);
    const candidates = useAppSelector((state) => state.candidates.value) ?? {};
    const candidatesList = Object.values(candidates).sort((c) =>
        c.votes ? c.votes.length : 0,
    );

    const normalize = useCallback(
        (value: number) => {
            return ((value - MIN) * 100) / (candidatesList.length - MIN);
        },
        [candidatesList],
    );

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            justifyContent="center"
        >
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <h1>Obrigado pelo voto! Acompanhe a votação 👻</h1>
                    {candidatesList.map((c) => {
                        const votes = c.votes ? c.votes.length : 0;
                        return (
                            <Card sx={{ width: '100%', mb: 1 }}>
                                <CardContent sx={{ width: '100%' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <h3 style={{ marginRight: '0.5rem' }}>
                                            {c.name}
                                        </h3>
                                        {c.voted ? (
                                            <span>Já votou! 🎃</span>
                                        ) : (
                                            <span>Nâo votou! 😱</span>
                                        )}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={normalize(votes)}
                                            />
                                        </Box>
                                        <Box sx={{ minWidth: 35 }}>
                                            <span>
                                                {votes}/{candidatesList.length}
                                            </span>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })}
                </>
            )}
        </Box>
    );
};

export default Votes;
