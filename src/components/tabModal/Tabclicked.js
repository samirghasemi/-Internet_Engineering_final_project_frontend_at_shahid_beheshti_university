import TabModal from "./TabModal";
import "./Tabclicked.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Tabclicked() {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.item);
  const Dispatch = useDispatch();
  const linkclicked = (e, path) => {
    Dispatch({ type: "link" });
    navigate(path, { replace: true });
  };
  return (
    <TabModal>
      <Link
        className="Tab__Link"
        to={"/browse/" + categories.id}
        onClick={(e) => linkclicked(e, "/browse/" + categories.id)}
      >
        <div className="tab__title">{categories.category}</div>
      </Link>
      <hr className="tab__title__hr" />

      {categories.subcategory.map((subject) => (
        <div>
          <Link
            onClick={(e) =>
              linkclicked(e, "/browse/" + categories.id + "/" + subject.id)
            }
            className="Tab__Link"
            to={"/browse/" + categories.id + "/" + subject.id}
          >
            <div className="tab__title__name">{subject.title}</div>
          </Link>
          {subject.names.map((name) => (
            <Link
              onClick={(e) =>
                linkclicked(
                  e,
                  "/browse/" + categories.id + "/" + subject.id + "/" + name.id
                )
              }
              className="Tab__Link"
              to={"/browse/" + categories.id + "/" + subject.id + "/" + name.id}
            >
              <div className="tab__title__name__detail">{name.name}</div>
            </Link>
          ))}
        </div>
      ))}
    </TabModal>
  );
}
export default Tabclicked;
