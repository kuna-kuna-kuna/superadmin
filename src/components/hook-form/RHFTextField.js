import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { capitalize, TextField } from "@mui/material";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          autoComplete="off"
          {...field}
          fullWidth
          error={!!error}
          InputProps={{
            sx: {
              borderColor: "white",
            },
          }}
          helperText={error?.message ? capitalize(error?.message) : ""}
          {...other}
        />
      )}
    />
  );
}
