# Report on the ConNexus System

## Overview of the System

## Design and Implementation

## Discussion

### On the Utility and Convenience of ConNexus

We identify the major technical advantage of ConNexus as having editable fields, so as much or as little information can be associated with a contact as the user desires. Another significant advantage that we attribute to ConNexus is that due to it being a web app, it is platform agnostic, whereas traditional contact managers are generally applications proprietary to cell phone manufacturers for their own devices.

However, we are not as hubristic as to think that ConNexus has no flaws. We believe that the biggest flaw of ConNexus is that it is not a native application. This means that it is not as convenient to use as a native application, as to mimic identical operation to a native application, the user would have to make a shortcut to the application from their home screen of their phone, something which is not as easy as simply downloading an application from the app store. A soluction would be convert the website to a Progressive Web App, which are web applications that can be downloaded to the home screen of a phone and behave like a native application[^3].

Another significant point of utility not implemented was the ability to recover one's password. This was not implemented due to our decision to not require an email for signup, as we felt that it was not necessary for the user to have an email to realize the full features of ConNexus. There is fairly recent literature on the topic of password recovery[^4] which suggests a new model for password recovery that would allow privacy to be maintained, but we considered this to be technically out of scope for a project of this size.

### On the Criticism of bcrypt during Presentations

There are no known attacks on bcrypt, beyond brute force attacks which attempt to generate possible password strings then hash them and compare with known hashes. Also known as rainbow tables[^1], this attack is impractical and in fact what bcrypt excels at stopping. Compare this to a competitor algorithm, Argon2, which was presented by group 8 as an objectively better alternative to bcrypt. Argon2i has known attacks[^2], namely, it is practical to attack the algorithm as long as it uses 10 or less iterations in the code, where 3 is the default and likely the amount most services use. We feel confident our choice of bcrypt is the best choice for our system.

## References

[^1]: [Rainbow Tables](https://www.sciencedirect.com/science/article/pii/B9781597499613000066)
[^2]: [Towards Practical Attacks on Argon2](https://eprint.iacr.org/2016/759.pdf)
[^3]: [Progressive Web Apps](https://ieeexplore.ieee.org/abstract/document/8287006)
[^4]: [Web Password Recovery: A Necessary Evil?](https://link.springer.com/chapter/10.1007/978-3-030-02683-7_23#Abs1)
