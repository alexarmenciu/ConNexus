# Report on the ConNexus System

## Overview of the System

ConNexus exists to fill a gap in the current ecosystem of on-device contact managers. Because on-device contact managers are built to have integration with exclusively system apps, they do not have features to support contact information of third party applications (ie. Signal, WhatsApp, etc.), which are increasingly adopted over traditional text messaging, with a study finding over 65% of older adults adopted the technologies[^5], a figure likely significantly higher among young adults.

As such, ConNexus is a web-based contact manager, which allows users to store contact information for third party applications, as well as traditional text messaging. The system is designed to be as simple and intuitive as possible, with a focus on a user's privacy, customizability, and accessibility. To this end, ConNexus uses a simple username-based login system, requiring merely a username and a password for account creation and signup. A user adds contacts by a name field, and then can add any number of user-defined fields to the contact.

All data the user provides the system with is accessible (with the exception of the user's password, to protect against physical attacks, ie leaving one's account open in public, and having someone hijack the account), and editable by the user to give them ultimate control over their data. All data is deletable, with the delete user account feature deleting all data associated with the user's account (this feature requires a re-entry of the user's username and password for confirmation due to the finality of the operation).

We target adult users, with a significant social network with a requirement for varied messaging technologies for communication with their circles as our primary user base. We would open source the software, as we believe that the software is a valuable tool for the community, and any improvements the public could make to the software would be more valuable than any monetization techniques we could implement would be valuable to us.

The ConNexus system collects no intrinsic PII (we define this as any information which the user cannot easily de-link from themselves, ie name, address, etc) for usage of the system. The system collects a username and password for account creation, and whatever information a user chooses to input into the contact manager for contacts. A required field on each contact is "Name", however, there is no check on this, so a user can enter whatever value they choose for this field as long as they are able to recall who the contact is associated with.

Further, all data is encrypted in storage on the server, so any PII that a user enters into a contact is not visible to administrators of the system.

The system follows the seven principles of privacy by design, and is GDPR and PIPEDA compliant as described in the requirements document[^6].

## Design and Implementation

### Technologies and Discussions

All technologies we worked with (barring the database, mongoDB Atlas), were open source. This was a deliberate design decision with the user in mind, to ensure that the user has the ability to audit the code and ensure that the system is not doing anything malicious with their data, from the bottom (our technologies used), to the top (our code which the user interacts with). Open source technologies also allow for the user to contribute to the project, and improve the system for themselves and others, a stance explained in the _Overview of the System_ section of this report.

#### On the Choice of React for Frontend Development

We chose React for our frontend development because it is a popular and well-supported framework (in fact the most popular frontend web framework, see section 2 of the linked paper[^7]), and as such, our two designated frontend members Leo and Dijian were already comfortable with the technology, having done internships working on projects using the React framework. We also chose React because it is a component-based framework, which lends itself well to the modular design of our system (namely, the way we model the user and the contact separately), and allows for easy development of new features.

#### On the Criticism of bcrypt during Presentations

There are no known attacks on bcrypt, beyond brute force attacks which attempt to generate possible password strings then hash them and compare with known hashes. Also known as rainbow tables[^1], this attack is impractical and in fact what bcrypt excels at stopping. Compare this to a competitor algorithm, Argon2, which was presented by group 8 as an objectively better alternative to bcrypt. Argon2i has known attacks[^2], namely, it is practical to attack the algorithm as long as it uses 10 or less iterations in the code, where 3 is the default and likely the amount most services use. We feel confident our choice of bcrypt is the best choice for our system.

### Data Models

#### User Model

#### Contact Model

### Endpoints

### Frontend

## Discussion

### On the Utility and Convenience of ConNexus

We identify the major technical advantage of ConNexus as having editable fields, so as much or as little information can be associated with a contact as the user desires. Another significant advantage that we attribute to ConNexus is that due to it being a web app, it is platform agnostic, whereas traditional contact managers are generally applications proprietary to cell phone manufacturers for their own devices.

However, we are not as hubristic as to think that ConNexus has no flaws. We believe that the biggest flaw of ConNexus is that it is not a native application. This means that it is not as convenient to use as a native application which can be launched and used from the home screen of one's phone. To mimic identical operation to a native application, the user would have to make a shortcut to the application from their home screen of their phone, something which is not as easy as simply downloading an application from the app store. A soluction would be convert the website to a Progressive Web App, which are web applications that can be downloaded to the home screen of a phone and behave like a native application[^3].

Another significant point of utility not implemented was the ability to recover one's password. This was not implemented due to our decision to not require an email for signup, as we felt that it was not necessary for the user to have an email to realize the full features of ConNexus. There is fairly recent literature on the topic of password recovery[^4] which suggests a new model for password recovery that would allow privacy to be maintained, but we considered this to be technically out of scope for a project of this size.

## References

[^1]: [Rainbow Tables](https://www.sciencedirect.com/science/article/pii/B9781597499613000066)
[^2]: [Towards Practical Attacks on Argon2](https://eprint.iacr.org/2016/759.pdf)
[^3]: [Progressive Web Apps](https://ieeexplore.ieee.org/abstract/document/8287006)
[^4]: [Web Password Recovery: A Necessary Evil?](https://link.springer.com/chapter/10.1007/978-3-030-02683-7_23#Abs1)
[^5]: [Use of Messaging Apps and Social Network Sites Among Older Adults: A Mixed-Method Study](https://ijoc.org/index.php/ijoc/article/view/14435/3194)
[^6]: [ConNexus Requirements Document](/Requirements.md)
[^7]: [JavaScript frameworks: Angular vs React vs Vue](https://www.theseus.fi/bitstream/handle/10024/261970/Thesis-Elar-Saks.pdf)
