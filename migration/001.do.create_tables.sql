CREATE TABLE folders (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    modified TIMESTAMPTZ NOT NULL DEFAULT now(),
    folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE NOT NULL,
    content TEXT DEFAULT '' 
);