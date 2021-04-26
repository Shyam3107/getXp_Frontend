import { useRef, useState } from "react";
import colleges from "./colleges";
import { validateEmail, validateContact } from "./Validation";

let years = [];

for (let i = new Date().getFullYear() + 5; i >= 1980; i--) {
  years.push(i);
}

export let Register = () => {
  const first_name = useRef(null);
  let [user, changeUser] = useState({
    first_name:"",
    last_name:"",
    contact_number:"",
    city:"",
    email_id:"",
    college_name:""
  });
  let [emailVaild, setEmailVaild] = useState(true);
  let [contactValid, setContactValid] = useState(true);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.id;
    changeUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // send user data to backend
    let submitButton=document.getElementsByTagName("button")[1];
    submitButton.disabled=true;
    submitButton.innerText="Please Wait"
    fetch("https://getxp-backend.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Success") {
          alert("Success");
          let inputField = document.forms[0].getElementsByTagName("input");
          for (let field = 0; field < inputField.length; field++) {
            inputField[field].value = "";
          }
        } else {
          alert("Something went wrong, Please Try Again");
        }
        submitButton.innerText="Register";
        submitButton.disabled=false;
        first_name.current.focus();
      })
      .catch((err) => {
        submitButton.innerText="Register";
        submitButton.disabled=false;
        alert("Something went wrong, Please Try Again");
      });
  };

  const validateAndHandle = (e) => {
    setEmailVaild(true);
    setContactValid(true);
    e.preventDefault();
    let error = false;
    if (!validateEmail(user.email_id)) {
      setEmailVaild(false);
      error = true;
    }
    if (!validateContact(user.contact_number)) {
      setContactValid(false);
      error = true;
    }
    if (!error) {
      handleSubmit();
    }
  };

  return (
    <div className="Registration">
      <h1>Registration Form</h1>
      <h6>
        <em>All fields are Required</em>
      </h6>
      <form onSubmit={validateAndHandle}>
        <label htmlFor="first_name">First Name : </label>
        <input
          ref={first_name}
          onChange={handleChange}
          id="first_name"
          type="text"
          required
        />
        <br />

        <label htmlFor="last_name">last Name : </label>
        <input onChange={handleChange} id="last_name" type="text" required />
        <br />

        <label htmlFor="email_id">Email-Id : </label>
        <input onChange={handleChange} id="email_id" type="email" required />
        <br />
        <div className={emailVaild ? "validate-hidden" : "validate-show"}>
          <em>Invalid Email-id</em>
          <br />
        </div>

        <label htmlFor="contact_number">Contact Number : </label>
        <input
          onChange={handleChange}
          id="contact_number"
          type="text"
          required
        />
        <br />
        <div className={contactValid ? "validate-hidden" : "validate-show"}>
          <em>Invalid Contact Number</em>
          <br />
        </div>

        <label htmlFor="college_name">College (Full Name) : </label>
        <input
          list="college"
          onChange={handleChange}
          id="college_name"
          type="text"
          required
        />
        <datalist onChange={handleChange} id="college">
          {colleges.map((college, index) => {
            return <option value={college} key={index} />;
          })}
        </datalist>
        <br />

        <label htmlFor="year_of_graduation">Year Of Graduation : </label>
        <select onChange={handleChange} id="year_of_graduation">
          {years.map((year, index) => {
            return (
              <option value={year} key={index}>
                {year}
              </option>
            );
          })}
        </select>
        <br />

        <label htmlFor="city">City : </label>
        <input onChange={handleChange} id="city" type="text" required />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
