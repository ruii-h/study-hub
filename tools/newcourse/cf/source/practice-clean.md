# IS114 practice questions (cleaned)

Open-ended, "do your own" and duplicate items from the instructor sheets were dropped. Every question below is in the Practice tab.

## 1. Computer Hardware

- **Q** Which component loses its contents when the power is switched off?
  **A** RAM
- **Q** A spec lists a "2.8 GHz Quad-Core" processor. What does "Quad-Core" mean?
  **A** The processor has four cores
- **Q** How many bytes is a 20 GB RAM, using the course rule?
  **A** 20,000,000,000
- **Q** When the CPU needs data, in which order does it look?
  **A** Cache, then RAM, then storage
- **Q** What does a "15-inch" laptop screen measurement refer to?
  **A** The diagonal of the display area
- **Q** What does a screen resolution of 1920 × 1080 mean?
  **A** The screen is 1920 pixels wide and 1080 pixels high
- **Q** What role does a GPU play in a computer?
  **A** It handles graphics so the main processor is free for other tasks
- **Q** Which connection carries digital audio and video to a TV or monitor?
  **A** HDMI
- **Q** Bluetooth is best suited to which job?
  **A** Short-range, low-power links such as keyboards and earphones
- **Q** A computer has lots of storage but little RAM. Why does it feel slow with many apps open?
  **A** RAM limits how many programs run at once; storage space does not
- **Q** A fast CPU is paired with slow storage. Why can it still perform poorly?
  **A** The CPU waits while data loads from the slow storage
- **Q** How many bytes are in 20 GB, using the course rule (powers of ten)? Type the number.
  **A** 20000000000
- **Q** In what unit is a processor's clock speed written? (abbreviation)
  **A** GHz
- **Q** Which memory does the CPU check first when it needs data: cache, RAM or storage?
  **A** cache
- **Q** What does RAM stand for?
  **A** random access memory
- **Q** How many bytes are in 1 TB, using the course rule? Type the number.
  **A** 1000000000000
- **Q** What does USB stand for?
  **A** universal serial bus
- **Q** What does a laptop screen size such as 15-inch measure?
  **A** diagonal
- **Q** In one or two sentences: what is the main difference between memory and storage?
  **A** Memory is volatile and temporary; storage is non-volatile and permanent.
- **Q** What happens to the contents of RAM when the computer is powered off?
  **A** they are lost
## 2. Operating Systems & Processes

- **Q** Which of these is system software?
  **A** Linux
- **Q** Which statement correctly distinguishes a process from a program?
  **A** A process is a program in execution
- **Q** Which key combination suspends (pauses) the foreground process?
  **A** Ctrl-z
- **Q** Which command lists the processes that you own, as written in this course?
  **A** ps u
- **Q** Which is a reason why the CLI is valued over the GUI for administration?
  **A** It supports batch processing and automation
- **Q** In the Linux terminal, how do you tell which computer you are working on?
  **A** Read the prompt, which shows the hostname
- **Q** What does Ctrl-C do on the Linux command line?
  **A** Kills the foreground process
- **Q** Compared with a killed process, a suspended process ...
  **A** still holds memory but uses no CPU time
- **Q** Which resource mainly limits how many processes can run at once?
  **A** Memory
- **Q** Why do beginners often struggle with the Linux CLI?
  **A** It is case-sensitive and needs precise command syntax
- **Q** Type the command that lists the processes you own (course form, no dash).
  **A** ps u
- **Q** Which key combination suspends (pauses) the foreground process?
  **A** ctrl-z
- **Q** After suspending a process, which command resumes it in the background?
  **A** bg
- **Q** Which key combination kills the foreground process in the Linux terminal?
  **A** ctrl-c
- **Q** Type the command that brings a suspended process back to the foreground.
  **A** fg
- **Q** What is the core component of system software?
  **A** operating system
- **Q** A laptop is turned off. Chrome is installed. Where does Chrome exist? (storage or memory)
  **A** storage
- **Q** The user clicks the Chrome icon. A Chrome ___ starts and sits in the laptop's ___. Type the two words separated by a comma.
  **A** process, memory
- **Q** On Windows, which tool lists running processes?
  **A** task manager
- **Q** In one sentence: why must an operating system "share nicely"?
  **A** Many programs must take turns using limited resources.
## 3. Linux Command-Line Data Analysis

- **Q** Which command extracts the second comma-separated column?
  **A** cut -d"," -f2 file.csv
- **Q** Why must sort come before uniq?
  **A** uniq removes only adjacent duplicates
- **Q** What does grep -v "Chicken" file print?
  **A** Lines that do not contain Chicken
- **Q** After echo "monday" > f then echo "tuesday" > f, how many lines does cat f | wc -l print?
  **A** 1
- **Q** Which pattern matches any single character in a filename?
  **A** ?
- **Q** What does the command rm cd ../apple/file.txt do?
  **A** Removes a file named cd here and file.txt in the apple folder
- **Q** What does cat file1 | wc -l print after echo "monday" > file1 then echo "tuesday" >> file1?
  **A** 2
- **Q** Which command counts the lines in a file?
  **A** wc -l
- **Q** Which command shows only the lines that appear once, next to each other?
  **A** uniq -u
- **Q** Using yum.csv (with a header row), type a pipeline that counts the unique foods (column 2, comma separated).
  **A** tail -n +2 yum.csv | cut -d',' -f2 | sort | uniq | wc -l
- **Q** Type a command that prints the lines of yum.csv that contain Sushi, ignoring case.
  **A** grep -i Sushi yum.csv
- **Q** Type a command that prints the lines of yum.csv that do NOT contain Chicken.
  **A** grep -v Chicken yum.csv
- **Q** Type a command that prints the lowest price (column 3) of yum.csv.
  **A** tail -n +2 yum.csv | cut -d',' -f3 | sort -n | head -n 1
- **Q** Append the text tuesday to the end of file1 with a single command.
  **A** echo tuesday >> file1
- **Q** Type a command that shows the first 8 lines of yum.csv.
  **A** head -n 8 yum.csv
- **Q** Type a command that shows the last 8 lines of yum.csv.
  **A** tail -n 8 yum.csv
- **Q** Type a command that extracts fields 10 and 20 of data.csv, using a comma as the delimiter.
  **A** cut -d, -f10,20 data.csv
- **Q** Type a command that sorts names.txt in reverse order.
  **A** sort -r names.txt
- **Q** Type a command that sorts numbers.txt numerically.
  **A** sort -n numbers.txt
- **Q** Type a command that shows only the duplicated consecutive lines of list.txt.
  **A** uniq -d list.txt
- **Q** Type a command that counts the words in essay.txt.
  **A** wc -w essay.txt
- **Q** Type a command that lists all files whose names start with vibe.
  **A** ls vibe*
- **Q** Type a command that lists all files whose names end with vibe.
  **A** ls *vibe
- **Q** Type a command that lists files with vibe in the middle and at least one character before and after it.
  **A** ls ?*vibe*?
- **Q** Show only the first 3 foods of yum.csv: no header, dates, prices or ratings.
  **A** grep -v #date,food,price,rating yum.csv | head -n 3 | cut -d, -f2
- **Q** Show the highest price in yum.csv: no date, food or rating.
  **A** grep -v #date,food,price,rating yum.csv | cut -d, -f3 | sort -n | tail -n 1
- **Q** For each food in yum.csv, show how many times it appears.
  **A** grep -v #date,food,price,rating yum.csv | cut -d, -f2 | sort | uniq -c
- **Q** Show the foods that appear exactly once in yum.csv.
  **A** grep -v #date,food,price,rating yum.csv | cut -d, -f2 | sort | uniq -u
- **Q** After echo "monday" > file1 then echo "tuesday" > file1, what does cat file1 | wc -l print?
  **A** 1
## 4. File Systems, Paths & Permissions

- **Q** Which path is absolute?
  **A** /home/smith/reports/week1.txt
- **Q** With CWD /home/jones, what does ../smith/reports resolve to?
  **A** /home/smith/reports
- **Q** What does chmod u=rw,go= file do?
  **A** Only the owner can read and write it
- **Q** Which command removes only an empty directory?
  **A** rmdir
- **Q** You can ls folder ABC but cd ABC says Permission denied. What is missing?
  **A** x on the directory
- **Q** What are the three permission categories in Linux?
  **A** Owner, group and world
- **Q** Why can two files share a name without a conflict?
  **A** They sit in different directories, so their full paths differ
- **Q** Does renaming report.txt to report.pdf convert the file?
  **A** No. Only the name changes; the contents stay the same
- **Q** After mkdir one .two three, ls shows only one and three. Why?
  **A** .two is hidden, so ls needs -a to show it
- **Q** What does the root of a Linux directory tree look like?
  **A** /
- **Q** Type a command that makes key.pem readable and writable by its owner only.
  **A** chmod u=rw,go= key.pem
- **Q** Type a command that lets the owner execute script.sh.
  **A** chmod u+x script.sh
- **Q** With CWD /home/jones, what absolute path is ../smith/reports?
  **A** /home/smith/reports
- **Q** Type the command that deletes the directory old together with everything inside it.
  **A** rm -r old
- **Q** Type the command that prints your current absolute path.
  **A** pwd
- **Q** Type the command that lists the current directory with details.
  **A** ls -l
- **Q** Type the command that lists the current directory including hidden files.
  **A** ls -a
- **Q** Type a command that gives the owner of notes.txt read permission only and group and world no permissions.
  **A** chmod u=r,go= notes.txt
- **Q** Type a command that enables execute permission on run.sh for owner, group and world.
  **A** chmod +x run.sh
- **Q** Type a command that removes write permission from group and world on the folder shared.
  **A** chmod go-w shared
- **Q** What is the Linux root directory written as?
  **A** /
- **Q** Which permission on a directory is needed to cd into it?
  **A** execute
## 5. Computer Networks & Addressing

- **Q** What does an IP address identify?
  **A** The computer
- **Q** Which port does HTTPS use by default?
  **A** 443
- **Q** nmap reports a port as "filtered". What does that mean?
  **A** A firewall hides the true state
- **Q** What does DNS do?
  **A** Resolves hostnames to IP addresses
- **Q** Why can packets of one message arrive out of order?
  **A** They can take different routes
- **Q** What does the term "bandwidth" commonly refer to?
  **A** The data transfer rate of a network
- **Q** A protocol in networking defines ...
  **A** the rules for formatting and processing data
- **Q** What defines a LAN?
  **A** A network in a small geographic area such as a building
- **Q** Which network type connects several LANs over a large geographic distance?
  **A** WAN
- **Q** What is the purpose of a router in a LAN?
  **A** To act as a gateway between the LAN and the WAN
- **Q** A router receives a packet. What does it know about the packet's journey?
  **A** The best next step toward the destination
- **Q** In packet switching, a route is blocked by heavy traffic. What happens?
  **A** A router finds an alternative route
- **Q** What is a top-level domain?
  **A** The final section of a domain name, such as .com
- **Q** Which organisation is responsible for managing top-level domains?
  **A** ICANN
- **Q** The default ports for SSH, HTTP and HTTPS are, in that order ...
  **A** 22, 80, 443
- **Q** What does a hostname typically consist of?
  **A** A computer name and a domain name
- **Q** ping ex.com complains about a failure in "name resolution". What is the most likely cause?
  **A** The domain ex.com does not exist
- **Q** What can ping ex.com tell you?
  **A** The round trip time and the IP address of ex.com
- **Q** Which port number does HTTPS use by default?
  **A** 443
- **Q** Which port number does SSH use by default?
  **A** 22
- **Q** What is port 443 used for? (one word: the protocol)
  **A** https
- **Q** Type the command that tests whether the host gov.sg is reachable and shows the round-trip time.
  **A** ping gov.sg
- **Q** Type a command that looks up the IP address of shopee.sg using dig, short form.
  **A** dig +short shopee.sg
- **Q** Type a command that checks the state of port 443 on example.com.
  **A** nmap example.com -p 443
- **Q** What is the hostname equivalent of 127.0.0.1?
  **A** localhost
- **Q** In the hostname node7.cluster.spider.net, what is the computer name?
  **A** node7
- **Q** In cute.labubu.flushie.biz, what is the top-level domain? (include the dot)
  **A** .biz
- **Q** What is a port number used to identify?
  **A** a process
- **Q** Which protocol uses port 22 by default?
  **A** ssh
- **Q** Which port does HTTP use by default?
  **A** 80
- **Q** In a typical home network, the default nameserver runs on the home network's ___.
  **A** router
- **Q** When nmap says a port is ___, an application is listening on it.
  **A** open
- **Q** When nmap says a port is ___, it cannot tell whether it is open or closed.
  **A** filtered
- **Q** When nmap says a port is ___, no application is listening on it.
  **A** closed
- **Q** Type a command that resolves x.com with the nameserver 1.1.1.1 and a short answer.
  **A** dig +short x.com @1.1.1.1
- **Q** Type a command that resolves x.com with the default nameserver and a short answer.
  **A** dig +short x.com
- **Q** Type a command that tests whether smoo.com has a process listening on port 443.
  **A** nmap smoo.com -p 443
- **Q** In one sentence: what happens to a message in packet switching?
  **A** It is broken into packets that are sent separately and reassembled at the destination.
## 6. The Web, HTML & HTTP

- **Q** Which statement correctly relates the Internet and the Web?
  **A** The Web is an application that runs on top of the Internet
- **Q** A web page has 5 images. How many HTTP requests does loading it need?
  **A** 6
- **Q** In https://www.example.com:443/path/page.html?k=v#top, which part is the host?
  **A** www.example.com
- **Q** What does python -m http.server serve by default?
  **A** The current directory, on port 8000
- **Q** What does CSS control?
  **A** How content looks
- **Q** What is the main function of HTML?
  **A** Defining the structure and elements of a web page
- **Q** A page references extra images. How are they fetched?
  **A** The client sends a separate HTTP request for each object after getting the base HTML
- **Q** An HTTP server is started. From which folder does it serve files?
  **A** The web root folder
- **Q** What is source HTML?
  **A** The raw HTML text received by the browser
- **Q** Why is HTTPS preferred over HTTP?
  **A** It encrypts the data between client and server
- **Q** What is the main risk if a server shares the wrong folder?
  **A** Accidental exposure of private files
- **Q** Which of these URLs reach a server running on your own computer?
  **A** http://localhost and http://127.0.0.1
- **Q** What is the "hostname" part of a URL related to?
  **A** The computer on which the information is stored
- **Q** What is a web server?
  **A** A program that answers HTTP requests and serves content
- **Q** What does CSS indicate for a web page?
  **A** How information should be displayed (style, font, colour)
- **Q** Which describes the relationship between the Internet and the Web?
  **A** The Web is a system built on top of the Internet
- **Q** Linux accepts file.txt as a filename: true or false?
  **A** True
- **Q** Type the command that starts a local web server on port 8000 serving the current directory.
  **A** python -m http.server
- **Q** In https://www.example.com/page.html#top, what is #top called?
  **A** anchor
- **Q** Which HTML tag creates a hyperlink? Type the tag.
  **A** 
- **Q** For a client to connect to a server it must know the server's IP address and its ___ number.
  **A** port
- **Q** Type a command that shows only the HTTP response body of https://x.com using httpie.
  **A** http --print b https://x.com
- **Q** Which HTML element inserts a line break? Type the tag.
  **A** 
- **Q** Which HTML element is used for bold emphasis by default? Type the tag.
  **A** 
- **Q** Which HTML section holds information about the document, such as its title? Type the tag.
  **A** 
- **Q** A page references three images. How many files does the browser download in total?
  **A** 4
- **Q** What do we call the folder a web server serves files from?
  **A** web root
- **Q** Type a single letter that is allowed in a Linux filename.
  **A** Letters and digits are allowed.
## 7. Local Networks, DHCP & NAT

- **Q** Which IP address is private?
  **A** 192.168.8.8
- **Q** What does DHCP do?
  **A** Leases private IP addresses to devices that join
- **Q** What does NAT let many devices do?
  **A** Share one public IP address
- **Q** How many IP addresses does a home router have, typically?
  **A** Two: a public one and a private one
- **Q** Which device converts optical fibre signals into electrical signals?
  **A** ONT
- **Q** What does an Optical Network Terminal (ONT) do?
  **A** Converts optical signals from the ISP into electrical signals for the home network
- **Q** Why can't every device have its own public IPv4 address?
  **A** There are more devices than public addresses available
- **Q** Why does a home router have both a public and a private IP address?
  **A** Public to reach the Internet, private to talk to the LAN
- **Q** Two routers in separate home networks give two devices the same private IP. What happens?
  **A** Nothing bad, because the networks are separate
- **Q** Why is NAT less critical for IPv6?
  **A** IPv6 has a vastly larger address space
- **Q** Is 172.16.5.5 a public or private address?
  **A** private
- **Q** Is 172.32.0.1 a public or private address?
  **A** public
- **Q** What does NAT stand for?
  **A** network address translation
- **Q** What does DHCP stand for?
  **A** dynamic host configuration protocol
- **Q** Which device converts optical signals from the ISP into electrical signals?
  **A** ont
- **Q** What translates between private and public addresses on a home router?
  **A** nat
- **Q** Give one example of a private IP address.
  **A** 192.168.8.8
- **Q** A phone on home Wi-Fi: is its IP address public or private?
  **A** private
## 8. Cloud Computing & AWS EC2

- **Q** Which cloud model is open to any subscriber?
  **A** Public
- **Q** What does terminating an EC2 instance do?
  **A** Wipes the machine and stops billing
- **Q** In ssh -i key.pem ec2-user@IP, what does -i supply?
  **A** The identity (private key) file
- **Q** Why does ssh refuse a key.pem with loose permissions?
  **A** The private key must not be readable by others
- **Q** What does a security group with no inbound rule for port 80 do to web traffic?
  **A** It drops it
- **Q** What is the purpose of launching an EC2 instance?
  **A** To get a virtual server in the cloud that runs applications
- **Q** Why set correct permissions on the downloaded .pem private key?
  **A** So only you can read the private key
- **Q** Port 80 is not allowed in the EC2 security group but the HTTP server runs. What does a browser see?
  **A** A long wait, then "This site can't be reached"
- **Q** In the same situation, what does nmap report for port 80?
  **A** filtered
- **Q** What is an inbound security rule used for?
  **A** To allow specific incoming traffic to the instance
- **Q** What happens to the instance if the private key file is deleted?
  **A** You are locked out and cannot connect over SSH
- **Q** Connect to the instance at 3.1.2.4 as ec2-user using the key file is114-keypair.pem.
  **A** ssh -i is114-keypair.pem ec2-user@3.1.2.4
- **Q** In a security group, what does the source 0.0.0.0/0 mean?
  **A** all ipv4 addresses
- **Q** Which EC2 action turns the machine off for good and stops billing?
  **A** terminate
- **Q** Which AWS service gives you a virtual server in the cloud?
  **A** ec2
- **Q** What does ssh need to authenticate you when you use -i?
  **A** private key
- **Q** Which port must the security group allow for SSH?
  **A** 22
- **Q** Which port must the security group allow for plain HTTP?
  **A** 80
- **Q** Is a private cloud open to any subscriber? Type yes or no.
  **A** no
## 9. Information Security & Cryptography

- **Q** A DoS flood crashes a web server. Which pillar is attacked?
  **A** Availability
- **Q** Which key encrypts a message to Bob in public-key cryptography?
  **A** Bob's public key
- **Q** Which is "something you are"?
  **A** A fingerprint
- **Q** Why is SMS a weak second factor?
  **A** Messages are not encrypted and SIMs can be swapped
- **Q** What does a firewall enforce?
  **A** An access control policy
- **Q** What does the public key do in public-key cryptography?
  **A** It is shared freely and encrypts messages for the key owner
- **Q** Which describes a firewall?
  **A** It checks incoming traffic and filters unwanted traffic
- **Q** What does a certificate authority do?
  **A** Verifies a public key by issuing a digital certificate
- **Q** What is the main weakness of symmetric encryption?
  **A** Both sides must share the same key, which can be intercepted
- **Q** What is the difference between false acceptance and false rejection in biometrics?
  **A** Acceptance admits an unauthorised user; rejection blocks a legitimate user
- **Q** Encrypt FUNDAMENTAL with a Caesar shift of 3.
  **A** IXQGDPHQWDO
- **Q** Decrypt FRPSXWHU with a Caesar shift of 3.
  **A** COMPUTER
- **Q** Which key decrypts a message that was encrypted with Bob's public key?
  **A** bobs private key
- **Q** Name the three parts of the CIA triad.
  **A** confidentiality, integrity, availability
- **Q** Which CIA pillar does a DoS attack target?
  **A** availability
- **Q** Which key does Bob use to decrypt a message Alice encrypted with his public key?
  **A** private key
- **Q** Two-factor authentication uses two ___ types of credential, such as a password and a phone code.
  **A** different
- **Q** Is a password alone a strong form of authentication? Type yes or no.
  **A** no
## 10. Systems Architecture Case Study

- **Q** In the case study, which ports are opened in the security group to the whole Internet?
  **A** 80 and 443
- **Q** Why does the developer first host the server on 127.0.0.1:8000?
  **A** To test rendering without exposing unfinished code
- **Q** What shares the home's single public IP among sensors and laptops?
  **A** NAT on the router
- **Q** How do developers log in to the EC2 instance?
  **A** SSH with a .pem private key
- **Q** Which tier uses Bluetooth pairing and embedded microcontrollers?
  **A** Tier 1: edge sensing
- **Q** Which port do the sensors use to send encrypted telemetry to the cloud?
  **A** 443
- **Q** Which IP address and port does the developer use to test the server locally?
  **A** 127.0.0.1:8000
