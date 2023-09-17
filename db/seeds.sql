INSERT INTO department (name)
VALUES  ('Sales'),
        ('Finance'),
        ('Legal'),
        ('Engineering'),
        ('Human Resources');

INSERT INTO role (title,salary, department_id)
VALUES  ("Sales Representative", 54000, 1),
        ("Sales Lead", 160000, 1),
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
        ("Human Resources Representative", 60000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jay", "Garrick", 2, null),
       ("Barry", "Allen", 1, 1),
       ("Bart", "Allen", 1, 1),
       ("Wally", "West", 1, 1),
       -- Accounting Team
       ("Bruce", "Wayne", 4, null), 
       ("Oliver", "Queen", 3, 5),
       -- Law Team    
       ("Harvey", "Dent",6, null),
       ("Richard", "Grayson", 5, 7),
       -- Engineering Team
       ("Lucius", "Fox", 9, null),
       ("Jonathan", "Osterman", 7, 9),
       ("Ray", "Palmer", 7, 9),
       ("Victor", "Stone", 7, 9),
       ("Martin", "Stein", 8, 9),
       ("Tim", "Drake", 8, 9),
       
       -- HR Team  
       ("Clark", "Kent", 10, null),
       ("Diana", "Prince", 11, 15),
       ("Hal", "Jordan", 11, 15);
   
       