---
layout: blogpost
title: Cloud LB Redirectors
image: /images/blog-images/loadbalancing.png
tags:
- Cloud
- PaaS
- LoadBalancing
- Redirectors
- AWS
- GCP
---
## Load Balancing as a Redirector in Cloud 
Load balancing, in cloud computing is used to ensure network traffic is evenly distributed between multiple servers, networks, and other resources to prevent disruption in accessibility and workflow. Taking note that load balancing can direct traffic allows us to target HTTP headers to redirect and manipulate them to get information out. Most Cloud Load Balancing services provided have features that can be utilized for HTTP Header manipulation and maintaining TLS certificates to avoid suspension as cloud service providers are "Trust" by many. 

I'll have some examples below for different services, but they are only **proof of concept** that can change in the future and are for educational purposes. 

![LoadBalancing Icon]({{ page.image }})

---

### [AWS ELB](https://https://aws.amazon.com/elasticloadbalancing){:target="_blank"}
Amazon Web Services' Elastic Load Balancing used for securing applications with SSL\TLS and managing certifications along with high availability, automatic scaling, and monitoring capabilities. Within AWS, what will interest us the most is the "Target Groups" when routing sources and targets. AWS allows Target Groups to be the IP addresses for on-premise server that someone may have to host their content but in our case, it's a C2 server. 

---

### [GCP CLB](https://https://cloud.google.com/load-balancing){:target="_blank"}
Google Cloud Platform's Cloud Load Balancing will work a bit differently compared to AWS ELB. Using the URL Maps within their LB service. [URL maps](https://cloud.google.com/load-balancing/docs/url-map-concepts){:target="_blank"} cannot have IP addresses within them, only URL hence the name. This forces us to use more services like DNS to exchange the URL name to IP and possibly Cloud NAT to exchange the cloud's IP for an external IP being the C2 server.

There's also GCP Traffic Director that can direct to a [proxy](https://cloud.google.com/traffic-director/docs/multi-environment-overview){:target="_blank"} on the cloud, which allows on-premise servers to connect to the cloud. 

---

### Conclusion
This is will need more research and not just for Load Balancing in the Cloud but all services that can use network traffic to its advantage on where it come from and go to. I will possibly make an edit this post to link another newer post if I post about this again with updates.

