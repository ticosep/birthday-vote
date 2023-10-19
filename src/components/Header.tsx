import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWandMagicSparkles,
    faImage,
    faGhost,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AppBar, Container, Box, Modal } from '@mui/material';
import { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import { logout } from '../features/auth';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '1px solid white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const Header = () => {
    const { name } = useAppSelector((state) => state.auth);
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box display="flex" alignItems="center">
                        <h3
                            style={{
                                marginRight: '1rem',
                            }}
                        >
                            Melhor fantasia
                        </h3>
                        <FontAwesomeIcon
                            color="orange"
                            size="2xl"
                            icon={faWandMagicSparkles}
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <h3
                            style={{
                                marginRight: '1rem',
                            }}
                        >
                            {name}
                        </h3>
                        <FontAwesomeIcon
                            style={{
                                cursor: token ? 'pointer' : 'inherit',
                            }}
                            color="orange"
                            size="xl"
                            onClick={() => (token ? setOpen(true) : null)}
                            icon={token ? faImage : faGhost}
                        />
                        {!!token && (
                            <FontAwesomeIcon
                                style={{
                                    cursor: 'pointer',
                                    marginLeft: '1rem',
                                }}
                                color="orange"
                                size="xl"
                                onClick={() => dispatch(logout())}
                                icon={faSignOut}
                            />
                        )}
                    </Box>
                </Box>
            </Container>
            <Modal open={open} onClose={() => {}}>
                <Box sx={modalStyle}>
                    <ImageUploadForm setOpen={setOpen} />
                </Box>
            </Modal>
        </AppBar>
    );
};

export default Header;
