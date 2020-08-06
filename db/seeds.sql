INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Accounting');

INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales representative', 70000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 80000, 1);

INSERT INTO role (title, salary, department_id) VALUES ('Engineer Manager', 140000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Seniour Engineer', 120000, 2);

INSERT INTO role (title, salary, department_id) VALUES ('Account Manager', 110000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Seniour Financial Analyst', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Anton', 'Gardez', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Griffs', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alise', 'Karolen', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Saleein', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Steven', 'Kall', 5, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Vicky', 'Manalen', 6, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Robert', 'Allison', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tommy', 'Sdock', 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Victor', 'Askalko', 9, 7);


