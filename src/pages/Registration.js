import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

//hooks
import { useForm } from "react-hook-form";

//components
import FormProvider from "../components/hook-form/FormProvider";
import RHFTextField from "../components/hook-form/RHFTextField";
import Iconify from "../components/iconify/Iconify";
import { useDispatch } from "react-redux";
import { register, setUsers } from "../redux/slices/mainContext";

const RegistrationFormFields = {
  Username: "Username",
  Email: "Email",
  Password: "Password",
  ConfirmPassword: "ConfirmPassword",
  RememberMe: "RememberMe",
};

const { Username, Email, Password, ConfirmPassword, RememberMe } =
  RegistrationFormFields;

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [regError, setRegError] = useState(false);
  const navigate = useNavigate();

  const required = "This field is required";

  const RegistrationSchema = Yup.object().shape({
    [Username]: Yup.string().required(required).nullable(),
    [Email]: Yup.string()
      .email("Invalid email address")
      .required(required)
      .nullable(),
    [Password]: Yup.string()
      .required(required)
      .nullable()
      .min(10, "Password must be at least 10 characters long"),
    [ConfirmPassword]: Yup.string()
      .required(required)
      .oneOf([Yup.ref("Password"), null], "passwords must match"),
  });

  const defaultValues = {
    [Username]: "",
    [Password]: "",
    [RememberMe]: true,
  };

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(RegistrationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const cb = (foundUser, data) => {
    if (foundUser) {
      setRegError(true);
    } else {
      dispatch(
        setUsers({
          username: data.Username,
          email: data.Email,
          password: data.Password,
        })
      );
      navigate("/login", { state: { successful: true } });
    }
  };

  useEffect(() => {
    if (regError) {
      setTimeout(() => {
        setRegError(false);
      }, 3000);
    }
  }, [regError]);

  const onSubmit = (data) => {
    dispatch(register(data, cb));
  };

  return (
    <div style={styles.container}>
      <Box style={styles.card} sx={{ boxShadow: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <Typography sx={{ color: "text.secondary.white" }}>
            {"Enter your details below"}.
          </Typography>
        </Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} style={{ paddingTop: 15 }}>
            <RHFTextField name={Username} label="Username" />
            <RHFTextField name={Email} label="Email" />
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
            <RHFTextField
              name={ConfirmPassword}
              label="Confirm Password"
              type={showRepeatPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showRepeatPassword
                            ? "eva:eye-fill"
                            : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {"register"}
              </LoadingButton>
              <Typography
                variant="body2"
                sx={{
                  mt: { md: 2, color: "black" },
                }}
              >
                {"Already have an account"}?{" "}
                <Link variant="subtitle2" component={RouterLink} to={"/login"}>
                  {"Login"}
                </Link>
              </Typography>
            </>
          </Stack>
        </FormProvider>
        {regError && (
          <Alert
            onClose={() => {
              setRegError(false);
            }}
            severity="error"
            style={styles.succ}
          >
            Account with this username already exist
          </Alert>
        )}
      </Box>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    padding: 15,
    alignSelf: "center",
    minHeight: "50vh",
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
