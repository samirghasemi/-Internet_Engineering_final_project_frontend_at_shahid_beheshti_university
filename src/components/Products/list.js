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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AllProducts from "./AllProducts";
export default function NestedList() {
  const producers = useRef("");
  const minPrice = useRef("");
  const maxPrice = useRef("");
  const params = useParams();
  const location = useLocation();
  const nav = useNavigate();
  const storeitem = useSelector((state) => state.item);
  const [searchcategory, searchcategorySet] = React.useState([]);
  const [open, setOpen] = React.useState([true, true, true]);
  const [category, categorySet] = React.useState([]);
  const [allcat, allcatSet] = React.useState([]);
  React.useEffect(() => {
    fetch("http://193.141.126.85:4000/api/category")
      .then(async (res) => await res.json())
      .then((items) => {
        let temp = items;
        let res;
        if (params.id1) {
          res = temp.filter(({ id }) => id == params.id1);
          res = res[0].subcategory;
          let temp1 = [];
          res.map((item) => temp1.push({ ...item, category_id: params.id1 }));
          res = temp1;
        } else {
          let cats = [];
          temp.map((item) => cats.push(...item.subcategory));
          res = cats;
        }
        if (params.id2) {
          res = res.filter(({ id }) => id == params.id2);
          res = res[0].names;
        } else {
          let subcats = [];
          res.map((item) => subcats.push(...item.names));
          res = subcats;
          console.log(subcats);
        }
        if (params.id3) {
          res = res.filter(({ id }) => id == params.id3);
        }
        // if (min_price) {
        //   res = res.filter(({ price }) => price >= min_price);
        // }
        // if (max_price) {
        //   res = res.filter(({ price }) => price <= max_price);
        // }
        categorySet(res);
        allcatSet(res);
      });
  }, [params.id1, params.id2, params.id3]);

  const handleClick1 = () => {
    setOpen([!open[0], open[1], open[2]]);
  };
  const handleClick2 = () => {
    setOpen([open[0], !open[1], open[2]]);
  };
  const changeHandler = () => {
    if (producers.current.value.length === 0) categorySet(allcat);
    else {
      let pattern = new RegExp(producers.current.value);
      categorySet(
        category.filter((item) =>
          pattern.test(item.name.slice(item.name.indexOf(" ") + 1))
        )
      );
    }
  };
  const brandQueryHandler = (item) => {
    const id1 = storeitem.id;
    let temp = storeitem.subcategory;
    let id2;
    temp.map((item1) =>
      item1.names.find((item2) => item2.id === item.id)
        ? (id2 = item1.id)
        : void 0
    );

    window.location.href = id1 + "/" + id2 + "/" + item.id;
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
                onClick={() => brandQueryHandler(value)}
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
