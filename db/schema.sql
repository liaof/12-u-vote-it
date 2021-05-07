/* to use, type 'source db/schema.sql' in the sql cmd prmpt*/
/* db.sql -> schema.sql -> seeds.sql*/

/*if 'candidates' and 'partie's exist, delete 'candidates' and 'parties'
  Ensures we start with a clean slate each time this file is run*/
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS voters;

CREATE TABLE parties (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,/*PRIMARY KEY indicates this value will be our index, and that it is an INGTEGER that automatically increments*/
  first_name VARCHAR(30) NOT NULL,/* column called first_name that is a string of 30 or less chars, whose value cannot be null*/
  last_name VARCHAR(30) NOT NULL,
  party_id INTEGER,
  industry_connected BOOLEAN NOT NULL,/*0=false and 1=true*/
  /* flag the party_id as a foreign key, and tells SQL it references the 'id' field in the 'parties' table
     Combined with CONSTRAINT, This ensures no id can be inserted into 'candidates' if it doesn't exist in 'parties'
     
     That is to say, we constrain the valid candidates.party_id values to the same set found in parties.id
     
     Then, ON DELETE SET Null means if the parties.id is deleted, the corresponding party_id field/s will be set to null*/
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET Null
);

CREATE TABLE voters (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP/*caputres timestap at DATETIME it was created at. DEFAULT refers to the 
                                                  formatting of the date/time CURRENT_TIMESTAMP specifies the current time*/
);

CREATE TABLE votes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  voter_id INTEGER NOT NULL,
  candidate_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uc_voter UNIQUE (voter_id),
  CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
  CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);