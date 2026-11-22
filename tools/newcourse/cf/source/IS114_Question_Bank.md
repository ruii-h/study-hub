# IS114 Question Bank

Question types: **MCQ** (one correct option), **MSQ** (select all that apply), **Fill** (fill in the blank / type the answer), **Short** (short answer). Correct options are marked ✅.

---

1. **[Fill]** Type a single letter that is allowed in Linux filenames.
   **Answer:** any letter, e.g. `a`

2. **[MCQ]** `file.txt` is a valid Linux filename.
   - ✅ True
   - False

### Linux commands: command only

3. **[Fill]** Command to create files: `___ FILENAME`
   **Answer:** `touch`

4. **[Fill]** Command to display entire file contents: `___ FILENAME`
   **Answer:** `cat`

5. **[Fill]** Command to edit a file: `___ FILENAME`
   **Answer:** `nano`

6. **[Fill]** Command to display some text to the screen: `___ SOME_TEXT`
   **Answer:** `echo`

7. **[Fill]** Command to display the beginning of a file: `___ FILENAME`
   **Answer:** `head`

8. **[Fill]** Command to display the end of a file: `___ FILENAME`
   **Answer:** `tail`

9. **[Fill]** Command to search for lines in a file that match a pattern: `___ PATTERN FILENAME`
   **Answer:** `grep`

10. **[Fill]** Command to sort lines of text in a file or input: `___ FILENAME`
    **Answer:** `sort`

11. **[Fill]** Command to remove duplicate consecutive lines: `___ FILENAME`
    **Answer:** `uniq`

12. **[Fill]** Command to count lines in a file: `___ -l FILENAME`
    **Answer:** `wc`

### Linux commands: one option

13. **[Fill]** Command to list the contents of the current directory, including details.
    **Answer:** `ls -l`

14. **[Fill]** Command to list the contents of the current directory, including normally-hidden files.
    **Answer:** `ls -a`

15. **[Fill]** Command to sort lines of text in reverse order: `___ FILENAME`
    **Answer:** `sort -r`

16. **[Fill]** Command to sort lines of text numerically: `___ FILENAME`
    **Answer:** `sort -n`

17. **[Fill]** Command to show only duplicate consecutive lines: `___ FILENAME`
    **Answer:** `uniq -d`

18. **[Fill]** Command to show only unique consecutive lines: `___ FILENAME`
    **Answer:** `uniq -u`

19. **[Fill]** Command to count the occurrences of unique consecutive lines: `___ FILENAME`
    **Answer:** `uniq -c`

20. **[Fill]** Command to count lines in a file: `___ FILENAME`
    **Answer:** `wc -l`

21. **[Fill]** Command to count words in a file: `___ FILENAME`
    **Answer:** `wc -w`

22. **[Fill]** Command to enable execute permissions on a file for owner, group and world: `___ FILENAME`
    **Answer:** `chmod +x`

### Linux commands: option and argument

23. **[Fill]** Command to search for lines in a file that match "bbt", ignoring case: `___ FILENAME`
    **Answer:** `grep -i "bbt"`

24. **[Fill]** Command to search for lines in a file that match "huat ah", ignoring case: `___ FILENAME`
    **Answer:** `grep -i "huat ah"` (the argument must be quoted because it contains a space)

25. **[Fill]** Command to search for lines in a file that don't match "bbt": `___ FILENAME`
    **Answer:** `grep -v "bbt"`

26. **[Fill]** Command to show the first 8 lines of a file: `___ FILENAME`
    **Answer:** `head -n 8`

27. **[Fill]** Command to show the last 8 lines of a file: `___ FILENAME`
    **Answer:** `tail -n 8`

28. **[Fill]** Command to extract fields 10 and 20 from a file, using a comma as the delimiter: `___ FILENAME`
    **Answer:** `cut -d"," -f10,20` (the `-d` option is needed; `cut -f10,20` alone is wrong)

29. **[Fill]** Command to enable read permission for the owner only, with no write/execute for the owner and no permissions for group and world. Use the format `COMMAND X=Y,AB=`
    **Answer:** `chmod u=r,go=`

### Linux commands: wildcards and output

30. **[Fill]** Command to list all files with filenames starting with `vibe`.
    **Answer:** `ls vibe*`

31. **[Fill]** Command to list all files with filenames ending with `vibe`.
    **Answer:** `ls *vibe`

32. **[Fill]** Command to list all files that have `vibe` in the middle, with 1 or more characters before and after it.
    **Answer:** `ls ?*vibe*?`

33. **[Fill]** What is the output of this sequence of commands?
    ```
    echo "monday" > file1
    echo "tuesday" >> file1
    cat file1 | wc -l
    ```
    **Answer:** `2`

34. **[Fill]** What is the output of this sequence of commands?
    ```
    echo "monday" > file1
    echo "tuesday" > file1
    cat file1 | wc -l
    ```
    **Answer:** `1` (`>` overwrites the file)

35. **[MCQ]** What does this command do? `rm cd ../apple/file.txt`
    - Remove file.txt in the apple folder
    - ✅ Remove the file named `cd` in the current folder, and the file named `file.txt` in the apple folder
    - Nothing, there's a syntax error
    - Changes folder to ../apple

### Networking basics

36. **[MCQ]** What does the term "bandwidth" commonly refer to?
    - The maximum number of devices on a LAN
    - ✅ The data transfer rate of a network
    - The amount of data that can be stored inside a network
    - The thickness of a network cable
    - None of the above

37. **[MCQ]** A protocol in networking defines:
    - The strength of the network signal
    - The size of a data cable
    - The number of hosts on a network
    - ✅ The rules for formatting and processing data
    - None of the above

38. **[MSQ]** Which of the following are hardware?
    - ✅ Storage
    - Wi-Fi protocol
    - ✅ Memory
    - Network application
    - ✅ Network cable
    - None of the above

39. **[MCQ]** Which of these best describes the client/server model?
    - ✅ A client requests a service and a server responds
    - Devices share bandwidth equally
    - A server requests data from a client
    - Data flows randomly between nodes
    - None of the above

40. **[MCQ]** What defines a LAN?
    - ✅ A network in a small geographic area like a building
    - A connection using local, non-foreign technology only
    - A network connected only by wireless signals
    - A network over a country-wide area
    - None of the above

41. **[MCQ]** Which type of network connects multiple LANs over a large geographic distance?
    - LAN
    - PAN
    - WLAN
    - ✅ WAN

42. **[MCQ]** What is the purpose of a router in a LAN?
    - Monitor user activity
    - Manage HTML data
    - ✅ Serve as a gateway between a LAN and WAN
    - Encrypt all data being sent
    - None of the above

43. **[MCQ]** What is packet switching?
    - Forwarding packets to the router only
    - Encrypting packets before transmission
    - ✅ Breaking a message into packets sent separately
    - Switching IP addresses rapidly
    - None of the above

44. **[MCQ]** Why might packets arrive out of order in a network?
    - They are not encrypted
    - The sender stopped sending packets
    - They are too large to be transferred
    - ✅ They take different routes across networks
    - None of the above

45. **[MCQ]** In a packet-switched network, what happens if a route is blocked due to heavy traffic?
    - ✅ Router finds an alternative route
    - Router waits for route to clear
    - Packets are sent back to the sender
    - Transmission fails

46. **[MSQ]** Which of these pieces of info must a data packet include?
    - ✅ Destination IP address
    - ✅ Destination port number
    - HTML tag
    - Web page
    - Hyperlink
    - None of the above

47. **[MCQ]** When a router directs packets, what is it expected to know about the packet's entire course from source to destination?
    - ✅ The next step to get the packet closer to its destination
    - The entire course for all packets simultaneously
    - The exact route the packet will take
    - What human intervention is required to determine the next step
    - None of the above

48. **[MCQ]** Which of the following is a loopback address?
    - 192.168.1.1
    - 255.255.255.0
    - 10.0.0.1
    - ✅ 127.0.0.1
    - None of the above

49. **[Fill]** What is the hostname equivalent of 127.0.0.1?
    **Answer:** `localhost`

50. **[MCQ]** What is a loopback address?
    - A temporary IP address assigned by a DHCP server
    - An IP address used exclusively for public websites
    - An IP address that routes traffic to a remote server
    - ✅ An IP address that routes traffic back to the same device
    - None of the above

51. **[MCQ]** What is the loopback address used for?
    - Checking DNS status only
    - Connecting to a remote computer
    - Encrypting packets
    - ✅ Sending data back to your own machine

52. **[MSQ]** Which IP address ranges are private?
    - ✅ 10.1.x.x
    - 8.8.x.x
    - ✅ 192.168.x.x
    - 192.16.x.x
    - None of the above

53. **[MCQ]** What is a port number used for?
    - To hide hostnames
    - To label routers
    - ✅ To identify a process
    - None of the above

54. **[MCQ]** The default port numbers for SSH, HTTP, and HTTPS are:
    - 443, 80, 22
    - 80, 443, 22
    - 22, 443, 80
    - ✅ 22, 80, 443
    - None of the above

55. **[MCQ]** Which port is used by HTTPS?
    - ✅ 443
    - 21
    - 22
    - 80

56. **[MCQ]** What does a hostname typically consist of?
    - IP address and port number
    - ✅ Computer name and domain name
    - Protocol and server name
    - Username and password

57. **[MCQ]** Which of the following is an example of a hostname?
    - 255.255.255.0
    - 127.0.0.1
    - ✅ matisse.csc.villanova.edu
    - 192.168.0.10

58. **[Fill]** In the hostname `node7.cluster.spider.net`, the computer name is ____
    **Answer:** `node7`

59. **[Fill]** In the hostname `cute.labubu.flushie.biz`, the Top-Level Domain (TLD) is ____
    **Answer:** `.biz`

60. **[MCQ]** In the hostname `lab1.network.school.edu`, what is the top-level domain (TLD)?
    - school
    - network
    - ✅ edu
    - lab1

61. **[MCQ]** What is a top-level domain?
    - A local IP address
    - The first section of a domain name, like www.
    - The hostname
    - A hidden HTML tag
    - ✅ The final section of a domain name, like .com
    - None of the above

62. **[MCQ]** Which organization is responsible for managing top-level domains (TLDs)?
    - IETF
    - W3C
    - IEEE
    - ✅ ICANN

63. **[MCQ]** What is the primary function of the Domain Name System (DNS)?
    - ✅ To translate hostnames into numeric IP addresses
    - To remember which domain names are available for sale
    - To provide physical connections between networks
    - To manage email accounts
    - To route data between networks
    - None of the above

64. **[Fill]** In a typical home network, the default nameserver is a process that runs on the home network's ____
    **Answer:** `router`

### Network tools: ping, nmap, dig

65. **[Fill]** Command for finding out the round trip time to a host.
    **Answer:** `ping` (the round trip time appears as `time=` in the output)

66. **[MSQ]** What can `ping ex.com` do?
    - ✅ Find out the round trip time from your computer to ex.com
    - ✅ Find out the IP address of ex.com
    - Tell us with 100% certainty whether our internet connection is working
    - Tell us with 100% certainty whether the machine ex.com exists

67. **[MCQ]** If `ping ex.com` complains about a failure in "name resolution", what is the most likely cause?
    - ✅ The domain ex.com doesn't exist
    - ping isn't working
    - The web server process on ex.com is stopped
    - The machine ex.com isn't responding to pings

68. **[Fill]** Command to test whether smoo.com has a server process listening on port 443.
    **Answer:** `nmap smoo.com -p 443`

69. **[Fill]** When nmap says a port is ____, it means an application is listening for connections on that port.
    **Answer:** `open`

70. **[Fill]** When nmap says a port is ____, it means nmap can't tell whether the port is open or closed.
    **Answer:** `filtered`

71. **[Fill]** When nmap says a port is ____, it means no application is listening for connections on that port.
    **Answer:** `closed`

72. **[Fill]** Command to resolve x.com using the default nameserver, with a short answer.
    **Answer:** `dig +short x.com`

73. **[Fill]** Command to resolve x.com using the nameserver 1.1.1.1, with a short answer.
    **Answer:** `dig +short x.com @1.1.1.1`

74. **[Short]** How do `ping`, `dig`, and `nmap` each provide different information about network connectivity?
    **Answer:** `ping` checks if a host is reachable. `dig` checks a domain's IP address. `nmap` checks which services and ports are open on a host.

75. **[Short]** If nmap shows port 80 as open, what does that indicate?
    **Answer:** The host is running a server process on port 80.

76. **[Short]** When a hostname cannot be resolved, what likely went wrong in the DNS process?
    **Answer:** All the DNS servers involved failed to find an IP address for the hostname, or the request expired due to time limits.

### Web: HTML, CSS, HTTP

77. **[MCQ]** What is the main function of HTML?
    - Optimizing search engine results
    - Securing online transactions
    - ✅ Defining the structure and elements of a web page
    - Hosting remote databases

78. **[MCQ]** What is the main role of Cascading Style Sheets (CSS) in web design?
    - To define what the information is (e.g., a paragraph, an image, some text)
    - To manage server-side logic and databases
    - ✅ To indicate how information should be displayed (e.g., style, font, background color)
    - To handle data transfer between client and server
    - None of the above

79. **[MCQ]** When an HTTP client requests a web page that references additional objects (like images or videos), how are these objects typically handled?
    - The client caches all possible images beforehand
    - The server automatically pushes all objects to the client without a request
    - They are embedded directly within the base HTML file and downloaded in one go
    - ✅ The client sends separate HTTP requests for each referenced object after receiving the base HTML file
    - None of the above

80. **[MCQ]** When an HTTP server process is started, from which folder does it retrieve the content it serves to clients?
    - The Documents folder
    - The Downloads folder
    - The home folder
    - ✅ The web root folder
    - The root folder
    - None of the above

81. **[MCQ]** What is source HTML?
    - A DNS response
    - The IP address of a host
    - Rendered output of a page
    - ✅ Raw HTML text received by a browser

82. **[MCQ]** What does the `<a>` tag define?
    - ✅ A hyperlink to another resource
    - A list of items
    - A CSS definition
    - An image

83. **[MCQ]** What does localhost refer to?
    - ✅ Your own computer
    - A remote device
    - A proxy host
    - A public server

84. **[MCQ]** Which of the following best describes an object in a web page?
    - A data packet
    - ✅ A referenced file like an image or script
    - The main HTML document
    - The user profile
    - None of the above

85. **[MCQ]** Why might a web developer use `https://localhost`?
    - To access social media
    - To publish to the public
    - To send emails to themselves
    - ✅ To test their site on their own computer

86. **[MCQ]** What is the main risk if a server shares the wrong folder?
    - ✅ Accidental exposure of private files
    - Too many HTML elements
    - Slow connections
    - Reduced image quality

87. **[MCQ]** Why is HTTPS preferred over HTTP?
    - ✅ It provides encryption
    - It supports older tags
    - It enables faster rendering
    - It uses less bandwidth

88. **[MSQ]** What URL(s) can clients running on the same computer that hosts the HTTP server use to access their own HTTP server?
    - http://myserver
    - http://remotehost
    - ✅ http://localhost
    - ✅ http://127.0.0.1

89. **[MCQ]** What is the "hostname" part of a URL related to?
    - The specific web page being requested
    - The type of web browser being used
    - ✅ The computer on which the information is stored
    - The unique identifier of the web server process

90. **[Fill]** For a web client to connect to a web server, the web client must know the server's IP address and ____ number.
    **Answer:** `port`

91. **[Fill]** Command to view only the HTTP response body for https://x.com (using httpie).
    **Answer:** `http --print b https://x.com`

92. **[MCQ]** What is the relationship between the Internet and the World Wide Web?
    - The Internet runs on top of the Web
    - The Web is a part of the Internet that uses it to share resources
    - ✅ The Web is a system built on top of the Internet for sharing and accessing information
    - They are the same thing

93. **[MCQ]** What is a web server?
    - A specialized browser
    - A tool for designing web pages
    - ✅ A program that responds to HTTP requests and serves content to clients
    - A device that connects a computer to the Internet

94. **[MCQ]** A website is defined as:
    - ✅ A collection of related web pages, usually from the same source
    - A single HTML page
    - A list of online resources
    - A server dedicated to hosting files

95. **[MCQ]** In an HTML document, what is the purpose of the `<head>` section?
    - ✅ Provide information about the document, such as its title
    - Link CSS and JS files only
    - Contain the content of the page
    - Display images and videos

96. **[Fill]** Which HTML element inserts a line break in a page?
    **Answer:** `<br>`

### Computer hardware

97. **[Short]** What is the purpose of the processor in a computer?
    **Answer:** It executes instructions and performs computations on data.

98. **[Short]** What does GHz mean in a processor specification?
    **Answer:** It is the unit of the processor's clock speed, in billions of cycles per second.

99. **[Short]** What does Quad-Core mean in a processor description?
    **Answer:** The processor has four cores inside it.

100. **[Short]** What is cache memory used for?
     **Answer:** Cache is fast, volatile memory used to store frequently accessed data for the processor.

101. **[Short]** What does a 15-inch laptop screen measurement refer to?
     **Answer:** The diagonal length of the display area.

102. **[Short]** What does a screen resolution of 1920 × 1080 mean?
     **Answer:** The screen is 1920 pixels wide and 1080 pixels high.

103. **[Short]** What role does a GPU play in a computer system?
     **Answer:** It handles graphics processing, freeing up the main processor for other tasks. GPUs can also be used for machine learning tasks.

104. **[Short]** What does RAM stand for, and what is its function?
     **Answer:** Random Access Memory. It stores data and instructions temporarily while a program runs.

105. **[Fill]** 1 terabyte (TB) equals how many bytes?
     **Answer:** 1,000,000,000,000 bytes

106. **[Short]** What is Bluetooth commonly used for?
     **Answer:** Connecting devices like keyboards, mice, and earphones over short distances.

107. **[Short]** What does USB stand for, and what is it used for?
     **Answer:** Universal Serial Bus. It connects devices and transfers data between them.

108. **[Short]** What does HDMI allow you to do?
     **Answer:** Transmit digital audio and video to devices like TVs and monitors.

109. **[Short]** What is the main difference between memory and storage?
     **Answer:** Memory is volatile and temporary; storage is non-volatile and permanent.

110. **[Short]** What happens to memory contents when a computer is powered off?
     **Answer:** All memory contents are lost.

111. **[Short]** What is an embedded system, and where can they be found?
     **Answer:** A specialized computer designed to perform specific tasks within a larger device. They are found in microwaves, cars, watches, etc.

112. **[Short]** Why does a laptop need both memory and storage, instead of just storage?
     **Answer:** Memory is fast and temporary, mainly for running programs, while storage keeps data even when the power is off.

113. **[Short]** Why is a GPU critical for gaming?
     **Answer:** Gaming requires fast, complex image rendering that would overwhelm the main processor.

114. **[Short]** How does the volatility of RAM affect unsaved work when you lose power suddenly?
     **Answer:** All unsaved work in RAM is lost immediately.

115. **[Short]** How does a processor use both memory and storage when running a program?
     **Answer:** The program is loaded from storage into memory. The processor reads and executes the instructions from memory, not from storage.

116. **[Short]** Why might a computer with lots of storage but little memory still feel slow when too many applications are running?
     **Answer:** Memory limits how many programs can run at once. Storage space does not.

117. **[Short]** When the CPU needs data, where does it look first: storage, memory, or cache? Why?
     **Answer:** Cache first (fastest), then memory, then storage (slowest). The CPU checks the fastest place first to avoid delays.

118. **[Short]** Why might a computer with a fast CPU but slow storage still perform poorly in some tasks?
     **Answer:** Slow storage means data loads slowly, so the CPU has to wait, creating a bottleneck.

119. **[Short]** Compare the role of memory and storage when running a game on a laptop.
     **Answer:** Memory temporarily holds the game's active data for quick access during gameplay; storage permanently keeps the game files even when the computer is off.

120. **[Short]** Given that Bluetooth has a weaker signal than Wi-Fi, when is Bluetooth more advantageous?
     **Answer:** For short-range, low-power connections like keyboards, mice, and headphones, where high speed and long range aren't needed.

121. **[Short]** A laptop specification lists both RAM and SSD. Why are both needed?
     **Answer:** RAM is fast, volatile memory for active processes; the SSD is permanent, non-volatile storage. Each serves a distinct, essential function.

122. **[Short]** What is the main component that limits the number of running processes on a computer?
     **Answer:** Memory.

123. **[Short]** When editing a file, what is one risk of keeping the file only in memory?
     **Answer:** Memory is volatile; if power is lost, unsaved data is permanently lost.

### System software, processes, and the CLI

124. **[Short]** From a Linux terminal, how do you tell which computer you are interacting with?
     **Answer:** Look at the prompt. It shows the hostname of the computer.

125. **[Short]** What is the main role of system software?
     **Answer:** It manages hardware and helps application software share that hardware.

126. **[Short]** Give examples of system software.
     **Answer:** Windows, Linux, macOS.

127. **[Short]** How does application software differ from system software?
     **Answer:** Application software solves specific real-world problems; system software manages the computer's core operations.

128. **[Short]** Give examples of application software.
     **Answer:** Terminal, Microsoft Office, Firefox, Chrome.

129. **[Short]** What is the core component of system software?
     **Answer:** The operating system.

130. **[Short]** What resources does an operating system manage?
     **Answer:** Processors, memory, and storage.

131. **[Short]** What is the purpose of a user interface provided by an operating system?
     **Answer:** It allows users to interact with the computer and its resources.

132. **[Short]** What happens during the booting process?
     **Answer:** The operating system loads into memory and takes control of the computer.

133. **[Short]** Why is "sharing nicely" an important concept in operating systems?
     **Answer:** Multiple programs must take turns sharing limited system resources.

134. **[Short]** How does the operating system handle multiple programs that need the CPU?
     **Answer:** It schedules programs so they take turns using the CPU.

135. **[Short]** What is a GUI, and how do we typically use it?
     **Answer:** A Graphical User Interface, where users click or tap icons to interact with applications or the OS.

136. **[Short]** What is a CLI, and how is it different from a GUI?
     **Answer:** A Command Line Interface uses typed commands instead of graphical elements.

137. **[Short]** Why might beginners struggle with the Linux CLI?
     **Answer:** It is case-sensitive and requires precise command syntax.

138. **[Short]** What are the pros and cons of using a CLI versus a GUI to manage files?
     **Answer:** The CLI allows precise, quick changes and automation; the GUI is more intuitive but slower for large-scale changes.

139. **[Short]** What are some rules a beginner could follow to avoid mistakes when typing Linux commands?
     **Answer:** Double-check command syntax and be mindful of case sensitivity.

140. **[Short]** What is a program?
     **Answer:** A file containing instructions and data for execution.

141. **[Short]** What is a process?
     **Answer:** A running program that resides in main memory.

142. **[Short]** What happens to a process and its program when the computer is turned off?
     **Answer:** The process terminates because memory is volatile. The program remains in storage because storage is non-volatile.

143. **[Short]** How can you view a list of running processes on Windows?
     **Answer:** Open Task Manager from the Start menu.

144. **[Short]** What is the difference between a foreground and background process?
     **Answer:** The foreground process is the one the user is directly interacting with. Background processes are ones the user isn't directly interacting with.

145. **[Short]** What does pressing Ctrl-C do in the Linux command line?
     **Answer:** It kills the currently running foreground process.

146. **[Short]** You wanted to terminate the foreground process but pressed Ctrl-Z by accident. What happened, and how do you recover?
     **Answer:** The process is suspended (paused) and becomes a background process. Type `fg` to bring it back to the foreground, then press Ctrl-C to terminate it.

147. **[Short]** What are the GUI equivalents of foreground processes, background processes, and Ctrl-C?
     **Answer:** Foreground process: the maximized app you're interacting with. Background process: an app that is minimized or behind other windows. Ctrl-C: closing an app.

148. **[Short]** What is the difference between a suspended process and a killed process, in terms of resources used?
     **Answer:** Suspended processes still take up memory; killed processes don't. Neither uses CPU time.

149. **[Short]** What resources might suspended processes consume?
     **Answer:** Memory.

150. **[Fill]** Use these words (each can be used zero or more times): process, CPU, storage, memory, cache, GPU, terminated, started, suspended.
     A laptop has Windows and Chrome installed.
     (a) The laptop is turned off, drawing zero power. Chrome exists in the ______.
     (b) The laptop is turned on and Windows boots. Chrome isn't running. Chrome exists in the ______.
     (c) The user clicks the Chrome icon. A Chrome ______ is started and resides in the laptop's ______.
     **Answer:** (a) storage (b) storage (c) process, memory

151. **[Short]** Use an analogy to explain the difference between a program and a process.
     **Answer:** A program is like a recipe book; a process is like actually cooking using the recipe. (Other analogies are fine.)

### Files, directories, and permissions

152. **[Short]** Why do operating systems organize files into directories?
     **Answer:** Directories group and organize files logically for easier management.

153. **[Short]** What does it mean that filenames are case sensitive in Linux?
     **Answer:** `data.txt` and `Data.txt` are different, separate files.

154. **[Short]** What is the main difference between text files and binary files?
     **Answer:** Text files are human-readable; binary files are not and need special programs to interpret.

155. **[Short]** Why is all data ultimately stored as binary?
     **Answer:** Computers use bits to represent and store all types of data.

156. **[Short]** Why is a Word document considered a binary file?
     **Answer:** It stores text plus formatting and style information that isn't readable as plain text.

157. **[Short]** What is a file extension used for?
     **Answer:** It indicates the file type and helps the OS know how to open it.

158. **[Short]** Does changing a file's extension change its contents?
     **Answer:** No. Changing any part of the filename does not change the file's contents.

159. **[Short]** What might happen if you open a file with the wrong extension?
     **Answer:** You might get an error because the program expects a specific file format.

160. **[Short]** Why can't you just rename a file's extension to convert it to another type?
     **Answer:** Renaming doesn't change the internal data format, so programs fail when opening it.

161. **[Short]** What is one risk of hiding file extensions on a computer?
     **Answer:** Users may open malicious files disguised with misleading names.

162. **[Short]** Why is file protection important on shared computers?
     **Answer:** It prevents unauthorized users from accessing or modifying other users' files.

163. **[Short]** What are the three categories of file permissions in Linux?
     **Answer:** Owner, Group, and World.

164. **[Short]** What does it mean if you have 'write' permission on a file?
     **Answer:** You can modify the file.

165. **[Fill]** Linux command to grant executable permission on a file to the file owner.
     **Answer:** `chmod u+x FILENAME`

166. **[Short]** Why must files in Linux be explicitly given executable permissions?
     **Answer:** So that users don't accidentally execute malicious files.

167. **[Short]** If a file is world-readable but not writable, what can any user do with it?
     **Answer:** View (read) it, but not modify it.

168. **[Short]** What could happen if you accidentally give executable permission to a harmful file?
     **Answer:** You could run malicious code that damages or takes over your system.

169. **[Short]** What are the risks of giving 'World' users read and write permissions on sensitive files?
     **Answer:** Unauthorized modification or deletion, and risk of data breaches or loss.

170. **[Short]** For a data file, how should permissions be set so group members can read but not modify it?
     **Answer:** Enable read and disable write and execute for the group.

171. **[Short]** How can file protection help prevent accidental file deletion in a shared environment?
     **Answer:** By restricting write permissions, only authorized users can modify or delete critical files.

172. **[Short]** Why is understanding file permissions critical when managing group projects?
     **Answer:** Correct permissions ensure only authorized team members can modify shared project files.

173. **[Short]** How can mismanaging directory permissions cause security risks?
     **Answer:** It can allow others to access or modify private or sensitive data.

174. **[Short]** How do directories support better file protection?
     **Answer:** Directories can group sensitive files and set permissions on the whole group.

175. **[Short]** What is a directory?
     **Answer:** A directory (folder) is a collection of files organized together.

176. **[Short]** What is a directory tree?
     **Answer:** A hierarchy of directories within directories, starting from the root.

177. **[Short]** What is the difference between the root directory notation in Windows and Linux?
     **Answer:** Windows uses `C:\`; Linux uses `/`.

178. **[Short]** Is `/` a folder?
     **Answer:** Yes. It is the root folder.

179. **[Short]** Using the analogy of a real tree, what are the root, branches, and leaves of a filesystem tree?
     **Answer:** Root is `/`, branches are directories, leaves are individual files.

180. **[Short]** What is an absolute path?
     **Answer:** A path that starts from the root and specifies every directory down to the file.

181. **[Short]** What is a relative path?
     **Answer:** A path that starts from the current working directory.

182. **[Short]** What is the key visible difference between an absolute and a relative path?
     **Answer:** Absolute paths always start with `/`; relative paths do not.

183. **[Short]** How does the current working directory affect relative paths?
     **Answer:** Relative paths are interpreted starting from wherever the current working directory is.

184. **[Fill]** Command to find your current absolute path.
     **Answer:** `pwd`

185. **[Short]** What is the benefit of using a directory tree instead of keeping all files in one folder?
     **Answer:** It organizes files logically and allows the same filename to be reused in different subdirectories.

186. **[Short]** Why can two files have the same name without conflict?
     **Answer:** They are in different directories, so their full paths are unique.

187. **[Short]** Why must you be careful when deleting a directory?
     **Answer:** Deleting a directory typically deletes all files and subdirectories inside it.

188. **[Short]** Why is it dangerous to mistype a filename in Linux?
     **Answer:** Filenames are case sensitive, so a typo can make you act on the wrong file.

189. **[Short]** What is the PATH variable used for?
     **Answer:** It is a list of places where the computer looks for programs when you type a command. It lets you run programs without typing their full paths.

190. **[Short]** The file `/tmp/running/i-am-running.sh` has executable permissions for owner, group, and world. How do we ensure that typing `i-am-running.sh` runs it from any working directory?
     **Answer:** Add the folder `/tmp/running` to the PATH variable.

191. **[Short]** You run `./this-is-running.sh` in the current directory but get "Permission denied". What is the likely fix?
     **Answer:** `chmod u+x this-is-running.sh`

192. **[Short]** Your teammate can `ls` the shared file `report.docx` but gets "Permission denied" when opening it. What is missing?
     **Answer:** Read permission for Group (if the teammate is in the file's group) or for World (if not).

193. **[Short]** You can see a folder `ABC` with `ls`, but `cd` into it gives "Permission denied". Which permission is missing?
     **Answer:** Execute permission on the directory.

194. **[Fill]** Command to remove write permission from group and world for a folder, leaving the owner's permissions alone.
     **Answer:** `chmod go-w FOLDER_NAME`

195. **[Short]** You run `chmod u=rw,go= file`. What is the result?
     **Answer:** Only the owner can read and write; group and world have no permissions.

196. **[Short]** After `mkdir one .two three`, `ls` shows only `one` and `three`. Why?
     **Answer:** `.two` is a hidden folder. Use `ls -a` to see it.

197. **[Short]** `cd projects/old` gives "No such file or directory". What should you check first?
     **Answer:** Whether `projects/old` exists and whether the spelling is correct (case-sensitive).

198. **[Short]** Every time you put files into a folder, they disappear after a reboot. Using the course content, what could be a possible cause? (requires inference)
     **Answer:** The folder may be stored in RAM. Files in storage survive a reboot, but anything in RAM is lost when power is cut.

199. **[Short]** What makes binary files less user-friendly than text files?
     **Answer:** They need specific software to read or edit, whereas humans can read text files directly.

### Command pipelines on `yum.csv`

Header row of the file: `#date,food,price,rating`

200. **[Short]** `cat yum.csv | grep "Sushi"`
     **Answer:** Searches for rows containing "Sushi" (case sensitive).

201. **[Short]** `cat yum.csv | grep "Sushi" | wc -l`
     **Answer:** Counts how many rows contain "Sushi".

202. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | head -n 3 | cut -d, -f 2`
     **Answer:** Shows only the first 3 foods on the list (no dates, prices or ratings).

203. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | tail -n 4 | cut -d, -f 2`
     **Answer:** Shows only the last 4 foods on the list.

204. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort`
     **Answer:** Lists all foods in alphabetical order.

205. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort | uniq`
     **Answer:** Lists foods in alphabetical order, without duplicates.

206. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort | uniq | wc -l`
     **Answer:** Counts the number of unique foods.

207. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 4 | sort | uniq | wc -l`
     **Answer:** Counts the number of unique ratings.

208. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 3 | sort -n | head -n 1`
     **Answer:** Finds the lowest price.

209. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 3 | sort -n | tail -n 1`
     **Answer:** Finds the highest price.

210. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort | uniq -c`
     **Answer:** For each food, shows the number of times it appears on the list.

211. **[Short]** `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 4 | sort | uniq -c`
     **Answer:** For each rating, shows the number of times it appears on the list.

212. **[Short]** `head -n 5 yum.csv`
     **Answer:** Shows the first 5 lines of the file.

213. **[Short]** `tail -n 3 yum.csv`
     **Answer:** Shows the last 3 lines of the file.

214. **[Short]** `head -n 1 yum.csv`
     **Answer:** Shows the first line (the header).

215. **[Short]** `tail -n 1 yum.csv`
     **Answer:** Shows the last line.

216. **[Short]** `cut -d ',' -f 2 yum.csv`
     **Answer:** Extracts the "food" column (2nd column).

217. **[Short]** `cut -d ',' -f 3 yum.csv`
     **Answer:** Extracts the "price" column (3rd column).

218. **[Short]** `cat yum.csv | grep "Nasi Lemak" | wc -l`
     **Answer:** Counts how many rows contain "Nasi Lemak".

219. **[Short]** `grep -i "green" yum.csv`
     **Answer:** Finds lines containing "green" regardless of case.

220. **[Short]** `grep -v "Chicken" yum.csv`
     **Answer:** Shows all lines that do not contain "Chicken".

221. **[Short]** `grep -v "#date,food,price,rating" yum.csv`
     **Answer:** Shows the file contents without the header row.

222. **[Short]** `grep -v "#date,food,price,rating" yum.csv | grep ",5," | cut -d, -f2 | sort`
     **Answer:** Shows all foods that cost exactly 5, sorted alphabetically.

223. **[Short]** `grep -v "#date,food,price,rating" yum.csv | cut -d, -f2 | sort | uniq -u`
     **Answer:** Shows foods that appear exactly once.

### Networking concepts

224. **[Short]** When a router receives packets from different sources, how does it decide where to send each one?
     **Answer:** It forwards the packet based on its knowledge of the best next step toward the packet's destination.

225. **[Short]** Does a router know in advance exactly which route a packet will take?
     **Answer:** No. It only knows the best next step, not the entire path.

226. **[Short]** Explain the client/server model using a web browser connecting to a web server.
     **Answer:** The browser (client) sends a request, and the web server responds by delivering the requested page.

227. **[Short]** Compare LANs and WANs in geographic coverage and typical use.
     **Answer:** LANs cover small areas like a room or building; WANs connect multiple LANs over large distances.

228. **[Short]** What might a router do when there is a downed path in the network?
     **Answer:** Reroute packets via an alternative path.

229. **[Short]** What's the difference between a hostname and an IP address?
     **Answer:** A hostname is a human-readable name for a computer; an IP address is a numerical identifier computers use to locate each other.

230. **[Short]** What are the main security challenges wireless networks face compared to wired networks?
     **Answer:** Wireless networks are more vulnerable to interference and unauthorized access because of their broadcast nature.

231. **[Short]** What if we did not have DNS?
     **Answer:** Users would have to remember numerical IP addresses instead of easy hostnames, making Internet use impractical.

232. **[Short]** Give an analogy for packet switching.
     **Answer:** Sending a long letter in separate envelopes by different routes, then reassembling it at the destination.

233. **[Short]** Explain the roles of IP addresses and port numbers.
     **Answer:** An IP address gets data to the right computer; a port number directs the data to the correct process on that computer.

234. **[Short]** Why would a developer test a draft website on localhost or 127.0.0.1?
     **Answer:** The loopback address keeps the site private and secure during development, before launching.

235. **[Short]** Why does 127.0.0.1 still work when your device is in airplane mode?
     **Answer:** It is a loopback address that routes traffic internally within your device and needs no external network.

236. **[Short]** How is a port number similar to a mailbox?
     **Answer:** It ensures messages are delivered to the intended recipient process.

237. **[Short]** What might happen if two processes tried to use the same port number?
     **Answer:** They would clash, causing errors or failed connections.

238. **[Short]** Which protocol typically uses port 22 for secure remote access?
     **Answer:** SSH.

239. **[Short]** What is the TLD in `www.smu.edu.sg`, and what does it represent?
     **Answer:** `.sg`, the country code for Singapore.

240. **[Short]** What is the difference between the Internet and the World Wide Web?
     **Answer:** The Internet is the physical network infrastructure connecting computers. The Web is information and software distributed over many computers that uses networks like the Internet to exchange data.

### Web concepts

241. **[Short]** When you type `www.villanova.edu/academics.html` into a browser, what role does the web server play?
     **Answer:** It receives the request, retrieves the requested page, and sends it back to the browser.

242. **[Short]** What is the purpose of a web browser when accessing a web page?
     **Answer:** It sends a request for a page to a server and displays the page when it receives the response.

243. **[Short]** Why might multiple files be downloaded when visiting a website?
     **Answer:** Besides the base HTML file, a page references objects like images, videos, or scripts that must also be downloaded.

244. **[Fill]** If a web page references three images, how many files does the browser download in total?
     **Answer:** `4` (the base HTML file plus three images)

245. **[Short]** Explain the function of the `href` attribute in an HTML anchor tag.
     **Answer:** It specifies the destination URL of the hyperlink.

246. **[Short]** Compare how HTML and CSS work together to create a web page.
     **Answer:** HTML defines structure and content; CSS defines appearance and layout.

247. **[Short]** Why might improperly nested HTML tags make a page look strange?
     **Answer:** Browsers interpret malformed HTML unpredictably, causing formatting errors and visual quirks.

248. **[Short]** What's the role of HTTP when accessing a web page?
     **Answer:** HTTP is the protocol governing the request and delivery of web documents between browser (client) and web server.

249. **[Short]** What's the difference between source HTML and rendered HTML?
     **Answer:** Source HTML is the raw code received from the server; rendered HTML is how the browser visually presents it.

250. **[Short]** What are the benefits of using localhost to test a website before going live?
     **Answer:** Developers can find and fix issues without exposing unfinished work to the public.

251. **[Short]** What's the difference between HTTP and HTTPS?
     **Answer:** HTTPS encrypts data between client and server, providing security and privacy; HTTP does not.

252. **[Short]** What is one consequence of incorrectly setting the web root directory?
     **Answer:** Private or sensitive files may be accidentally exposed to the public.

253. **[Short]** When a browser downloads an HTML file, what additional steps might it perform before displaying the page?
     **Answer:** It parses the HTML, requests additional resources like images, then displays the final page.

254. **[Short]** What is a web root?
     **Answer:** The directory from which the web server serves files to clients.

255. **[Short]** What is the purpose of a port number?
     **Answer:** To identify a specific process on a computer so data is sent to the correct process.

256. **[Short]** What's the similarity between the structure of an HTML document and a directory tree?
     **Answer:** An HTML document starts with a root element containing tags, which can contain other tags, just as a directory tree starts with a root folder containing folders, which can contain other folders.

257. **[Short]** Why must a URL include the hostname of the web server?
     **Answer:** It tells the client which server to contact to request the page or resource.

258. **[Short]** Distinguish between a local host and a remote host when browsing the Web.
     **Answer:** A local host is your own computer; a remote host is a distant server you connect to over a network.

259. **[Fill]** Use these words: client, server, local, remote.
     For HTTP, a ______ computer runs a web ______. Our ______ computer runs a web ______, which connects to that web ______.
     **Answer:** remote, server, local, client, server

260. **[Short]** Compare how httpie and a web browser handle HTTP responses.
     **Answer:** httpie retrieves and displays raw HTML code; a browser retrieves the raw HTML and displays the rendered page.

261. **[Fill]** Use these words (each can be used zero or more times): process, CPU, storage, memory, cache, GPU, terminated, started, 22, 80, 443, 1.2.3.4, suspended, IP address, port number, page.html.
     1. The user clicks the Chrome icon. A Chrome ______ is started and resides in the laptop's ______.
     2. The user types `https://1.2.3.4/page.html` into the address bar.
     3. A web server ______ runs on the machine 1.2.3.4.
     4. The web server ______ is identified by its ______, which is ______, and a ______, which is ______.
     5. The Chrome ______ runs on the user's laptop.
     6. The Chrome ______ connects to the web server ______ and requests a file called ______.
     7. The file is rendered on the user's laptop.
     **Answer:** 1. process, memory · 3. process · 4. process, IP address, 1.2.3.4, port number, 443 · 5. process · 6. process, process, page.html

### Hosting a website on a port

262. **[Short]** To host a website on computer W's port 8888 (W = 1.2.3.4) and access it from computer X, list the steps and the purpose of each.
     **Answer:**
     1. On W, use nmap to confirm port 8888 is closed. This ensures no other process is using the port.
     2. On W, start the web server on port 8888. This lets web clients connect to get content.
     3. On W, use nmap to confirm port 8888 is open. This ensures the web server is really using port 8888.
     4. On X, use nmap to confirm W's port 8888 is open. This ensures the server is reachable from another computer.
     5. On X, visit `http://1.2.3.4:8888` and confirm the page loads. This ensures web browsers can access the site.

263. **[Short]** In the steps above, what is the purpose of step 3 (nmap on W, after starting the server)?
     **Answer:** To check the web server is running correctly from within W. If it fails, something is likely wrong with the web server itself.

264. **[Short]** In the steps above, what is the purpose of step 4 (nmap on X)?
     **Answer:** To check the server is reachable from an external computer. If step 3 passed but this fails, something is blocking X from reaching W, such as a firewall on W or a firewall/router between them.

### Home networks, IP addresses, and NAT

265. **[Short]** How do devices inside the same LAN communicate with each other?
     **Answer:** They use their private IP addresses to communicate directly (via a router, switch or access point, which this course ignores for simplicity).

266. **[Short]** In a home LAN, which device acts as the default gateway, and what is its role?
     **Answer:** The router. It forwards packets from the local network to devices outside it.

267. **[Short]** What happens when a laptop inside a LAN wants to access a website on the Internet?
     **Answer:** The laptop sends its HTTP request to the router, which forwards it to the ISP and beyond until it reaches the website.

268. **[Short]** What role does the Optical Network Terminal (ONT) play in a home network?
     **Answer:** It converts optical signals from the ISP into electrical signals usable by the home network.

269. **[Short]** How do the ONT and router work together?
     **Answer:** The ONT connects to the ISP's network and converts incoming signals to electrical ones. These go to the router, which directs them to the appropriate devices.

270. **[Short]** Explain how a router is like a traffic controller.
     **Answer:** It directs data to the correct device, just as a traffic controller guides vehicles to the right lanes.

271. **[Short]** Why does a home router have both a public and a private IP address?
     **Answer:** The public IP lets it communicate with the Internet; the private IP is for communication within the LAN.

272. **[Short]** What might happen if a home router's public IP address changed unexpectedly?
     **Answer:** Devices in the LAN could still communicate internally, but access to the Internet might be disrupted until the connection is re-established.

273. **[Short]** Why don't all devices have a public IP address?
     **Answer:** There are more devices than available public IP addresses.

274. **[Short]** How does NAT reduce the number of public IP addresses needed globally?
     **Answer:** Multiple devices in a LAN share one public IP; NAT translates between private and public addresses.

275. **[Short]** If your laptop has a private IP address, how does it access a website on the Internet?
     **Answer:** It sends the request to the router, which uses NAT to forward it using the router's public IP.

276. **[Short]** Why do organizations like ISPs acquire IP addresses from regional registries like APNIC?
     **Answer:** To distribute public IPs to their customers and ensure global uniqueness.

277. **[Short]** What happens if two routers in separate networks assign the same private IP to two different devices?
     **Answer:** Nothing wrong. The networks are separate, so there is no IP conflict.

278. **[Fill]** Give an example of a private IP address.
     **Answer:** e.g. `192.168.8.8`

279. **[Short]** Differentiate public and private IP addresses using an analogy.
     **Answer:** Public IPs are like country names (globally unique); private IPs are like street names (can repeat in different countries).

280. **[Short]** Why is NAT essential for IPv4 but less critical for IPv6?
     **Answer:** IPv6 has a vastly larger address space, reducing the need to share addresses via NAT.

### Cloud computing and AWS

281. **[Short]** Explain how using Gmail is an example of cloud computing.
     **Answer:** Gmail stores and manages emails on remote servers, so users can access email from any Internet-connected device.

282. **[Short]** In your own words, what is AWS?
     **Answer:** A cloud computing platform that lets users rent computing resources (servers, storage, databases) on a pay-as-you-go basis instead of buying and maintaining their own hardware.

283. **[Short]** What's the purpose of launching an EC2 instance in AWS?
     **Answer:** It provides a virtual server in the cloud for running applications or services.

284. **[Short]** If running your own server is like buying a house, how would you describe AWS EC2?
     **Answer:** Like booking a hotel room: you pay for a fully furnished place for as long as you need it, then check out.

285. **[Short]** After launching an EC2 instance, why note down the Public IPv4 address?
     **Answer:** It is needed to connect remotely via SSH or to access a hosted website.

286. **[Short]** What is the purpose of setting correct permissions on the downloaded `.pem` private key file?
     **Answer:** To restrict access to the private key to only the user.

287. **[Short]** What might happen if the `.pem` file permissions are not correctly set?
     **Answer:** Other users or processes on the computer could access the key and gain access to the server.

288. **[Short]** Explain this command: `ssh -i is114-keypair.pem ec2-user@{YOUR_EC2_IP_ADDRESS}`
     **Answer:** `ssh` = Secure Shell, for remote secure access. `-i is114-keypair.pem` = the private key file used to authenticate. `ec2-user@{IP}` = connect as user `ec2-user` to the instance at that public IPv4 address.

289. **[Short]** Why might businesses prefer cloud computing over maintaining their own servers?
     **Answer:** It reduces hardware and maintenance costs and shifts resource management to the cloud provider.

290. **[Short]** What's the difference between public and private cloud services?
     **Answer:** Public cloud is accessible by any subscriber; private cloud is restricted to a specific organization or group.

291. **[Short]** Why does cloud computing let users be indifferent about the location of their resources?
     **Answer:** From the user's point of view, physical location doesn't matter, so they can focus on using services rather than managing infrastructure.

292. **[Short]** Why is enabling SSH and HTTP traffic necessary when launching an EC2 instance?
     **Answer:** SSH allows remote command-line access; HTTP allows hosting and accessing web services.

293. **[Short]** If an EC2 instance is like a room, what analogies describe enabling SSH and HTTP?
     **Answer:** SSH is a private, secure entrance for those with the key (private key). HTTP is a public storefront window so anyone on the Internet can interact with your website.

294. **[Short]** What happens if you don't enable "Allow SSH traffic from Anywhere"?
     **Answer:** You are denied access when connecting via SSH or FileZilla, because port 22 isn't open.

295. **[Short]** What happens if you don't enable "Allow HTTP traffic from the internet"?
     **Answer:** Users see a connection timeout or "site can't be reached" error.

296. **[Short]** Can we allow access to ports other than SSH and HTTP in EC2?
     **Answer:** Yes, by adding inbound rules for those ports in the security group. This is needed when a process on the instance listens on another port.

297. **[Short]** What's the function of a data center in cloud computing?
     **Answer:** It houses the physical computing resources that cloud providers manage and offer over the Internet.

298. **[Short]** Why is a hybrid cloud model suitable for a company needing strict data security and public-facing applications?
     **Answer:** It combines private-cloud security for sensitive data with public-cloud accessibility for public-facing services.

299. **[Short]** Why might storing files in the cloud be more reliable than on a personal device?
     **Answer:** Cloud storage usually has redundancy and automatic backups, reducing the risk of data loss from device failure.

300. **[Short]** Summarise the steps for launching an EC2 instance and connecting via SSH.
     **Answer:** 1) Launch the instance with the correct settings and enable SSH. 2) Download and secure the private key. 3) Use SSH to connect.

301. **[Short]** What happens if the private key is deleted?
     **Answer:** You are locked out and cannot connect to the instance over SSH.

302. **[Short]** Why should we terminate an EC2 instance when we no longer need it?
     **Answer:** To avoid unnecessary costs (it is billed as a subscription) and security risks.

303. **[Short]** In "Application and OS Images", we selected "Amazon Linux". What is an OS Image?
     **Answer:** A pre-configured template containing an operating system (and often other software), used as a blueprint to create a new instance so you needn't install the OS from scratch.

304. **[Short]** What are the pros and cons of nano vs FileZilla for creating files on the web server?
     **Answer:** Nano is fast and works in the terminal but is text-only and less user-friendly. FileZilla has a graphical interface and supports drag-and-drop.

305. **[Short]** What is an inbound security rule in EC2?
     **Answer:** A rule allowing specific incoming traffic (e.g. HTTP on port 80, SSH on port 22) to reach the instance.

306. **[Short]** What is an outbound security rule in EC2?
     **Answer:** A rule allowing specific outgoing traffic from the instance to external destinations.

307. **[Short]** Port 80 is not enabled in the EC2 Security Group but the HTTP server is running. What will a user's browser experience?
     **Answer:** The page fails to load, and after a long wait shows "This site can't be reached" or "Connection timed out".

308. **[Fill]** Port 80 is not enabled in the EC2 Security Group but the HTTP server is running. What is the nmap status of port 80?
     **Answer:** `filtered`

309. **[Short]** A web server on EC2 uses port 8888 but nmap shows 'filtered'. What should you check?
     **Answer:** That port 8888 is allowed in the EC2 inbound security group.

310. **[Short]** In an EC2 inbound rule, what does setting the source to `0.0.0.0/0` mean?
     **Answer:** The instance accepts incoming traffic from any IPv4 address on the Internet, making that port publicly accessible.

### Security

311. **[Short]** Describe the three components of the CIA triad.
     **Answer:** Confidentiality protects against unauthorized access; Integrity ensures only proper modifications; Availability ensures authorized users can access data when needed.

312. **[Short]** When logging into a website, what security process are you performing?
     **Answer:** User authentication: proving your identity with credentials like a username and password.

313. **[Short]** In public-key cryptography, what is the purpose of the public key?
     **Answer:** It is freely shared and used to encrypt messages for the owner of the matching private key.

314. **[Short]** What does a firewall do?
     **Answer:** It checks incoming network traffic and filters out unwanted or inappropriate traffic.

315. **[Short]** Explain how two-factor authentication (2FA) works.
     **Answer:** It requires two types of credentials, such as a password and a verification from a mobile device, to confirm identity.

316. **[Short]** Compare information security and cyber security.
     **Answer:** Information security protects data in any form; cyber security focuses on defending resources accessible via the Internet.

317. **[Short]** Why are passwords alone a weak form of authentication?
     **Answer:** They can be guessed, stolen or compromised, and rely solely on something the user knows.

318. **[Short]** Why is cryptography necessary even with strong passwords?
     **Answer:** It protects the content itself, preventing unauthorized reading even if passwords are compromised.

319. **[Short]** Why might a firewall cause network delays?
     **Answer:** A sophisticated firewall inspects traffic deeply, which slows the data passing through.

320. **[Short]** What role does a certificate authority play in public-key encryption?
     **Answer:** It verifies a public key's authenticity by issuing a digital certificate, preventing impersonation.

321. **[Short]** What are the benefits and risks of password management software?
     **Answer:** It stores credentials securely and reduces password reuse, but if compromised it could expose many accounts at once.

322. **[MCQ]** A malicious entity keeps sending HTTP requests so a server cannot respond to other users. Which part of the CIA triad is attacked?
     - Confidentiality
     - Integrity
     - ✅ Availability

323. **[Short]** What happens if a user's private key is compromised?
     **Answer:** Anyone with the key could decrypt sensitive information or impersonate the user.

324. **[Short]** Why is biometric authentication considered more secure than passwords?
     **Answer:** Biometrics are unique physiological traits that are much harder to duplicate or steal.

325. **[Short]** Why is public-key encryption not considered symmetric?
     **Answer:** It uses two different keys (public to encrypt, private to decrypt), whereas symmetric encryption uses one shared key for both.

326. **[Short]** What is the main weakness of symmetric encryption?
     **Answer:** Sender and receiver must share the same key; if it is intercepted, the communication is compromised.

327. **[Short]** What's the difference between false acceptance and false rejection in biometric systems?
     **Answer:** False acceptance grants access to unauthorized users; false rejection denies access to legitimate users.

328. **[Short]** Why might an organization use MFA instead of just 2FA?
     **Answer:** MFA adds more layers of security, making breaches harder.

329. **[Short]** Why does separating management privileges among different people improve security?
     **Answer:** No single person has enough access to make major changes without oversight, reducing insider threats.

330. **[Short]** Why monitor which ports are open on a cloud server?
     **Answer:** Open ports expose the server to the Internet; managing them reduces the risk of unauthorized access and attacks.

331. **[Short]** Step by step, how does Alice use Bob's public key to send him an encrypted message?
     **Answer:** 1) Alice gets Bob's public key. 2) Alice encrypts her message with it. 3) Alice sends the encrypted message. 4) Bob decrypts it with his private key.
