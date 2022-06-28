import TabModal from "./TabModal";
import "./Tabclicked.css";
import { useSelector } from "react-redux";
function Tabclicked() {
  const categories = useSelector((state) => state.item);
  console.log(categories);
  return (
    <TabModal>
      <div className="tab__title">{categories.category}</div>
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
