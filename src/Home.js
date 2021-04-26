import { useState, useEffect } from "react";

export let Home = () => {
  let [isLoading, setLoading] = useState(true);
  let [colleges, setColleges] = useState([]);
  let [isError, setError] = useState(false);

  useEffect(() => {
    fetch("https://getxp-backend.herokuapp.com/")
      .then((res) => res.json())
      .then((fetchedColleges) => {
        setLoading(false);
        setColleges(fetchedColleges);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const NoColleges = () => {
    return (
      <div>
        <h3>No Colleges Has Been Registered Till Now</h3>
      </div>
    );
  };

  const showStudent = ({ first_name, last_name, email_id }, index) => {
    return (
      <tbody key={index}>
        <tr>
          <td>{index + 1}</td>
          <td>
            {first_name} {last_name}
          </td>
          <td>{email_id}</td>
        </tr>
      </tbody>
    );
  };

  const ShowColleges = () => {
    return colleges.map(({ college_name, users }, index) => {
      let idName = "#" + college_name;
      return (
        <div className="accordion-item" key={index}>
            {college_name}
            <span>
          <a
            data-toggle="collapse"
            data-parent="#accordionExample"
            href={idName}
            aria-expanded="false"
          >
            {users.length}
          </a>
          </span>
          <div
            id={college_name}
            className="accordion-collapse collapse"
            aria-labelledby={index}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                {users.map(showStudent)}
              </table>
            </div>

          </div>
        </div>
      );
    });
  };

  return (
    <div className="Home">
      <h1>List of All Registered Colleges</h1>
      <br />
      {isLoading ? (
        <h3>Please wait, Loading</h3>
      ) : isError ? (
        <h3>Failed to load the colleges,Please Try Again</h3>
      ) : colleges.length === 0 ? (
        <NoColleges />
      ) : (
        <div className="accordion" id="accordionExample">
          <ShowColleges />
        </div>
      )}
    </div>
  );
};

