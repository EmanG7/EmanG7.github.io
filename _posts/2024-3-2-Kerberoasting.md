---
layout: blogpost
title: Learning Kerberoasting
image: /assets/images/blog-images/krbroast/security-image.jpeg
---
![Open-Source Security Image]({{ page.image }})

## What is Kerberos
An authentication protocol service that deals with requests between trusted hosts across untrusted (public) networks. Kerberos is the default protocol for authentication in Windows since I was born, the 2000s, and is basically a cornerstone of Windows Active Directory (AD).

![Diagram of Kerberos protocol](/assets/images/blog-images/krbroast/KerberosDiagram.png)

The diagram above displays a two part ordered list. Steps 1-4 of the Kerberos protocol that interact with the Key Distribution Center (KDC) and steps 5-6 of the protocol that interact with the service server the ticket was granted for, examples are databases, web applications, and more.

- AS_REQ and AS_REP are Authentication Service Request and Response. 
    - This is an exchange of credentials for tickets.
- TGS_REQ and TGS_REP are Ticket Granting Service Request and Response.
    - Similar to the "AS_" counterparts beforehand, except it includes pre-auth data.
- AP_REQ and AP_REP are Application/Service Server Request and Response.
    - Request to access the service and Response is just an acknowledgement (ack).

---

## Kerberoast
[Kerberoasting](https://netwrix.com/cracking_kerberos_tgs_tickets_using_kerberoasting.html){:target="_blank"} is a post-exploitation attack to crack service passwords within active directory. A domain user can request a ticket-granting service (TGS) ticket for a Service Principal Name (SPN). The TGS ticket contains a hash of the service password associated with the SPN. Therefore attackers need initial access to a domain user before using this attack/techique for privilege escalation. To finish off the attack, the hash can be cracked through a brute force attack.

### AS-REP Roasting
[AS-REP Roasting](https://netwrix.com/as-rep-roasting.html){:target="_blank"} is another post-exploitation attack for collecting credentials of domain users that have pre-authentication disabled. like Kerberoasting, searching for a certain property of domain users but instead of SPNs, it's the Kerberos preauthentication property. Search and gather for these users with preauthentication disabled then request AS-REP message using a premade toolkit like Rubeus or Impacket and finally, crack the password offline.

## Golden Ticket and Silver Ticket
These two methods are attacks that utilizes Kerberos ticket system, just like Kerberoast. But they are require forgery to extract data. 

First, The [Golden Ticket](https://netwrix.com/how_golden_ticket_attack_works.html){:target="_blank"} attack uses a forged Kerberos ticket-granting ticket (TGT) that grants the attacker the ability to request for service tickets within the domain. This attack can potentially escalate privileges to a Domain Admin but is consider more of a persistences type of technique as the ticket can be valid within the KDC for years and years.

Second, The [Silver Ticket](https://netwrix.com/silver_ticket_attack_forged_service_tickets.html){:target="_blank"} attack also uses a forged ticket but its a service ticket that allows the attacker to access a specific service without authenticating with the KDC. In terms of detection, Silver Ticket is hardest to detect due to the lack of interaction with the KDC.

---

## Mimikatz
A common and popular tool to complete these attacks is [mimikatz](https://github.com/ParrotSec/mimikatz){:target="_blank"}. This tool is a proof of concept to display the vulberabilities in authentication protocols, specifically Microsoft. In our case, it can be used for Kerberos attacks, but it also has capabilities for credential dumping, privilege escalation, lateral movement, and even defense evasion. 

Of course, there are other toolkits for Kerberoasting, like [nidem/kerberoast](https://github.com/nidem/kerberoast){:target="_blank"}. Using the "GetUserSPNs.ps1" file, you can get all candidates for kerberoasting. After requesting tickets using the SPNs you've obtained, you can use mimikatz to get the tickets out of the RAM. Then finally, crack the ticket's password using the python file from the toolkit, "tgsrepcrack.py".

---

## Conclusion
Learning about Kerberoasting, Golden Ticket, and Silver Ticket attacks was a lot of fun. I hope this gives the basics understanding and directs you, using the links, to more specifics you are looking for. Something I want to check out more is "[impacket](https://github.com/forta/impacket){:target="_blank"}", which I think can be helpful when cracking through active directory.

I recommend to get more information from other sources therefore links below lead to others articles or blogs I've found useful or informative.
- [Crowdstrike Kerberoasting article](https://crowdstrike.com/cybersecurity-101/kerberoasting){:target="_blank"} 
- [Crowdstrike Golden Ticket article](https://crowdstrike.com/cybersecurity-101/golden-ticket-attack){:target="_blank"}
- [Crowdstrike Silver Ticket article](https://crowdstrike.com/cybersecurity-101/attack-types/silver-ticket-attack){:target="_blank"}