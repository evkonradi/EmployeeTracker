DROP DATABASE IF EXISTS emp_tracker;
CREATE DATABASE emp_tracker;
USE emp_tracker;

CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(department_id) REFERENCES department(id) 
);

CREATE TABLE employee(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(11) NOT NULL,
  manager_id INTEGER(11),
  PRIMARY KEY (id),
  FOREIGN KEY(manager_id) REFERENCES employee(id),
  FOREIGN KEY(role_id) REFERENCES role(id)
);
