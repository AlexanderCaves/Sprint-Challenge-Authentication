<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

2. What does bcrypt do to help us store passwords in a secure manner.

3. What does bcrypt do to slow down attackers?

4. What are the three parts of the JSON Web Token?

1. Sessions is a way for the server to remember who you are once you've logged in so that
    you aren't asked to log in again and again each time you request a new page.

2. bcrypt encrypts user passwords with a method called hashing so that we don't have to 
    store the passwords in plain text.  Which one must never ever do.

3. bcrypt hashes the passwords multiple times.  In order to decode the passwords, a potential
    attacker would need to know that we're using bcrypt, the algorithm used, and the number of
    rounds of hashing used.

4. The header: contains the algorithm with token type.
   The payload: contains the information stored in the token; usually an id.
   The signature: encodes the header and payload together, signed with a secret.
