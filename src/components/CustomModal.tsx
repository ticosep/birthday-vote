import { Box, Modal } from '@mui/material';
import { ReactNode } from 'react';

type CustomModalProps = {
    children: ReactNode;
    open: boolean;
};

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

const CustomModal = ({ children, open }: CustomModalProps) => {
    return (
        <Modal open={open} onClose={() => {}}>
            <Box sx={modalStyle}>{children}</Box>
        </Modal>
    );
};

export default CustomModal;
