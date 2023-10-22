import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWandMagicSparkles,
    faImage,
    faGhost,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AppBar, Container, Box } from '@mui/material';
import { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import { logout } from '../features/auth';
import CustomModal from './CustomModal';

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
                    justifyContent={!token ? 'space-between' : 'flex-end'}
                    alignItems="center"
                >
                    {!token && (
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
                    )}

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
                                onClick={() =>
                                    token ? dispatch(logout()) : null
                                }
                                icon={faSignOut}
                            />
                        )}
                    </Box>
                </Box>
            </Container>
            <CustomModal open={open}>
                <ImageUploadForm setOpen={setOpen} />
            </CustomModal>
        </AppBar>
    );
};

export default Header;
