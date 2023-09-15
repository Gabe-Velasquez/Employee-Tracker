INSERT INTO department (name)
VALUES  ('Sales'),
        ('Finance'),
        ('Legal'),
        ('Engineering'),
        ('Human Resources');

INSERT INTO role (title,salary, department_id)
VALUES  ("Sales Representative", 54000, 1),
        ("Sales Lead", 54000, 1),
        -- Accounting Team
        ("Accountant", 130000, 2),
        ("Account Manager", 275000, 2),
        -- Law Team
        ("Lawyer", 180000, 3),
        ("Legal Team Lead", 225000,3),
        -- Engineering Team
        ("Software Developer", 125000, 4),
        ("Quality Assurance Tester", 65000, 4),
        ("Lead Developer", 180000, 4),
        -- HR Team
        ("Human Resources Manager", 110000, 5),
        ("Human Resources Representative", 60000, 5)


INSERT INTO employee (first_name, last_name, role_id, mananger_id)
VALUES ("Jay", "Garrick", 2, Null),
       ("Barry", "Allen", 1, 2),
       ("Bart", "Allen", 1, 2),
       ("Wally", "West", 1, 2),
       -- Accounting Team
       ("Oliver", "Queen", 3, 4),
       ("Bruce", "Wayne", 4, Null), 
       -- Law Team    
       ("Richard", "Grayson", 5, 6),
       ("Harvey", "Dent",6, Null),
       -- Engineering Team
       ("Jonathan", "Osterman",4, 4),
       ("Ray", "Palmer",4, 4),
       ("Victor", "Stone",4, 4),
       ("Martin", "Stein",4, 4),
       ("Tim", "Drake",4, 4),
       ("Lucius", "Fox",4, 4),
       -- HR Team   