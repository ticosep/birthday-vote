import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    Box,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { fetchCandidates } from '../features/candidates';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <form>
                        <Box width="100%">
                            <FormControl>
                                <RadioGroup>
                                    {Object.entries(candidates).map(
                                        ([name]) => (
                                            <Accordion
                                                sx={{ my: 2 }}
                                                key={name}
                                            >
                                                <AccordionSummary
                                                    style={{
                                                        pointerEvents: 'none',
                                                    }}
                                                    expandIcon={
                                                        <FontAwesomeIcon
                                                            style={{
                                                                pointerEvents:
                                                                    'auto',
                                                            }}
                                                            icon={faCamera}
                                                        />
                                                    }
                                                >
                                                    <FormControlLabel
                                                        style={{
                                                            pointerEvents:
                                                                'auto',
                                                        }}
                                                        value={name}
                                                        control={<Radio />}
                                                        label={name}
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <img
                                                        src="https://plus.unsplash.com/premium_photo-1661894950761-312d659007d3?auto=format&fit=crop&q=80&w=1420&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                        alt={name}
                                                        loading="lazy"
                                                        style={{
                                                            height: '100%',
                                                            width: '100%',
                                                            objectFit:
                                                                'contain',
                                                        }}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                        ),
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </form>
                </>
            )}
        </Box>
    );
};

export default CandidatesList;
