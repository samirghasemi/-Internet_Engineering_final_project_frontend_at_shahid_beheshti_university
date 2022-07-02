import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
export default function Playground(props) {
  console.log(props);
  const defaultProps = {
    options: Object.values(props)[0],
    getOptionLabel: (option) => option.title,
  };

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        onChange={(event, value) => console.log(value)}
        renderInput={(params) => (
          <TextField {...params} label="دسته بندی" variant="standard" />
        )}
      />
    </Stack>
  );
}
