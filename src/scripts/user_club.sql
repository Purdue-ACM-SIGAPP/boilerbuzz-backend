CREATE TABLE IF NOT EXISTS UserClub (
    user_id integer NOT NULL REFERENCES AppUser(id),
    club_id integer NOT NULL REFERENCES Club(id)
);
