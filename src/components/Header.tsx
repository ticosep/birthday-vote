import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWandMagicSparkles,
    faImage,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { AppBar, Container, Box } from '@mui/material';

const Header = () => {
    const { name } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

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
                            color="orange"
                            size="2xl"
                            icon={faImage}
                        />
                    </Box>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;
