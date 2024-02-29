import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import validateToken from "../helpers/validateToken";
import { useUser } from "../contexts/UserContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../api/axiosInstance";

const ForgotPassword = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { setUser } = useUser();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        console.log(data);
        await axiosInstance
            .post("/api/auth/forgotpassword", data)
            .then((response) => {
                try {
                    console.log(response.data);
                    setSuccess(response.data.success);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setError(error.response.data.error);
            });
    };

    useEffect(() => {
        async function checkTOKEN() {
            try {
                let result = await validateToken();
                if (result.success) {
                    setUser(result.user);
                    navigate("/client");
                }
            } catch (error) {
                console.log("hhhh");
            }
        }

        checkTOKEN();
    }, []);

    return (
        <div>
            <h1>Forgot Password</h1>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    style={{
                        maxWidth: "400px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    {success && (
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            {success}
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    )}
                    <div>
                        <TextField
                            error={!!errors.email}
                            label="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p style={{ margin: 0, color: "red" }}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default ForgotPassword;
