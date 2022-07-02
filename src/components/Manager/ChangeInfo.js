import "./Manager.css";
import { useRef } from "react";
import { useSelector } from "react-redux";
function Changeinfo() {
  const nameref = useRef("");
  const numberref = useRef("");
  const emailref = useRef("");
  const token = useSelector((state) => state.signintoken);
  const kol = "Bearer " + token;
  console.log(kol);
  const id = useSelector((state) => state.id);
  const sendHandler = () => {
    const url = "http://193.141.126.85:4000/api/users/" + id;
    fetch(url, {
      method: "put",
      body: JSON.stringify({
        user: {
          name: nameref.current.value,
          email: emailref.current.value,
          phone: numberref.current.value,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(async (res) => {
      if (res.ok) {
        console.log(await res.json());
      } else {
        try {
          const data = await res.json();
          let errorMessage = "Authentication failed!";
          // if (data && data.error && data.error.message) {
          //   errorMessage = data.error.message;
          // }
          throw new Error(errorMessage);
        } catch (err) {
          alert(err.message);
        }
      }
    });
  };
  return (
    <div>
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
          ایمیل
        </label>
        <input type="text" className="Changeinfo__input" id="input2"></input>
        <label
          for="input3"
          style={{
            fontFamily: "iranyekan",
            fontSize: "16px",
            padding: "10px 0px",
          }}
          ref={emailref}
        >
          شماره موبایل
        </label>
        <input
          type="text"
          className="Changeinfo__input"
          id="input3"
          ref={numberref}
        ></input>
        <button
          onClick={sendHandler}
          type="button"
          className="Changeinfo__send__button"
        >
          انجام تغییرات
        </button>
      </form>
    </div>
  );
}

export default Changeinfo;
