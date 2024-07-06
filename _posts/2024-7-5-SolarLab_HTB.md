---
title: "HTB: SolarLab (First Half)"
date: 2024-07-05
tags: [blogs]
excerpt: "First writeup about a HTB machine and how I'm learning more of the offensive side of cybersecurity"
---
Introduction
---
<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_banner.png" alt="" style="max-width:500px;display:block;margin-left:auto;margin-right:auto;">

Before I start going through the Hackthebox (HTB) machine, SolarLab, I would like to preface this with that I'm still very much learning and that this documentation won't be perfect but hopefully getting better over time with new machines.
I've watching or reading a ton of videos, blogs, and other documents about hacking/pentesting.
Also, I've giving pentesting a shot in the past when I didn't know as much but I can confidently say I'm much better now.

Start: Recon and Enum
---
To start, scan all the ports! As a plus, logging the nmap scans with `-oN path/to/file.log` saves time if its needed for future reference or documentation.
> sudo nmap -T4 -p- -v -oN enu/nmap-ports.log 10.10.11.16

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_nmap_ports.png" alt="">

Once that's done, what services and versions are running on these open ports?
> sudo nmap -T4 -p 80,135,139,445,6791 -sCV -v -oN enu/nmap-services.log 10.10.11.16

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_nmap_services.png" alt="">

Now lets attaching the IP address to a domain like `solarlab.htb` within `/etc/hosts` so the IP address can be accessed more easily.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_etchosts.png" alt="">

Port 139 and 445 are open, time to snoop around SMB if anonymous access is allowed.
> smbclient -L //solarlab.htb/

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_smbclient.png" alt="">

> smbclient -N //solarlab.htb/Documents

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_smbsharename.png" alt="">

Lucky! I found some files with extensions like `.docx` and `.xlsx`, maybe they'll hold some useful information.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_xlsx.png" alt="">

Only the `.xlsx` was interesting. 
It contained credentials but no place to use them yet. 
So lets check out the website since port 80 was also open.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_website.png" alt="">

No login section here but looking back at the nmap service scan, a failed redirect to `report.solarlab.htb` on port 6791 was mentioned so we'll add that to `/etc/hosts` and check out that page too. If nmap didn't show this, gobuster is next move inorder to test for directories and subdomains of the website. `report.solarlab.htb` would be found in the subdomain search from gobuster.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_etchosts_addition.png" alt="">

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_website_6791.png" alt="">

Look at that, a login page for `ReportHub`.
Time to try out the credentials from the `.xlsx` file. Most usernames had the results of `User not found.` while two, AlexanderK and ClaudiaS, had the results of `User authentication error.` 
That means they have accounts and I just didn't guess the password.

Exploiting
---

I think it's time to brute force some passwords using Burp Suite. Using the proxy feature of Burp Suite to intercept a login attempt, I can capture a POST request and send to the intruder section to be brute forced.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_proxy_login.png" alt="">

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_intruder_position.png" alt="">

Loading up the payload with the credentials.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_intruder_payload_1.png" alt="">
<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_intruder_payload_2.png" alt="">

Send the attack and ...

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_intruder_attack_1.png" alt="">

Nothing exciting...
But back at the `.xlsx` file, there are SSN for three people and on the website in the "About Us" section, there's three people: Alexander K, Claudia S, and Blake B. Blake is missing an username like Alexander & Claudia that could be potentially used for `ReportHub` from the `.xlsx` file. If I structure his username like Alexander's and Claudia's, it should look like `BlakeB`.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_intruder_payload_3.png" alt="">

Launch the attack!

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_intruder_attack_2.png" alt="">

There's something different about `BlakeB:ThisCanB3typedeasily1@`. It produced a redirect status code, like it actually logged in. Here is what it looks like using those credentials.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_website_access.png" alt="">

Lets see where is takes me and what I can do.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_pdfmaking.png" alt="">

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_pdf.png" alt="">

Looks like I can generate pdfs through all the report buttons for different issues.
What if ... there was an exploit for this pdf generator from `ReportHub`. 

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_reporthub_cve.png" alt="">

Google found something. `CVE-2023-33733`, a RCE exploit and a github repo explaining how it works. Just need a place to exploit it. Try implementing the exploit into the pdf that's being generated through Burp Suite.

Using the proxy feature again, intercept and capture a pdf request to make pdf and send it to the repeater feature of Burp Suite

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_proxy_pdf.png" alt="">

Make sure you have a listener ready and listening when you exploit it. I used `penelope.py` as I'm trying new things, its currently not the best for windows but it still works even if most features aren't implemented for windows yet.

Within the request on Burp Suite, place the exploitable html from the CVE with a payload or way to grab and execute a payload within it. I used `Invoke-PowerShellTcp.ps1` as it's a popular choice that isn't metasploit.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_repeater_payload.png" alt="">

Access Grant!!

Navigate to `C:\Users\blake\Desktop\` into order to find the `user.txt` containing the hex file showing you owned the user account of this HTB.

<img src="{{ site.url }}{{ sitebase.url }}/assets/images/solarlab/solarlab_usertxt.png" alt="">

Now it's your turn to take it further and own the system. Try Winpeas.

Conclusion
---
As I do more of these blogs and Hackthebox machines, I'll be trying new tools, techniques, formats, and strategies.
Anything to help to get the edge over this side of cybersecurity and learn.
