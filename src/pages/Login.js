import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken, login } from "../redux/slices/mainContext";
import { useNavigate } from "react-router";
import { Link as RouterLink, useLocation } from "react-router-dom";
import localStorage from "redux-persist/es/storage";

//yup
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//mui
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

//hooks
import { useForm } from "react-hook-form";

//components
import FormProvider from "../components/hook-form/FormProvider";
import RHFTextField from "../components/hook-form/RHFTextField";
import Iconify from "../components/iconify/Iconify";

const LoginFields = {
  Username: "Username",
  Password: "Password",
};

const { Username, Password } = LoginFields;

export default function Login({ authToken }) {
  const location = useLocation();
  const { successful } = location.state || {};
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const required = "This field is required";
  const [snack, setSnack] = useState(successful);

  useEffect(() => {
    if (authToken) {
      setTimeout(() => {
        navigate("/");
      }, [500]);
    }
  }, [navigate, authToken]);

  const RegistrationSchema = Yup.object().shape({
    [Username]: Yup.string().required(required).nullable(),
    [Password]: Yup.string()
      .required(required)
      .nullable()
      .min(10, "Password must be at least 10 characters long"),
  });

  const defaultValues = {
    [Username]: "",
    [Password]: "",
  };

  useEffect(() => {
    if (snack) {
      setTimeout(() => {
        setSnack(false);
      }, 5000);
    }
  }, [snack]);

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        setLoginError(false);
      }, 3000);
    }
  }, [loginError]);

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(RegistrationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const cb = (foundUser) => {
    if (foundUser) {
      dispatch(setAuthToken("ASSDAIIGWENWNSASA@67231ASDM"));
      localStorage.setItem(
        "AUTH_TOKEN",
        JSON.stringify("ASSDAIIGWENWNSASA@67231ASDM")
      );
      navigate("/");
    } else {
      setLoginError(true);
    }
  };

  const onSubmit = (data) => {
    dispatch(login(data, cb));
  };

  return (
    <>
      {authToken ? (
        <Box sx={styles.spinner}>
          <CircularProgress style={styles.progress} />
        </Box>
      ) : (
        <div style={styles.container}>
          <Box style={styles.card} sx={{ boxShadow: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                Login
              </Typography>
            </Box>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} style={{ paddingTop: 15 }}>
                <RHFTextField name={Username} label="Username" />
                <RHFTextField
                  name={Password}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {"login"}
                </LoadingButton>
                <Typography
                  variant="body2"
                  sx={{
                    mt: { md: 2 },
                  }}
                >
                  {"Don't have account yet"}?{" "}
                  <Link variant="subtitle2" component={RouterLink} to={"/"}>
                    {" Register"}
                  </Link>
                </Typography>
              </Stack>
            </FormProvider>
          </Box>
          {loginError && (
            <Alert
              onClose={() => {
                setLoginError(false);
              }}
              severity="error"
              style={styles.succ}
            >
              Incorrect username or password
            </Alert>
          )}
          {snack && (
            <Alert
              severity="success"
              onClose={() => {
                setSnack(false);
              }}
              style={styles.succ}
            >
              Successfully Registered!
            </Alert>
          )}
        </div>
      )}
    </>
  );
}

const styles = {
  spinner: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  },
  progress: {
    alignSelf: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    padding: 15,
    alignSelf: "center",
    minWidth: "50vh",
    borderRadius: 12,
  },
  succ: {
    position: "absolute",
    bottom: 15,
    right: 15,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  },
};
