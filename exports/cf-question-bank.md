# IS114 Computing Fundamentals: question bank

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

3. **[MCQ]** How many bytes is a 20 GB RAM, using the course rule?
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

5. **[MCQ]** What does a "15-inch" laptop screen measurement refer to?
   - The width of the screen
   - ✅ The diagonal of the display area
   - The height of the screen
   - The number of pixels across
   *Why:* Screen size is measured along the diagonal.

6. **[MCQ]** What does a screen resolution of 1920 × 1080 mean?
   - It is 1920 inches by 1080 inches
   - The screen refreshes 1920 times a second
   - ✅ The screen is 1920 pixels wide and 1080 pixels high
   - It can show only 1920 colours
   *Why:* Resolution is width × height in pixels.

7. **[MCQ]** What role does a GPU play in a computer?
   - It permanently stores the operating system
   - It connects the computer to the Internet
   - It holds running programs while they execute
   - ✅ It handles graphics so the main processor is free for other tasks
   *Why:* GPUs also speed up machine learning.

8. **[MCQ]** Which connection carries digital audio and video to a TV or monitor?
   - ✅ HDMI
   - Bluetooth
   - Ethernet
   - A power cable
   *Why:* HDMI sends digital audio and video.

9. **[MCQ]** Bluetooth is best suited to which job?
   - Joining LANs across a city
   - ✅ Short-range, low-power links such as keyboards and earphones
   - Carrying high-speed video to a monitor
   - Routing packets to the Internet
   *Why:* Short distance, low power.

10. **[MCQ]** A computer has lots of storage but little RAM. Why does it feel slow with many apps open?
   - Storage is volatile and loses its contents
   - The GPU runs out of pixels
   - ✅ RAM limits how many programs run at once; storage space does not
   - Cache fills the whole disk
   *Why:* Running programs live in RAM.

11. **[MCQ]** A fast CPU is paired with slow storage. Why can it still perform poorly?
   - The CPU forgets its instructions
   - RAM turns into storage
   - The screen resolution drops
   - ✅ The CPU waits while data loads from the slow storage
   *Why:* Loading is a bottleneck.

12. **[MSQ]** Which statements about RAM and storage are true?
   - ✅ RAM is volatile.
   - ✅ Storage is non-volatile.
   - The CPU executes a program directly from storage.
   - More storage lets you run more programs at once.
   - ✅ A running process is lost at power-off while its program file remains.
   *Why:* Storage is the permanent copy and RAM is the working copy.

13. **[MSQ]** A laptop has 1 TB of SSD but only 4 GB of RAM and feels slow with many windows open. Which explanations are justified?
   - ✅ The OS runs short of RAM and has to close or juggle programs.
   - The SSD is too fast.
   - ✅ A big disk does not give more room for running programs.
   - ✅ Adding more RAM would help more than adding more storage.
   - The GPU has no cores.
   *Why:* Memory is not storage: capacity of one does not substitute for the other.

14. **[MSQ]** Which statements about the CPU are correct?
   - ✅ It fetches, decodes and executes instructions.
   - ✅ A higher GHz means more cycles per second.
   - More cores always make every program four times faster.
   - ✅ More cores can improve multitasking but use more power.
   - ✅ The clock coordinates actions in the computer.
   *Why:* Cores and clock speed are different properties with different trade-offs.

15. **[MSQ]** Which are volatile?
   - ✅ RAM
   - ✅ Cache
   - SSD
   - HDD
   - A file saved on the SSD
   *Why:* Only RAM and cache are volatile in this list.

16. **[MSQ]** Using the course rule for prefixes, which are correct?
   - ✅ 1 KB = 1,000 B.
   - ✅ 1 GB = 10⁹ B.
   - 1 TB = 2⁴⁰ B.
   - ✅ 20 GB holds about 5 × 10⁹ four-byte emoji.
   - ✅ 1 MB = 10⁶ B.
   *Why:* Powers of ten, not powers of two.

17. **[MSQ]** Which statements describe what happens when you open a browser?
   - ✅ The program is loaded from storage into RAM.
   - ✅ RAM supplies instructions and data to the CPU.
   - ✅ The GPU can handle graphics such as video and animation.
   - The CPU copies the program back to cache permanently.
   - ✅ Results can be saved back to storage.
   *Why:* Storage → RAM → CPU → results, with the GPU handling graphics.

18. **[MSQ]** Which statements about a laptop specification are correct?
   - ✅ "1920 × 1080" is the resolution in pixels, width by height.
   - ✅ "15-inch" is the diagonal length of the display.
   - ✅ "12 MB cache" is fast volatile memory inside the CPU.
   - "1 TB SSD" is volatile memory.
   - ✅ "Wi-Fi 7, Bluetooth 5" describe wireless connectivity.
   *Why:* Each spec line names one component and its measure.

19. **[MSQ]** Which statements about embedded systems are true?
   - ✅ They are computers dedicated to a narrow range of functions.
   - ✅ They can be found in microwaves, cars and watches.
   - They have no processor or memory.
   - ✅ They are part of a larger system.
   - ✅ The BBC micro:bit has sensors.
   *Why:* Same three resources, in a small dedicated package.

20. **[MSQ]** A student claims "Software is stored in RAM, so RAM is the same as storage." Which responses are correct?
   - ✅ Programs are stored in storage and copied to RAM to run.
   - ✅ RAM is volatile; storage is not.
   - ✅ The CPU cannot run a program straight from storage.
   - RAM is slower than storage.
   - Both lose data at power-off.
   *Why:* The two are different layers with different roles.

21. **[MSQ]** Which statements are correct about the GPU and display?
   - ✅ The GPU is a processor for graphics.
   - ✅ It relieves the CPU of graphics work.
   - ✅ GPUs are used for parallel matrix computation such as machine learning.
   - A GPU measures screen size.
   - ✅ HDMI sends digital audio and video to a monitor or TV.
   *Why:* The GPU handles graphics and parallel numeric work.

22. **[Fill]** How many bytes are in 20 GB, using the course rule (powers of ten)? Type the number.
   **Answer:** `20000000000`  or  `20,000,000,000`
   *Note:* 20 × 10⁹ bytes.

23. **[Fill]** In what unit is a processor's clock speed written? (abbreviation)
   **Answer:** `GHz`  or  `Hz`
   *Note:* GHz means billions of cycles per second.

24. **[Fill]** Which memory does the CPU check first when it needs data: cache, RAM or storage?
   **Answer:** `cache`
   *Note:* Cache first, then RAM, then storage.

25. **[Fill]** What does RAM stand for?
   **Answer:** `random access memory`
   *Note:* Random Access Memory.

26. **[Fill]** How many bytes are in 1 TB, using the course rule? Type the number.
   **Answer:** `1000000000000`  or  `1,000,000,000,000`
   *Note:* 10¹² bytes.

27. **[Fill]** What does USB stand for?
   **Answer:** `universal serial bus`
   *Note:* Universal Serial Bus.

28. **[Fill]** What does a laptop screen size such as 15-inch measure?
   **Answer:** `diagonal`
   *Note:* The diagonal of the display area.

29. **[Fill]** In one or two sentences: what is the main difference between memory and storage?
   **Answer:** `Memory is volatile and temporary; storage is non-volatile and permanent.`
   *Note:* Memory loses its contents at power-off; storage keeps them.

30. **[Fill]** What happens to the contents of RAM when the computer is powered off?
   **Answer:** `they are lost`
   *Note:* RAM is volatile.

31. **[Short]** What is the purpose of the processor in a computer?
   **Answer:** It executes instructions and performs computations on data.

32. **[Short]** What does GHz mean in a processor specification?
   **Answer:** It is the unit of the processor's clock speed, in billions of cycles per second.

33. **[Short]** What is cache memory used for?
   **Answer:** Cache is fast, volatile memory used to store frequently accessed data for the processor.

34. **[Short]** What does RAM stand for, and what is its function?
   **Answer:** Random Access Memory. It stores data and instructions temporarily while a program runs.

35. **[Short]** 1 terabyte (TB) equals how many bytes?
   **Answer:** 1,000,000,000,000 bytes

36. **[Short]** What is Bluetooth commonly used for?
   **Answer:** Connecting devices like keyboards, mice, and earphones over short distances.

37. **[Short]** What does USB stand for, and what is it used for?
   **Answer:** Universal Serial Bus. It connects devices and transfers data between them.

38. **[Short]** What does HDMI allow you to do?
   **Answer:** Transmit digital audio and video to devices like TVs and monitors.

39. **[Short]** What is an embedded system, and where can they be found?
   **Answer:** A specialized computer designed to perform specific tasks within a larger device. They are found in microwaves, cars, watches, etc.

40. **[Short]** Why does a laptop need both memory and storage, instead of just storage?
   **Answer:** Memory is fast and temporary, mainly for running programs, while storage keeps data even when the power is off.

41. **[Short]** Why is a GPU critical for gaming?
   **Answer:** Gaming requires fast, complex image rendering that would overwhelm the main processor.

42. **[Short]** How does the volatility of RAM affect unsaved work when you lose power suddenly?
   **Answer:** All unsaved work in RAM is lost immediately.

43. **[Short]** How does a processor use both memory and storage when running a program?
   **Answer:** The program is loaded from storage into memory. The processor reads and executes the instructions from memory, not from storage.

44. **[Short]** Why might a computer with lots of storage but little memory still feel slow when too many applications are running?
   **Answer:** Memory limits how many programs can run at once. Storage space does not.

45. **[Short]** When the CPU needs data, where does it look first: storage, memory, or cache? Why?
   **Answer:** Cache first (fastest), then memory, then storage (slowest). The CPU checks the fastest place first to avoid delays.

46. **[Short]** Why might a computer with a fast CPU but slow storage still perform poorly in some tasks?
   **Answer:** Slow storage means data loads slowly, so the CPU has to wait, creating a bottleneck.

47. **[Short]** Compare the role of memory and storage when running a game on a laptop.
   **Answer:** Memory temporarily holds the game's active data for quick access during gameplay; storage permanently keeps the game files even when the computer is off.

48. **[Short]** Given that Bluetooth has a weaker signal than Wi-Fi, when is Bluetooth more advantageous?
   **Answer:** For short-range, low-power connections like keyboards, mice, and headphones, where high speed and long range aren't needed.

49. **[Short]** A laptop specification lists both RAM and SSD. Why are both needed?
   **Answer:** RAM is fast, volatile memory for active processes; the SSD is permanent, non-volatile storage. Each serves a distinct, essential function.

50. **[Short]** What is the main component that limits the number of running processes on a computer?
   **Answer:** Memory.

51. **[Short]** When editing a file, what is one risk of keeping the file only in memory?
   **Answer:** Memory is volatile; if power is lost, unsaved data is permanently lost. ### System software, processes, and the CLI

---

## Chapter 2. Operating Systems & Processes

52. **[MCQ]** Which of these is system software?
   - Firefox
   - Microsoft Excel
   - ✅ Linux
   - A video game
   *Why:* System software manages the computer; Windows, Linux and macOS are examples.

53. **[MCQ]** Which statement correctly distinguishes a process from a program?
   - A process is stored permanently on disk
   - A program can only run once
   - A process and a program are the same thing
   - ✅ A process is a program in execution
   *Why:* A program is the file; a process is the running instance in RAM.

54. **[MCQ]** Which key combination suspends (pauses) the foreground process?
   - ✅ Ctrl-z
   - Ctrl-c
   - Ctrl-x
   - Ctrl-o
   *Why:* Ctrl-z suspends; fg or bg resumes.

55. **[MCQ]** Which command lists the processes that you own, as written in this course?
   - ps -u
   - ✅ ps u
   - top -l
   - ls proc
   *Why:* Use ps u, without a dash.

56. **[MCQ]** Which is a reason why the CLI is valued over the GUI for administration?
   - It needs no precise syntax
   - It is case-insensitive
   - ✅ It supports batch processing and automation
   - It cannot be used remotely
   *Why:* Commands can be scripted and repeated, and used remotely.

57. **[MCQ]** In the Linux terminal, how do you tell which computer you are working on?
   - Check the desktop wallpaper
   - Run ls
   - You cannot tell
   - ✅ Read the prompt, which shows the hostname
   *Why:* The prompt shows the hostname of the machine you control.

58. **[MCQ]** What does Ctrl-C do on the Linux command line?
   - ✅ Kills the foreground process
   - Suspends it and sends it to the background
   - Copies the selected text
   - Closes the terminal window
   *Why:* Ctrl-C kills; Ctrl-Z suspends.

59. **[MCQ]** Compared with a killed process, a suspended process ...
   - uses CPU time but no memory
   - ✅ still holds memory but uses no CPU time
   - uses neither memory nor CPU
   - runs faster
   *Why:* Suspended = paused in memory; killed = gone.

60. **[MCQ]** Which resource mainly limits how many processes can run at once?
   - The monitor size
   - The keyboard layout
   - ✅ Memory
   - The file extension
   *Why:* Every process lives in memory.

61. **[MCQ]** Why do beginners often struggle with the Linux CLI?
   - The CLI guesses and fixes typos
   - Linux ignores capital letters
   - Commands run only when the GUI is open
   - ✅ It is case-sensitive and needs precise command syntax
   *Why:* Precise typing matters in the CLI.

62. **[MSQ]** Which are roles of an operating system?
   - ✅ Manage resources such as memory and storage.
   - ✅ Provide an interface for a human to interact with the computer.
   - ✅ Allow application programs to use those resources.
   - Manufacture the CPU.
   - ✅ Share resources among programs that want them.
   *Why:* All roles revolve around sharing resources nicely.

63. **[MSQ]** Which statements about programs and processes are true?
   - ✅ A program is an executable file stored in non-volatile storage.
   - ✅ A process is a program in execution.
   - A process lives in storage.
   - ✅ When power is cut, the process terminates but the program remains.
   - ✅ Task Manager (Windows) or Activity Monitor (macOS) shows processes.
   *Why:* File versus running instance.

64. **[MSQ]** A user presses Ctrl-z while top is running, then types fg and presses Ctrl-c. Which statements are correct?
   - ✅ Ctrl-z suspended top and moved it out of the foreground.
   - ✅ fg brought top back to the foreground.
   - ✅ Ctrl-c terminated top.
   - Ctrl-z killed top and freed all its RAM.
   - ✅ While suspended, top used no CPU.
   *Why:* Pause is not kill: a suspended process keeps its RAM.

65. **[MSQ]** Which statements about killing and suspending a process are true?
   - ✅ Killing frees both CPU and RAM.
   - ✅ Suspending frees the CPU.
   - Suspending frees the RAM.
   - ✅ bg resumes a suspended process in the background.
   - A suspended process is gone for good.
   *Why:* Only killing releases both resources.

66. **[MSQ]** Which statements about the CLI are correct?
   - ✅ It is also called the terminal, shell or command line.
   - ✅ Linux commands are almost always lowercase.
   - ✅ Options typically come before arguments.
   - The order of options matters a great deal.
   - ✅ Tab completion and the arrow keys save typing.
   *Why:* Precise syntax, but with helpers.

67. **[MSQ]** Which are valid reasons the course uses Linux?
   - ✅ It powers over 60% of servers worldwide.
   - ✅ It runs all of the Top 500 supercomputers.
   - ✅ Android is built on the Linux kernel.
   - It cannot be used from the command line.
   - ✅ It prepares students for advanced IS courses.
   *Why:* Linux is everywhere in servers and infrastructure.

68. **[MSQ]** Which are duties of the OS in "sharing nicely"?
   - ✅ Processor scheduling.
   - ✅ Memory allocation.
   - ✅ Storage and I/O coordination.
   - Designing the application interface of every program.
   - ✅ Providing user interfaces such as the GUI and CLI.
   *Why:* Four duties: scheduling, memory, storage and I/O, interfaces.

69. **[MSQ]** Which statements about booting are correct?
   - ✅ Firmware loads the OS kernel from non-volatile storage into memory.
   - ✅ The OS then takes control of the computer.
   - The OS must be loaded from RAM at power-up.
   - ✅ Storage must hold the OS for it to start.
   - ✅ Booting happens each time power is applied.
   *Why:* The OS lives in storage and is loaded into memory at boot.

70. **[MSQ]** Which are correct about foreground and background processes?
   - ✅ The foreground process is the one you are interacting with.
   - ✅ Background processes run without direct user interaction.
   - Ctrl-c terminates the background process.
   - ✅ A GUI analogy: minimised apps are background.
   - Only one process can exist at a time.
   *Why:* Foreground is the one in focus.

71. **[MSQ]** Which statements about software categories are correct?
   - ✅ A terminal is application software.
   - ✅ Windows, Linux and macOS are system software.
   - ✅ The OS is the core component of system software.
   - A web browser is system software.
   - ✅ Application software solves specific user needs.
   *Why:* Applications serve users; system software serves the machine.

72. **[Fill]** Type the command that lists the processes you own (course form, no dash).
   **Answer:** `ps u`
   *Note:* Write `ps u`; `ps -u` is not the course form.

73. **[Fill]** Which key combination suspends (pauses) the foreground process?
   **Answer:** `ctrl-z`  or  `ctrl+z`  or  `ctrl z`
   *Note:* Ctrl-z suspends; Ctrl-c kills.

74. **[Fill]** After suspending a process, which command resumes it in the background?
   **Answer:** `bg`
   *Note:* `bg` background, `fg` foreground.

75. **[Fill]** Which key combination kills the foreground process in the Linux terminal?
   **Answer:** `ctrl-c`  or  `ctrl+c`  or  `ctrl c`
   *Note:* Ctrl-c kills; Ctrl-z suspends.

76. **[Fill]** Type the command that brings a suspended process back to the foreground.
   **Answer:** `fg`
   *Note:* `fg` foreground, `bg` background.

77. **[Fill]** What is the core component of system software?
   **Answer:** `operating system`  or  `the operating system`  or  `os`
   *Note:* The operating system manages the hardware.

78. **[Fill]** A laptop is turned off. Chrome is installed. Where does Chrome exist? (storage or memory)
   **Answer:** `storage`
   *Note:* Programs are kept in storage; processes live in memory.

79. **[Fill]** The user clicks the Chrome icon. A Chrome ___ starts and sits in the laptop's ___. Type the two words separated by a comma.
   **Answer:** `process, memory`  or  `process,memory`  or  `process memory`
   *Note:* A running program is a process, held in memory.

80. **[Fill]** On Windows, which tool lists running processes?
   **Answer:** `task manager`  or  `taskmanager`
   *Note:* Open it from the Start menu.

81. **[Fill]** In one sentence: why must an operating system "share nicely"?
   **Answer:** `Many programs must take turns using limited resources.`
   *Note:* The OS schedules programs so each gets the CPU in turn.

82. **[Short]** Give examples of system software.
   **Answer:** Windows, Linux, macOS.

83. **[Short]** How does application software differ from system software?
   **Answer:** Application software solves specific real-world problems; system software manages the computer's core operations.

84. **[Short]** Give examples of application software.
   **Answer:** Terminal, Microsoft Office, Firefox, Chrome.

85. **[Short]** What resources does an operating system manage?
   **Answer:** Processors, memory, and storage.

86. **[Short]** What is the purpose of a user interface provided by an operating system?
   **Answer:** It allows users to interact with the computer and its resources.

87. **[Short]** What happens during the booting process?
   **Answer:** The operating system loads into memory and takes control of the computer.

88. **[Short]** How does the operating system handle multiple programs that need the CPU?
   **Answer:** It schedules programs so they take turns using the CPU.

89. **[Short]** What is a GUI, and how do we typically use it?
   **Answer:** A Graphical User Interface, where users click or tap icons to interact with applications or the OS.

90. **[Short]** What is a CLI, and how is it different from a GUI?
   **Answer:** A Command Line Interface uses typed commands instead of graphical elements.

91. **[Short]** What are the pros and cons of using a CLI versus a GUI to manage files?
   **Answer:** The CLI allows precise, quick changes and automation; the GUI is more intuitive but slower for large-scale changes.

92. **[Short]** What are some rules a beginner could follow to avoid mistakes when typing Linux commands?
   **Answer:** Double-check command syntax and be mindful of case sensitivity.

93. **[Short]** What is a program?
   **Answer:** A file containing instructions and data for execution.

94. **[Short]** What is a process?
   **Answer:** A running program that resides in main memory.

95. **[Short]** What happens to a process and its program when the computer is turned off?
   **Answer:** The process terminates because memory is volatile. The program remains in storage because storage is non-volatile.

96. **[Short]** How can you view a list of running processes on Windows?
   **Answer:** Open Task Manager from the Start menu.

97. **[Short]** You wanted to terminate the foreground process but pressed Ctrl-Z by accident. What happened, and how do you recover?
   **Answer:** The process is suspended (paused) and becomes a background process. Type `fg` to bring it back to the foreground, then press Ctrl-C to terminate it.

98. **[Short]** What are the GUI equivalents of foreground processes, background processes, and Ctrl-C?
   **Answer:** Foreground process: the maximized app you're interacting with. Background process: an app that is minimized or behind other windows. Ctrl-C: closing an app.

99. **[Short]** What is the difference between a suspended process and a killed process, in terms of resources used?
   **Answer:** Suspended processes still take up memory; killed processes don't. Neither uses CPU time.

100. **[Short]** What resources might suspended processes consume?
   **Answer:** Memory.

101. **[Short]** Use these words (each can be used zero or more times): process, CPU, storage, memory, cache, GPU, terminated, started, suspended. A laptop has Windows and Chrome installed. (a) The laptop is turned off, drawing zero power. Chrome exists in the ______. (b) The laptop is turned on and Windows boots. Chrome isn't running. Chrome exists in the ______. (c) The user clicks the Chrome icon. A Chrome ______ is started and resides in the laptop's ______.
   **Answer:** (a) storage (b) storage (c) process, memory

102. **[Short]** Use an analogy to explain the difference between a program and a process.
   **Answer:** A program is like a recipe book; a process is like actually cooking using the recipe. (Other analogies are fine.) ### Files, directories, and permissions

---

## Chapter 3. Linux Command-Line Data Analysis

103. **[MCQ]** Which command extracts the second comma-separated column?
   - grep -f2 file.csv
   - sort -d"," -f2 file.csv
   - head -d"," -f2 file.csv
   - ✅ cut -d"," -f2 file.csv
   *Why:* cut with -d for the delimiter and -f for the field number.

104. **[MCQ]** Why must sort come before uniq?
   - ✅ uniq removes only adjacent duplicates
   - uniq cannot read files
   - sort deletes duplicates
   - uniq needs numbers
   *Why:* Sorting puts equal lines next to each other.

105. **[MCQ]** What does grep -v "Chicken" file print?
   - Lines that contain Chicken
   - ✅ Lines that do not contain Chicken
   - Only the word Chicken
   - The number of lines with Chicken
   *Why:* -v inverts the match.

106. **[MCQ]** After echo "monday" > f then echo "tuesday" > f, how many lines does cat f | wc -l print?
   - 2
   - 0
   - ✅ 1
   - 3
   *Why:* The second > overwrote the file.

107. **[MCQ]** Which pattern matches any single character in a filename?
   - *
   - #
   - .
   - ✅ ?
   *Why:* ? matches exactly one character.

108. **[MCQ]** What does the command rm cd ../apple/file.txt do?
   - ✅ Removes a file named cd here and file.txt in the apple folder
   - Changes to ../apple
   - Does nothing: syntax error
   - Removes the apple folder
   *Why:* rm treats every word after it as a file to delete.

109. **[MCQ]** What does cat file1 | wc -l print after echo "monday" > file1 then echo "tuesday" >> file1?
   - 1
   - ✅ 2
   - 0
   - 3
   *Why:* > overwrites, >> appends.

110. **[MCQ]** Which command counts the lines in a file?
   - wc -w
   - sort -n
   - ✅ wc -l
   - uniq -c
   *Why:* wc -l = lines, wc -w = words.

111. **[MCQ]** Which command shows only the lines that appear once, next to each other?
   - uniq -d
   - uniq -c
   - sort -r
   - ✅ uniq -u
   *Why:* -u unique, -d duplicate, -c count.

112. **[MSQ]** Using yum.csv (20 data rows plus a header), which commands correctly count the unique foods?
   - ✅ tail -n +2 yum.csv | cut -d"," -f2 | sort | uniq | wc -l
   - cut -d"," -f2 yum.csv | uniq | wc -l
   - tail -n +2 yum.csv | cut -d"," -f2 | uniq | wc -l
   - ✅ tail -n +2 yum.csv | cut -d"," -f2 | sort -u | wc -l
   - grep -c food yum.csv
   *Why:* The unique count needs sorted input for uniq, or sort -u.

113. **[MSQ]** Which statements about the pipeline tail -n +2 yum.csv | cut -d"," -f2 | sort | uniq -c | sort -n -r | head -n 1 are correct?
   - ✅ It skips the header row.
   - ✅ It prints the most common food with its count.
   - ✅ The first line printed is "3 Sushi".
   - sort -n -r sorts the counts in ascending order.
   - ✅ uniq -c counts the occurrences of adjacent identical lines.
   *Why:* Top-N is a sort, count, sort, head pattern.

114. **[MSQ]** Which commands give the number of lines that contain "Sushi" in yum.csv?
   - ✅ grep "Sushi" yum.csv | wc -l
   - grep -c Sushi yum.csv | wc
   - ✅ cat yum.csv | grep "Sushi" | wc -l
   - wc -l Sushi
   - grep "Sushi" yum.csv
   *Why:* grep selects lines and wc -l counts them.

115. **[MSQ]** Which statements about sort are correct?
   - ✅ By default it sorts alphabetically.
   - ✅ Without -n, "10" sorts before "9".
   - ✅ -n sorts numerically.
   - ✅ -r reverses the order.
   - sort changes the original file.
   *Why:* Use -n whenever the column is numeric.

116. **[MSQ]** A student runs cat yum.csv | cut -d"," -f3 | sort | head -n 1 to find the lowest price. Which statements are correct?
   - ✅ The header word "price" is part of the data being sorted.
   - The command prints 3, the lowest price.
   - ✅ The command prints 10, because sort compares text and "10" comes before "3".
   - ✅ Adding tail -n +2 and sort -n fixes both problems and prints 3.
   - The header sorts first because # comes before the digits.
   *Why:* Skip the header and sort numerically.

117. **[MSQ]** Which are correct about redirection?
   - ✅ > creates the file or overwrites it.
   - ✅ >> appends to the end of the file.
   - ✅ > file.txt on its own empties the file but keeps it.
   - >> deletes the previous contents first.
   - ✅ echo "a" >> f twice leaves two lines.
   *Why:* One arrow overwrites, two arrows append.

118. **[MSQ]** Which commands accept more than one file argument directly?
   - ✅ cat f1 f2
   - ✅ head f1 f2
   - ✅ wc *.log
   - cut f1 f2
   - ✅ grep "error" *.log
   *Why:* cut and uniq take a single input; pipe cat into them.

119. **[MSQ]** Which wildcard statements are correct?
   - ✅ ls *.csv lists all files ending in .csv.
   - ✅ ls s?m? matches four-letter names with s first and m third.
   - ? matches zero or more characters.
   - * matches exactly one character.
   - ✅ ls so* lists names starting with so.
   *Why:* Star is many, question mark is one.

120. **[MSQ]** Which statements about uniq options are correct?
   - ✅ -c prefixes each line with its count.
   - ✅ -d shows only lines that are duplicated.
   - ✅ -u shows only lines that appear once.
   - -n sorts the lines.
   - ✅ All of them work on adjacent lines, so sort first.
   *Why:* uniq works on neighbours.

121. **[MSQ]** In Lab 1, which command correctly lists the foods that cost exactly 5, in alphabetical order?
   - ✅ tail -n +2 yum.csv | grep ",5," | cut -d"," -f2 | sort
   - grep "5" yum.csv | sort
   - cut -d"," -f3 yum.csv | grep 5
   - tail -n +2 yum.csv | cut -d"," -f2 | grep 5
   - sort yum.csv | head -n 5
   *Why:* Match the surrounding commas so that 15 and 50 are not matched.

122. **[Fill]** Using `yum.csv` (with a header row), type a pipeline that counts the unique foods (column 2, comma separated).
   **Answer:** `tail -n +2 yum.csv | cut -d',' -f2 | sort | uniq | wc -l`  or  `tail -n +2 yum.csv | cut -d',' -f2 | sort -u | wc -l`  or  `cat yum.csv | tail -n +2 | cut -d',' -f2 | sort | uniq | wc -l`
   *Note:* Skip the header, cut the column, sort, uniq, count lines.

123. **[Fill]** Type a command that prints the lines of `yum.csv` that contain Sushi, ignoring case.
   **Answer:** `grep -i Sushi yum.csv`  or  `cat yum.csv | grep -i Sushi`
   *Note:* `-i` ignores case.

124. **[Fill]** Type a command that prints the lines of `yum.csv` that do NOT contain Chicken.
   **Answer:** `grep -v Chicken yum.csv`  or  `cat yum.csv | grep -v Chicken`
   *Note:* `-v` inverts the match.

125. **[Fill]** Type a command that prints the lowest price (column 3) of `yum.csv`.
   **Answer:** `tail -n +2 yum.csv | cut -d',' -f3 | sort -n | head -n 1`  or  `tail -n +2 yum.csv | cut -d',' -f3 | sort -n | head -1`
   *Note:* Skip the header, sort numerically, take the first line.

126. **[Fill]** Append the text tuesday to the end of `file1` with a single command.
   **Answer:** `echo tuesday >> file1`
   *Note:* `>>` appends; `>` would overwrite.

127. **[Fill]** Type a command that shows the first 8 lines of `yum.csv`.
   **Answer:** `head -n 8 yum.csv`  or  `head -8 yum.csv`  or  `cat yum.csv | head -n 8`
   *Note:* `-n` sets how many lines.

128. **[Fill]** Type a command that shows the last 8 lines of `yum.csv`.
   **Answer:** `tail -n 8 yum.csv`  or  `tail -8 yum.csv`  or  `cat yum.csv | tail -n 8`
   *Note:* `tail` shows the end.

129. **[Fill]** Type a command that extracts fields 10 and 20 of `data.csv`, using a comma as the delimiter.
   **Answer:** `cut -d, -f10,20 data.csv`  or  `cut -f10,20 -d, data.csv`  or  `cat data.csv | cut -d, -f10,20`
   *Note:* `-d` delimiter, `-f` fields.

130. **[Fill]** Type a command that sorts `names.txt` in reverse order.
   **Answer:** `sort -r names.txt`  or  `cat names.txt | sort -r`
   *Note:* `-r` reverses.

131. **[Fill]** Type a command that sorts `numbers.txt` numerically.
   **Answer:** `sort -n numbers.txt`  or  `cat numbers.txt | sort -n`
   *Note:* `-n` numeric sort.

132. **[Fill]** Type a command that shows only the duplicated consecutive lines of `list.txt`.
   **Answer:** `uniq -d list.txt`  or  `cat list.txt | uniq -d`
   *Note:* `-d` duplicates, `-u` unique.

133. **[Fill]** Type a command that counts the words in `essay.txt`.
   **Answer:** `wc -w essay.txt`  or  `cat essay.txt | wc -w`
   *Note:* `-w` words, `-l` lines.

134. **[Fill]** Type a command that lists all files whose names start with vibe.
   **Answer:** `ls vibe*`
   *Note:* `*` matches any characters.

135. **[Fill]** Type a command that lists all files whose names end with vibe.
   **Answer:** `ls *vibe`
   *Note:* `*` matches any characters.

136. **[Fill]** Type a command that lists files with vibe in the middle and at least one character before and after it.
   **Answer:** `ls ?*vibe*?`  or  `ls *?vibe?*`  or  `ls ?*vibe?*`
   *Note:* `?` is exactly one character; `*` is any number.

137. **[Fill]** Show only the first 3 foods of `yum.csv`: no header, dates, prices or ratings.
   **Answer:** `grep -v #date,food,price,rating yum.csv | head -n 3 | cut -d, -f2`  or  `tail -n +2 yum.csv | head -n 3 | cut -d, -f2`  or  `cat yum.csv | grep -v #date,food,price,rating | head -n 3 | cut -d, -f2`
   *Note:* Drop the header, keep head -n 3, cut column 2.

138. **[Fill]** Show the highest price in `yum.csv`: no date, food or rating.
   **Answer:** `grep -v #date,food,price,rating yum.csv | cut -d, -f3 | sort -n | tail -n 1`  or  `tail -n +2 yum.csv | cut -d, -f3 | sort -n | tail -n 1`  or  `cat yum.csv | grep -v #date,food,price,rating | cut -d, -f3 | sort -n | tail -n 1`
   *Note:* Cut column 3, sort numerically, take the last line.

139. **[Fill]** For each food in `yum.csv`, show how many times it appears.
   **Answer:** `grep -v #date,food,price,rating yum.csv | cut -d, -f2 | sort | uniq -c`  or  `tail -n +2 yum.csv | cut -d, -f2 | sort | uniq -c`  or  `cat yum.csv | grep -v #date,food,price,rating | cut -d, -f2 | sort | uniq -c`
   *Note:* sort must come before uniq -c.

140. **[Fill]** Show the foods that appear exactly once in `yum.csv`.
   **Answer:** `grep -v #date,food,price,rating yum.csv | cut -d, -f2 | sort | uniq -u`  or  `tail -n +2 yum.csv | cut -d, -f2 | sort | uniq -u`  or  `cat yum.csv | grep -v #date,food,price,rating | cut -d, -f2 | sort | uniq -u`
   *Note:* `uniq -u` prints lines that occur once.

141. **[Fill]** After `echo "monday" > file1` then `echo "tuesday" > file1`, what does `cat file1 | wc -l` print?
   **Answer:** `1`
   *Note:* `>` overwrites, so only one line remains.

142. **[Fill]** Command to create files: `___ FILENAME`
   **Answer:** `touch`

143. **[Fill]** Command to display entire file contents: `___ FILENAME`
   **Answer:** `cat`

144. **[Fill]** Command to edit a file: `___ FILENAME`
   **Answer:** `nano`

145. **[Fill]** Command to display some text to the screen: `___ SOME_TEXT`
   **Answer:** `echo`

146. **[Fill]** Command to display the beginning of a file: `___ FILENAME`
   **Answer:** `head`

147. **[Fill]** Command to display the end of a file: `___ FILENAME`
   **Answer:** `tail`

148. **[Fill]** Command to search for lines in a file that match a pattern: `___ PATTERN FILENAME`
   **Answer:** `grep`

149. **[Fill]** Command to sort lines of text in a file or input: `___ FILENAME`
   **Answer:** `sort`

150. **[Fill]** Command to remove duplicate consecutive lines: `___ FILENAME`
   **Answer:** `uniq`

151. **[Fill]** Command to count lines in a file: `___ -l FILENAME`
   **Answer:** `wc`
   *Note:* ### Linux commands: one option

152. **[Fill]** Command to sort lines of text in reverse order: `___ FILENAME`
   **Answer:** `sort -r`

153. **[Fill]** Command to sort lines of text numerically: `___ FILENAME`
   **Answer:** `sort -n`

154. **[Fill]** Command to count the occurrences of unique consecutive lines: `___ FILENAME`
   **Answer:** `uniq -c`

155. **[Fill]** Command to count lines in a file: `___ FILENAME`
   **Answer:** `wc -l`

156. **[Fill]** Command to count words in a file: `___ FILENAME`
   **Answer:** `wc -w`

157. **[Fill]** Command to search for lines in a file that match "bbt", ignoring case: `___ FILENAME`
   **Answer:** `grep -i "bbt"`

158. **[Fill]** Command to search for lines in a file that match "huat ah", ignoring case: `___ FILENAME`
   **Answer:** `grep -i "huat ah"`
   *Note:* the argument must be quoted because it contains a space

159. **[Fill]** Command to search for lines in a file that don't match "bbt": `___ FILENAME`
   **Answer:** `grep -v "bbt"`

160. **[Fill]** Command to extract fields 10 and 20 from a file, using a comma as the delimiter: `___ FILENAME`
   **Answer:** `cut -d"," -f10,20`
   *Note:* the `-d` option is needed; `cut -f10,20` alone is wrong

161. **[Fill]** Command to list all files with filenames starting with `vibe`.
   **Answer:** `ls vibe*`

162. **[Fill]** Command to list all files with filenames ending with `vibe`.
   **Answer:** `ls *vibe`

163. **[Fill]** What is the output of this sequence of commands? `echo "monday" > file1` then `echo "tuesday" >> file1` then `cat file1 | wc -l`
   **Answer:** `2`

164. **[Fill]** What is the output of this sequence of commands? `echo "monday" > file1` then `echo "tuesday" > file1` then `cat file1 | wc -l`
   **Answer:** `1`
   *Note:* `>` overwrites the file

165. **[Short]** What does this command do? `cat yum.csv | grep "Sushi"`
   **Answer:** Searches for rows containing "Sushi" (case sensitive).

166. **[Short]** What does this command do? `cat yum.csv | grep "Sushi" | wc -l`
   **Answer:** Counts how many rows contain "Sushi".

167. **[Short]** What does this command do? `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort`
   **Answer:** Lists all foods in alphabetical order.

168. **[Short]** What does this command do? `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort | uniq`
   **Answer:** Lists foods in alphabetical order, without duplicates.

169. **[Short]** What does this command do? `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort | uniq | wc -l`
   **Answer:** Counts the number of unique foods.

170. **[Short]** What does this command do? `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 4 | sort | uniq | wc -l`
   **Answer:** Counts the number of unique ratings.

171. **[Short]** What does this command do? `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 3 | sort -n | head -n 1`
   **Answer:** Finds the lowest price.

172. **[Short]** What does this command do? `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 2 | sort | uniq -c`
   **Answer:** For each food, shows the number of times it appears on the list.

173. **[Short]** What does this command do? `cat yum.csv | grep -v "#date,food,price,rating" | cut -d, -f 4 | sort | uniq -c`
   **Answer:** For each rating, shows the number of times it appears on the list.

174. **[Short]** What does this command do? `head -n 5 yum.csv`
   **Answer:** Shows the first 5 lines of the file.

175. **[Short]** What does this command do? `tail -n 3 yum.csv`
   **Answer:** Shows the last 3 lines of the file.

176. **[Short]** What does this command do? `head -n 1 yum.csv`
   **Answer:** Shows the first line (the header).

177. **[Short]** What does this command do? `tail -n 1 yum.csv`
   **Answer:** Shows the last line.

178. **[Short]** What does this command do? `cut -d ',' -f 2 yum.csv`
   **Answer:** Extracts the "food" column (2nd column).

179. **[Short]** What does this command do? `cut -d ',' -f 3 yum.csv`
   **Answer:** Extracts the "price" column (3rd column).

180. **[Short]** What does this command do? `cat yum.csv | grep "Nasi Lemak" | wc -l`
   **Answer:** Counts how many rows contain "Nasi Lemak".

181. **[Short]** What does this command do? `grep -i "green" yum.csv`
   **Answer:** Finds lines containing "green" regardless of case.

182. **[Short]** What does this command do? `grep -v "Chicken" yum.csv`
   **Answer:** Shows all lines that do not contain "Chicken".

183. **[Short]** What does this command do? `grep -v "#date,food,price,rating" yum.csv`
   **Answer:** Shows the file contents without the header row.

184. **[Short]** What does this command do? `grep -v "#date,food,price,rating" yum.csv | grep ",5," | cut -d, -f2 | sort`
   **Answer:** Shows all foods that cost exactly 5, sorted alphabetically.

---

## Chapter 4. File Systems, Paths & Permissions

185. **[MCQ]** Which path is absolute?
   - ✅ /home/smith/reports/week1.txt
   - smith/reports/week1.txt
   - ../smith/reports
   - reports/week1.txt
   *Why:* Absolute paths start at the root with /.

186. **[MCQ]** With CWD /home/jones, what does ../smith/reports resolve to?
   - /home/jones/smith/reports
   - ✅ /home/smith/reports
   - /smith/reports
   - /home/jones/reports
   *Why:* .. goes from /home/jones to /home; then smith/reports follows.

187. **[MCQ]** What does chmod u=rw,go= file do?
   - Everyone can read and write it
   - Only the owner can execute it
   - ✅ Only the owner can read and write it
   - It deletes the file
   *Why:* The owner gets read and write; group and world get nothing.

188. **[MCQ]** Which command removes only an empty directory?
   - rm -r
   - rm
   - mv
   - ✅ rmdir
   *Why:* rmdir fails if the directory is not empty.

189. **[MCQ]** You can ls folder ABC but cd ABC says Permission denied. What is missing?
   - ✅ x on the directory
   - r on the directory
   - w on the directory
   - x on the files inside
   *Why:* Directory x means you may enter it.

190. **[MCQ]** What are the three permission categories in Linux?
   - Read, write and execute
   - ✅ Owner, group and world
   - Root, admin and guest
   - User, kernel and shell
   *Why:* Each category has read, write and execute.

191. **[MCQ]** Why can two files share a name without a conflict?
   - Linux randomly renames one
   - File names ignore case
   - ✅ They sit in different directories, so their full paths differ
   - Only the extension counts
   *Why:* The path makes a file unique.

192. **[MCQ]** Does renaming report.txt to report.pdf convert the file?
   - Yes. The OS converts it
   - Yes, but only to PDF
   - It deletes the contents
   - ✅ No. Only the name changes; the contents stay the same
   *Why:* The extension is only a hint.

193. **[MCQ]** After mkdir one .two three, ls shows only one and three. Why?
   - ✅ .two is hidden, so ls needs -a to show it
   - mkdir failed on .two
   - ls hides every third folder
   - .two is a file
   *Why:* Names starting with a dot are hidden.

194. **[MCQ]** What does the root of a Linux directory tree look like?
   - C:\
   - ✅ /
   - ~
   - ..
   *Why:* Linux root is /; Windows uses C:\.

195. **[MSQ]** Which statements about absolute and relative paths are true?
   - ✅ An absolute path begins at the root and starts with /.
   - ✅ A relative path starts from the current working directory.
   - A relative path may start with /.
   - ✅ .. refers to the parent directory.
   - ✅ pwd prints your current absolute path.
   *Why:* Leading slash means absolute.

196. **[MSQ]** The CWD is /home/jones. Which resolutions are correct?
   - ✅ donations → /home/jones/donations
   - ✅ ../smith/reports → /home/smith/reports
   - ✅ ../../dev/ttyE71 → /dev/ttyE71
   - utilities/printall → /utilities/printall
   - ✅ . → /home/jones
   *Why:* Apply each .. one level at a time.

197. **[MSQ]** Which statements about permissions on a directory are correct?
   - ✅ r lets you list its contents.
   - ✅ x lets you enter it with cd.
   - ✅ w lets you create, delete or rename items inside.
   - x lets you edit the files inside.
   - ✅ Without x, cd fails even if you can read the directory.
   *Why:* Directory x is about entering, not editing.

198. **[MSQ]** Which chmod commands make notes.txt readable and writable by the owner only?
   - ✅ chmod u=rw,go= notes.txt
   - chmod u+rw notes.txt
   - chmod u=rw, go= notes.txt
   - ✅ chmod go-rwx notes.txt, if the owner already has rw
   - chmod a+rw notes.txt
   *Why:* Symbolic chmod has no spaces; go- removes group and world rights.

199. **[MSQ]** After cp * ../../bravo/banana/ is run in alpha/mango (fomo.txt, savage.txt), which statements are correct?
   - ✅ The two files are copied into banana.
   - ✅ mango still contains both files.
   - mango is now empty.
   - ✅ rm ../../bravo/banana/fomo.txt removes only the copy.
   - The original names in mango changed.
   *Why:* cp does not remove the original.

200. **[MSQ]** Which statements about file types are correct?
   - ✅ Renaming virus.exe to funny-cat.jpg does not change what the file is.
   - ✅ A .docx is a binary file.
   - Text files are not stored as binary digits.
   - ✅ The extension helps the OS choose a program to open the file.
   - A file can be converted by changing its extension.
   *Why:* Everything is bits; interpretation differs.

201. **[MSQ]** Which statements about PATH are correct?
   - ✅ It is a list of directories searched for executables.
   - ✅ The OS searches them in order and runs the first match.
   - It lists every file on the computer.
   - ✅ If printall is in a PATH directory you can run it by name.
   - It is only used on Windows.
   *Why:* First match in order.

202. **[MSQ]** Which of these are correct about hidden files and ls?
   - ✅ A name starting with . is hidden.
   - ls shows hidden files by default.
   - ✅ ls -a shows hidden files.
   - ✅ After mkdir one .two three, plain ls shows one and three.
   - ls -l hides the permissions.
   *Why:* Dot-names need ls -a.

203. **[MSQ]** Which are reasons execute permission must be granted explicitly?
   - ✅ So that you do not run a malicious downloaded file by accident.
   - ✅ A downloaded script gives Permission denied until chmod u+x.
   - Because Linux cannot run scripts.
   - ✅ chmod +x gives execute to all categories.
   - It is only needed for directories.
   *Why:* Safe by default.

204. **[MSQ]** Which statements about moving around the tree are correct?
   - ✅ cd with no arguments goes to the home directory.
   - ✅ cd - returns to the previous directory.
   - cd . changes to the parent.
   - ✅ tree shows a visual tree from the current folder.
   - ✅ cd .. goes up one level.
   *Why:* Dot is here, dot-dot is up.

205. **[Fill]** Type a command that makes `key.pem` readable and writable by its owner only.
   **Answer:** `chmod u=rw,go= key.pem`  or  `chmod 600 key.pem`  or  `chmod 400 key.pem`
   *Note:* No spaces in `u=rw,go=`.

206. **[Fill]** Type a command that lets the owner execute `script.sh`.
   **Answer:** `chmod u+x script.sh`  or  `chmod +x script.sh`  or  `chmod a+x script.sh`
   *Note:* `+x` adds execute permission.

207. **[Fill]** With CWD `/home/jones`, what absolute path is `../smith/reports`?
   **Answer:** `/home/smith/reports`
   *Note:* `..` goes up to `/home`.

208. **[Fill]** Type the command that deletes the directory `old` together with everything inside it.
   **Answer:** `rm -r old`  or  `rm -r old/`  or  `rm -rf old`
   *Note:* `rmdir` only removes empty directories.

209. **[Fill]** Type the command that prints your current absolute path.
   **Answer:** `pwd`
   *Note:* `pwd` = print working directory.

210. **[Fill]** Type the command that lists the current directory with details.
   **Answer:** `ls -l`
   *Note:* `-l` is the long format.

211. **[Fill]** Type the command that lists the current directory including hidden files.
   **Answer:** `ls -a`
   *Note:* `-a` shows names that start with a dot.

212. **[Fill]** Type a command that gives the owner of `notes.txt` read permission only and group and world no permissions.
   **Answer:** `chmod u=r,go= notes.txt`  or  `chmod u=r,g=,o= notes.txt`  or  `chmod 400 notes.txt`
   *Note:* No spaces in `u=r,go=`.

213. **[Fill]** Type a command that enables execute permission on `run.sh` for owner, group and world.
   **Answer:** `chmod +x run.sh`  or  `chmod a+x run.sh`  or  `chmod ugo+x run.sh`
   *Note:* `+x` adds execute.

214. **[Fill]** Type a command that removes write permission from group and world on the folder `shared`.
   **Answer:** `chmod go-w shared`
   *Note:* `go-w` removes write for group and world.

215. **[Fill]** What is the Linux root directory written as?
   **Answer:** `/`  or  `slash`
   *Note:* Windows uses C:\; Linux uses /.

216. **[Fill]** Which permission on a directory is needed to cd into it?
   **Answer:** `execute`  or  `x`
   *Note:* Execute on a directory means "enter".

217. **[Fill]** Command to enable execute permissions on a file for owner, group and world: `___ FILENAME`
   **Answer:** `chmod +x`
   *Note:* ### Linux commands: option and argument

218. **[Fill]** Command to enable read permission for the owner only, with no write/execute for the owner and no permissions for group and world. Use the format `COMMAND X=Y,AB=`
   **Answer:** `chmod u=r,go=`
   *Note:* ### Linux commands: wildcards and output

219. **[Short]** Why do operating systems organize files into directories?
   **Answer:** Directories group and organize files logically for easier management.

220. **[Short]** What does it mean that filenames are case sensitive in Linux?
   **Answer:** `data.txt` and `Data.txt` are different, separate files.

221. **[Short]** What is the main difference between text files and binary files?
   **Answer:** Text files are human-readable; binary files are not and need special programs to interpret.

222. **[Short]** Why is all data ultimately stored as binary?
   **Answer:** Computers use bits to represent and store all types of data.

223. **[Short]** Why is a Word document considered a binary file?
   **Answer:** It stores text plus formatting and style information that isn't readable as plain text.

224. **[Short]** What is a file extension used for?
   **Answer:** It indicates the file type and helps the OS know how to open it.

225. **[Short]** Does changing a file's extension change its contents?
   **Answer:** No. Changing any part of the filename does not change the file's contents.

226. **[Short]** What might happen if you open a file with the wrong extension?
   **Answer:** You might get an error because the program expects a specific file format.

227. **[Short]** Why can't you just rename a file's extension to convert it to another type?
   **Answer:** Renaming doesn't change the internal data format, so programs fail when opening it.

228. **[Short]** What is one risk of hiding file extensions on a computer?
   **Answer:** Users may open malicious files disguised with misleading names.

229. **[Short]** Why is file protection important on shared computers?
   **Answer:** It prevents unauthorized users from accessing or modifying other users' files.

230. **[Short]** What does it mean if you have 'write' permission on a file?
   **Answer:** You can modify the file.

231. **[Fill]** Linux command to grant executable permission on a file to the file owner.
   **Answer:** `chmod u+x FILENAME`

232. **[Short]** Why must files in Linux be explicitly given executable permissions?
   **Answer:** So that users don't accidentally execute malicious files.

233. **[Short]** If a file is world-readable but not writable, what can any user do with it?
   **Answer:** View (read) it, but not modify it.

234. **[Short]** What could happen if you accidentally give executable permission to a harmful file?
   **Answer:** You could run malicious code that damages or takes over your system.

235. **[Short]** What are the risks of giving 'World' users read and write permissions on sensitive files?
   **Answer:** Unauthorized modification or deletion, and risk of data breaches or loss.

236. **[Short]** For a data file, how should permissions be set so group members can read but not modify it?
   **Answer:** Enable read and disable write and execute for the group.

237. **[Short]** How can file protection help prevent accidental file deletion in a shared environment?
   **Answer:** By restricting write permissions, only authorized users can modify or delete critical files.

238. **[Short]** Why is understanding file permissions critical when managing group projects?
   **Answer:** Correct permissions ensure only authorized team members can modify shared project files.

239. **[Short]** How can mismanaging directory permissions cause security risks?
   **Answer:** It can allow others to access or modify private or sensitive data.

240. **[Short]** How do directories support better file protection?
   **Answer:** Directories can group sensitive files and set permissions on the whole group.

241. **[Short]** What is a directory?
   **Answer:** A directory (folder) is a collection of files organized together.

242. **[Short]** What is the difference between the root directory notation in Windows and Linux?
   **Answer:** Windows uses `C:\`; Linux uses `/`.

243. **[Short]** Using the analogy of a real tree, what are the root, branches, and leaves of a filesystem tree?
   **Answer:** Root is `/`, branches are directories, leaves are individual files.

244. **[Short]** What is the key visible difference between an absolute and a relative path?
   **Answer:** Absolute paths always start with `/`; relative paths do not.

245. **[Short]** How does the current working directory affect relative paths?
   **Answer:** Relative paths are interpreted starting from wherever the current working directory is.

246. **[Short]** What is the benefit of using a directory tree instead of keeping all files in one folder?
   **Answer:** It organizes files logically and allows the same filename to be reused in different subdirectories.

247. **[Short]** Why must you be careful when deleting a directory?
   **Answer:** Deleting a directory typically deletes all files and subdirectories inside it.

248. **[Short]** Why is it dangerous to mistype a filename in Linux?
   **Answer:** Filenames are case sensitive, so a typo can make you act on the wrong file.

249. **[Short]** The file `/tmp/running/i-am-running.sh` has executable permissions for owner, group, and world. How do we ensure that typing `i-am-running.sh` runs it from any working directory?
   **Answer:** Add the folder `/tmp/running` to the PATH variable.

250. **[Short]** You run `./this-is-running.sh` in the current directory but get "Permission denied". What is the likely fix?
   **Answer:** `chmod u+x this-is-running.sh`

251. **[Short]** Your teammate can `ls` the shared file `report.docx` but gets "Permission denied" when opening it. What is missing?
   **Answer:** Read permission for Group (if the teammate is in the file's group) or for World (if not).

252. **[Short]** You can see a folder `ABC` with `ls`, but `cd` into it gives "Permission denied". Which permission is missing?
   **Answer:** Execute permission on the directory.

253. **[Short]** `cd projects/old` gives "No such file or directory". What should you check first?
   **Answer:** Whether `projects/old` exists and whether the spelling is correct (case-sensitive).

254. **[Short]** Every time you put files into a folder, they disappear after a reboot. Using the course content, what could be a possible cause? (requires inference)
   **Answer:** The folder may be stored in RAM. Files in storage survive a reboot, but anything in RAM is lost when power is cut.

255. **[Short]** What makes binary files less user-friendly than text files?
   **Answer:** They need specific software to read or edit, whereas humans can read text files directly. ### Command pipelines on `yum.csv` Header row of the file: `#date,food,price,rating`

---

## Chapter 5. Computer Networks & Addressing

256. **[MCQ]** What does an IP address identify?
   - The process
   - ✅ The computer
   - The website name
   - The file
   *Why:* IP identifies the computer; the port identifies the process on it.

257. **[MCQ]** Which port does HTTPS use by default?
   - 80
   - 22
   - ✅ 443
   - 8000
   *Why:* HTTPS is 443, HTTP 80, SSH 22.

258. **[MCQ]** nmap reports a port as "filtered". What does that mean?
   - The server is running and listening
   - The host answered that nothing is listening
   - The host does not exist
   - ✅ A firewall hides the true state
   *Why:* Filtered means the probe is blocked, so the state is unknown.

259. **[MCQ]** What does DNS do?
   - ✅ Resolves hostnames to IP addresses
   - Splits messages into packets
   - Assigns private IPs to devices
   - Encrypts web traffic
   *Why:* DNS is the phone book for names.

260. **[MCQ]** Why can packets of one message arrive out of order?
   - The receiver reorders them badly
   - ✅ They can take different routes
   - Routers delete the number from each packet
   - IPv6 reverses them
   *Why:* Independent routing means arrival order can differ.

261. **[MCQ]** What does the term "bandwidth" commonly refer to?
   - The number of devices on a LAN
   - The thickness of a cable
   - ✅ The data transfer rate of a network
   - How much data a network stores
   *Why:* How fast data can be transferred.

262. **[MCQ]** A protocol in networking defines ...
   - the strength of the signal
   - the number of hosts
   - the size of the cable
   - ✅ the rules for formatting and processing data
   *Why:* Protocols are agreed rules.

263. **[MCQ]** What defines a LAN?
   - ✅ A network in a small geographic area such as a building
   - A network over a whole country
   - A network that is only wireless
   - A network using local technology only
   *Why:* LAN = small area; WAN = large distances.

264. **[MCQ]** Which network type connects several LANs over a large geographic distance?
   - LAN
   - ✅ WAN
   - PAN
   - WLAN
   *Why:* WAN = wide area network.

265. **[MCQ]** What is the purpose of a router in a LAN?
   - To monitor user activity
   - To manage HTML data
   - ✅ To act as a gateway between the LAN and the WAN
   - To encrypt all traffic
   *Why:* Routers forward packets between networks.

266. **[MCQ]** A router receives a packet. What does it know about the packet's journey?
   - The whole route from source to destination
   - Every route for all packets at once
   - It needs a human to choose
   - ✅ The best next step toward the destination
   *Why:* Each router picks the next hop.

267. **[MCQ]** In packet switching, a route is blocked by heavy traffic. What happens?
   - ✅ A router finds an alternative route
   - The router waits until it clears
   - Packets return to the sender
   - The transmission fails
   *Why:* This is why packets can arrive out of order.

268. **[MCQ]** What is a top-level domain?
   - The first section, like www
   - ✅ The final section of a domain name, such as .com
   - The hostname
   - A local IP address
   *Why:* TLD = last label, such as .com or .sg.

269. **[MCQ]** Which organisation is responsible for managing top-level domains?
   - IETF
   - W3C
   - ✅ ICANN
   - IEEE
   *Why:* ICANN manages TLDs.

270. **[MCQ]** The default ports for SSH, HTTP and HTTPS are, in that order ...
   - 443, 80, 22
   - 80, 443, 22
   - 22, 443, 80
   - ✅ 22, 80, 443
   *Why:* SSH 22, HTTP 80, HTTPS 443.

271. **[MCQ]** What does a hostname typically consist of?
   - ✅ A computer name and a domain name
   - An IP address and a port
   - A username and a password
   - A protocol and a server
   *Why:* e.g. node7.cluster.spider.net.

272. **[MCQ]** ping ex.com complains about a failure in "name resolution". What is the most likely cause?
   - ping is broken
   - ✅ The domain ex.com does not exist
   - The web server on ex.com is stopped
   - ex.com does not answer pings
   *Why:* Name resolution is the DNS lookup step.

273. **[MCQ]** What can ping ex.com tell you?
   - With 100% certainty whether your Internet works
   - With certainty whether the machine exists
   - ✅ The round trip time and the IP address of ex.com
   - Which ports are open
   *Why:* ping shows time and the resolved IP.

274. **[MCQ]** Which of these best describes the client/server model?
   - Devices share bandwidth equally
   - A server requests data from a client
   - Data flows randomly between nodes
   - ✅ A client requests a service and a server responds

275. **[MCQ]** In a packet-switched network, what happens if a route is blocked due to heavy traffic?
   - ✅ Router finds an alternative route
   - Router waits for route to clear
   - Packets are sent back to the sender
   - Transmission fails

276. **[MCQ]** When a router directs packets, what is it expected to know about the packet's entire course from source to destination?
   - The entire course for all packets simultaneously
   - ✅ The next step to get the packet closer to its destination
   - The exact route the packet will take
   - What human intervention is required to determine the next step

277. **[MCQ]** Which of the following is a loopback address?
   - 192.168.1.1
   - 255.255.255.0
   - ✅ 127.0.0.1
   - 10.0.0.1

278. **[MCQ]** What is a loopback address?
   - A temporary IP address assigned by a DHCP server
   - An IP address used exclusively for public websites
   - An IP address that routes traffic to a remote server
   - ✅ An IP address that routes traffic back to the same device

279. **[MCQ]** Which of the following is an example of a hostname?
   - ✅ matisse.csc.villanova.edu
   - 255.255.255.0
   - 127.0.0.1
   - 192.168.0.10

280. **[MCQ]** In the hostname `lab1.network.school.edu`, what is the top-level domain (TLD)?
   - school
   - ✅ edu
   - network
   - lab1

281. **[MCQ]** What is the primary function of the Domain Name System (DNS)?
   - To remember which domain names are available for sale
   - To provide physical connections between networks
   - ✅ To translate hostnames into numeric IP addresses
   - To manage email accounts

282. **[MSQ]** Which statements about packet switching are correct?
   - ✅ Messages are split into numbered packets.
   - ✅ Packets may take different routes.
   - Packets always arrive in order.
   - ✅ The receiver reassembles the packets.
   - Routers know the full path from sender to receiver.
   *Why:* Independent routes, reassembly at the end.

283. **[MSQ]** Which four items does each packet carry?
   - ✅ Destination IP address.
   - ✅ Destination port number.
   - ✅ Source IP address.
   - ✅ Source port number.
   - The user name of the sender.
   *Why:* IPs identify computers; ports identify processes.

284. **[MSQ]** Which statements about IP addresses are correct?
   - ✅ IPv4 has 32 bits, about 4.3 billion addresses.
   - ✅ IPv6 has 128 bits.
   - ✅ IPv6 works in parallel with IPv4.
   - 127.0.0.1 leaves the device through the router.
   - ✅ A hostname is the human-readable form of an address.
   *Why:* Loopback never leaves the device.

285. **[MSQ]** Which statements about port numbers are correct?
   - ✅ A port identifies the process that should receive the data.
   - ✅ Two processes on the same computer cannot share a port.
   - ✅ To run two web servers on one computer, give them different ports.
   - HTTP defaults to 443.
   - ✅ SSH defaults to 22.
   *Why:* Ports are the second half of the address.

286. **[MSQ]** Which statements about DNS are correct?
   - ✅ It translates hostnames to IP addresses.
   - ✅ The browser first asks the default DNS server, often on the router.
   - ✅ Without DNS we would need to memorise IP addresses.
   - In node7.cluster.spider.net, the TLD is node7.
   - ✅ DNS is a distributed system.
   *Why:* TLD is the last label.

287. **[MSQ]** Which statements about ping are correct?
   - ✅ A reply shows the host is reachable and gives round-trip time.
   - A timeout proves the host is down.
   - ✅ A name-resolution failure points to a DNS problem.
   - ping tells you whether a port is open.
   - ✅ Ping failure is inconclusive.
   *Why:* No reply does not prove the host is down.

288. **[MSQ]** A website will not load. Which diagnosis steps are in a sensible order?
   - ✅ ping 1.1.1.1 to test local connectivity.
   - ✅ dig +short example.com to test DNS.
   - ✅ nmap example.com -p 443 to check the port.
   - nmap first, then replace the router.
   - ✅ filtered suggests a firewall or security group is blocking.
   *Why:* Connectivity, then DNS, then port.

289. **[MSQ]** Which statements distinguish closed from filtered?
   - ✅ Closed: the host answers and no application listens on that port.
   - ✅ Filtered: a firewall blocks the probe, so the state is unknown.
   - Closed and filtered mean the same.
   - ✅ Open: an application is listening.
   - Filtered always means the server is down.
   *Why:* Closed answers; filtered hides.

290. **[MSQ]** Which statements about types of networks are correct?
   - ✅ A LAN covers a small area such as a home or office.
   - ✅ A WAN connects LANs over a large distance.
   - ✅ The Internet is a WAN that spans the planet.
   - ✅ A gateway handles communication between a LAN and other networks.
   - Wireless networks are immune to interference.
   *Why:* Wireless is flexible but exposed.

291. **[MSQ]** A client in a client-server exchange ...
   - ✅ initiates a request.
   - ✅ receives a response from a server.
   - is always listening for incoming requests.
   - ✅ can be a browser.
   - must be on the same LAN as the server.
   *Why:* Servers listen; clients ask.

292. **[MSQ]** Which of these pieces of info must a data packet include?
   - ✅ Destination IP address
   - ✅ Destination port number
   - HTML tag
   - Web page
   - Hyperlink

293. **[MSQ]** Which IP address ranges are private?
   - ✅ 10.1.x.x
   - 8.8.x.x
   - ✅ 192.168.x.x
   - 192.16.x.x

294. **[Fill]** Which port number does HTTPS use by default?
   **Answer:** `443`
   *Note:* HTTP is 80, SSH is 22.

295. **[Fill]** Which port number does SSH use by default?
   **Answer:** `22`
   *Note:* SSH is 22.

296. **[Fill]** What is port 443 used for? (one word: the protocol)
   **Answer:** `https`
   *Note:* HTTPS web traffic.

297. **[Fill]** Type the command that tests whether the host `gov.sg` is reachable and shows the round-trip time.
   **Answer:** `ping gov.sg`
   *Note:* `ping` tests reachability.

298. **[Fill]** Type a command that looks up the IP address of `shopee.sg` using `dig`, short form.
   **Answer:** `dig +short shopee.sg`
   *Note:* `+short` prints only the answer.

299. **[Fill]** Type a command that checks the state of port 443 on `example.com`.
   **Answer:** `nmap example.com -p 443`  or  `nmap -p 443 example.com`
   *Note:* The state is open, closed or filtered.

300. **[Fill]** What is the hostname equivalent of 127.0.0.1?
   **Answer:** `localhost`
   *Note:* The loopback address.

301. **[Fill]** In the hostname node7.cluster.spider.net, what is the computer name?
   **Answer:** `node7`
   *Note:* The first label.

302. **[Fill]** In cute.labubu.flushie.biz, what is the top-level domain? (include the dot)
   **Answer:** `.biz`  or  `biz`
   *Note:* The last label.

303. **[Fill]** What is a port number used to identify?
   **Answer:** `a process`  or  `process`
   *Note:* A port picks the process on a computer.

304. **[Fill]** Which protocol uses port 22 by default?
   **Answer:** `ssh`
   *Note:* SSH = secure remote access.

305. **[Fill]** Which port does HTTP use by default?
   **Answer:** `80`
   *Note:* HTTP 80, HTTPS 443.

306. **[Fill]** In a typical home network, the default nameserver runs on the home network's ___.
   **Answer:** `router`
   *Note:* The home router.

307. **[Fill]** When nmap says a port is ___, an application is listening on it.
   **Answer:** `open`
   *Note:* open / closed / filtered.

308. **[Fill]** When nmap says a port is ___, it cannot tell whether it is open or closed.
   **Answer:** `filtered`
   *Note:* Often a firewall.

309. **[Fill]** When nmap says a port is ___, no application is listening on it.
   **Answer:** `closed`
   *Note:* The host replied: nothing there.

310. **[Fill]** Type a command that resolves `x.com` with the nameserver 1.1.1.1 and a short answer.
   **Answer:** `dig +short x.com @1.1.1.1`  or  `dig +short @1.1.1.1 x.com`  or  `dig @1.1.1.1 +short x.com`
   *Note:* `@server` picks the nameserver.

311. **[Fill]** Type a command that resolves `x.com` with the default nameserver and a short answer.
   **Answer:** `dig +short x.com`  or  `dig x.com +short`
   *Note:* Default nameserver: no @.

312. **[Fill]** Type a command that tests whether `smoo.com` has a process listening on port 443.
   **Answer:** `nmap smoo.com -p 443`  or  `nmap -p 443 smoo.com`
   *Note:* nmap tests port state.

313. **[Fill]** In one sentence: what happens to a message in packet switching?
   **Answer:** `It is broken into packets that are sent separately and reassembled at the destination.`
   *Note:* Packets can take different routes.

314. **[Fill]** In the hostname `cute.labubu.flushie.biz`, the Top-Level Domain (TLD) is ____
   **Answer:** `.biz`

315. **[Fill]** Command for finding out the round trip time to a host.
   **Answer:** `ping`
   *Note:* the round trip time appears as `time=` in the output

316. **[Fill]** When nmap says a port is ____, it means an application is listening for connections on that port.
   **Answer:** `open`

317. **[Fill]** When nmap says a port is ____, it means no application is listening for connections on that port.
   **Answer:** `closed`

318. **[Short]** How do `ping`, `dig`, and `nmap` each provide different information about network connectivity?
   **Answer:** `ping` checks if a host is reachable. `dig` checks a domain's IP address. `nmap` checks which services and ports are open on a host.

319. **[Short]** If nmap shows port 80 as open, what does that indicate?
   **Answer:** The host is running a server process on port 80.

320. **[Short]** When a hostname cannot be resolved, what likely went wrong in the DNS process?
   **Answer:** All the DNS servers involved failed to find an IP address for the hostname, or the request expired due to time limits. ### Web: HTML, CSS, HTTP

321. **[Short]** When a router receives packets from different sources, how does it decide where to send each one?
   **Answer:** It forwards the packet based on its knowledge of the best next step toward the packet's destination.

322. **[Short]** Does a router know in advance exactly which route a packet will take?
   **Answer:** No. It only knows the best next step, not the entire path.

323. **[Short]** Explain the client/server model using a web browser connecting to a web server.
   **Answer:** The browser (client) sends a request, and the web server responds by delivering the requested page.

324. **[Short]** Compare LANs and WANs in geographic coverage and typical use.
   **Answer:** LANs cover small areas like a room or building; WANs connect multiple LANs over large distances.

325. **[Short]** What might a router do when there is a downed path in the network?
   **Answer:** Reroute packets via an alternative path.

326. **[Short]** What are the main security challenges wireless networks face compared to wired networks?
   **Answer:** Wireless networks are more vulnerable to interference and unauthorized access because of their broadcast nature.

327. **[Short]** What if we did not have DNS?
   **Answer:** Users would have to remember numerical IP addresses instead of easy hostnames, making Internet use impractical.

328. **[Short]** Give an analogy for packet switching.
   **Answer:** Sending a long letter in separate envelopes by different routes, then reassembling it at the destination.

329. **[Short]** Explain the roles of IP addresses and port numbers.
   **Answer:** An IP address gets data to the right computer; a port number directs the data to the correct process on that computer.

330. **[Short]** Why would a developer test a draft website on localhost or 127.0.0.1?
   **Answer:** The loopback address keeps the site private and secure during development, before launching.

331. **[Short]** Why does 127.0.0.1 still work when your device is in airplane mode?
   **Answer:** It is a loopback address that routes traffic internally within your device and needs no external network.

332. **[Short]** How is a port number similar to a mailbox?
   **Answer:** It ensures messages are delivered to the intended recipient process.

333. **[Short]** What might happen if two processes tried to use the same port number?
   **Answer:** They would clash, causing errors or failed connections.

334. **[Short]** Which protocol typically uses port 22 for secure remote access?
   **Answer:** SSH.

335. **[Short]** What is the TLD in `www.smu.edu.sg`, and what does it represent?
   **Answer:** `.sg`, the country code for Singapore.

336. **[Short]** What is the difference between the Internet and the World Wide Web?
   **Answer:** The Internet is the physical network infrastructure connecting computers. The Web is information and software distributed over many computers that uses networks like the Internet to exchange data. ### Web concepts

---

## Chapter 6. The Web, HTML & HTTP

337. **[MCQ]** Which statement correctly relates the Internet and the Web?
   - They are the same thing
   - The Internet runs on top of the Web
   - ✅ The Web is an application that runs on top of the Internet
   - The Web is the cables
   *Why:* Infrastructure first, then the Web on top.

338. **[MCQ]** A web page has 5 images. How many HTTP requests does loading it need?
   - 5
   - 1
   - 10
   - ✅ 6
   *Why:* One for the HTML plus five for the images.

339. **[MCQ]** In https://www.example.com:443/path/page.html?k=v#top, which part is the host?
   - ✅ www.example.com
   - https
   - 443
   - /path/page.html
   *Why:* The host names the server to contact.

340. **[MCQ]** What does python -m http.server serve by default?
   - The home directory, on port 80
   - ✅ The current directory, on port 8000
   - The root /, on port 443
   - Nothing until configured
   *Why:* The current directory becomes the web root on port 8000.

341. **[MCQ]** What does CSS control?
   - What the content is
   - How the page is fetched
   - ✅ How content looks
   - The IP address of the server
   *Why:* HTML says what; CSS says how it looks.

342. **[MCQ]** What is the main function of HTML?
   - Optimising search results
   - Securing online transactions
   - Hosting databases
   - ✅ Defining the structure and elements of a web page
   *Why:* HTML says what each piece of content is.

343. **[MCQ]** A page references extra images. How are they fetched?
   - ✅ The client sends a separate HTTP request for each object after getting the base HTML
   - They are embedded in the HTML file
   - The server pushes them automatically
   - The browser caches them in advance
   *Why:* One request for the HTML, then one per object.

344. **[MCQ]** An HTTP server is started. From which folder does it serve files?
   - The Downloads folder
   - ✅ The web root folder
   - The home folder
   - The Documents folder
   *Why:* Only the web root is served.

345. **[MCQ]** What is source HTML?
   - The rendered output of the page
   - A DNS response
   - ✅ The raw HTML text received by the browser
   - The IP address of the host
   *Why:* Source is code; rendered is the displayed page.

346. **[MCQ]** Why is HTTPS preferred over HTTP?
   - It uses less bandwidth
   - It renders pages faster
   - It supports older tags
   - ✅ It encrypts the data between client and server
   *Why:* Encryption gives privacy and security.

347. **[MCQ]** What is the main risk if a server shares the wrong folder?
   - ✅ Accidental exposure of private files
   - Too many HTML elements
   - Reduced image quality
   - Slow connections
   *Why:* Choose the web root carefully.

348. **[MCQ]** Which of these URLs reach a server running on your own computer?
   - http://myserver and http://remotehost
   - ✅ http://localhost and http://127.0.0.1
   - http://localhost only
   - http://127.0.0.1 only
   *Why:* localhost = 127.0.0.1.

349. **[MCQ]** What is the "hostname" part of a URL related to?
   - The specific page requested
   - The type of browser
   - ✅ The computer on which the information is stored
   - The server process identifier
   *Why:* The hostname says which machine to contact.

350. **[MCQ]** What is a web server?
   - A specialised browser
   - A tool for designing pages
   - A device connecting a computer to the Internet
   - ✅ A program that answers HTTP requests and serves content
   *Why:* It listens and responds.

351. **[MCQ]** What does CSS indicate for a web page?
   - ✅ How information should be displayed (style, font, colour)
   - What the information is
   - Server-side logic
   - Data transfer between client and server
   *Why:* HTML = structure, CSS = looks.

352. **[MCQ]** Which describes the relationship between the Internet and the Web?
   - They are the same thing
   - ✅ The Web is a system built on top of the Internet
   - The Internet runs on top of the Web
   - The Web is a cable network
   *Why:* The Internet is the infrastructure.

353. **[MCQ]** Linux accepts file.txt as a filename: true or false?
   - ✅ True
   - False
   *Why:* Dots are allowed; slashes are not.

354. **[MCQ]** What is the main role of Cascading Style Sheets (CSS) in web design?
   - To define what the information is (e.g., a paragraph, an image, some text)
   - To manage server-side logic and databases
   - To handle data transfer between client and server
   - ✅ To indicate how information should be displayed (e.g., style, font, background color)

355. **[MCQ]** When an HTTP client requests a web page that references additional objects (like images or videos), how are these objects typically handled?
   - ✅ The client sends separate HTTP requests for each referenced object after receiving the base HTML file
   - The client caches all possible images beforehand
   - The server automatically pushes all objects to the client without a request
   - They are embedded directly within the base HTML file and downloaded in one go

356. **[MCQ]** When an HTTP server process is started, from which folder does it retrieve the content it serves to clients?
   - The Documents folder
   - ✅ The web root folder
   - The Downloads folder
   - The home folder

357. **[MCQ]** What does the `<a>` tag define?
   - A list of items
   - A CSS definition
   - ✅ A hyperlink to another resource
   - An image

358. **[MCQ]** Which of the following best describes an object in a web page?
   - A data packet
   - The main HTML document
   - The user profile
   - ✅ A referenced file like an image or script

359. **[MCQ]** Why might a web developer use `https://localhost`?
   - ✅ To test their site on their own computer
   - To access social media
   - To publish to the public
   - To send emails to themselves

360. **[MCQ]** A website is defined as:
   - A single HTML page
   - ✅ A collection of related web pages, usually from the same source
   - A list of online resources
   - A server dedicated to hosting files

361. **[MCQ]** In an HTML document, what is the purpose of the `<head>` section?
   - Link CSS and JS files only
   - Contain the content of the page
   - ✅ Provide information about the document, such as its title
   - Display images and videos

362. **[MSQ]** Which statements about the Internet and the World Wide Web are correct?
   - ✅ The Internet is the physical network infrastructure.
   - ✅ The Web is an application system on top of the Internet.
   - ✅ A search engine is a website that helps find other websites.
   - A browser is a web server.
   - ✅ A website is a collection of related web pages.
   *Why:* Web pages, sites, browsers and servers are Web concepts.

363. **[MSQ]** Which statements about HTML and CSS are correct?
   - ✅ HTML defines structure and content.
   - ✅ CSS controls how content looks.
   - The browser honours every extra blank line you type in HTML.
   - ✅ Tags are written in angle brackets.
   - ✅ Improperly nested tags can give unpredictable rendering.
   *Why:* Content and look are separate concerns.

364. **[MSQ]** A page references 3 images, 1 stylesheet and 1 script. Which statements are correct?
   - ✅ The browser first receives the base HTML.
   - ✅ The page needs 6 HTTP requests in total.
   - Only 1 request is needed because the HTML includes the images.
   - ✅ Each secondary file gets its own request.
   - ✅ A missing image file returns an HTTP error such as 404.
   *Why:* n + 1 generalises to every referenced object.

365. **[MSQ]** Which statements about HTTP are correct?
   - ✅ It is a request and response protocol between client and server.
   - ✅ A browser or httpie can be the HTTP client.
   - HTTP encrypts traffic by default.
   - ✅ HTTPS gives confidentiality and integrity.
   - ✅ The server waits for requests and sends back resources.
   *Why:* Plain HTTP is readable on the wire.

366. **[MSQ]** For http://localhost:8000/animals/cat/../.. with web root public_html, which statements are correct?
   - ✅ .. goes up one directory.
   - ✅ The URL resolves to public_html itself.
   - ✅ It serves index.html if that file exists.
   - It gives a 404 because .. is not allowed.
   - ✅ If there is no index.html, a directory listing is shown.
   *Why:* URL paths work like file paths.

367. **[MSQ]** Which statements about the parts of a URL are correct?
   - ✅ The scheme says how the resource is accessed, such as http or https.
   - ✅ The host tells the client which server to contact.
   - ✅ If the port is omitted, http uses 80 and https uses 443.
   - The anchor starts with ? and ends with &.
   - ✅ The query holds key-value pairs, first after ? then separated by &.
   *Why:* scheme://host:port/path?query#anchor.

368. **[MSQ]** A student sets the web root of a server to their home folder. Which statements are justified?
   - ✅ Private files such as keys and configs could be exposed.
   - ✅ On a LAN, everyone on the LAN could access the files.
   - It is safe because only the owner knows the port.
   - ✅ A dedicated folder with no confidential files is a better web root.
   - ✅ Testing on localhost first exposes no unfinished work.
   *Why:* Choose the web root carefully.

369. **[MSQ]** Which statements about httpie and browsers are correct?
   - ✅ httpie shows the source HTML.
   - ✅ A browser shows the rendered page.
   - ✅ http --print b shows the body only.
   - http --print H shows the body only.
   - ✅ Right-click View Source shows the raw HTML in a browser.
   *Why:* Source and rendered pages differ.

370. **[MSQ]** Server on port 8000 is running. Which statements about nmap and the browser are correct?
   - ✅ nmap localhost -p 8000 shows open.
   - ✅ After Ctrl-C stops the server, nmap shows closed.
   - ✅ After the server stops, the browser cannot connect.
   - nmap shows filtered while the server runs on localhost.
   - ✅ A second server needs a different port, such as 9000.
   *Why:* Open while running, closed after stopping.

371. **[MSQ]** Which statements about the web server and the web root are correct?
   - ✅ A web server binds a port and serves files from the web root.
   - ✅ A URL path is mapped to a file path under the web root.
   - ✅ Two servers on 8000 and 9000 can show different content.
   - The URL scheme names the folder to serve.
   - localhost:8000 and localhost:8888 reach the same server.
   *Why:* Port, root and path decide what you see.

372. **[MSQ]** What URL(s) can clients running on the same computer that hosts the HTTP server use to access their own HTTP server?
   - http://myserver
   - http://remotehost
   - ✅ http://localhost
   - ✅ http://127.0.0.1

373. **[Fill]** Type the command that starts a local web server on port 8000 serving the current directory.
   **Answer:** `python -m http.server`  or  `python3 -m http.server`  or  `python -m http.server 8000`
   *Note:* The default port is 8000.

374. **[Fill]** In `https://www.example.com/page.html#top`, what is `#top` called?
   **Answer:** `anchor`  or  `fragment`
   *Note:* The anchor (fragment) points to a place in the page.

375. **[Fill]** Which HTML tag creates a hyperlink? Type the tag.
   **Answer:** `<a>`  or  `a`  or  `<a href>`
   *Note:* The anchor tag `<a href="…">`.

376. **[Fill]** For a client to connect to a server it must know the server's IP address and its ___ number.
   **Answer:** `port`
   *Note:* The port picks the process.

377. **[Fill]** Type a command that shows only the HTTP response body of `https://x.com` using httpie.
   **Answer:** `http --print b https://x.com`  or  `http --print=b https://x.com`  or  `http -b https://x.com`
   *Note:* `--print b` prints the body only.

378. **[Fill]** Which HTML element inserts a line break? Type the tag.
   **Answer:** `<br>`  or  `<br/>`  or  `<br />`
   *Note:* `<br>` is the line break.

379. **[Fill]** Which HTML element is used for bold emphasis by default? Type the tag.
   **Answer:** `<b>`  or  `<strong>`  or  `b`
   *Note:* `<b>` or `<strong>`.

380. **[Fill]** Which HTML section holds information about the document, such as its title? Type the tag.
   **Answer:** `<head>`  or  `head`
   *Note:* `<head>` metadata; `<body>` content.

381. **[Fill]** A page references three images. How many files does the browser download in total?
   **Answer:** `4`  or  `four`
   *Note:* The HTML plus three images.

382. **[Fill]** What do we call the folder a web server serves files from?
   **Answer:** `web root`  or  `the web root`  or  `webroot`
   *Note:* Only that folder is public.

383. **[Fill]** Type a single letter that is allowed in a Linux filename.
   **Answer:** (keyword-checked)
   *Note:* Letters and digits are allowed.

384. **[Short]** When you type `www.villanova.edu/academics.html` into a browser, what role does the web server play?
   **Answer:** It receives the request, retrieves the requested page, and sends it back to the browser.

385. **[Short]** What is the purpose of a web browser when accessing a web page?
   **Answer:** It sends a request for a page to a server and displays the page when it receives the response.

386. **[Short]** Why might multiple files be downloaded when visiting a website?
   **Answer:** Besides the base HTML file, a page references objects like images, videos, or scripts that must also be downloaded.

387. **[Short]** Explain the function of the `href` attribute in an HTML anchor tag.
   **Answer:** It specifies the destination URL of the hyperlink.

388. **[Short]** Compare how HTML and CSS work together to create a web page.
   **Answer:** HTML defines structure and content; CSS defines appearance and layout.

389. **[Short]** Why might improperly nested HTML tags make a page look strange?
   **Answer:** Browsers interpret malformed HTML unpredictably, causing formatting errors and visual quirks.

390. **[Short]** What's the role of HTTP when accessing a web page?
   **Answer:** HTTP is the protocol governing the request and delivery of web documents between browser (client) and web server.

391. **[Short]** What's the difference between source HTML and rendered HTML?
   **Answer:** Source HTML is the raw code received from the server; rendered HTML is how the browser visually presents it.

392. **[Short]** What are the benefits of using localhost to test a website before going live?
   **Answer:** Developers can find and fix issues without exposing unfinished work to the public.

393. **[Short]** What is one consequence of incorrectly setting the web root directory?
   **Answer:** Private or sensitive files may be accidentally exposed to the public.

394. **[Short]** When a browser downloads an HTML file, what additional steps might it perform before displaying the page?
   **Answer:** It parses the HTML, requests additional resources like images, then displays the final page.

395. **[Short]** What is the purpose of a port number?
   **Answer:** To identify a specific process on a computer so data is sent to the correct process.

396. **[Short]** What's the similarity between the structure of an HTML document and a directory tree?
   **Answer:** An HTML document starts with a root element containing tags, which can contain other tags, just as a directory tree starts with a root folder containing folders, which can contain other folders.

397. **[Short]** Why must a URL include the hostname of the web server?
   **Answer:** It tells the client which server to contact to request the page or resource.

398. **[Short]** Distinguish between a local host and a remote host when browsing the Web.
   **Answer:** A local host is your own computer; a remote host is a distant server you connect to over a network.

399. **[Short]** Use these words: client, server, local, remote. For HTTP, a ______ computer runs a web ______. Our ______ computer runs a web ______, which connects to that web ______.
   **Answer:** remote, server, local, client, server

400. **[Short]** Compare how httpie and a web browser handle HTTP responses.
   **Answer:** httpie retrieves and displays raw HTML code; a browser retrieves the raw HTML and displays the rendered page.

401. **[Short]** Use these words (each can be used zero or more times): process, CPU, storage, memory, cache, GPU, terminated, started, 22, 80, 443, 1.2.3.4, suspended, IP address, port number, page.html. 1. The user clicks the Chrome icon. A Chrome ______ is started and resides in the laptop's ______. 2. The user types `https://1.2.3.4/page.html` into the address bar. 3. A web server ______ runs on the machine 1.2.3.4. 4. The web server ______ is identified by its ______, which is ______, and a ______, which is ______. 5. The Chrome ______ runs on the user's laptop. 6. The Chrome ______ connects to the web server ______ and requests a file called ______. 7. The file is rendered on the user's laptop.
   **Answer:** 1. process, memory · 3. process · 4. process, IP address, 1.2.3.4, port number, 443 · 5. process · 6. process, process, page.html ### Hosting a website on a port

---

## Chapter 7. Local Networks, DHCP & NAT

402. **[MCQ]** Which IP address is private?
   - 172.15.0.1
   - 172.32.0.1
   - 11.0.0.1
   - ✅ 192.168.8.8
   *Why:* The private ranges are 10.x, 172.16-172.31 and 192.168.x.

403. **[MCQ]** What does DHCP do?
   - ✅ Leases private IP addresses to devices that join
   - Translates private IPs to public IPs
   - Resolves names to IPs
   - Encrypts the Wi-Fi link
   *Why:* DHCP assigns addresses automatically.

404. **[MCQ]** What does NAT let many devices do?
   - Share one private IP address
   - ✅ Share one public IP address
   - Share one MAC address
   - Share one DNS server
   *Why:* NAT maps many private addresses to one public address.

405. **[MCQ]** How many IP addresses does a home router have, typically?
   - One only
   - Three, one per device
   - ✅ Two: a public one and a private one
   - None
   *Why:* Public toward the ISP and private toward the LAN.

406. **[MCQ]** Which device converts optical fibre signals into electrical signals?
   - Switch
   - Wi-Fi access point
   - DHCP server
   - ✅ ONT
   *Why:* The Optical Network Terminal sits between fibre and the router.

407. **[MCQ]** What does an Optical Network Terminal (ONT) do?
   - ✅ Converts optical signals from the ISP into electrical signals for the home network
   - Assigns private IP addresses
   - Encrypts all traffic
   - Stores web pages
   *Why:* The ONT ends the fibre line.

408. **[MCQ]** Why can't every device have its own public IPv4 address?
   - Public addresses are too expensive to type
   - ✅ There are more devices than public addresses available
   - Routers forbid it
   - Private addresses are faster
   *Why:* NAT lets devices share one.

409. **[MCQ]** Why does a home router have both a public and a private IP address?
   - Two addresses double the speed
   - Private is for the ONT only
   - ✅ Public to reach the Internet, private to talk to the LAN
   - Only one is ever used
   *Why:* One address per side.

410. **[MCQ]** Two routers in separate home networks give two devices the same private IP. What happens?
   - They conflict across the Internet
   - Both lose Internet
   - The ISP blocks them
   - ✅ Nothing bad, because the networks are separate
   *Why:* Private addresses only need to be unique inside one LAN.

411. **[MCQ]** Why is NAT less critical for IPv6?
   - ✅ IPv6 has a vastly larger address space
   - IPv6 uses no addresses
   - IPv6 is encrypted by default
   - IPv6 has no routers
   *Why:* Few reasons to share addresses.

412. **[MSQ]** Which statements about a home LAN are correct?
   - ✅ The ONT converts optical signals from the ISP into electrical signals.
   - ✅ A consumer router is often a router, switch and Wi-Fi access point in one.
   - ✅ The switch and access point handle only local traffic.
   - The router has only a private IP.
   - ✅ The router is the default gateway.
   *Why:* Router faces both worlds.

413. **[MSQ]** Which addresses are private?
   - ✅ 10.1.2.3
   - ✅ 172.16.5.5
   - 172.32.0.1
   - ✅ 192.168.0.12
   - 172.15.0.1
   *Why:* Check the boundaries of the 172 range.

414. **[MSQ]** Which statements about public and private IP addresses are correct?
   - ✅ A public IP is globally unique.
   - ✅ A private IP can be reused in different LANs.
   - A private IP is routable on the Internet.
   - ✅ Public IPs are allocated from ICANN through registries to ISPs.
   - ✅ A home router's public IP may change unless a static IP is bought.
   *Why:* Public is unique and routable; private is local.

415. **[MSQ]** Which statements about DHCP are correct?
   - ✅ A device that joins the LAN asks for an address.
   - ✅ The router leases a private IP automatically.
   - DHCP translates private addresses into public ones.
   - ✅ The router can also lease other settings such as the default gateway.
   - DHCP only works with IPv6.
   *Why:* DHCP assigns; NAT translates.

416. **[MSQ]** A laptop at 192.168.0.12 requests a web page. Which statements about NAT are correct?
   - ✅ The router replaces the private source address and port with its public address and a port.
   - ✅ The router records the mapping in a table.
   - The reply goes to the laptop's private IP directly across the Internet.
   - ✅ The router looks up the table and sends the reply to the laptop.
   - ✅ All devices behind the router appear to websites with the same public IP.
   *Why:* Translate out, record, translate back.

417. **[MSQ]** Which statements about why NAT exists are correct?
   - ✅ IPv4 addresses are limited.
   - ✅ Giving every device a public IPv4 address is impractical and costly.
   - ✅ NAT is less critical with IPv6.
   - NAT is a replacement for a firewall.
   - ✅ NAT lets many private devices share one public address.
   *Why:* Scarcity drives NAT.

418. **[MSQ]** Two different home routers each give a laptop the address 192.168.0.12. Which statements are correct?
   - ✅ This is fine.
   - The two laptops conflict on the Internet.
   - ✅ Their public IPs will differ.
   - ✅ Within each LAN the address must be unique.
   - DHCP guarantees global uniqueness.
   *Why:* Private addresses are local.

419. **[MSQ]** A phone is on mobile data and then on home Wi-Fi. Which statements are generally justified?
   - ✅ On Wi-Fi its IP is usually private.
   - ✅ On mobile data its IP is usually public.
   - Its IP is always the same in both cases.
   - ✅ A website sees the router's public IP for a Wi-Fi connection.
   - Private IPs are used on the Internet backbone.
   *Why:* What a website sees may differ from the device's own address.

420. **[MSQ]** A web server on laptop W (1.2.3.4) listens on 8888. Which steps are in a sensible order for another computer X to reach it?
   - ✅ On W, nmap port 8888 shows closed before the server starts.
   - ✅ On W, start the web server on 8888.
   - ✅ On W, nmap 8888 shows open after starting.
   - ✅ On X, nmap 1.2.3.4 -p 8888 shows open, then browse http://1.2.3.4:8888.
   - On X, browse to http://localhost:8888.
   *Why:* Check, start, confirm, then connect.

421. **[MSQ]** Which are good practices for a LAN web server exercise?
   - ✅ Choose a web root with no confidential files.
   - ✅ Never expose sensitive data via local web servers.
   - ✅ Use strong Wi-Fi pre-shared keys.
   - Expect firewalls to allow ICMP always.
   - ✅ Clean up temporary web content afterwards.
   *Why:* Be careful what you serve.

422. **[Fill]** Is `172.16.5.5` a public or private address?
   **Answer:** `private`
   *Note:* 172.16.0.0 to 172.31.255.255 is private.

423. **[Fill]** Is `172.32.0.1` a public or private address?
   **Answer:** `public`
   *Note:* It is just above the 172.16-172.31 private block.

424. **[Fill]** What does NAT stand for?
   **Answer:** `network address translation`
   *Note:* NAT maps private addresses to the router's public address.

425. **[Fill]** What does DHCP stand for?
   **Answer:** `dynamic host configuration protocol`
   *Note:* DHCP leases private IP addresses.

426. **[Fill]** Which device converts optical signals from the ISP into electrical signals?
   **Answer:** `ont`  or  `optical network terminal`
   *Note:* The ONT.

427. **[Fill]** What translates between private and public addresses on a home router?
   **Answer:** `nat`  or  `network address translation`
   *Note:* NAT.

428. **[Fill]** Give one example of a private IP address.
   **Answer:** `192.168.8.8`
   *Note:* Private ranges: 10.x.x.x, 172.16–172.31.x.x, 192.168.x.x.

429. **[Fill]** A phone on home Wi-Fi: is its IP address public or private?
   **Answer:** `private`
   *Note:* Home Wi-Fi uses private addresses.

430. **[Short]** To host a website on computer W's port 8888 (W = 1.2.3.4) and access it from computer X, list the steps and the purpose of each.
   **Answer:** 1. On W, use nmap to confirm port 8888 is closed. This ensures no other process is using the port. 2. On W, start the web server on port 8888. This lets web clients connect to get content. 3. On W, use nmap to confirm port 8888 is open. This ensures the web server is really using port 8888. 4. On X, use nmap to confirm W's port 8888 is open. This ensures the server is reachable from another computer. 5. On X, visit `http://1.2.3.4:8888` and confirm the page loads. This ensures web browsers can access the site.

431. **[Short]** In the steps above, what is the purpose of step 3 (nmap on W, after starting the server)?
   **Answer:** To check the web server is running correctly from within W. If it fails, something is likely wrong with the web server itself.

432. **[Short]** In the steps above, what is the purpose of step 4 (nmap on X)?
   **Answer:** To check the server is reachable from an external computer. If step 3 passed but this fails, something is blocking X from reaching W, such as a firewall on W or a firewall/router between them. ### Home networks, IP addresses, and NAT

433. **[Short]** How do devices inside the same LAN communicate with each other?
   **Answer:** They use their private IP addresses to communicate directly (via a router, switch or access point, which this course ignores for simplicity).

434. **[Short]** In a home LAN, which device acts as the default gateway, and what is its role?
   **Answer:** The router. It forwards packets from the local network to devices outside it.

435. **[Short]** What happens when a laptop inside a LAN wants to access a website on the Internet?
   **Answer:** The laptop sends its HTTP request to the router, which forwards it to the ISP and beyond until it reaches the website.

436. **[Short]** How do the ONT and router work together?
   **Answer:** The ONT connects to the ISP's network and converts incoming signals to electrical ones. These go to the router, which directs them to the appropriate devices.

437. **[Short]** Explain how a router is like a traffic controller.
   **Answer:** It directs data to the correct device, just as a traffic controller guides vehicles to the right lanes.

438. **[Short]** What might happen if a home router's public IP address changed unexpectedly?
   **Answer:** Devices in the LAN could still communicate internally, but access to the Internet might be disrupted until the connection is re-established.

439. **[Short]** How does NAT reduce the number of public IP addresses needed globally?
   **Answer:** Multiple devices in a LAN share one public IP; NAT translates between private and public addresses.

440. **[Short]** If your laptop has a private IP address, how does it access a website on the Internet?
   **Answer:** It sends the request to the router, which uses NAT to forward it using the router's public IP.

441. **[Short]** Why do organizations like ISPs acquire IP addresses from regional registries like APNIC?
   **Answer:** To distribute public IPs to their customers and ensure global uniqueness.

442. **[Short]** Differentiate public and private IP addresses using an analogy.
   **Answer:** Public IPs are like country names (globally unique); private IPs are like street names (can repeat in different countries).

---

## Chapter 8. Cloud Computing & AWS EC2

443. **[MCQ]** Which cloud model is open to any subscriber?
   - ✅ Public
   - Private
   - Community
   - Hybrid
   *Why:* Public clouds such as AWS are multi-tenant.

444. **[MCQ]** What does terminating an EC2 instance do?
   - Pauses billing but keeps the disk
   - ✅ Wipes the machine and stops billing
   - Only restarts the machine
   - Makes the key invalid
   *Why:* Terminate is like turning the computer off for good.

445. **[MCQ]** In ssh -i key.pem ec2-user@IP, what does -i supply?
   - The IP address
   - The port number
   - ✅ The identity (private key) file
   - The user name
   *Why:* -i names the private key used to authenticate.

446. **[MCQ]** Why does ssh refuse a key.pem with loose permissions?
   - Keys must be executable
   - The file is too large
   - ssh only accepts .txt files
   - ✅ The private key must not be readable by others
   *Why:* Group or world access means the secret is not private.

447. **[MCQ]** What does a security group with no inbound rule for port 80 do to web traffic?
   - ✅ It drops it
   - It forwards it to port 443
   - It allows it by default
   - It terminates the instance
   *Why:* No rule means the packets are dropped.

448. **[MCQ]** What is the purpose of launching an EC2 instance?
   - To buy a physical server
   - ✅ To get a virtual server in the cloud that runs applications
   - To store only email
   - To create a LAN
   *Why:* EC2 = rented virtual machine.

449. **[MCQ]** Why set correct permissions on the downloaded .pem private key?
   - So the file runs faster
   - So the instance can be renamed
   - ✅ So only you can read the private key
   - So every user can share it
   *Why:* ssh refuses keys with loose permissions.

450. **[MCQ]** Port 80 is not allowed in the EC2 security group but the HTTP server runs. What does a browser see?
   - The page loads normally
   - An instant 404 error
   - A DNS failure
   - ✅ A long wait, then "This site can't be reached"
   *Why:* Blocked traffic times out.

451. **[MCQ]** In the same situation, what does nmap report for port 80?
   - ✅ filtered
   - open
   - closed
   - listening
   *Why:* filtered = nmap cannot tell.

452. **[MCQ]** What is an inbound security rule used for?
   - To allow outgoing traffic from the instance
   - ✅ To allow specific incoming traffic to the instance
   - To rename the instance
   - To back up files
   *Why:* Inbound = into the instance.

453. **[MCQ]** What happens to the instance if the private key file is deleted?
   - The instance restarts
   - AWS emails a new key
   - ✅ You are locked out and cannot connect over SSH
   - SSH switches to a password
   *Why:* Keep the key safe.

454. **[MSQ]** Which statements about cloud computing are correct?
   - ✅ Resources are provided by a third party and managed over the Internet.
   - ✅ On-premise means the organisation owns and manages its own servers.
   - In the cloud you pay for the hardware whether or not you use it.
   - ✅ Gmail is an example of a cloud service.
   - ✅ The big three providers are AWS, Azure and Google Cloud.
   *Why:* Rent instead of buy.

455. **[MSQ]** Which statements about cloud deployment models are correct?
   - ✅ A public cloud is open to any subscriber.
   - ✅ A private cloud is for one organisation.
   - ✅ A community cloud is shared by organisations with similar needs.
   - ✅ A hybrid cloud combines other models.
   - The model depends on where the hardware is.
   *Why:* Who can use it, not where it sits.

456. **[MSQ]** Which statements about EC2 are correct?
   - ✅ It rents virtual computers; you choose CPU, memory, storage and OS.
   - ✅ You pay only while the instance runs.
   - ✅ Terminating an instance stops billing.
   - ✅ An AMI is the template used to start instances.
   - EC2 is the AWS storage service.
   *Why:* Compute that you launch and terminate.

457. **[MSQ]** Which statements about SSH are correct?
   - ✅ It provides encrypted remote access.
   - ✅ The private key stays on your computer.
   - ✅ The public key is placed on the instance.
   - ✅ The key proves who you are rather than encrypting each typed word separately.
   - If you delete the .pem you can simply download it again.
   *Why:* Lose the key and you lose the way in.

458. **[MSQ]** Which statements about ssh -i is114-keypair.pem ec2-user@IP are correct?
   - ✅ -i names the private key file.
   - ✅ ec2-user is the login user on the instance.
   - ✅ IP is the public IP of the instance.
   - ✅ The key file permissions should be chmod u=rw,go=.
   - The command works with the key readable by everyone.
   *Why:* Key, user, host, private permissions.

459. **[MSQ]** A Python HTTP server runs on port 80 of an EC2 instance, but nobody can browse to it. nmap says filtered. Which statements are justified?
   - ✅ The security group may lack an inbound rule for port 80.
   - ✅ The server may be running perfectly.
   - The server must have crashed.
   - ✅ Adding an inbound rule for 80 from 0.0.0.0/0 should fix it.
   - ✅ Browsers hang or time out.
   *Why:* Filtered points at the firewall.

460. **[MSQ]** Which security group settings follow the typical hardening?
   - ✅ Allow 80 and 443 from 0.0.0.0/0.
   - ✅ Allow 22 only from administrator IP addresses.
   - Allow 22 from 0.0.0.0/0.
   - ✅ A security group is a firewall at the instance level.
   - 0.0.0.0/0 means a single IP address.
   *Why:* Public web, private admin.

461. **[MSQ]** Which are cloud gotchas?
   - ✅ Forgetting to terminate an instance means continuing charges.
   - ✅ Deleting the .pem causes permanent lock-out.
   - ✅ A .pem with open permissions is refused by ssh.
   - Terminating an instance keeps all data for free.
   - ✅ A running server with a missing port rule looks like an outage.
   *Why:* Small mistakes cost money or access.

462. **[MSQ]** Which statements about AWS services and market are correct?
   - ✅ EC2 is compute.
   - ✅ S3 is storage.
   - ✅ RDS is a relational database service.
   - ✅ AWS is the market leader.
   - Azure is the market leader.
   *Why:* Compute, storage, database.

463. **[MSQ]** A company keeps sensitive financial data on private clusters and serves a public web app from AWS. This is best described as ...
   - ✅ a hybrid cloud.
   - a community cloud.
   - an on-premise only model.
   - ✅ it uses both private and public resources.
   - a single-tenant model throughout.
   *Why:* Mixed deployment is hybrid.

464. **[Fill]** Connect to the instance at 3.1.2.4 as `ec2-user` using the key file `is114-keypair.pem`.
   **Answer:** `ssh -i is114-keypair.pem ec2-user@3.1.2.4`
   *Note:* `-i` names the private key.

465. **[Fill]** In a security group, what does the source `0.0.0.0/0` mean?
   **Answer:** `all ipv4 addresses`
   *Note:* Every IPv4 address, that is the whole Internet.

466. **[Fill]** Which EC2 action turns the machine off for good and stops billing?
   **Answer:** `terminate`
   *Note:* Terminate wipes the machine.

467. **[Fill]** Which AWS service gives you a virtual server in the cloud?
   **Answer:** `ec2`  or  `amazon ec2`
   *Note:* Elastic Compute Cloud.

468. **[Fill]** What does ssh need to authenticate you when you use `-i`?
   **Answer:** `private key`  or  `the private key`  or  `key file`
   *Note:* `-i` points to the private key file.

469. **[Fill]** Which port must the security group allow for SSH?
   **Answer:** `22`
   *Note:* SSH = port 22.

470. **[Fill]** Which port must the security group allow for plain HTTP?
   **Answer:** `80`
   *Note:* HTTP = port 80.

471. **[Fill]** Is a private cloud open to any subscriber? Type yes or no.
   **Answer:** `no`
   *Note:* A private cloud serves one organisation.

472. **[Short]** Explain how using Gmail is an example of cloud computing.
   **Answer:** Gmail stores and manages emails on remote servers, so users can access email from any Internet-connected device.

473. **[Short]** In your own words, what is AWS?
   **Answer:** A cloud computing platform that lets users rent computing resources (servers, storage, databases) on a pay-as-you-go basis instead of buying and maintaining their own hardware.

474. **[Short]** If running your own server is like buying a house, how would you describe AWS EC2?
   **Answer:** Like booking a hotel room: you pay for a fully furnished place for as long as you need it, then check out.

475. **[Short]** After launching an EC2 instance, why note down the Public IPv4 address?
   **Answer:** It is needed to connect remotely via SSH or to access a hosted website.

476. **[Short]** What is the purpose of setting correct permissions on the downloaded `.pem` private key file?
   **Answer:** To restrict access to the private key to only the user.

477. **[Short]** What might happen if the `.pem` file permissions are not correctly set?
   **Answer:** Other users or processes on the computer could access the key and gain access to the server.

478. **[Short]** Explain this command: `ssh -i is114-keypair.pem ec2-user@{YOUR_EC2_IP_ADDRESS}`
   **Answer:** `ssh` = Secure Shell, for remote secure access. `-i is114-keypair.pem` = the private key file used to authenticate. `ec2-user@{IP}` = connect as user `ec2-user` to the instance at that public IPv4 address.

479. **[Short]** Why might businesses prefer cloud computing over maintaining their own servers?
   **Answer:** It reduces hardware and maintenance costs and shifts resource management to the cloud provider.

480. **[Short]** What's the difference between public and private cloud services?
   **Answer:** Public cloud is accessible by any subscriber; private cloud is restricted to a specific organization or group.

481. **[Short]** Why does cloud computing let users be indifferent about the location of their resources?
   **Answer:** From the user's point of view, physical location doesn't matter, so they can focus on using services rather than managing infrastructure.

482. **[Short]** Why is enabling SSH and HTTP traffic necessary when launching an EC2 instance?
   **Answer:** SSH allows remote command-line access; HTTP allows hosting and accessing web services.

483. **[Short]** If an EC2 instance is like a room, what analogies describe enabling SSH and HTTP?
   **Answer:** SSH is a private, secure entrance for those with the key (private key). HTTP is a public storefront window so anyone on the Internet can interact with your website.

484. **[Short]** What happens if you don't enable "Allow SSH traffic from Anywhere"?
   **Answer:** You are denied access when connecting via SSH or FileZilla, because port 22 isn't open.

485. **[Short]** What happens if you don't enable "Allow HTTP traffic from the internet"?
   **Answer:** Users see a connection timeout or "site can't be reached" error.

486. **[Short]** Can we allow access to ports other than SSH and HTTP in EC2?
   **Answer:** Yes, by adding inbound rules for those ports in the security group. This is needed when a process on the instance listens on another port.

487. **[Short]** What's the function of a data center in cloud computing?
   **Answer:** It houses the physical computing resources that cloud providers manage and offer over the Internet.

488. **[Short]** Why is a hybrid cloud model suitable for a company needing strict data security and public-facing applications?
   **Answer:** It combines private-cloud security for sensitive data with public-cloud accessibility for public-facing services.

489. **[Short]** Why might storing files in the cloud be more reliable than on a personal device?
   **Answer:** Cloud storage usually has redundancy and automatic backups, reducing the risk of data loss from device failure.

490. **[Short]** Summarise the steps for launching an EC2 instance and connecting via SSH.
   **Answer:** 1) Launch the instance with the correct settings and enable SSH. 2) Download and secure the private key. 3) Use SSH to connect.

491. **[Short]** Why should we terminate an EC2 instance when we no longer need it?
   **Answer:** To avoid unnecessary costs (it is billed as a subscription) and security risks.

492. **[Short]** In "Application and OS Images", we selected "Amazon Linux". What is an OS Image?
   **Answer:** A pre-configured template containing an operating system (and often other software), used as a blueprint to create a new instance so you needn't install the OS from scratch.

493. **[Short]** What are the pros and cons of nano vs FileZilla for creating files on the web server?
   **Answer:** Nano is fast and works in the terminal but is text-only and less user-friendly. FileZilla has a graphical interface and supports drag-and-drop.

494. **[Short]** What is an outbound security rule in EC2?
   **Answer:** A rule allowing specific outgoing traffic from the instance to external destinations.

495. **[Short]** A web server on EC2 uses port 8888 but nmap shows 'filtered'. What should you check?
   **Answer:** That port 8888 is allowed in the EC2 inbound security group.

496. **[Short]** In an EC2 inbound rule, what does setting the source to `0.0.0.0/0` mean?
   **Answer:** The instance accepts incoming traffic from any IPv4 address on the Internet, making that port publicly accessible. ### Security

---

## Chapter 9. Information Security & Cryptography

497. **[MCQ]** A DoS flood crashes a web server. Which pillar is attacked?
   - Confidentiality
   - ✅ Availability
   - Integrity
   - Authenticity
   *Why:* Authorised users can no longer reach the service.

498. **[MCQ]** Which key encrypts a message to Bob in public-key cryptography?
   - Bob's private key
   - Alice's private key
   - ✅ Bob's public key
   - A shared secret key
   *Why:* Only Bob's private key can then decrypt.

499. **[MCQ]** Which is "something you are"?
   - A password
   - A hardware token
   - A PIN
   - ✅ A fingerprint
   *Why:* Biometrics are what you are.

500. **[MCQ]** Why is SMS a weak second factor?
   - ✅ Messages are not encrypted and SIMs can be swapped
   - SMS is too expensive
   - SMS only works abroad
   - SMS codes are too long
   *Why:* CISA recommends avoiding SMS as a factor.

501. **[MCQ]** What does a firewall enforce?
   - A password policy
   - ✅ An access control policy
   - A backup schedule
   - A DNS policy
   *Why:* Rules for which traffic is permitted and denied.

502. **[MCQ]** What does the public key do in public-key cryptography?
   - It decrypts messages
   - It must be kept secret
   - ✅ It is shared freely and encrypts messages for the key owner
   - It signs passwords
   *Why:* Public encrypts, private decrypts.

503. **[MCQ]** Which describes a firewall?
   - It encrypts all files
   - It stores passwords
   - It speeds up the connection
   - ✅ It checks incoming traffic and filters unwanted traffic
   *Why:* Firewalls allow or block by rule.

504. **[MCQ]** What does a certificate authority do?
   - ✅ Verifies a public key by issuing a digital certificate
   - Stores private keys
   - Encrypts the messages
   - Assigns IP addresses
   *Why:* Prevents impersonation.

505. **[MCQ]** What is the main weakness of symmetric encryption?
   - It uses two keys
   - ✅ Both sides must share the same key, which can be intercepted
   - It cannot encrypt text
   - It needs a certificate authority
   *Why:* Key distribution is the problem.

506. **[MCQ]** What is the difference between false acceptance and false rejection in biometrics?
   - They are the same
   - Acceptance blocks a legitimate user
   - ✅ Acceptance admits an unauthorised user; rejection blocks a legitimate user
   - Rejection admits an attacker
   *Why:* Two kinds of error.

507. **[MCQ]** A malicious entity keeps sending HTTP requests so a server cannot respond to other users. Which part of the CIA triad is attacked?
   - Confidentiality
   - ✅ Availability
   - Integrity

508. **[MSQ]** Which statements about the CIA triad are correct?
   - ✅ Confidentiality is protection from unauthorised access.
   - ✅ Integrity is modification only by appropriate mechanisms.
   - ✅ Availability is authorised access when needed.
   - Encryption alone guarantees integrity.
   - ✅ A DoS flood is an attack on availability.
   *Why:* Three separate ideas.

509. **[MSQ]** Match scenarios to pillars. Which are correct?
   - ✅ A web root pointing at private files breaks confidentiality.
   - ✅ A tampered account balance breaks integrity.
   - ✅ Corrupted data from a transmission error breaks integrity.
   - A DoS flood breaks confidentiality.
   - ✅ An unreachable server breaks availability.
   *Why:* Ask which property is lost.

510. **[MSQ]** Which statements about authentication are correct?
   - ✅ Something you know includes a password or PIN.
   - ✅ Something you have includes a smart card or token.
   - ✅ Something you are is a biometric trait such as a fingerprint.
   - ✅ Two-factor authentication needs two forms of identification.
   - SMS one-time codes are the strongest factor.
   *Why:* Combine different factors.

511. **[MSQ]** Which statements about passwords and password managers are correct?
   - ✅ A password should be easy to remember and hard to guess.
   - ✅ A password manager stores and autofills logins.
   - ✅ It encrypts its data and is protected by a master password.
   - ✅ You should enable extra protection such as 2FA.
   - Passwords are immune to phishing.
   *Why:* Knowledge factors are the weakest.

512. **[MSQ]** Which statements about biometrics are correct?
   - ✅ A false rejection denies a legitimate user.
   - ✅ A false acceptance admits an impostor.
   - ✅ The system is tuned between the two.
   - A biometric scanner can never make mistakes.
   - ✅ A scanner rejecting a real user is a false rejection.
   *Why:* Tuning trades one error for the other.

513. **[MSQ]** Which statements about cryptography vocabulary are correct?
   - ✅ Plaintext is readable and ciphertext is not.
   - ✅ A cipher is the algorithm and the key guides it.
   - ✅ Cryptanalysis is decrypting without knowing the cipher or key.
   - A Caesar cipher is hard for modern computers to break.
   - ✅ Decrypt(FRPSXWHU) with shift 3 gives COMPUTER.
   *Why:* Substitution ciphers are weak; decryption shifts each letter back by the same amount.

514. **[MSQ]** Which statements about symmetric and public-key cryptography are correct?
   - ✅ Symmetric schemes use the same key to encrypt and decrypt.
   - ✅ Symmetric schemes have a key-distribution problem.
   - ✅ Public-key cryptography uses a public and a private key.
   - ✅ The public key encrypts and the private key decrypts.
   - The private key is sent along with the message.
   *Why:* The private key is never transmitted.

515. **[MSQ]** Which statements about firewalls are correct?
   - ✅ A firewall filters traffic according to an access control policy.
   - ✅ Port filtering can deny inbound port 22 from the Internet while allowing the LAN.
   - ✅ Stateful inspection tracks connection state.
   - ✅ Deep packet inspection is stronger but adds latency.
   - A firewall encrypts all traffic automatically.
   *Why:* Filter first; inspect more for more protection.

516. **[MSQ]** Which scenarios map correctly to a security concept?
   - ✅ HTTPS instead of HTTP → confidentiality and integrity.
   - ✅ chmod u=rw,go= key.pem → confidentiality of the private key.
   - ✅ A security group closing port 22 to the world → an access control policy.
   - A DoS flood on a server → confidentiality.
   - ✅ A biometric scanner rejecting a real user → false rejection.
   *Why:* Name the property or control.

517. **[MSQ]** Which statements about risk analysis and privileges are correct?
   - ✅ Risk analysis weighs the nature and likelihood of risks.
   - ✅ Its goal is to minimise vulnerability to the biggest threats.
   - ✅ Separation of management privileges splits administrative powers.
   - It means one administrator holds every power.
   - ✅ It pairs realistic threats with vulnerabilities.
   *Why:* Many hands, no single point of failure.

518. **[Fill]** Encrypt FUNDAMENTAL with a Caesar shift of 3.
   **Answer:** `IXQGDPHQWDO`
   *Note:* Each letter moves three places forward.

519. **[Fill]** Decrypt FRPSXWHU with a Caesar shift of 3.
   **Answer:** `COMPUTER`
   *Note:* Each letter moves three places back.

520. **[Fill]** Which key decrypts a message that was encrypted with Bob's public key?
   **Answer:** `bobs private key`
   *Note:* Only the matching private key can decrypt.

521. **[Fill]** Name the three parts of the CIA triad.
   **Answer:** `confidentiality, integrity, availability`
   *Note:* Confidentiality, Integrity, Availability.

522. **[Fill]** Which CIA pillar does a DoS attack target?
   **Answer:** `availability`
   *Note:* Legitimate users are blocked.

523. **[Fill]** Which key does Bob use to decrypt a message Alice encrypted with his public key?
   **Answer:** `private key`  or  `bobs private key`
   *Note:* Only his private key decrypts it.

524. **[Fill]** Two-factor authentication uses two ___ types of credential, such as a password and a phone code.
   **Answer:** `different`
   *Note:* Two factors from different categories.

525. **[Fill]** Is a password alone a strong form of authentication? Type yes or no.
   **Answer:** `no`
   *Note:* It can be guessed, stolen or reused.

526. **[Short]** When logging into a website, what security process are you performing?
   **Answer:** User authentication: proving your identity with credentials like a username and password.

527. **[Short]** In public-key cryptography, what is the purpose of the public key?
   **Answer:** It is freely shared and used to encrypt messages for the owner of the matching private key.

528. **[Short]** Explain how two-factor authentication (2FA) works.
   **Answer:** It requires two types of credentials, such as a password and a verification from a mobile device, to confirm identity.

529. **[Short]** Compare information security and cyber security.
   **Answer:** Information security protects data in any form; cyber security focuses on defending resources accessible via the Internet.

530. **[Short]** Why are passwords alone a weak form of authentication?
   **Answer:** They can be guessed, stolen or compromised, and rely solely on something the user knows.

531. **[Short]** Why is cryptography necessary even with strong passwords?
   **Answer:** It protects the content itself, preventing unauthorized reading even if passwords are compromised.

532. **[Short]** Why might a firewall cause network delays?
   **Answer:** A sophisticated firewall inspects traffic deeply, which slows the data passing through.

533. **[Short]** What role does a certificate authority play in public-key encryption?
   **Answer:** It verifies a public key's authenticity by issuing a digital certificate, preventing impersonation.

534. **[Short]** What are the benefits and risks of password management software?
   **Answer:** It stores credentials securely and reduces password reuse, but if compromised it could expose many accounts at once.

535. **[Short]** Why is biometric authentication considered more secure than passwords?
   **Answer:** Biometrics are unique physiological traits that are much harder to duplicate or steal.

536. **[Short]** Why is public-key encryption not considered symmetric?
   **Answer:** It uses two different keys (public to encrypt, private to decrypt), whereas symmetric encryption uses one shared key for both.

537. **[Short]** Why might an organization use MFA instead of just 2FA?
   **Answer:** MFA adds more layers of security, making breaches harder.

538. **[Short]** Why does separating management privileges among different people improve security?
   **Answer:** No single person has enough access to make major changes without oversight, reducing insider threats.

539. **[Short]** Why monitor which ports are open on a cloud server?
   **Answer:** Open ports expose the server to the Internet; managing them reduces the risk of unauthorized access and attacks.

540. **[Short]** Step by step, how does Alice use Bob's public key to send him an encrypted message?
   **Answer:** 1) Alice gets Bob's public key. 2) Alice encrypts her message with it. 3) Alice sends the encrypted message. 4) Bob decrypts it with his private key.

---

## Chapter 10. Systems Architecture Case Study

541. **[MCQ]** In the case study, which ports are opened in the security group to the whole Internet?
   - 22 only
   - 8000 only
   - ✅ 80 and 443
   - All ports
   *Why:* Web ports public, SSH admin-only.

542. **[MCQ]** Why does the developer first host the server on 127.0.0.1:8000?
   - Because EC2 is not available
   - Because loopback is faster than the Internet
   - Because DNS cannot resolve public names
   - ✅ To test rendering without exposing unfinished code
   *Why:* Loopback stays inside the device.

543. **[MCQ]** What shares the home's single public IP among sensors and laptops?
   - ✅ NAT on the router
   - DHCP
   - DNS
   - The security group
   *Why:* NAT maps private addresses to the one public address.

544. **[MCQ]** How do developers log in to the EC2 instance?
   - A password over HTTP
   - ✅ SSH with a .pem private key
   - DHCP lease
   - Bluetooth pairing
   *Why:* Keypair login on port 22.

545. **[MCQ]** Which tier uses Bluetooth pairing and embedded microcontrollers?
   - Tier 3: cloud
   - Tier 4: perimeter
   - ✅ Tier 1: edge sensing
   - Tier 5: application
   *Why:* Sensors and wearables are embedded devices.

546. **[MSQ]** Which tiers and concepts are matched correctly?
   - ✅ Tier 1: sensors and wearables, embedded systems, Bluetooth.
   - ✅ Tier 2: ONT and router, DHCP and NAT.
   - ✅ Tier 3: AWS EC2, public cloud virtualisation.
   - Tier 4: Python web server and ML engine.
   - ✅ Tier 5: HTTP/HTTPS, HTML5/CSS, loopback testing.
   *Why:* Each tier has its own vocabulary.

547. **[MSQ]** Which statements about the data path are correct?
   - ✅ Sensors reach the home router.
   - ✅ Traffic leaves via the ONT and the ISP over HTTPS on 443.
   - ✅ The AWS security group filters the traffic before EC2.
   - Traffic goes straight to the clinical servers from the sensors.
   - ✅ The EC2 instance runs the application and the analytics.
   *Why:* Edge, gateway, perimeter, application.

548. **[MSQ]** Which statements about the developer laptops are justified?
   - ✅ 16-32 GB RAM supports many concurrent processes.
   - ✅ A fast SSD shortens loading and build times.
   - ✅ Linux gives native sensor SDK support and CLI pipelines.
   - Linux is chosen because it cannot run virtual machines.
   - ✅ A multi-core CPU helps run several processes at once.
   *Why:* Hardware and OS choices serve the workflow.

549. **[MSQ]** Which statements about the office network are correct?
   - ✅ The ISP terminates fibre in an ONT.
   - ✅ The router has one public IPv4 address on its WAN side.
   - ✅ DHCP leases Class C private addresses to laptops.
   - Each laptop needs its own public IP.
   - ✅ An internal DNS daemon maps internal hostnames to private IPs.
   *Why:* One public IP, many private IPs.

550. **[MSQ]** Which are reasons the application is first tested on loopback?
   - ✅ 127.0.0.1 never leaves the device.
   - ✅ It works without Internet access.
   - It exposes unfinished code to the public.
   - ✅ localhost:8000 and 127.0.0.1:8000 reach the same local server.
   - ✅ Rendering can be checked before provisioning cloud servers.
   *Why:* Develop locally, then deploy.

551. **[MSQ]** Which statements about the perimeter security are correct?
   - ✅ 80/443 are open to 0.0.0.0/0 so clients and sensors can connect.
   - ✅ 22 is restricted to administrator IPs.
   - ✅ Developers authenticate with RSA keypairs.
   - ✅ The private key is protected with chmod u=rw,go=.
   - The private key is stored in authorized_keys.
   *Why:* Open what must be public; lock down the rest.

552. **[MSQ]** Which statements about telemetry and alerts are correct?
   - ✅ Sensors send encrypted telemetry over HTTPS (443).
   - ✅ Prolonged inactivity can trigger automated alerts to caregivers.
   - ✅ Wearables send vitals to clinical servers.
   - HTTP on port 80 would also be encrypted.
   - ✅ The home router NATs the sensor traffic.
   *Why:* Use HTTPS for sensitive data.

553. **[MSQ]** Which statements correctly say where each concept appears?
   - ✅ Port 443 appears in the application (HTTPS) and the security group.
   - ✅ Port 22 appears in the perimeter tier for SSH.
   - ✅ A private IP appears at tiers 1 and 2.
   - ✅ A public IP appears at tier 3.
   - A private IP appears on the EC2 instance as its Internet address.
   *Why:* Trace the concept through each tier.

554. **[MSQ]** Which are reasons to use an EC2 instance rather than buying server hardware?
   - ✅ It can be provisioned in minutes.
   - ✅ You pay as you go.
   - ✅ No physical server needs to be bought and maintained.
   - It makes an SSH key unnecessary.
   - ✅ You can terminate it when no longer needed.
   *Why:* Elastic and metered.

555. **[MSQ]** A Security Group lacks a rule for port 443, yet the web server runs on 443. Which statements are correct?
   - ✅ Sensors cannot deliver telemetry over HTTPS.
   - ✅ nmap from the Internet reports 443 as filtered.
   - The instance has crashed.
   - ✅ Adding an inbound rule for 443 fixes the symptom.
   - ✅ Alerts to caregivers might be delayed or lost.
   *Why:* Reachable only if a rule allows it.

556. **[Fill]** Which port do the sensors use to send encrypted telemetry to the cloud?
   **Answer:** `443`
   *Note:* HTTPS on 443.

557. **[Fill]** Which IP address and port does the developer use to test the server locally?
   **Answer:** `127.0.0.1:8000`  or  `localhost:8000`
   *Note:* Loopback on port 8000.
