CREATE TABLE network(
    volk_id INTEGER PRIMARY KEY, 
    username VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL);

INSERT INTO network (username, last_name)
VALUES 
    ('Orysya', 'Konovalova'),
    ('Oksana', 'Romanchuk'),
    ('Ostap', 'Bojko');

-----------------------------------------------------------------------------
CREATE TABLE posts( 
    post_id INTEGER PRIMARY KEY, 
    user_id INTEGER NOT NULL,
    content NOT NULL, 
    FOREIGN KEY(user_id) REFERENCES network(volk_id));

INSERT INTO posts (content, user_id)
VALUES
    ('first post' , 1),
    ('second post', 1),
    ('third post' , 1);

----------------------------------------------------------------------------
CREATE TABLE following(
    follower_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES network (volk_id),
    FOREIGN KEY (following_id) REFERENCES network (volk_id)     
    );

INSERT INTO following (follower_id, following_id)
VALUES
    (1, 3),
    (1, 2),
    (2, 1),
    (2, 3),
    (3, 2),
    (3, 1);

UPDATE network SET username = 'Lesya' WHERE volk_id = 2;