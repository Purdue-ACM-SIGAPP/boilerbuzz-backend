CREATE TABLE IF NOT EXISTS UserSettings (
    user_id INT PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
