import { initializeApp } from 'firebase/app';
import env from 'react-dotenv';

const config = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    databaseUrl: env.DATABASE_URL,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID,
};

initializeApp(config);
