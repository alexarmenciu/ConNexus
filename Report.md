## On the Criticism of bcrypt during Presentations

There are no known attacks on bcrypt, beyond brute force attacks which attempt to generate possible password strings then hash them and compare with known hashes. Also known as rainbow tables[^1], this attack is impractical and in fact what bcrypt excels at stopping. Compare this to a competitor algorithm, Argon2, which was presented by group 8 as an objectively better alternative to bcrypt. Argon2i has known attacks[^2], namely, it is practical to attack the algorithm as long as it uses 10 or less iterations in the code, where 3 is the default and likely the amount most services use. We feel confident our choice of bcrypt is the best choice for our system.

[^1]: [Rainbow Tables](https://www.sciencedirect.com/science/article/pii/B9781597499613000066)
[^2]: [Towards Practical Attacks on Argon2](https://eprint.iacr.org/2016/759.pdf)
