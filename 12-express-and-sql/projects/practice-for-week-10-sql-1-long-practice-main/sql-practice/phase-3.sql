-- Your code here
UPDATE customers SET points = 6 WHERE name = "Rachel";

INSERT INTO coffee_orders (is_redeemed) 
    VALUES (0);

INSERT INTO customers (name, email, phone)
    VALUES 
        ("Monica", "monica@friends.show", 2222222222),
        ("Phoebe", "phoebe@friends.show", 3333333333);


-- Phoebe purchases three coffees:
INSERT INTO coffee_orders (is_redeemed)
    VALUES 
        (0),
        (0),
        (0);
UPDATE customers SET points = 8 WHERE name = "Phoebe";

-- Rachel and Monica each purchase four coffees.
INSERT INTO coffee_orders (is_redeemed) 
    VALUES 
        (0),
        (0),
        (0),
        (0),
        (0),
        (0),
        (0),
        (0);
UPDATE customers SET points = 10  WHERE name = "Rachel";
UPDATE customers SET points = 9 WHERE name = "Monica";

-- Monica wants to know her new point total.
SELECT points FROM customers WHERE name = "Monica";

-- Rachel wants to check her total points. Redeem her points for a coffee if she has enough points. If she doesn't, she wants to purchase a coffee.
INSERT INTO coffee_orders (is_redeemed)
    VALUES (1);
UPDATE customers SET points = 0 WHERE name = "Rachel";

INSERT INTO customers (name, email) 
    VALUES 
        ("Joey", "joey@friends.show"),
        ("Chandler", "chandler@friends.show"),
        ("Ross", "ross@friends.shwow");

-- Ross purchases six coffees.
INSERT INTO coffee_orders (is_redeemed)
    VALUES
        (0),
        (0),
        (0),
        (0),
        (0),
        (0);
UPDATE customers SET points = 11 WHERE name = "Ross";

-- Monica purchases three coffees.
INSERT INTO coffer_orders (is_redeemed) 
    VALUES 
        (0),
        (0),
        (0);
UPDATE customers SET points = 8 WHERE name = "Monica";


-- Phoebe wants to check her total points. Redeem her points for a coffee if she has enough points. If she doesn't, she wants to purchase a coffee.
INSERT INTO coffee_orders (is_redeemed) 
    VALUES 
        (0);
UPDATE customers SET points = 9 WHERE name = "Phoebe";

-- Ross demands a refund for the last two coffees that he ordered. (Make sure you delete Ross's coffee orders and not anyone else's. Update his points to reflect the returned purchases.)

Joey purchases two coffees.

Monica wants to check her total points. Redeem her points for a coffee if she has enough points. If she doesn't, she wants to purchase a coffee.

Chandler wants to delete his loyalty program account.

Ross wants to check his total points. Redeem his points for a coffee if he has enough points. If he doesn't, he wants to purchase a coffee.

Joey wants to check his total points. Redeem his points for a coffee if he has enough points. If he doesn't, he wants to purchase a coffee.

Phoebe wants to change her email to p_as_in_phoebe@friends.show
