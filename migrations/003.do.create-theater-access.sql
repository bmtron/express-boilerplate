CREATE TABLE theater_user_access (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES theater_users(id)
        ON DELETE CASCADE NOT NULL,
    theater_id INTEGER REFERENCES theater_rooms(id)
        ON DELETE CASCADE NOT NULL
);