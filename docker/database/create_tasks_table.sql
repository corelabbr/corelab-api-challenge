CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    favorite BOOLEAN DEFAULT TRUE,
    color VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, favorite, color)
VALUES ('Task 1', 'Description 1', true, 'red'),
    ('Task 2', 'Description 2', false, 'blue'),
    ('Task 3', 'Description 3', true, 'green'),
    ('Task 4', 'Description 4', false, 'yellow'),
    ('Task 5', 'Description 5', true, 'orange'),
    ('Task 6', 'Description 6', false, 'purple'),
    ('Task 7', 'Description 7', true, 'pink'),
    ('Task 8', 'Description 8', false, 'brown'),
    ('Task 9', 'Description 9', true, 'gray'),
    ('Task 10', 'Description 10', false, 'black');