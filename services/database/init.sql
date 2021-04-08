CREATE TABLE movies(
    id serial NOT NULL PRIMARY KEY,
    userid int NOT NULL,
    date_added DATE NOT NULL,
    title text NOT NULL,
    released DATE NOT NULL,
    genre text,
    director text
);

CREATE INDEX userid_index ON public.movies USING btree (userid);