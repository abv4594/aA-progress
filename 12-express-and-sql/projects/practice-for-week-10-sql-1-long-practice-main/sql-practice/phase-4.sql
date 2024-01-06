-- Your code here

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    department_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role VARCHAR(50) UNIQUE
);

DROP TABLE IF EXISTS performance_reviews;
CREATE TABLE performance_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER,
    score INTEGER,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

DROP TABLE IF EXISTS parties;
CREATE TABLE parties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE,
    budget NUMERIC(9,2),
    is_onsite BOOLEAN
);

DROP TABLE IF EXISTS party_attendees;
CREATE TABLE party_attendees (
    party_id INT,
    employee_id INT,
    FOREIGN KEY (party_id) REFERENCES parties(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

DROP TABLE IF EXISTS relationships;
CREATE TABLE relationships (
    employee_id1 INT,
    employee_id2 INT,
    FOREIGN KEY (employee_id1) REFERENCES employees(id),
    FOREIGN KEY (employee_id2) REFERENCES employees(id)
);

-- Add "Michael Scott" to your list of employees in the "Management" department in the role of "Regional Manager"

INSERT INTO departments (name)
    VALUES 
        ("Management");

INSERT INTO roles (role)
    VALUES
        ("Regional Manager");

INSERT INTO employees (first_name, last_name, department_id, role_id)
    VALUES
        ("Michael", "Scott", 1, 1);

-- Add "Dwight Schrute" to your list of employees in the "Sales" department in the role of "Assistant Regional Manager"

INSERT INTO departments (name) VALUES ("Sales");
INSERT INTO roles (role) VALUES ("Assistant Regional Manager");
INSERT INTO employees (first_name, last_name, department_id, role_id)
    VALUES ("Dwight", "Schrute", 
        (SELECT id FROM departments WHERE name = "Sales"),
        (SELECT id FROM roles WHERE role = "Assistant Regional Manager"));

-- Add "Jim Halpert" to your list of employees in the "Sales" department in the role of "Sales Representative"

INSERT INTO roles (role) VALUES ("Sales Representative");
INSERT INTO employees (first_name, last_name, department_id, role_id)
    VALUES ("Jim", "Halpert", 
        (SELECT id FROM departments WHERE name = "Sales"),
        (SELECT id FROM roles WHERE role = "Sales Representative"));

-- Add "Pam Beesly" to your list of employees in the "Reception" department in the role of "Receptionist"

INSERT INTO departments (name) VALUES ("Reception");
INSERT INTO roles (role) VALUES ("Receptionist");
INSERT INTO employees (first_name, last_name, department_id, role_id)
    VALUES ("Pam", "Beesly", 
        (SELECT id FROM departments WHERE name = "Reception"),
        (SELECT id FROM roles WHERE role = "Receptionist"));

-- Add "Kelly Kapoor" to your list of employees in the "Product Oversight" department in the role of "Customer Service Representative"

INSERT INTO departments (name) VALUES ("Product Oversight");
INSERT INTO roles (role) VALUES ("Customer Service Representative");
INSERT INTO employees (first_name, last_name, department_id, role_id)
    VALUES ("Kelly", "Kapoor", 
        (SELECT id FROM departments WHERE name = "Product Oversight"),
        (SELECT id FROM roles WHERE role = "Customer Service Representative"));

-- Add "Angela Martin" to your list of employees in the "Accounting" department in the role of "Head of Accounting"

INSERT INTO departments (name) VALUES ("Accounting");
INSERT INTO roles (role) VALUES ("Head of Accounting");
INSERT INTO employees (first_name, last_name, department_id, role_id)
    VALUES ("Angela", "Martin", 
        (SELECT id FROM departments WHERE name = "Accounting"),
        (SELECT id FROM roles WHERE role = "Head of Accounting"));

-- Add "Roy Anderson" to your list of employees in the "Warehouse" department in the role of "Warehouse Staff"

INSERT INTO departments (name) VALUES ("Warehouse");
INSERT INTO roles (role) VALUES ("Warehouse Staff");
INSERT INTO employees (first_name, last_name, department_id, role_id)
    VALUES ("Roy", "Anderson", 
        (SELECT id FROM departments WHERE name = "Warehouse"),
        (SELECT id FROM roles WHERE role = "Warehouse Staff"));

-- "Roy Anderson" and "Pam Beesly" are in a romantic relationship.

INSERT INTO relationships VALUES 
    ((SELECT id FROM employees WHERE first_name = "Roy"),
    (SELECT id FROM employees WHERE first_name = "Pam"));

-- "Ryan Howard" is hired in the "Reception" department as a "Temp" role.

INSERT INTO roles (role) VALUES ("Temp");

INSERT INTO employees (first_name, last_name, department_id, role_id) VALUES (
    "Ryan", "Howard",
    (SELECT id FROM departments WHERE name = "Reception"),
    (SELECT id FROM roles WHERE role = "Temp")
);

-- An onsite office party is scheduled with a budget of $100.00.

INSERT INTO parties (budget, is_onsite) VALUES (100, 1);

-- "Dwight Schrute" gets a performance review with a score of 3.3.

INSERT INTO performance_reviews (score, employee_id) VALUES (
    3.3,
    (SELECT id FROM employees WHERE first_name = "Dwight")
);

-- "Jim Halpert" gets a performance review with a score of 4.2.

INSERT INTO performance_reviews (score, employee_id) VALUES (
    4.2,
    (SELECT id FROM employees WHERE first_name = "Jim")
);

-- "Dwight Schrute"'s past performance review needs to be changed to a score of 9.0.

UPDATE performance_reviews SET score = 9 WHERE 
    employee_id = (SELECT id FROM employees WHERE first_name = "Dwight");

-- "Jim Halpert"'s past performance review needs to be changed to a score of 9.3.

UPDATE performance_reviews SET score = 9.3 WHERE 
    employee_id = (SELECT id FROM employees WHERE first_name = "Jim");

-- "Jim Halpert" is promoted to the role of "Assistant Regional Manager".

UPDATE employees SET role_id =
    (SELECT id FROM roles WHERE role = "Assistant Regional Manager") 
    WHERE first_name = "Jim";

-- "Ryan Howard" is promoted to the "Sales" department as the role of "Sales Representative".

UPDATE employees SET department_id = 
    (SELECT id FROM departments WHERE name = "Sales"), 
    role_id = 
    (SELECT id FROM roles WHERE role = "Sales Representative")
    WHERE
    first_name = "Ryan";

-- An onsite office party is scheduled with a budget of $200.00.

INSERT INTO parties (budget, is_onsite) VALUES (200, 1);

-- "Angela Martin" and "Dwight Schrute" are in a romantic relationship.

INSERT INTO relationships VALUES (
    (SELECT id FROM employees WHERE first_name = "Angela"),
    (SELECT id FROM employees WHERE first_name = "Dwight"));

-- "Angela Martin" gets a performance review score of 6.2.

INSERT INTO performance_reviews (score, employee_id) VALUES (
    6.2, (SELECT id FROM employees WHERE first_name = "Angela")
);

-- "Ryan Howard" and "Kelly Kapoor" are in a romantic relationship.

INSERT INTO relationships VALUES (
    (SELECT id FROM employees WHERE first_name = "Ryan"),
    (SELECT id FROM employees WHERE first_name = "Kelly")
);

-- An onsite office party is scheduled with a budget of $50.00.

INSERT INTO parties (budget, is_onsite) VALUES (50, 1);

-- "Jim Halpert" moves to another office branch (make sure to remove his relationships and performance reviews if he has any).

DELETE FROM performance_reviews WHERE employee_id = 
    (SELECT id FROM employees WHERE first_name = "Jim");

DELETE FROM relationships WHERE employee_id1 = 
    (SELECT id FROM employees WHERE first_name = "Jim") OR 
    employee_id2 = (SELECT id FROM employees WHERE first_name = "Jim");

DELETE FROM employees WHERE first_name = "Jim";

-- "Roy Anderson" and "Pam Beesly" are NO LONGER in a romantic relationship.

DELETE FROM relationships WHERE 
    (
    employee_id1 = 
    (SELECT id FROM employees WHERE first_name = "Roy") AND 
    employee_id2 = 
    (SELECT id FROM employees WHERE first_name = "Pam")
    ) 
    OR 
    (
    employee_id1 = 
    (SELECT id FROM employees WHERE first_name = "Pam") AND
    employee_id2 = 
    (SELECT id FROM employees WHERE first_name = "Roy")
    );

-- "Pam Beesly" gets a performance review score of 7.6.

INSERT INTO performance_reviews (score, employee_id) VALUES (7.6,
    (SELECT id FROM employees WHERE first_name = "Pam"));

-- "Dwight Schrute" gets another performance review score of 8.7.

INSERT INTO performance_reviews (score, employee_id) VALUES (8.7,
    (SELECT id FROM employees WHERE first_name = "Dwight"));

-- "Ryan Howard" quits the office (make sure to remove his relationships and performance reviews if he has any).

DELETE FROM performance_reviews WHERE employee_id = 
    (SELECT id FROM employees WHERE first_name = "Ryan");

DELETE FROM relationships WHERE employee_id1 = 
    (SELECT id FROM employees WHERE first_name = "Ryan") OR 
    employee_id2 = (SELECT id FROM employees WHERE first_name = "Ryan");

-- "Jim Halpert" moves back to this office branch's "Sales" department in the role of "Sales Representative"

INSERT INTO employees (first_name, last_name, department_id, role_id) VALUES (
    "Jim", "Halpert",
    (SELECT id FROM departments WHERE name = "Sales"),
    (SELECT id FROM roles WHERE role = "Sales Representative")
);

-- "Karen Filippelli" moves from a different office into this office's "Sales" department in the role of "Sales Representative"

INSERT INTO employees (first_name, last_name, department_id, role_id) VALUES (
    "Karen", "Filippelli",
    (SELECT id FROM departments WHERE name = "Sales"),
    (SELECT id FROM roles WHERE role = "Sales Representative")
);

-- "Karen Filippelli" and "Jim Halpert" are in a romantic relationship.

INSERT INTO relationships VALUES (
    (SELECT id FROM employees WHERE first_name = "Karen"),
    (SELECT id FROM employees WHERE first_name = "Jim"));

-- An onsite office party is scheduled with a budget of $120.00.

INSERT INTO parties (budget, is_onsite) VALUES (120, 1);

-- The onsite office party scheduled right before this is canceled, and an offsite office party is scheduled instead with a budget of $300.00.

SELECT * FROM parties;

DELETE FROM parties WHERE id = 
    (SELECT MAX(id) FROM parties)-1;

SELECT * FROM parties;

INSERT INTO parties (budget, is_onsite) VALUES (300, 0);

SELECT * FROM parties;


-- "Karen Filippelli" and "Jim Halpert" are NO LONGER in a romantic relationship.

DELETE FROM relationships WHERE 
    (
    employee_id1 = 
    (SELECT id FROM employees WHERE first_name = "Karen") AND 
    employee_id2 = 
    (SELECT id FROM employees WHERE first_name = "Jim")
    ) 
    OR 
    (
    employee_id1 = 
    (SELECT id FROM employees WHERE first_name = "Jim") AND
    employee_id2 = 
    (SELECT id FROM employees WHERE first_name = "Karen")
    );

-- "Pam Beesly" and "Jim Halpert" are in a romantic relationship.

INSERT INTO relationships VALUES (
    (SELECT id FROM employees WHERE first_name = "Pam"),
    (SELECT id FROM employees WHERE first_name = "Jim")
);