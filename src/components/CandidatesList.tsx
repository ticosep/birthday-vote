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
    IconButton,
} from '@mui/material';
import { faCamera, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

type VoteType = {
    userEmail: string;
};

const CandidatesList = () => {
    const dispatch = useAppDispatch();
    const [showVoteButton, setShowVoteButton] = useState(false);
    const [open, setOpen] = useState(false);

    const isLoading = useAppSelector((state) => state.candidates.isLoading);
    const candidates = useAppSelector((state) => state.candidates.value);

    const { handleSubmit, setValue } = useForm<VoteType>({
        mode: 'onChange',
    });

    const handleSelect = (email: string) => {
        setValue('userEmail', email);
        setShowVoteButton(true);
    };

    const onSubmit = async (data: VoteType) => {
        console.log(data);
    };

    return (
        <Box display="flex" flexDirection="column" textAlign="center">
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <h1>Selecione a sua preferida!</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                                        control={
                                                            <Radio
                                                                onClick={() =>
                                                                    handleSelect(
                                                                        props.email,
                                                                    )
                                                                }
                                                            />
                                                        }
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
                        {showVoteButton && (
                            <IconButton
                                sx={{
                                    position: 'fixed',
                                    border: '1px solid orange',
                                    padding: '1rem',
                                    right: '1rem',
                                    bottom: '1rem',
                                }}
                                onClick={() => setOpen(true)}
                                color="error"
                                aria-label="add to shopping cart"
                            >
                                <FontAwesomeIcon
                                    size="2xl"
                                    color="orange"
                                    icon={faCheckToSlot}
                                />
                            </IconButton>
                        )}
                    </form>
                </>
            )}
        </Box>
    );
};

export default CandidatesList;
