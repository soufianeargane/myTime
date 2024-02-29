import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosInstance from "../api/axiosInstance";
import Box from "@mui/material/Box";
import { set, useForm } from "react-hook-form";

const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const schema = yup.object().shape({
        password: yup.string().required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        setError(null);
        setSuccess(null);
        console.log(data);
        await axiosInstance
            .post(`api/auth/resetpassword/${token}`, data)
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
                            error={!!errors.password}
                            label="password"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p style={{ margin: 0, color: "red" }}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <TextField
                            error={!!errors.confirmPassword}
                            label="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p style={{ margin: 0, color: "red" }}>
                                {errors.confirmPassword.message}
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

export default ResetPassword;
