CREATE DATABASE library_db;

\c library_db;

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    birth_date DATE,     
    rating NUMERIC(3, 2)  
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,  
    publish_year INTEGER,        
    author_id INTEGER NOT NULL,   
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

INSERT INTO authors (name, birth_date, rating)
VALUES
    ('Лев Толстой', '1828-09-09', 4.95),
    ('Фёдор Достоевский', '1821-11-11', 4.90),
    ('Антон Чехов', '1860-01-29', 4.85);

INSERT INTO books (title, publish_year, author_id)
VALUES
    ('Война и мир', 1869, 1),
    ('Анна Каренина', 1877, 1),
    ('Преступление и наказание', 1866, 2),
    ('Идиот', 1869, 2),
    ('Вишневый сад', 1904, 3),
    ('Чайка', 1896, 3);