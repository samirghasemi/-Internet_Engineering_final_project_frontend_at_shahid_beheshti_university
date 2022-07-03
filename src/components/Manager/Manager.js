import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Changeinfo from "./ChangeInfo";
import ReportShow from "./ReportShow";
import { combineReducers } from "redux";
function Playground(props) {
  const defaultProps = {
    options: Object.values(props)[0],
    getOptionLabel: (option) => option.title,
  };

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        id="disable-close-on-select"
        onChange={(event, value) => {
          props.func(Object.values(props)[0][1].id);
          console.log(Object.values(props));
        }}
        renderInput={(params) => (
          <TextField {...params} label={props.name} variant="standard" />
        )}
      />
    </Stack>
  );
}
function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  );
}
function AddProduct() {
  // const subCategoryHandler = (input) => {
  //   subCategorySet(input);
  //   fetch("http://193.141.126.85:4000/api/models")
  //     .then(async (res) => await res.json())
  //     .then((item) => {
  //       let temp = item;
  //       let res;
  //       let categorytemp = category;
  //       let subcategorytemp = subCategory;
  //       res = temp.filter(({ category }) => category == categorytemp);
  //       // res = res.filter(({ subcategory }) => subcategory == subcategorytemp);

  //       console.log(res);
  //     });
  // };
  React.useEffect(() => {
    fetch("http://193.141.126.85:4000/api/category").then(async (res) => {
      const cat = await res.json();
      console.log(cat);
    });
  }, []);
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
    </div>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="تغییر مشخصات"
            {...a11yProps(0)}
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
            }}
          />
          <Tab
            label="اضافه کردن کالا"
            {...a11yProps(1)}
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
            }}
          />
          <Tab
            label="گزارشات"
            {...a11yProps(2)}
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Changeinfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddProduct />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReportShow />
      </TabPanel>
    </Box>
  );
}

function Manager() {
  return (
    <div>
      <BasicTabs />
    </div>
  );
}

export default Manager;
