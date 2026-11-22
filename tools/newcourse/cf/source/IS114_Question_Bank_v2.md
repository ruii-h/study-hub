# IS114 Computing Fundamentals: question bank (v2)

Types: **MCQ** one correct option, **MSQ** select all that apply, **Fill** type the answer, **Short** short answer (self-marked). Correct options are marked ✅.

---

## Chapter 1. Computer Hardware

1. **[MCQ]** Which component loses its contents when the power is switched off?
   - SSD
   - ✅ RAM
   - HDD
   - SD card

   *Why:* RAM is volatile, so unsaved work in it is lost at power-off.

2. **[MCQ]** A spec lists a "2.8 GHz Quad-Core" processor. What does "Quad-Core" mean?
   - The clock runs four times faster
   - It has four levels of cache
   - ✅ The processor has four cores
   - It can address four GB of RAM

   *Why:* A core is an independent processor; quad means four of them in one chip.

3. **[MCQ]** How many bytes is 20 GB, using the course rule?
   - 20,000,000
   - 21,474,836,480
   - 2,000,000,000
   - ✅ 20,000,000,000

   *Why:* Giga is 10⁹, so 20 GB is 20 × 10⁹ bytes.

4. **[MCQ]** When the CPU needs data, in which order does it look?
   - ✅ Cache, then RAM, then storage
   - Storage, then RAM, then cache
   - RAM, then storage, then cache
   - Storage, then cache, then RAM

   *Why:* The CPU tries the fastest place first to avoid delays.

5. **[MCQ]** What role does a GPU play in a computer?
   - It permanently stores the operating system
   - It connects the computer to the Internet
   - It holds running programs while they execute
   - ✅ It handles graphics so the main processor is free for other tasks

   *Why:* GPUs also speed up machine learning.

6. **[MCQ]** A computer has lots of storage but little RAM. Why does it feel slow with many apps open?
   - Storage is volatile and loses its contents
   - The GPU runs out of pixels
   - ✅ RAM limits how many programs run at once; storage space does not
   - Cache fills the whole disk

   *Why:* Running programs live in RAM.

7. **[MCQ]** A fast CPU is paired with slow storage. Why can it still perform poorly?
   - The CPU forgets its instructions
   - RAM turns into storage
   - The screen resolution drops
   - ✅ The CPU waits while data loads from the slow storage

   *Why:* Loading data is the bottleneck.

8. **[MCQ]** Why does a laptop need both memory and storage instead of just storage?
   - Storage is faster than memory, so memory is only a backup
   - ✅ Memory is fast and temporary for running programs; storage keeps data when the power is off
   - Memory is permanent; storage is temporary
   - They are two names for the same component

   *Why:* Different layers with different roles.

9. **[MSQ]** Which statements about RAM and storage are true?
   - ✅ RAM is volatile.
   - ✅ Storage is non-volatile.
   - The CPU executes a program directly from storage.
   - More storage lets you run more programs at once.
   - ✅ When power is lost, a running process is lost but its program file remains.

   *Why:* Storage holds the permanent copy; RAM holds the working copy.

10. **[MSQ]** Which statements about a laptop specification are correct?
    - ✅ "1920 × 1080" is the resolution in pixels, width by height.
    - ✅ "15-inch" is the diagonal length of the display.
    - ✅ "12 MB cache" is fast volatile memory inside the CPU.
    - "1 TB SSD" is volatile memory.
    - ✅ "Wi-Fi 7, Bluetooth 5" describe wireless connectivity.

    *Why:* Each spec line names one component and its measure.

11. **[MSQ]** Which statements about embedded systems are true?
    - ✅ They are computers dedicated to a narrow range of functions.
    - ✅ They can be found in microwaves, cars and watches.
    - They have no processor or memory.
    - ✅ They are part of a larger system.

    *Why:* Same resources as a normal computer, in a small dedicated package.

12. **[MSQ]** Which statements describe what happens when you open a browser?
    - ✅ The program is loaded from storage into RAM.
    - ✅ RAM supplies instructions and data to the CPU.
    - ✅ The GPU can handle graphics such as video and animation.
    - The CPU copies the program back to cache permanently.
    - ✅ Results can be saved back to storage.

    *Why:* Storage → RAM → CPU → results, with the GPU handling graphics.

13. **[Fill]** How many bytes are in 1 TB, using the course rule? Type the number.
    **Answer:** `1000000000000` or `1,000,000,000,000`

14. **[Fill]** In what unit is a processor's clock speed written? (abbreviation)
    **Answer:** `GHz` or `Hz`

---

## Chapter 2. Operating Systems & Processes

15. **[MCQ]** Which of these is system software?
    - Firefox
    - Microsoft Excel
    - ✅ Linux
    - A video game

    *Why:* System software manages the computer; Windows, Linux and macOS are examples.

16. **[MCQ]** Which statement correctly distinguishes a process from a program?
    - A process is stored permanently on disk
    - A program can only run once
    - A process and a program are the same thing
    - ✅ A process is a program in execution

    *Why:* A program is the file; a process is the running instance in RAM.

17. **[MCQ]** Which key combination kills the foreground process in the Linux terminal?
    - Ctrl-Z
    - ✅ Ctrl-C
    - Ctrl-X
    - Ctrl-O

    *Why:* Ctrl-C kills; Ctrl-Z only suspends.

18. **[MCQ]** Compared with a killed process, a suspended process ...
    - uses CPU time but no memory
    - ✅ still holds memory but uses no CPU time
    - uses neither memory nor CPU
    - runs faster

    *Why:* Suspended = paused in memory; killed = gone.

19. **[MCQ]** Which resource mainly limits how many processes can run at once?
    - The monitor size
    - The keyboard layout
    - ✅ Memory
    - The file extension

    *Why:* Every process lives in memory.

20. **[MCQ]** In the Linux terminal, how do you tell which computer you are working on?
    - Check the desktop wallpaper
    - Run `ls`
    - You cannot tell
    - ✅ Read the prompt, which shows the hostname

    *Why:* The prompt shows the hostname of the machine you control.

21. **[MCQ]** Which is a reason the CLI is valued over the GUI for administration?
    - It needs no precise syntax
    - It is case-insensitive
    - ✅ It supports batch processing and automation
    - It cannot be used remotely

    *Why:* Commands can be scripted, repeated and used remotely.

22. **[MCQ]** The user clicks the Chrome icon. A Chrome ___ is started and resides in the laptop's ___.
    - program, storage
    - ✅ process, memory
    - process, storage
    - program, CPU

    *Why:* A running program is a process, held in memory. Chrome's program file stays in storage.

23. **[MCQ]** Which analogy best describes a program versus a process?
    - A program is cooking; a process is the recipe book
    - ✅ A program is a recipe book; a process is cooking using the recipe
    - They are both recipe books
    - A program is the kitchen; a process is the ingredients

    *Why:* Instructions on file versus the activity of carrying them out.

24. **[MSQ]** Which are roles of an operating system?
    - ✅ Manage resources such as memory and storage.
    - ✅ Provide an interface for a human to interact with the computer.
    - ✅ Allow application programs to use those resources.
    - Manufacture the CPU.
    - ✅ Share resources among programs that want them.

    *Why:* All roles revolve around sharing resources nicely.

25. **[MSQ]** Which statements about programs and processes are true?
    - ✅ A program is an executable file stored in non-volatile storage.
    - ✅ A process is a program in execution.
    - A process lives in storage.
    - ✅ When power is cut, the process terminates but the program remains.
    - ✅ Task Manager (Windows) or Activity Monitor (macOS) shows processes.

    *Why:* File versus running instance.

26. **[MSQ]** A user presses Ctrl-Z while `top` is running, then types `fg` and presses Ctrl-C. Which statements are correct?
    - ✅ Ctrl-Z suspended `top` and moved it out of the foreground.
    - ✅ `fg` brought `top` back to the foreground.
    - ✅ Ctrl-C terminated `top`.
    - Ctrl-Z killed `top` and freed all its RAM.
    - ✅ While suspended, `top` used no CPU.

    *Why:* Pause is not kill: a suspended process keeps its RAM.

27. **[MSQ]** Which statements about booting are correct?
    - ✅ Firmware loads the OS from non-volatile storage into memory.
    - ✅ The OS then takes control of the computer.
    - The OS must already be in RAM when power is applied.
    - ✅ Storage must hold the OS for it to start.
    - ✅ Booting happens each time power is applied.

    *Why:* The OS lives in storage and is loaded into memory at boot.

28. **[Fill]** Type the command that lists the processes you own (course form, no dash).
    **Answer:** `ps u`

29. **[Fill]** Type the command that brings a suspended process back to the foreground.
    **Answer:** `fg`

---

## Chapter 3. Linux Command-Line Data Analysis

The CSV file `FILENAME` has the header row: `#date,food,price,rating`

30. **[MCQ]** Which command extracts the second comma-separated column?
    - `grep -f2 file.csv`
    - `sort -d"," -f2 file.csv`
    - `head -d"," -f2 file.csv`
    - ✅ `cut -d"," -f2 file.csv`

    *Why:* `cut` with `-d` for the delimiter and `-f` for the field number.

31. **[MCQ]** Why must `sort` come before `uniq`?
    - ✅ `uniq` removes only adjacent duplicates
    - `uniq` cannot read files
    - `sort` deletes duplicates
    - `uniq` needs numbers

    *Why:* Sorting puts equal lines next to each other.

32. **[MCQ]** What does `grep -v "Chicken" file` print?
    - Lines that contain Chicken
    - ✅ Lines that do not contain Chicken
    - Only the word Chicken
    - The number of lines with Chicken

    *Why:* `-v` inverts the match.

33. **[MCQ]** What does `rm cd ../apple/file.txt` do?
    - Removes file.txt in the apple folder only
    - Changes to ../apple
    - Nothing: syntax error
    - ✅ Removes a file named `cd` in the current folder and `file.txt` in the apple folder

    *Why:* `rm` treats every word after it as a file to delete.

34. **[MCQ]** After `echo "monday" > file1` then `echo "tuesday" >> file1`, what does `cat file1 | wc -l` print?
    - 1
    - ✅ 2
    - 0
    - 3

    *Why:* `>` overwrites, `>>` appends.

35. **[MCQ]** Which pattern matches exactly one character in a filename?
    - `*`
    - `#`
    - `.`
    - ✅ `?`

    *Why:* `?` is one character; `*` is any number of characters.

36. **[MCQ]** What does this do? `cat FILENAME | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort | uniq -c`
    - Counts the unique foods and prints one number
    - ✅ For each food, shows how many times it appears
    - Lists the foods in reverse order
    - Shows only foods that appear once

    *Why:* `uniq -c` prefixes each distinct line with its count.

37. **[MCQ]** What does this do? `cat FILENAME | grep -v "#date,food,price,rating" | head -n 3 | cut -d, -f 2`
    - Shows the last 3 foods
    - Shows the first 3 lines in full
    - ✅ Shows only the first 3 foods, without dates, prices or ratings
    - Sorts 3 foods alphabetically

    *Why:* Drop the header, keep 3 lines, then keep column 2.

38. **[MCQ]** What does this print? `cat FILENAME | grep -v "#date,food,price,rating" | cut -d, -f 3 | sort -n | tail -n 1`
    - The lowest price
    - ✅ The highest price
    - The most common price
    - The number of prices

    *Why:* Numeric sort puts the largest value last.

39. **[MSQ]** Which command and purpose pairs are correct?
    - ✅ `touch`: create a file
    - ✅ `cat`: display an entire file
    - ✅ `nano`: edit a file
    - ✅ `echo`: display text on the screen
    - `head`: display the end of a file
    - `wc`: sort lines

    *Why:* `head` shows the beginning, `tail` the end, `sort` sorts.

40. **[MSQ]** `FILENAME` has a header row. Which commands correctly count the unique foods?
    - ✅ `tail -n +2 FILENAME | cut -d"," -f2 | sort | uniq | wc -l`
    - `cut -d"," -f2 FILENAME | uniq | wc -l`
    - `tail -n +2 FILENAME | cut -d"," -f2 | uniq | wc -l`
    - ✅ `tail -n +2 FILENAME | cut -d"," -f2 | sort -u | wc -l`
    - `grep -c food FILENAME`

    *Why:* uniq needs sorted input, or use `sort -u`.

41. **[MSQ]** Which commands give the number of lines that contain "Sushi" in `FILENAME`?
    - ✅ `grep "Sushi" FILENAME | wc -l`
    - `grep -c Sushi FILENAME | wc`
    - ✅ `cat FILENAME | grep "Sushi" | wc -l`
    - `wc -l Sushi`
    - `grep "Sushi" FILENAME`

    *Why:* grep selects the lines and `wc -l` counts them.

42. **[MSQ]** Which statements about `sort` are correct?
    - ✅ By default it sorts alphabetically.
    - ✅ Without `-n`, "10" sorts before "9".
    - ✅ `-n` sorts numerically.
    - ✅ `-r` reverses the order.
    - `sort` changes the original file.

    *Why:* Use `-n` whenever the column is numeric.

43. **[MSQ]** Which statements about redirection are correct?
    - ✅ `>` creates the file or overwrites it.
    - ✅ `>>` appends to the end of the file.
    - ✅ `> file.txt` on its own empties the file but keeps it.
    - `>>` deletes the previous contents first.
    - ✅ `echo "a" >> f` run twice leaves two lines.

    *Why:* One arrow overwrites, two arrows append.

44. **[MSQ]** Which wildcard statements are correct?
    - ✅ `ls *.csv` lists all files ending in .csv.
    - ✅ `ls s?m?` matches four-letter names with s first and m third.
    - `?` matches zero or more characters.
    - `*` matches exactly one character.
    - ✅ `ls so*` lists names starting with so.

    *Why:* Star is many, question mark is one.

45. **[MSQ]** Which statements about `uniq` options are correct?
    - ✅ `-c` prefixes each line with its count.
    - ✅ `-d` shows only lines that are duplicated.
    - ✅ `-u` shows only lines that appear once.
    - `-n` sorts the lines.
    - ✅ All of them work on adjacent lines, so sort first.

    *Why:* uniq only compares neighbouring lines.

46. **[MCQ]** Which command correctly lists the foods that cost exactly 5, in alphabetical order?
    - ✅ `tail -n +2 FILENAME | grep ",5," | cut -d"," -f2 | sort`
    - `grep "5" FILENAME | sort`
    - `cut -d"," -f3 FILENAME | grep 5`
    - `tail -n +2 FILENAME | cut -d"," -f2 | grep 5`
    - `sort FILENAME | head -n 5`

    *Why:* Match the surrounding commas so that 15 and 50 are not matched.

47. **[Fill]** Command to search a file for lines that match "bbt", ignoring case: `___ FILENAME`
    **Answer:** `grep -i "bbt"`

48. **[Fill]** Command to show the first 8 lines of a file: `___ FILENAME`
    **Answer:** `head -n 8`

49. **[Fill]** Command to extract fields 10 and 20 from a file, using a comma as the delimiter: `___ FILENAME`
    **Answer:** `cut -d"," -f10,20`

50. **[Fill]** Command to sort lines of text numerically: `___ FILENAME`
    **Answer:** `sort -n`

51. **[Fill]** Command to list all files that have `vibe` in the middle, with 1 or more characters before and after it.
    **Answer:** `ls ?*vibe*?`

52. **[Fill]** Type a pipeline that prints the lowest price (column 3) of `FILENAME`, skipping the header.
    **Answer:** `tail -n +2 FILENAME | cut -d, -f3 | sort -n | head -n 1` (or the `grep -v "#date,food,price,rating"` version)

53. **[Fill]** Type a pipeline that counts the unique foods (column 2) in `FILENAME`, skipping the header.
    **Answer:** `tail -n +2 FILENAME | cut -d, -f2 | sort | uniq | wc -l`

---

## Chapter 4. File Systems, Paths & Permissions

54. **[MCQ]** Which path is absolute?
    - ✅ /home/smith/reports/week1.txt
    - smith/reports/week1.txt
    - ../smith/reports
    - reports/week1.txt

    *Why:* Absolute paths start at the root with `/`.

55. **[MCQ]** With the current directory `/home/jones`, what does `../smith/reports` resolve to?
    - /home/jones/smith/reports
    - ✅ /home/smith/reports
    - /smith/reports
    - /home/jones/reports

    *Why:* `..` goes from /home/jones to /home; then smith/reports follows.

56. **[MCQ]** What does `chmod u=rw,go= file` do?
    - Everyone can read and write it
    - Only the owner can execute it
    - ✅ Only the owner can read and write it
    - It deletes the file

    *Why:* The owner gets read and write; group and world get nothing.

57. **[MCQ]** Which command removes only an empty directory?
    - `rm -r`
    - `rm`
    - `mv`
    - ✅ `rmdir`

    *Why:* `rmdir` fails if the directory is not empty.

58. **[MCQ]** You can `ls` a folder ABC but `cd ABC` says "Permission denied". What is missing?
    - ✅ x on the directory
    - r on the directory
    - w on the directory
    - x on the files inside

    *Why:* Directory x means you may enter it.

59. **[MCQ]** Why can two files share a name without a conflict?
    - Linux randomly renames one
    - File names ignore case
    - ✅ They sit in different directories, so their full paths differ
    - Only the extension counts

    *Why:* The full path makes a file unique.

60. **[MCQ]** Does renaming `report.txt` to `report.pdf` convert the file?
    - Yes, the OS converts it
    - Yes, but only to PDF
    - It deletes the contents
    - ✅ No. Only the name changes; the contents stay the same

    *Why:* The extension is only a hint to the OS.

61. **[MCQ]** After `mkdir one .two three`, `ls` shows only `one` and `three`. Why?
    - ✅ `.two` is hidden, so `ls` needs `-a` to show it
    - `mkdir` failed on `.two`
    - `ls` hides every third folder
    - `.two` is a file

    *Why:* Names starting with a dot are hidden.

62. **[MCQ]** Why must files in Linux be explicitly given executable permission?
    - Linux cannot run scripts otherwise
    - ✅ So users don't accidentally run a malicious downloaded file
    - Execute permission only applies to directories
    - It makes the file load faster

    *Why:* Safe by default.

63. **[MCQ]** You run `./this-is-running.sh` and get "Permission denied". What is the likely fix?
    - `chmod u=r this-is-running.sh`
    - `cd ..`
    - ✅ `chmod u+x this-is-running.sh`
    - `rm this-is-running.sh`

    *Why:* The file lacks execute permission.

64. **[MCQ]** A teammate can `ls` the shared file `report.docx` but gets "Permission denied" when opening it. What is missing?
    - Execute permission on the file
    - ✅ Read permission for the group (or world, if they are not in the group)
    - Write permission for the owner
    - Nothing; it is a bug

    *Why:* Listing a name needs directory access; opening the file needs read permission.

65. **[MCQ]** Files you put in a folder vanish after every reboot. Using only course content, what is a possible cause?
    - ✅ The folder is stored in RAM, which is volatile
    - The folder is stored on the SSD
    - The files are too large
    - The files lack execute permission

    *Why:* Storage survives a reboot; RAM does not.

66. **[MSQ]** The current directory is `/home/jones`. Which resolutions are correct?
    - ✅ `donations` → /home/jones/donations
    - ✅ `../smith/reports` → /home/smith/reports
    - ✅ `../../dev/ttyE71` → /dev/ttyE71
    - `utilities/printall` → /utilities/printall
    - ✅ `.` → /home/jones

    *Why:* Apply each `..` one level at a time.

67. **[MSQ]** Which statements about permissions on a directory are correct?
    - ✅ r lets you list its contents.
    - ✅ x lets you enter it with `cd`.
    - ✅ w lets you create, delete or rename items inside.
    - x lets you edit the files inside.
    - ✅ Without x, `cd` fails even if you can read the directory.

    *Why:* Directory x is about entering, not editing files.

68. **[MSQ]** Which commands make `notes.txt` readable and writable by the owner only?
    - ✅ `chmod u=rw,go= notes.txt`
    - `chmod u+rw notes.txt`
    - `chmod u=rw, go= notes.txt`
    - ✅ `chmod go-rwx notes.txt`, if the owner already has rw
    - `chmod a+rw notes.txt`

    *Why:* Symbolic chmod has no spaces; `go-` removes group and world rights.

69. **[MSQ]** Which statements about file types are correct?
    - ✅ Renaming virus.exe to funny-cat.jpg does not change what the file is.
    - ✅ A .docx is a binary file.
    - Text files are not stored as binary digits.
    - ✅ The extension helps the OS choose a program to open the file.
    - A file can be converted by changing its extension.

    *Why:* All data is bits; the extension is only a hint.

70. **[MSQ]** Which statements about PATH are correct?
    - ✅ It is a list of directories searched for executables.
    - ✅ The OS searches them in order and runs the first match.
    - It lists every file on the computer.
    - ✅ If `printall` is in a PATH directory you can run it by name from any directory.
    - It is only used on Windows.

    *Why:* PATH saves typing full paths.

71. **[Fill]** Command to give the owner read permission only, and group and world no permissions: `___ FILENAME` (format `COMMAND X=Y,AB=`)
    **Answer:** `chmod u=r,go=`

72. **[Fill]** Command to remove write permission from group and world on the folder `shared`.
    **Answer:** `chmod go-w shared`

73. **[Fill]** Command that prints your current absolute path.
    **Answer:** `pwd`

74. **[Fill]** Command to list the current directory including hidden files.
    **Answer:** `ls -a`

75. **[Fill]** Command that deletes the directory `old` together with everything inside it.
    **Answer:** `rm -r old` (or `rm -rf old`)

---

## Chapter 5. Computer Networks & Addressing

76. **[MCQ]** What does an IP address identify?
    - The process
    - ✅ The computer
    - The website name
    - The file

    *Why:* IP identifies the computer; the port identifies the process on it.

77. **[MCQ]** The default ports for SSH, HTTP and HTTPS are, in that order ...
    - 443, 80, 22
    - 80, 443, 22
    - 22, 443, 80
    - ✅ 22, 80, 443

    *Why:* SSH 22, HTTP 80, HTTPS 443.

78. **[MCQ]** nmap reports a port as "filtered". What does that mean?
    - The server is running and listening
    - The host answered that nothing is listening
    - The host does not exist
    - ✅ A firewall hides the true state, so nmap can't tell

    *Why:* The probe is blocked, so the state is unknown.

79. **[MCQ]** What does DNS do?
    - ✅ Resolves hostnames to IP addresses
    - Splits messages into packets
    - Assigns private IPs to devices
    - Encrypts web traffic

    *Why:* DNS is the phone book for names.

80. **[MCQ]** Why can packets of one message arrive out of order?
    - The receiver reorders them badly
    - ✅ They can take different routes
    - Routers delete the number from each packet
    - IPv6 reverses them

    *Why:* Independent routing means arrival order can differ.

81. **[MCQ]** What defines a LAN?
    - A network over a whole country
    - ✅ A network in a small geographic area such as a building
    - A network that is only wireless
    - A network connected through the Internet backbone

    *Why:* LAN = small area; WAN = large distances.

82. **[MCQ]** What is the purpose of a router in a LAN?
    - To monitor user activity
    - To manage HTML data
    - ✅ To act as a gateway between the LAN and the WAN
    - To encrypt all traffic

    *Why:* Routers forward packets between networks.

83. **[MCQ]** A router receives a packet. What does it know about the packet's journey?
    - The whole route from source to destination
    - Every route for all packets at once
    - It needs a human to choose
    - ✅ The best next step toward the destination

    *Why:* Each router only picks the next hop.

84. **[MCQ]** In the hostname `lab1.network.school.edu`, what is the top-level domain (TLD)?
    - lab1
    - network
    - school
    - ✅ edu

    *Why:* The TLD is the final label.

85. **[MCQ]** `ping ex.com` complains about a failure in "name resolution". What is the most likely cause?
    - ping is broken
    - ✅ The domain ex.com does not exist
    - The web server on ex.com is stopped
    - ex.com does not answer pings

    *Why:* Name resolution is the DNS lookup step.

86. **[MCQ]** Why does 127.0.0.1 still work when your device is in airplane mode?
    - It uses mobile data in the background
    - ✅ It is a loopback address that routes traffic within your own device
    - It connects to a nearby router
    - Airplane mode does not block anything

    *Why:* Loopback needs no external network.

87. **[MCQ]** What might happen if two processes tried to use the same port number?
    - Both run faster
    - ✅ They would clash, causing errors or failed connections
    - The OS merges them
    - The router picks one

    *Why:* A port identifies one process.

88. **[MCQ]** Which analogy best describes packet switching?
    - ✅ Sending a long letter as separate envelopes by different routes, then reassembling it
    - Sending one big parcel along a single fixed route
    - Writing a letter and never mailing it
    - Phoning one person on a dedicated line

    *Why:* Messages are split, routed independently and reassembled.

89. **[MCQ]** nmap shows port 80 as open on a host. What does that indicate?
    - The host is switched off
    - ✅ A server process is listening on port 80
    - A firewall is blocking port 80
    - Only SSH is running

    *Why:* Open means an application is listening.

90. **[MSQ]** Which statements about packet switching are correct?
    - ✅ Messages are split into packets.
    - ✅ Packets may take different routes.
    - Packets always arrive in order.
    - ✅ The receiver reassembles the packets.
    - Routers know the full path from sender to receiver.

    *Why:* Independent routes, reassembly at the end.

91. **[MSQ]** Which of these must a data packet include?
    - ✅ Destination IP address
    - ✅ Destination port number
    - HTML tag
    - Web page
    - Hyperlink

    *Why:* IP gets it to the computer; the port gets it to the process.

92. **[MSQ]** Which statements about `ping` are correct?
    - ✅ A reply shows the host is reachable and gives the round-trip time.
    - A timeout proves the host is down.
    - ✅ A name-resolution failure points to a DNS problem.
    - `ping` tells you whether a port is open.
    - ✅ `ping` can show the IP address of a hostname.

    *Why:* No reply is inconclusive, since some hosts ignore pings.

93. **[MSQ]** Which statements about nmap port states are correct?
    - ✅ Open: an application is listening.
    - ✅ Closed: the host answers and no application listens on that port.
    - ✅ Filtered: a firewall blocks the probe, so the state is unknown.
    - Closed and filtered mean the same.
    - Filtered always means the server is down.

    *Why:* Closed answers; filtered hides.

94. **[MSQ]** Which tool and purpose pairs are correct?
    - ✅ `ping`: checks whether a host is reachable
    - ✅ `dig`: finds the IP address of a domain
    - ✅ `nmap`: checks which ports are open on a host
    - `ping`: shows which ports are open
    - `dig`: tests whether port 443 is open

    *Why:* Three tools, three questions: reachable? which IP? which ports?

95. **[Fill]** In the hostname `node7.cluster.spider.net`, the computer name is ____
    **Answer:** `node7`

96. **[Fill]** In the hostname `cute.labubu.flushie.biz`, the Top-Level Domain is ____
    **Answer:** `.biz` (or `biz`)

97. **[Fill]** What is the hostname equivalent of 127.0.0.1?
    **Answer:** `localhost`

98. **[Fill]** Command to resolve x.com using the nameserver 1.1.1.1, with a short answer.
    **Answer:** `dig +short x.com @1.1.1.1` (any argument order works)

99. **[Fill]** Command to test whether smoo.com has a server process listening on port 443.
    **Answer:** `nmap smoo.com -p 443`

100. **[Fill]** In a typical home network, the default nameserver runs on the home network's ____
     **Answer:** `router`

---

## Chapter 6. The Web, HTML & HTTP

101. **[MCQ]** Which statement correctly relates the Internet and the Web?
     - They are the same thing
     - The Internet runs on top of the Web
     - ✅ The Web is a system built on top of the Internet
     - The Web is the cables

     *Why:* Infrastructure first, then the Web on top.

102. **[MCQ]** A web page references 5 images. How many HTTP requests does loading it need?
     - 5
     - 1
     - 10
     - ✅ 6

     *Why:* One for the HTML plus five for the images.

103. **[MCQ]** In `https://www.example.com:443/path/page.html?k=v#top`, which part is the host?
     - ✅ www.example.com
     - https
     - 443
     - /path/page.html

     *Why:* The host names the server to contact.

104. **[MCQ]** What does `python -m http.server` serve by default?
     - The home directory, on port 80
     - ✅ The current directory, on port 8000
     - The root /, on port 443
     - Nothing until configured

     *Why:* The current directory becomes the web root, on port 8000.

105. **[MCQ]** A page references extra images. How does the browser fetch them?
     - They are embedded in the HTML file
     - The server pushes them automatically
     - ✅ The client sends a separate HTTP request for each object after getting the base HTML
     - The browser caches them in advance

     *Why:* One request for the HTML, then one per object.

106. **[MCQ]** An HTTP server is started. From which folder does it serve files, and why does it matter?
     - The Downloads folder; it doesn't matter
     - The home folder; it speeds up loading
     - ✅ The web root folder; the wrong folder could expose private files
     - The root `/`; it hides hidden files

     *Why:* Only the web root is served, so choose it carefully.

107. **[MCQ]** What is source HTML?
     - The rendered output of the page
     - A DNS response
     - ✅ The raw HTML text received by the browser
     - The IP address of the host

     *Why:* Source is code; rendered is the displayed page.

108. **[MCQ]** Why is HTTPS preferred over HTTP?
     - It uses less bandwidth
     - It renders pages faster
     - It supports older tags
     - ✅ It encrypts the data between client and server

     *Why:* Encryption gives privacy and security.

109. **[MCQ]** In an HTML document, what is the `<head>` section for?
     - ✅ Information about the document, such as its title
     - The visible content of the page
     - Displaying images and videos
     - Defining hyperlinks only

     *Why:* `<head>` holds metadata; `<body>` holds the content.

110. **[MSQ]** Which statements about HTML and CSS are correct?
     - ✅ HTML defines structure and content.
     - ✅ CSS controls how content looks.
     - The browser honours every extra blank line you type in HTML.
     - ✅ Tags are written in angle brackets.
     - ✅ Improperly nested tags can give unpredictable rendering.

     *Why:* Content and look are separate concerns.

111. **[MSQ]** Which statements about the parts of a URL are correct?
     - ✅ The scheme says how the resource is accessed, such as http or https.
     - ✅ The host tells the client which server to contact.
     - ✅ If the port is omitted, http uses 80 and https uses 443.
     - The anchor starts with `?` and ends with `&`.
     - ✅ The query holds key-value pairs, first after `?` then separated by `&`.

     *Why:* scheme://host:port/path?query#anchor

112. **[MSQ]** Which statements about httpie and browsers are correct?
     - ✅ httpie shows the source HTML.
     - ✅ A browser shows the rendered page.
     - ✅ `http --print b` shows the body only.
     - `http --print H` shows the body only.
     - ✅ "View Source" in a browser shows the raw HTML.

     *Why:* Source and rendered pages differ.

113. **[MSQ]** A server is running on port 8000 of your own computer. Which statements are correct?
     - ✅ `nmap localhost -p 8000` shows open.
     - ✅ After Ctrl-C stops the server, nmap shows closed.
     - ✅ After the server stops, the browser cannot connect.
     - nmap shows filtered while the server runs on localhost.
     - ✅ A second server needs a different port, such as 9000.

     *Why:* Open while running, closed after stopping.

114. **[MSQ]** What URL(s) can clients on the same computer use to reach their own HTTP server?
     - `http://myserver`
     - `http://remotehost`
     - ✅ `http://localhost`
     - ✅ `http://127.0.0.1`

     *Why:* localhost is the name for 127.0.0.1.

115. **[MSQ]** A user types `https://1.2.3.4/page.html` into Chrome. Which statements are correct?
     - ✅ The web server process on 1.2.3.4 is identified by its IP address and port number 443.
     - ✅ Chrome is the web client and runs on the user's laptop.
     - ✅ Chrome requests the file `page.html` from the server.
     - The server process requests `page.html` from Chrome.
     - ✅ The page is rendered on the user's laptop.

     *Why:* The client asks and the server answers; IP plus port locate the server process.

116. **[Fill]** For a web client to connect to a web server, it must know the server's IP address and ____ number.
     **Answer:** `port`

117. **[Fill]** Command to view only the HTTP response body for https://x.com (httpie).
     **Answer:** `http --print b https://x.com`

118. **[Fill]** Which HTML element inserts a line break? Type the tag.
     **Answer:** `<br>`

119. **[Fill]** A page references three images. How many files does the browser download in total?
     **Answer:** `4`

### Hosting a website on a port

Computer W (IP 1.2.3.4) will host a website on port 8888, and computer X will access it. The steps are:

- **Step 1:** On W, use nmap to check that W's port 8888 is closed.
- **Step 2:** On W, start the web server on port 8888.
- **Step 3:** On W, use nmap to check that W's port 8888 is open.
- **Step 4:** On X, use nmap to check that W's port 8888 is open.
- **Step 5:** On X, visit `http://1.2.3.4:8888` and check that the page appears.

120. **[MCQ]** Which step ensures that no other process is already using port 8888?
     - ✅ Step 1
     - Step 2
     - Step 3
     - Step 4
     - Step 5

     *Why:* A closed port before starting means nobody else is listening on it.

121. **[MCQ]** Which step confirms the web server is running correctly from within W itself? If it fails, the web server is the likely culprit.
     - Step 1
     - Step 2
     - ✅ Step 3
     - Step 4
     - Step 5

     *Why:* It tests the server locally, before the network is involved.

122. **[MCQ]** Step 3 passes but this step fails, which suggests a firewall on W or between X and W is blocking access. Which step is it?
     - Step 1
     - Step 3
     - ✅ Step 4
     - Step 5

     *Why:* Step 4 is the first test from an external computer.

123. **[MCQ]** Which step confirms that an actual web browser can access the website?
     - Step 2
     - Step 3
     - Step 4
     - ✅ Step 5

     *Why:* The goal is for users to reach the site with a browser.

124. **[MSQ]** Which steps use nmap to check a port's state?
     - ✅ Step 1
     - Step 2
     - ✅ Step 3
     - ✅ Step 4
     - Step 5

     *Why:* Steps 2 and 5 start the server and browse; the other three are nmap checks.

---

## Chapter 7. Local Networks, DHCP & NAT

125. **[MCQ]** Which IP address is private?
     - 172.15.0.1
     - 172.32.0.1
     - 11.0.0.1
     - ✅ 192.168.8.8

     *Why:* The private ranges are 10.x.x.x, 172.16–172.31.x.x and 192.168.x.x.

126. **[MCQ]** What does DHCP do?
     - ✅ Leases private IP addresses to devices that join
     - Translates private IPs to public IPs
     - Resolves names to IPs
     - Encrypts the Wi-Fi link

     *Why:* DHCP assigns addresses automatically.

127. **[MCQ]** What does NAT let many devices do?
     - Share one private IP address
     - ✅ Share one public IP address
     - Share one MAC address
     - Share one DNS server

     *Why:* NAT maps many private addresses to one public address.

128. **[MCQ]** What does an Optical Network Terminal (ONT) do?
     - ✅ Converts optical signals from the ISP into electrical signals for the home network
     - Assigns private IP addresses
     - Encrypts all traffic
     - Stores web pages

     *Why:* The ONT ends the fibre line.

129. **[MCQ]** Why can't every device have its own public IPv4 address?
     - Public addresses are too long to type
     - ✅ There are more devices than public addresses available
     - Routers forbid it
     - Private addresses are faster

     *Why:* NAT lets devices share one.

130. **[MCQ]** Two routers in separate home networks give two devices the same private IP. What happens?
     - They conflict across the Internet
     - Both lose Internet
     - The ISP blocks them
     - ✅ Nothing bad, because the networks are separate

     *Why:* Private addresses only need to be unique inside one LAN.

131. **[MCQ]** Why is NAT less critical for IPv6?
     - ✅ IPv6 has a vastly larger address space
     - IPv6 uses no addresses
     - IPv6 is encrypted by default
     - IPv6 has no routers

     *Why:* There is little reason to share addresses.

132. **[MCQ]** Which analogy best contrasts public and private IP addresses?
     - ✅ Public IPs are like country names (globally unique); private IPs are like street names (can repeat)
     - Public IPs are like street names; private IPs are like country names
     - Both are like phone numbers on the same exchange
     - Public IPs are like nicknames

     *Why:* Street names repeat across countries; country names do not.

133. **[MSQ]** Which statements about a home LAN are correct?
     - ✅ The ONT converts optical signals from the ISP into electrical signals.
     - ✅ A consumer router is often a router, switch and Wi-Fi access point in one.
     - ✅ The router is the default gateway.
     - The router has only a private IP.
     - ✅ A home router has both a public and a private IP.

     *Why:* The router faces both the ISP and the LAN.

134. **[MSQ]** Which addresses are private?
     - ✅ 10.1.2.3
     - ✅ 172.16.5.5
     - 172.32.0.1
     - ✅ 192.168.0.12
     - 8.8.8.8

     *Why:* Check the boundaries of the 172 range.

135. **[MSQ]** Which statements about public and private IP addresses are correct?
     - ✅ A public IP is globally unique.
     - ✅ A private IP can be reused in different LANs.
     - A private IP is routable on the Internet.
     - ✅ ISPs obtain public IPs from regional registries such as APNIC.
     - ✅ A home router's public IP may change unless a static IP is bought.

     *Why:* Public is unique and routable; private is local.

136. **[MSQ]** A laptop at 192.168.0.12 requests a web page. Which statements about NAT are correct?
     - ✅ The router replaces the private source address and port with its public address and a port.
     - ✅ The router records the mapping in a table.
     - The reply goes to the laptop's private IP directly across the Internet.
     - ✅ The router looks up the table and sends the reply to the laptop.
     - ✅ Websites see the router's public IP for all devices behind it.

     *Why:* Translate out, record, translate back.

137. **[MSQ]** A phone is on mobile data and then on home Wi-Fi. Which statements are generally justified?
     - ✅ On Wi-Fi its IP is usually private.
     - ✅ On mobile data its IP is usually public.
     - Its IP is always the same in both cases.
     - ✅ A website sees the router's public IP for a Wi-Fi connection.
     - Private IPs are used on the Internet backbone.

     *Why:* What a website sees may differ from the device's own address.

138. **[Fill]** What does NAT stand for?
     **Answer:** `network address translation`

---

## Chapter 8. Cloud Computing & AWS EC2

139. **[MCQ]** Which cloud model is open to any subscriber?
     - ✅ Public
     - Private
     - Community
     - Hybrid

     *Why:* Public clouds such as AWS are multi-tenant.

140. **[MCQ]** What does terminating an EC2 instance do?
     - Pauses billing but keeps the disk
     - ✅ Wipes the machine and stops billing
     - Only restarts the machine
     - Makes the key invalid

     *Why:* Terminate is like turning the computer off for good.

141. **[MCQ]** In `ssh -i key.pem ec2-user@IP`, what does `-i` supply?
     - The IP address
     - The port number
     - ✅ The identity (private key) file
     - The user name

     *Why:* `-i` names the private key used to authenticate.

142. **[MCQ]** Why does `ssh` refuse a `key.pem` with loose permissions?
     - Keys must be executable
     - The file is too large
     - ssh only accepts .txt files
     - ✅ The private key must not be readable by others

     *Why:* If others can read it, it is not private.

143. **[MCQ]** What is the purpose of launching an EC2 instance?
     - To buy a physical server
     - ✅ To get a virtual server in the cloud that runs applications
     - To store only email
     - To create a LAN

     *Why:* EC2 is a rented virtual machine.

144. **[MCQ]** What happens if the private key file is deleted?
     - The instance restarts
     - AWS emails a new key
     - ✅ You are locked out and cannot connect over SSH
     - SSH switches to a password

     *Why:* Keep the key safe.

145. **[MCQ]** In an inbound security rule, what does the source `0.0.0.0/0` mean?
     - Only your own computer
     - No one
     - ✅ Any IPv4 address on the Internet
     - Only addresses inside the LAN

     *Why:* The port becomes publicly accessible.

146. **[MCQ]** In the EC2 launch screen, what is an "OS Image" such as Amazon Linux?
     - A screenshot of the desktop
     - ✅ A pre-configured template with an operating system, used to create an instance
     - A backup of your files
     - A type of firewall

     *Why:* You don't have to install the OS from scratch.

147. **[MCQ]** Port 80 is not allowed in the EC2 security group but the HTTP server is running. What does a browser see?
     - The page loads normally
     - An instant 404 error
     - A DNS failure
     - ✅ A long wait, then "This site can't be reached"

     *Why:* Blocked traffic times out.

148. **[MSQ]** Which statements about cloud computing are correct?
     - ✅ Resources are provided by a third party and managed over the Internet.
     - ✅ On-premise means the organisation owns and manages its own servers.
     - In the cloud you pay for the hardware whether or not you use it.
     - ✅ Gmail is an example of a cloud service.
     - ✅ Users need not care where their resources are physically located.

     *Why:* Rent instead of buy.

149. **[MSQ]** Which statements about cloud deployment models are correct?
     - ✅ A public cloud is open to any subscriber.
     - ✅ A private cloud is for one organisation.
     - ✅ A community cloud is shared by organisations with similar needs.
     - ✅ A hybrid cloud combines other models.
     - The model depends on where the hardware is.

     *Why:* It is about who can use it, not where it sits.

150. **[MSQ]** Which statements about `ssh -i is114-keypair.pem ec2-user@IP` are correct?
     - ✅ `-i` names the private key file.
     - ✅ `ec2-user` is the login user on the instance.
     - ✅ `IP` is the public IPv4 address of the instance.
     - ✅ The key file should have permissions like `chmod u=rw,go=`.
     - The command works with the key readable by everyone.

     *Why:* Key, user, host, private permissions.

151. **[MSQ]** A web server runs on port 80 of an EC2 instance, but nobody can browse to it and nmap says filtered. Which statements are justified?
     - ✅ The security group may lack an inbound rule for port 80.
     - ✅ The server may be running perfectly.
     - The server must have crashed.
     - ✅ Adding an inbound rule for 80 from 0.0.0.0/0 should fix it.
     - ✅ Browsers hang or time out.

     *Why:* Filtered points at the firewall.

152. **[MSQ]** Which security group settings follow typical good practice?
     - ✅ Allow 80 and 443 from 0.0.0.0/0.
     - ✅ Allow 22 only from administrator IP addresses.
     - Allow 22 from 0.0.0.0/0.
     - ✅ A security group acts as a firewall for the instance.
     - `0.0.0.0/0` means a single IP address.

     *Why:* Public web, private admin.

153. **[MSQ]** A company keeps sensitive financial data on private clusters and serves a public web app from AWS. Which statements are correct?
     - ✅ It is a hybrid cloud.
     - It is a community cloud.
     - ✅ It uses both private and public resources.
     - It is an on-premise only model.

     *Why:* Mixed deployment is hybrid.

154. **[Fill]** Connect to the instance at 3.1.2.4 as `ec2-user` using the key file `is114-keypair.pem`.
     **Answer:** `ssh -i is114-keypair.pem ec2-user@3.1.2.4`

---

## Chapter 9. Information Security & Cryptography

155. **[MCQ]** A DoS flood crashes a web server. Which CIA pillar is attacked?
     - Confidentiality
     - ✅ Availability
     - Integrity
     - Authenticity

     *Why:* Authorised users can no longer reach the service.

156. **[MCQ]** Which key does Alice use to encrypt a message to Bob in public-key cryptography?
     - Bob's private key
     - Alice's private key
     - ✅ Bob's public key
     - A shared secret key

     *Why:* Only Bob's private key can then decrypt it.

157. **[MCQ]** Which is "something you are"?
     - A password
     - A hardware token
     - A PIN
     - ✅ A fingerprint

     *Why:* Biometrics are what you are.

158. **[MCQ]** What does a firewall do?
     - It encrypts all files
     - It stores passwords
     - It speeds up the connection
     - ✅ It checks incoming traffic and filters unwanted traffic

     *Why:* It enforces an access control policy.

159. **[MCQ]** What does a certificate authority do?
     - ✅ Verifies a public key by issuing a digital certificate
     - Stores private keys
     - Encrypts the messages
     - Assigns IP addresses

     *Why:* It prevents impersonation.

160. **[MCQ]** What is the main weakness of symmetric encryption?
     - It uses two keys
     - ✅ Both sides must share the same key, which can be intercepted
     - It cannot encrypt text
     - It needs a certificate authority

     *Why:* Key distribution is the problem.

161. **[MCQ]** What is the difference between false acceptance and false rejection in biometrics?
     - They are the same
     - Acceptance blocks a legitimate user
     - ✅ Acceptance admits an unauthorised user; rejection blocks a legitimate user
     - Rejection admits an attacker

     *Why:* Two kinds of error.

162. **[MCQ]** Why is cryptography needed even when users have strong passwords?
     - Strong passwords can't be typed over a network
     - ✅ It protects the content itself, so it can't be read even if a password is compromised
     - Passwords are always stored in plaintext
     - Cryptography replaces the need for authentication

     *Why:* Passwords protect access; cryptography protects the data.

163. **[MCQ]** Which sequence correctly describes Alice sending Bob an encrypted message with public-key cryptography?
     - Bob encrypts with his private key; Alice decrypts with her public key
     - ✅ Alice gets Bob's public key, encrypts the message with it, sends it, and Bob decrypts with his private key
     - Alice and Bob share one secret key beforehand and both use it
     - Alice encrypts with her private key and Bob decrypts with it

     *Why:* Public encrypts, private decrypts.

164. **[MSQ]** Which statements about the CIA triad are correct?
     - ✅ Confidentiality is protection from unauthorised access.
     - ✅ Integrity is modification only by appropriate mechanisms.
     - ✅ Availability is authorised access when needed.
     - Encryption alone guarantees integrity.
     - ✅ A DoS flood is an attack on availability.

     *Why:* Three separate ideas.

165. **[MSQ]** Which scenarios map correctly to a CIA pillar?
     - ✅ A web root pointing at private files: confidentiality is broken.
     - ✅ A tampered account balance: integrity is broken.
     - ✅ An unreachable server: availability is broken.
     - ✅ Data corrupted by a transmission error: integrity is broken.
     - A DoS flood: confidentiality is broken.

     *Why:* Ask which property is lost.

166. **[MSQ]** Which statements about authentication are correct?
     - ✅ Something you know includes a password or PIN.
     - ✅ Something you have includes a smart card or token.
     - ✅ Something you are is a biometric trait such as a fingerprint.
     - ✅ Two-factor authentication needs two different kinds of credential.
     - SMS one-time codes are the strongest factor.

     *Why:* Combine different factors.

167. **[MSQ]** Which statements about cryptography vocabulary are correct?
     - ✅ Plaintext is readable and ciphertext is not.
     - ✅ A cipher is the algorithm and the key guides it.
     - ✅ Cryptanalysis is decrypting without knowing the cipher or key.
     - A Caesar cipher is hard for modern computers to break.
     - ✅ Decrypting FRPSXWHU with shift 3 gives COMPUTER.

     *Why:* Substitution ciphers are weak; decryption shifts each letter back.

168. **[MSQ]** Which statements about symmetric and public-key cryptography are correct?
     - ✅ Symmetric schemes use the same key to encrypt and decrypt.
     - ✅ Symmetric schemes have a key-distribution problem.
     - ✅ Public-key cryptography uses a public and a private key.
     - ✅ The public key encrypts and the private key decrypts.
     - The private key is sent along with the message.

     *Why:* The private key is never transmitted.

169. **[Fill]** Encrypt FUNDAMENTAL with a Caesar shift of 3.
     **Answer:** `IXQGDPHQWDO`

170. **[Fill]** Decrypt FRPSXWHU with a Caesar shift of 3.
     **Answer:** `COMPUTER`

---

## Chapter 10. Systems Architecture Case Study

171. **[MCQ]** In the case study, which ports are opened in the security group to the whole Internet?
     - 22 only
     - 8000 only
     - ✅ 80 and 443
     - All ports

     *Why:* Web ports are public; SSH is admin-only.

172. **[MCQ]** Why does the developer first host the server on 127.0.0.1:8000?
     - EC2 is not available
     - Loopback is faster than the Internet
     - DNS cannot resolve public names
     - ✅ To test rendering without exposing unfinished code

     *Why:* Loopback stays inside the device.

173. **[MCQ]** What shares the home's single public IP among the sensors and laptops?
     - ✅ NAT on the router
     - DHCP
     - DNS
     - The security group

     *Why:* NAT maps private addresses to the one public address.

174. **[MSQ]** Which tiers and concepts are matched correctly?
     - ✅ Tier 1: sensors and wearables, embedded systems, Bluetooth.
     - ✅ Tier 2: ONT and router, DHCP and NAT.
     - ✅ Tier 3: AWS EC2, public cloud virtualisation.
     - Tier 4: Python web server and ML engine.
     - ✅ Tier 5: HTTP/HTTPS, HTML5/CSS, loopback testing.

     *Why:* Each tier has its own vocabulary.

175. **[MSQ]** Which statements about the perimeter security are correct?
     - ✅ Ports 80 and 443 are open to 0.0.0.0/0 so clients and sensors can connect.
     - ✅ Port 22 is restricted to administrator IPs.
     - ✅ Developers authenticate with RSA keypairs.
     - ✅ The private key is protected with `chmod u=rw,go=`.
     - The private key is stored in authorized_keys.

     *Why:* Open what must be public; lock down the rest.

176. **[MSQ]** The security group lacks a rule for port 443, yet the web server runs on 443. Which statements are correct?
     - ✅ Sensors cannot deliver telemetry over HTTPS.
     - ✅ nmap from the Internet reports 443 as filtered.
     - The instance has crashed.
     - ✅ Adding an inbound rule for 443 fixes the symptom.
     - ✅ Alerts to caregivers might be delayed or lost.

     *Why:* The server is reachable only if a rule allows it.

177. **[Fill]** Which port do the sensors use to send encrypted telemetry to the cloud?
     **Answer:** `443`
