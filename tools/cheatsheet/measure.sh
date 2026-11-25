#!/bin/sh
C="/c/Program Files/Google/Chrome/Application/chrome.exe"
F="file:///C:/Users/Rui%20Heng/htmlguides/tools/cheatsheet/algo-cheatsheet.html"
"$C" --headless=new --disable-gpu --virtual-time-budget=3000 --dump-dom "$F" 2>/dev/null | grep -o 'p1: [^<]*'
