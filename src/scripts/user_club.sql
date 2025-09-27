CREATE TABLE IF NOT EXISTS UserClub (
    user_id integer NOT NULL REFERENCES AppUser(id),
    club_id integer NOT NULL REFERENCES Club(id),
    PRIMARY KEY(user_id, club_id)
);
