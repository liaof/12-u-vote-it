# SQL

All SQL keywords are written in all caps, and all SQL statements are terminated with ;</br>

## Important syntax

'npm install --save mysql2' in the root folder</br>

SELECT * FROM candidates; this displays all rows of all columns of the table with the name 'candidates'</br>

SELECT n,m FROM candidates; this displays all rows of the n & m columns of the table with the name 'candidates'</br>

SELECT n,m FROM candidates WHERE x = b; this displays the same as above but only for candidates for who x=b. WHERE keyword acts as a filter

SELEct n,m FROM candidates WHERE id = b; we can also filter via id

DROP DATABASE elections; this permenatnly delets the DATABASE called elections

UPDATE candidates SET industry_connected = 1 WHERE id = 3; this changes the industry_connected value of the row/item of id=3

DELETE FROM candidates WHERE first_name = "Montague"; this deletes the row/item with a first_name value of "Montague"

## Definitions

A *database* is a collection of interrelated data. This data is stored in one or more tables that are related to one another.</br>

A *table* is composed of rows and columns. A column represents a field. A row represents a record.</br>

A *query* is a request for data from a database table or a combination of tables.</br>

##### The following code insterts data into a table;
INSERT INTO candidates (first_name, last_name, industry_connected)</br>
VALUES ('Ronald', 'Firbank', 1);

-INSERT INTO candidates informs us we'll be loading data into the candidates table</br>
-inside the following parentheses are the columns we'll be inserting into</br>
-VALUES() defines the values we wish to insert, it must match the same order as the parameters from the above line (the primary key 'id' will not need a value to be inserted because it is internally generated)</br>
- VARCHAR values will have to be surrounded by '' because they are strings

