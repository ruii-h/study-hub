// IS114 type-in questions: commands, ports and short definitions. Several spellings are accepted; spacing and quote style are ignored by the checker.
const C = (q, a, e, ci) => [q, a, e, 'cmd', ci];
const O = (q, a, e, ci) => [q, a, e, 'out', ci];
export const fill = {
  1: [
    O('How many bytes are in 20 GB, using the course rule (powers of ten)? Type the number.', ['20000000000', '20,000,000,000', 're:^20 ?(x|\\*|×) ?10\\^?9$'], '20 × 10⁹ bytes.'),
    O('In what unit is a processor\'s clock speed written? (abbreviation)', ['GHz', 'Hz'], 'GHz means billions of cycles per second.', true),
    O('Which memory does the CPU check first when it needs data: cache, RAM or storage?', ['cache'], 'Cache first, then RAM, then storage.', true),
  ],
  2: [
    C('Type the command that lists the processes you own (course form, no dash).', ['ps u'], 'Write `ps u`; `ps -u` is not the course form.'),
    O('Which key combination suspends (pauses) the foreground process?', ['ctrl-z', 'ctrl+z', 'ctrl z', 'control-z', '^z'], 'Ctrl-z suspends; Ctrl-c kills.', true),
    C('After suspending a process, which command resumes it in the background?', ['bg'], '`bg` background, `fg` foreground.'),
  ],
  3: [
    C('Using `yum.csv` (with a header row), type a pipeline that counts the unique foods (column 2, comma separated).', ["tail -n +2 yum.csv | cut -d',' -f2 | sort | uniq | wc -l", "tail -n +2 yum.csv | cut -d',' -f2 | sort -u | wc -l", "cat yum.csv | tail -n +2 | cut -d',' -f2 | sort | uniq | wc -l"], 'Skip the header, cut the column, sort, uniq, count lines.'),
    C('Type a command that prints the lines of `yum.csv` that contain Sushi, ignoring case.', ['grep -i Sushi yum.csv', 'cat yum.csv | grep -i Sushi'], '`-i` ignores case.', true),
    C('Type a command that prints the lines of `yum.csv` that do NOT contain Chicken.', ['grep -v Chicken yum.csv', 'cat yum.csv | grep -v Chicken'], '`-v` inverts the match.'),
    C('Type a command that prints the lowest price (column 3) of `yum.csv`.', ["tail -n +2 yum.csv | cut -d',' -f3 | sort -n | head -n 1", "tail -n +2 yum.csv | cut -d',' -f3 | sort -n | head -1"], 'Skip the header, sort numerically, take the first line.'),
    C('Append the text tuesday to the end of `file1` with a single command.', ['echo tuesday >> file1'], '`>>` appends; `>` would overwrite.'),
  ],
  4: [
    C('Type a command that makes `key.pem` readable and writable by its owner only.', ['chmod u=rw,go= key.pem', 'chmod 600 key.pem', 'chmod 400 key.pem', 'chmod go-rwx key.pem'], 'No spaces in `u=rw,go=`.'),
    C('Type a command that lets the owner execute `script.sh`.', ['chmod u+x script.sh', 'chmod +x script.sh', 'chmod a+x script.sh'], '`+x` adds execute permission.'),
    O('With CWD `/home/jones`, what absolute path is `../smith/reports`?', ['/home/smith/reports'], '`..` goes up to `/home`.'),
    C('Type the command that deletes the directory `old` together with everything inside it.', ['rm -r old', 'rm -r old/', 'rm -rf old'], '`rmdir` only removes empty directories.'),
  ],
  5: [
    O('Which port number does HTTPS use by default?', ['443'], 'HTTP is 80, SSH is 22.'),
    O('Which port number does SSH use by default?', ['22'], 'SSH is 22.'),
    O('What is port 443 used for? (one word: the protocol)', ['https', 're:^https( traffic)?$'], 'HTTPS web traffic.', true),
    C('Type the command that tests whether the host `gov.sg` is reachable and shows the round-trip time.', ['ping gov.sg'], '`ping` tests reachability.'),
    C('Type a command that looks up the IP address of `shopee.sg` using `dig`, short form.', ['dig +short shopee.sg'], '`+short` prints only the answer.'),
    C('Type a command that checks the state of port 443 on `example.com`.', ['nmap example.com -p 443', 'nmap -p 443 example.com'], 'The state is open, closed or filtered.'),
  ],
  6: [
    C('Type the command that starts a local web server on port 8000 serving the current directory.', ['python -m http.server', 'python3 -m http.server', 'python -m http.server 8000', 'python3 -m http.server 8000'], 'The default port is 8000.'),
    O('In `https://www.example.com/page.html#top`, what is `#top` called?', ['anchor', 'fragment', 're:^(the )?(anchor|fragment)$'], 'The anchor (fragment) points to a place in the page.', true),
    O('Which HTML tag creates a hyperlink? Type the tag.', ['<a>', 'a', '<a href>'], 'The anchor tag `<a href="…">`.', true),
  ],
  7: [
    O('Is `172.16.5.5` a public or private address?', ['private'], '172.16.0.0 to 172.31.255.255 is private.', true),
    O('Is `172.32.0.1` a public or private address?', ['public'], 'It is just above the 172.16-172.31 private block.', true),
    O('What does NAT stand for?', ['network address translation'], 'NAT maps private addresses to the router\'s public address.', true),
    O('What does DHCP stand for?', ['dynamic host configuration protocol'], 'DHCP leases private IP addresses.', true),
  ],
  8: [
    C('Connect to the instance at 3.1.2.4 as `ec2-user` using the key file `is114-keypair.pem`.', ['ssh -i is114-keypair.pem ec2-user@3.1.2.4', 're:^ssh -i is114-keypair\\.pem ec2-user@\\S+$'], '`-i` names the private key.'),
    O('In a security group, what does the source `0.0.0.0/0` mean?', ['all ipv4 addresses', 're:(all|any).*(ipv4|ip addresses|internet)', 're:whole internet'], 'Every IPv4 address, that is the whole Internet.', true),
    O('Which EC2 action turns the machine off for good and stops billing?', ['terminate', 're:^terminate( the instance)?$'], 'Terminate wipes the machine.', true),
  ],
  9: [
    O('Encrypt FUNDAMENTAL with a Caesar shift of 3.', ['IXQGDPHQWDO'], 'Each letter moves three places forward.', true),
    O('Decrypt FRPSXWHU with a Caesar shift of 3.', ['COMPUTER'], 'Each letter moves three places back.', true),
    O('Which key decrypts a message that was encrypted with Bob\'s public key?', ['bobs private key', 're:^(bob.?s )?private( key)?$'], 'Only the matching private key can decrypt.', true),
  ],
  10: [
    O('Which port do the sensors use to send encrypted telemetry to the cloud?', ['443'], 'HTTPS on 443.'),
    O('Which IP address and port does the developer use to test the server locally?', ['127.0.0.1:8000', 'localhost:8000'], 'Loopback on port 8000.', true),
  ],
};
