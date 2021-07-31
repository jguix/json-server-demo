import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type Employee = {
  address: string;
  email: string;
  id: number;
  name: string;
};

const App = () => {
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees(1, 20);
  }, []);

  useEffect(() => {
    loadEmployees(1, 20, query.length > 2 ? query : "");
  }, [query]);

  const loadEmployees = async (page: number, limit: number, query = "") => {
    const url = `/employees?_page=${page}&_limit=${limit}&q=${query}`;
    const _employees = await axios
      .get<Employee[]>(url)
      .then(({ data }) => data);

    setEmployees(_employees);
  };

  return (
    <div className="App">
      <div className="search_form">
        <label className="search_form--label">Search employees</label>
        <input
          className="search_form--input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        ></input>
      </div>
      <div className="employee_list">
        {employees.map((employee) => {
          return (
            <div className="employee_list--item">
              <div className="employee_list--item-name">{employee.name}</div>
              <div className="employee_list--item-address">
                {employee.address}
              </div>
              <div className="employee_list--item-email">{employee.email}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
