CREATE TABLE IF NOT EXISTS Poster (
    id serial PRIMARY KEY,
    club_id integer not null REFERENCES Club(id),
    user_id integer not null REFERENCES AppUser(id),
    location text not null,
    position point not null,
    img_path text not null,
    date TIMESTAMP not null
);
