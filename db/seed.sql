
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 40000.00, 1 ),
 ("Sales Person", 30000.00, 2), 
 ("Accountant", 60000.00, 3), 
 ("HR Rep", 40000.00, 4);

INSERT INTO department (department_name)
VALUES ("Management"), 
("Sales"),
("Accounting"),
("HR");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jun", "Smith", 1, 1), 
("Kris", "Bradford", 2, 1), 
("Pamela", "Luis", 3, 1), 
("John", "Delaney", 2, 1), 
("Andy", "Kopp", 2, 1), 
("Martin", "Nivera", 3, 1), 
("Omar", "Hamad", 3, 1), 
("Tom", "Maguire", 4, 1);
