CREATE TABLE cats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    isfluffy BOOLEAN,
    color TEXT,
    image TEXT
);

INSERT INTO cats (name, isfluffy, color) VALUES ('Mr Fluff', 1, 'Black');
INSERT INTO cats (name, isfluffy, color) VALUES ('The Cat', 1, 'White');