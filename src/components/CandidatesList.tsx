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
                    <h1>Selecione a sua preferida!</h1>
                    <form>
                        <FormControl>
                            <RadioGroup>
                                {Object.entries(candidates).map(
                                    ([_, props]) => {
                                        return (
                                            <Accordion
                                                sx={{ my: 2, width: '100%' }}
                                                key={props.name}
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
                                                        value={props.email}
                                                        control={<Radio />}
                                                        label={props.name}
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {props.image ? (
                                                        <img
                                                            src={props.image}
                                                            alt={props.name}
                                                            style={{
                                                                height: '100%',
                                                                width: '100%',
                                                                objectFit:
                                                                    'contain',
                                                            }}
                                                        />
                                                    ) : (
                                                        <span>
                                                            Sem foto ainda 😥
                                                        </span>
                                                    )}
                                                </AccordionDetails>
                                            </Accordion>
                                        );
                                    },
                                )}
                            </RadioGroup>
                        </FormControl>
                    </form>
                </>
            )}
        </Box>
    );
};

export default CandidatesList;
