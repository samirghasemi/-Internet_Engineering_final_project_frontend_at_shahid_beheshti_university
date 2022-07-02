import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function Report() {
  return (
    <div>
      <h1></h1>
    </div>
  );
}
export default function ReportShow() {
  const token = useSelector((state) => state.signintoken);
  const id = useSelector((state) => state.id);
  const url = "http://193.141.126.85:4000/api/users/" + id;
  const [reports, reportsSet] = useState([]);
  const [shops, shopsSet] = useState([]);
  var fetc = false;
  useEffect(() => {
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(async (res) => {
      if (res.ok) {
        let temp = await res.json();
        shopsSet(temp.data.shops);
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
  }, []);
  return (
    <div>
      <h3>گزارشات</h3>
      {shops.map((item) => {
        return (
          <div className="shops__report__container">
            <h2 className="shops__h"> نام فروشگاه : {item.name}</h2>
            <h4 className="shops__h">توضیحات :{item.desc} </h4>
            <h4 className="shops__h">لینک فروشگاه :{item.link} </h4>
            <h4 className="shops__h">گزارش ها : </h4>
            <div>
              {item.reports.map((item2) => {
                return (
                  <div className="shops__report__container">
                    <h4 style={{ margin: "10px" }} className="shops__h">
                      {" "}
                      مشکل : {item2.message}
                    </h4>
                    <h4 className="shops__h" style={{ margin: "10px" }}>
                      توضیحات :{item2.desc}{" "}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
