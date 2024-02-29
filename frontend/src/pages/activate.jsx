import {useLocation} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const Activate = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const activate = async () => {
        await axios.post('http://localhost:3000/api/auth/activate', {token: token})
            .then((response) => {
                console.log(response.data);
                setSuccess(response.data.success);
            }).catch((error) => {
                setError(error.response.data.error);
                // setIsLoaded(true);
            }).finally(() => {
                setIsLoaded(false);
            });
    }

    useEffect(() => {
        activate();
    }, []);

    return (
        <div>
            <h3>Activate Page</h3>
            <div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto'}}>
                {error && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}
            </div>
            {isLoaded && (
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            )}
            {success && (
                <div style={{maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Alert severity="success">
                        <AlertTitle>success</AlertTitle>
                        {success}
                    </Alert>
                </div>
            )}


        </div>
    );
}
