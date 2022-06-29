import TabModal from "./TabModal";
import "./Tabclicked.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Tabclicked() {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.item);
  console.log(categories);
  const Dispatch = useDispatch();
  const linkclicked = (e, path) => {
    e.preventDefault();
    Dispatch({ type: "link" });
    navigate("/home");
    navigate(path);
  };
  return (
    <TabModal>
      <Link to={"/browse"} onClick={(e) => linkclicked(e, "/browse")}>
        <div className="tab__title">{categories.category}</div>
      </Link>
      <hr className="tab__title__hr" />

      {categories.subcategory.map((subject) => (
        <div>
          <div className="tab__title__name">{subject.title}</div>
          {subject.names.map((name) => (
            <div className="tab__title__name__detail">{name.name}</div>
          ))}
        </div>
      ))}
    </TabModal>
  );
}
export default Tabclicked;
