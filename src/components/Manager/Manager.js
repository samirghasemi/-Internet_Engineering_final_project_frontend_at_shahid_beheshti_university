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
        onChange={(event, value) =>
          props.func(Object.values(props)[0].indexOf(value))
        }
        renderInput={(params) => (
          <TextField {...params} label={props.name} variant="standard" />
        )}
      />
    </Stack>
  );
}
function AddProduct() {
  const [procedure, procedureSet] = React.useState(false);
  const [catSub, catSubSet] = React.useState(false);
  const [categories, categoriesSet] = React.useState(false);
  const [subcategories, subcategoriesSet] = React.useState(false);
  console.log(procedure);
  const procedureHandler = (input) => {
    procedureSet(input);
  };
  const [category, categorySet] = React.useState(false);
  const [subCategory, subCategorySet] = React.useState(false);
  const categoryHandler = (input) => {
    categorySet(input);
  };
  React.useEffect(() => {
    fetch("http://193.141.126.85:4000/api/category").then(async (res) => {
      const cat = await res.json();
      const temp = [];
      console.log(cat);
      cat.map((item) => temp.push({ title: item.category }));
      categoriesSet(temp);
      const temp1 = [];
      cat.map((item) =>
        item.subcategory.map((ti) => temp1.push({ title: ti.title }))
      );
      catSubSet(temp1);
    });
  }, []);
  return (
    <div>
      <div>
        <Playground
          props={[
            { title: "ایجاد کالای جدید" },
            { title: "اضافه کردن کالا به فروشگاه" },
          ]}
          func={procedureHandler}
          name="شیوه اضافه کردن"
        />
      </div>
      <div>
        {procedure === 1 && (
          <Playground
            props={
              categories === false
                ? [{ title: "دسته بندی یافت نشد" }]
                : categories
            }
            func={categoryHandler}
            name=" دسته بندی ها"
          />
        )}
        {category !== false && (
          <Playground
            props={
              catSub === false ? [{ title: "دسته بندی یافت نشد" }] : catSub
            }
            func={subCategorySet}
            name="زیر دسته"
          />
        )}
        {subCategory !== false && (
          <Playground
            props={[
              { title: "ایجاد کالای جدید" },
              { title: "اضافه کردن فروشگاه" },
            ]}
            func={procedureHandler}
            name=" مدل ها"
          />
        )}
      </div>
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
        Item Three
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
