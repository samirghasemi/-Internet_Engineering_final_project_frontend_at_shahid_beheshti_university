import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import "./Shop.css";
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

function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  //   console.log(props.props);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const nameref = React.useRef("");
  const linkref = React.useRef("");
  const descref = React.useRef("");
  const token = useSelector((state) => state.signintoken);
  const registerHandler = () => {
    console.log(nameref.current.value);
    console.log(descref.current.value);
    console.log(linkref.current.value);
    const url = "http://193.141.126.85:4000/api/shops";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        shop: {
          name: nameref.current.value,
          link: linkref.current.value,
          desc: descref.current.value,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("ثبت  با موفقیت انجام شد");
        } else {
          return res.json().then((data) => {
            let errorMessage = "failed!";
            if (data) {
              errorMessage = Object.values(Object.values(data)[0])[0][0];
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
            label="افزودن مغازه"
            {...a11yProps(0)}
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
            }}
          />

          <Tab
            label="مشاهده مغازه ها"
            {...a11yProps(1)}
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <form className="Changeinfo__form">
          <label
            for="input1"
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
              padding: "10px 0px",
            }}
          >
            نام
          </label>
          <input
            type="text"
            className="Changeinfo__input"
            id="input1"
            ref={nameref}
          ></input>
          <label
            for="input2"
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
              padding: "10px 0px",
            }}
          >
            توضیحات
          </label>
          <input
            type="text"
            className="Changeinfo__input"
            id="input2"
            ref={descref}
          ></input>
          <label
            for="input3"
            style={{
              fontFamily: "iranyekan",
              fontSize: "16px",
              padding: "10px 0px",
            }}
          >
            لینک
          </label>
          <input
            type="text"
            className="Changeinfo__input"
            id="input3"
            ref={linkref}
          ></input>
          <button
            type="button"
            className="Changeinfo__send__button"
            onClick={registerHandler}
          >
            ثبت
          </button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.props.map((item) => {
          return (
            <div className="shops__report__container">
              <h2 className="shops__h"> نام فروشگاه : {item.name}</h2>
              <h4 className="shops__h">توضیحات : {item.desc}</h4>
              <h4 className="shops__h">لینک فروشگاه : {item.link}</h4>
            </div>
          );
        })}
      </TabPanel>
    </Box>
  );
}

export default function Shop() {
  const id = useSelector((state) => state.id);
  const url = "http://193.141.126.85:4000/api/users/" + id;
  const [stores, setStores] = React.useState([]);
  const signin = useSelector((state) => state.signin);
  React.useEffect(() => {
    if (id) {
      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          let temp = await res.json();
          setStores(temp.data.shops);
        } else {
          try {
            const data = await res.json();
            let errorMessage = "failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          } catch (err) {
            alert(err.message);
          }
        }
      });
    }
  }, [id, stores]);
  return (
    <div>
      <BasicTabs props={stores} />
    </div>
  );
}
