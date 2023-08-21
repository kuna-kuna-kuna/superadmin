import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
};

export function RHFCheckbox({ name, ...other }) {
  const { control } = useFormContext();
  const error = control._formState?.errors[name];

  return (
    <>
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} />
            )}
          />
        }
        {...other}
      />
      {!!error && (
        <FormHelperText error sx={{ px: 2, textTransform: "capitalize" }}>
          {error.message}
        </FormHelperText>
      )}
    </>
  );
}

// ----------------------------------------------------------------------
