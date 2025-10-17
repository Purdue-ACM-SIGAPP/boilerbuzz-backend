CREATE TABLE if not exists PosterTag (
    tag_id int not null REFERENCES Tags(id),
    poster_id int not null REFERENCES Poster(id),
    PRIMARY KEY(poster_id, tag_id)
);