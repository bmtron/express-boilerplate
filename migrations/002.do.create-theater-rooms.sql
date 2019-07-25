CREATE TABLE theater_rooms (
    id SERIAL PRIMARY KEY,
    videos TEXT,
    name TEXT NOT NULL,
    owner INTEGER REFERENCES theater_users(id) ON DELETE CASCADE NOT NULL
);

