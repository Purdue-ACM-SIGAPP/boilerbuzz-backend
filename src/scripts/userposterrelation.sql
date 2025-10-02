CREATE TABLE user_poster (
  user_id integer REFERENCES appuser (id),
  poster_id integer REFERENCES poster (id)
)
