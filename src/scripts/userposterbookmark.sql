CREATE TABLE user_poster_bookmark (
  user_id integer REFERENCES appuser (id),
  poster_id integer REFERENCES poster (id),
  PRIMARY KEY (user_id, poster_id)
)
