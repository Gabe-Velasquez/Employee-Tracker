INSERT INTO department (name)
VALUES  ('Sales'),
        ('Finance'),
        ('Legal'),
        ('Engineering'),
        ('Human Resources');

INSERT INTO role (title,salary, department_id)
VALUES  ("Sales Representative", 54000, 1),
        ("Sales Lead", 54000, 1),
        ("Accountant", 130000, 2),
        ("Account Manager", 175000, 2),
        ("Lawyer", 54000, 3),
        ("Legal Team Lead", ,3)

INSERT INTO employee (first_name, last_name, role_id, mananger_id)
VALUES