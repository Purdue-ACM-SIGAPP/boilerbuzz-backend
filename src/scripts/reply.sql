CREATE TABLE IF NOT EXISTS Reply (
    id serial PRIMARY KEY,
    poster_id integer not null REFERENCES Poster(id),
    user_id integer not null REFERENCES appuser(id),
    msg text not null
);