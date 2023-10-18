import { ThemeProvider, AppBar, Toolbar, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './setup/theme';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import env from 'react-dotenv';

function App() {
    return (
        <GoogleOAuthProvider clientId={env.CLIENT_ID}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>Costume Contest!</Toolbar>
                </AppBar>
                <Container>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    <main>This app is using the dark mode</main>
                </Container>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
