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
import { useRef } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
export default function NestedList() {
  const producers = useRef("");
  const minPrice = useRef("");
  const maxPrice = useRef("");
  const location = useLocation();
  const nav = useNavigate();
  const categories = useSelector((state) => state.item);
  const [open, setOpen] = React.useState([true, true, true]);
  const [category, categorySet] = React.useState(
    categories.subcategory[0].names
  );
  const handleClick1 = () => {
    setOpen([!open[0], open[1], open[2]]);
  };
  const handleClick2 = () => {
    setOpen([open[0], !open[1], open[2]]);
  };
  const changeHandler = () => {
    if (producers.current.value.length === 0)
      categorySet(categories.subcategory[0].names);
    else {
      let pattern = new RegExp(producers.current.value);
      categorySet(
        categories.subcategory[0].names.filter((item) =>
          pattern.test(item.name.slice(item.name.indexOf(" ") + 1))
        )
      );
    }
  };
  const brandQueryHandler = (item) => {
    item.replace(" ", "_");
    nav(item);
  };
  const priceQueryHandler = () => {
    if (minPrice.current.value > maxPrice.current.value)
      alert("کمترین قیمت از بزرگترین نباید بیشتر باشد");
    else {
      nav("?lt=" + minPrice.current.value + "&gt=" + maxPrice.current.value);
    }
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
              ref={producers}
              onChange={changeHandler}
              type={"text"}
              placeholder="جستجوی برند"
            ></input>
          </div>
        </form>
        {category.map((value) => {
          return (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 1 }}
                onClick={() => brandQueryHandler(value.name)}
              >
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
                  primary={value.name.slice(value.name.indexOf(" ") + 1)}
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
                <input
                  className="price__filter"
                  type={"text"}
                  ref={maxPrice}
                ></input>
                <span className="price__filter__span">تا</span>
              </div>
              <div className="price__filter__input__span">
                <input
                  defaultValue={0}
                  className="price__filter"
                  ref={minPrice}
                  type={"text"}
                ></input>
                <span className="price__filter__span">از</span>
              </div>
            </div>
            <input
              type="button"
              onClick={priceQueryHandler}
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
