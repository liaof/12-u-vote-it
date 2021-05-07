/* to use, type 'source db/schema.sql' in the sql cmd line*/

CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,/*PRIMARY KEY indicates this value will be our index, and that it is an INGTEGER that automatically increments*/
  first_name VARCHAR(30) NOT NULL,/* column called first_name that is a string of 30 or less chars, whose value cannot be null*/
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL/*0=false and 1=true*/
);