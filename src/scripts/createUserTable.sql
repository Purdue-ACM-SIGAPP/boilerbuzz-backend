CREATE TYPE ClassYear as ENUM (
    'freshman',
    'sophomore',
    'junior',
    'senior',
    'graduate'
);

CREATE TABLE AppUser (
    userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age SMALLINT NOT NULL CHECK (0 < age AND age < 100),
    class_year ClassYear NOT NULL,
    major TEXT NOT NULL
);
