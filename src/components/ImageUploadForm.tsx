import { Box, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as db from 'firebase/database';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserImage } from '../features/candidates';

type UploadType = {
    image: FileList;
};

const ImageUploadForm = ({
    setOpen,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const { uid } = useAppSelector((state) => state.auth);
    const candidates = useAppSelector((state) => state.candidates.value);
    const dispatch = useAppDispatch();

    const [isUploading, setIsUploading] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const { register, handleSubmit, watch } = useForm<UploadType>({
        mode: 'onChange',
    });
    const image = watch('image');

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = URL.createObjectURL(image[0]);
        }
    }, [imgRef, image]);

    const onSubmit = async (data: UploadType) => {
        setIsUploading(true);

        const storage = getStorage();
        const dbRef = db.ref(db.getDatabase());
        const storageRef = ref(storage, `/images/${uid}.${data.image[0].type}`);

        const uploadTask = await uploadBytes(storageRef, data.image[0]);

        const imageUrl = await getDownloadURL(uploadTask.ref);

        const updates = {
            [`candidates/${uid}`]: {
                ...candidates[uid],
                uid,
                image: imageUrl,
            },
        };
        await db.update(dbRef, updates);

        dispatch(setUserImage({ imageUrl, uid }));

        setIsUploading(false);

        setOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isUploading ? (
                <CircularProgress />
            ) : (
                <>
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ cursor: 'pointer' }}
                        >
                            {image && image?.length ? (
                                <img
                                    ref={imgRef}
                                    src="#"
                                    alt="selected img"
                                    style={{
                                        height: '350px',
                                        width: '350px',
                                        objectFit: 'scale-down',
                                    }}
                                />
                            ) : (
                                <svg
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                            )}

                            <p>
                                <span>Click para selecionar</span>
                                <span> ou arraste o arquivo</span>
                                <span> PNG ou JPG </span>
                            </p>
                        </Box>
                    </label>
                    <input
                        id="dropzone-file"
                        type="file"
                        style={{
                            display: 'none',
                        }}
                        accept=".jpg,.jpeg,.png"
                        {...register('image', { required: true })}
                    />
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Button
                            type="submit"
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
        </form>
    );
};

export default ImageUploadForm;
