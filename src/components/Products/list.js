import * as React from "react";
import "./list.css";
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { useSelector } from "react-redux";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
export default function NestedList() {
  const categories = useSelector((state) => state.item);
  const [open, setOpen] = React.useState([true, true, true]);
  const handleClick1 = () => {
    setOpen([!open[0], open[1], open[2]]);
  };
  const handleClick2 = () => {
    setOpen([open[0], !open[1], open[2]]);
  };
  return (
    <List
      sx={{
        width: "19vw",
        paddingLeft: "10px",
        height: "100%",
        maxHeight: "100%",
        fontFamily: "iranyekan",
        bgcolor: "background.paper",
        position: "relative",
        "& ul": { padding: "10px" },
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick1}>
        <ListItemText
          primaryTypographyProps={{ fontSize: "16px", fontFamily: "iranyekan" }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center",
          }}
          primary="انتخاب برند"
        />
        {open[0] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open[0]} timeout="auto" unmountOnExit>
        <form
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <div className="Searchbrand__input__container">
            <input
              className="Searchbrand__input"
              type={"text"}
              placeholder="جستجوی برند"
            ></input>
          </div>
        </form>
        {categories.subcategory[0].names.map((value) => {
          return (
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontFamily: "iranyekan",
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                  primary={value.name.slice(5)}
                />
              </ListItemButton>
            </List>
          );
        })}
      </Collapse>

      <hr
        style={{
          border: "1px solid ",
          color: "#e9e9e9",
          margin: 0,
          width: "100%",
        }}
      />
      <ListItemButton onClick={handleClick2}>
        <ListItemText
          primaryTypographyProps={{ fontSize: "16px", fontFamily: "iranyekan" }}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center",
          }}
          primary="( تومان ) قیمت"
        />
        {open[1] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open[1]} timeout="auto" unmountOnExit>
        <form
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <div className="price__filter__inp__button">
            <div className="price__filter__container">
              <div className="price__filter__input__span">
                <input className="price__filter" type={"text"}></input>
                <span className="price__filter__span">تا</span>
              </div>
              <div className="price__filter__input__span">
                <input
                  defaultValue={0}
                  className="price__filter"
                  type={"text"}
                ></input>
                <span className="price__filter__span">از</span>
              </div>
            </div>
            <input
              type="submit"
              value="اعمال فیلتر قیمت"
              className="price__filter__submit"
            />
          </div>
        </form>
      </Collapse>
      <hr
        style={{
          border: "1px solid ",
          color: "#e9e9e9",
          marginTop: 0,
          width: "100%",
        }}
      />
    </List>
  );
}