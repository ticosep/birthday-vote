import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDatabase, ref, update } from 'firebase/database';
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
    Button,
} from '@mui/material';
import { faCamera, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import CustomModal from './CustomModal';
import { setUserVoted } from '../features/candidates';

type VoteType = {
    userEmail: string;
    userUid: string;
    userName: string;
};

const CandidatesList = () => {
    const dispatch = useAppDispatch();
    const [showVoteButton, setShowVoteButton] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const auth = useAppSelector((state) => state.auth);
    const isLoading = useAppSelector((state) => state.candidates.isLoading);
    const candidates = useAppSelector((state) => state.candidates.value) ?? {};

    const { handleSubmit, setValue, watch } = useForm<VoteType>({
        mode: 'onChange',
    });

    const { userName } = watch();

    const handleSelect = (uid: string, email: string, name: string) => {
        setValue('userEmail', email);
        setValue('userUid', uid);
        setValue('userName', name);

        setShowVoteButton(true);
    };

    const onSubmit = async (data: VoteType) => {
        setLoading(true);
        const dbRef = ref(getDatabase());
        const userVoted = candidates[data.userUid];
        const votes = userVoted.votes
            ? userVoted.votes.push(auth.uid)
            : [auth.uid];
        const updates = {
            [`candidates/${data.userUid}`]: {
                ...userVoted,
                votes,
            },
            [`candidates/${auth.uid}`]: {
                ...candidates[auth.uid],
                voted: true,
            },
        };

        await update(dbRef, updates);

        dispatch(setUserVoted({ uid: auth.uid }));

        setLoading(false);
        setOpen(false);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            width="100%"
        >
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <h1>Selecione a sua preferida!</h1>
                    <form id="vote" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{ width: '100%' }}>
                            <RadioGroup>
                                {Object.entries(candidates).map(
                                    ([uid, props]) => {
                                        return (
                                            <Accordion
                                                sx={{ my: 2 }}
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
                                                                disabled={
                                                                    uid ===
                                                                    auth.uid
                                                                }
                                                                onClick={() =>
                                                                    handleSelect(
                                                                        uid,
                                                                        props.email,
                                                                        props.name,
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={props.name}
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails
                                                    sx={{
                                                        width: '100%',
                                                        height: '500px',
                                                    }}
                                                >
                                                    {props.image ? (
                                                        <img
                                                            src={props.image}
                                                            alt={props.name}
                                                            loading="lazy"
                                                            style={{
                                                                height: '100%',
                                                                width: '100%',
                                                                objectFit:
                                                                    'scale-down',
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
                        <CustomModal open={open}>
                            <>
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    <>
                                        <h3>{`Você está votando no candidato ${userName}`}</h3>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Button
                                                type="submit"
                                                form="vote"
                                                variant="contained"
                                                color="success"
                                                sx={{ marginBottom: '1rem' }}
                                                fullWidth
                                            >
                                                <strong>Enviar</strong>
                                            </Button>
                                            <Button
                                                onClick={() => setOpen(false)}
                                                variant="outlined"
                                                color="error"
                                                fullWidth
                                            >
                                                <strong>Cancelar</strong>
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </>
                        </CustomModal>
                    </form>
                </>
            )}
        </Box>
    );
};

export default CandidatesList;
