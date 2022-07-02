import { useEffect } from "react";
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
  const kol = "Bearer " + token;
  console.log(kol);
  const id = useSelector((state) => state.id);
  const url = "http://193.141.126.85:4000/api/users/" + id;
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
        temp.data.reports.map((item) => console.log(item));
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
      <p>گزارش</p>
    </div>
  );
}
