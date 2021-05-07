# SQL

All SQL keywords are written in all caps, and all SQL statements are terminated with ;</br>

## Important syntax
*'mysql -u root -p'* initiates MySQL command line

*npm install --save mysql2* in the root folder</br>

*SELECT * FROM candidates;* this displays all rows of all columns of the table with the name 'candidates'</br>

*SELECT n,m FROM candidates;* this displays all rows of the n & m columns of the table with the name 'candidates'</br>

*SELECT n,m FROM candidates WHERE x = b;* this displays the same as above but only for candidates for who x=b. WHERE keyword acts as a filter</br>

*SELEct n,m FROM candidates WHERE id = b;* we can also filter via id</br>

*DROP DATABASE elections;* this permenatnly deletes the DATABASE called elections</br>

*UPDATE candidates SET industry_connected = 1 WHERE id = 3;* this changes the industry_connected value of the row/item of id=3</br>

*DELETE FROM candidates WHERE first_name = "Montague";* this deletes the row/item with a first_name value of 'Montague'</br>

*ALTER TABLE candidates ADD COLUMN party_id INTEGER;* this alters the 'candidates' table by adding a column named 'party_id' that must have an int as a value</br>

*DESCRIBE candidates;* shows column properties of the 'candidates' table, in a table</br>

*FOREIGN KEY id REFERENCES parties(id2);* sets the 'id' field as the official foreign key, which is then linked to the 'id2' field of another (parties) table</br>

*SELECT ....JOIN....;* SELECT chained with JOIN can merge two or more tables together, substiuting in the foreign keys with the actual corresponding data, like in calculus</br>
#### JOIN
*SELECT * FROM Candidates* //Working from the candidates table</br>
*LEFT JOIN parties ON candidates.party_id = parties.id;* //link the party_id field with the other table's id field</br> 

*SELECT candidates. *, parties.name FROM candidates* same as SELECT * FROM candidates but now we also only display parties.name when joined

*SELECT candidates. *, parties.name AS party_name FROM candidates* Same as above but now we save parties.name as party_name



## Definitions

A *database* is a collection of interrelated data. This data is stored in one or more tables that are related to one another.</br>

A *table* is composed of rows and columns. A column represents a field. A row represents a record.</br>

A *query* is a request for data from a database table or a combination of tables.</br>

A *foreign key* is a field (could be the primary key or not) in one table that references the primary key of another table.</br>

##### The following code insterts data into a table;

INSERT INTO candidates (first_name, last_name, industry_connected)</br>
VALUES ('Ronald', 'Firbank', 1);

-INSERT INTO candidates informs us we'll be loading data into the candidates table</br>
-inside the following parentheses are the columns we'll be inserting into</br>
-VALUES() defines the values we wish to insert, it must match the same order as the parameters from the above line (the primary key 'id' will not need a value to be inserted because it is internally generated)</br>
- VARCHAR values will have to be surrounded by '' because they are strings

#### Code Example

const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) </br>
              VALUES (?,?,?,?)`; </br>
const params = [1, 'Ronald', 'Firbank', 1];</br>
db.query(sql, params, (err, result)</br>

In the above code, we send an SQL query with id = 1, first_name = 'Ronald', last_name = 'Firbank', industry_connected = 1

