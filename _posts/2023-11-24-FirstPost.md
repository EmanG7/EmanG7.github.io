---
layout: blogpost
title: First Post
image: /assets/images/Background.png
---
## Getting Started
Welcome to my first post!

I’m starting this to document and showing off tools or techniques I discover while researching and practicing! Currently, my interest are Automation and Cloud within the field of Cybersecurity but that doesn’t mean I won’t investigate other things as well and post about them as well. I might randomly adjust my focus to another topic of cybersecurity or computer science.

I’m also testing out different formats like for example, using images for code or using markdown’s code block therefore it might look different from time to time.


---

## Troubleshooting from the Start
I won’t lie, I had problems getting this working the way I wanted.

To start it, I got my Github page repo together smoothly, no issues there and I saw Jekyll-Themes within the settings, which is the next thing I wanted to use for this, but I wanted to download, install, and rifle through the files of Jekyll for curiosity’s sake. After finding the official Jekyll website and following their instructions on how to install on my Windows Subsystem for Linux (WSL) Arch, I learned more about Ruby and Gem as I had no experience with them personally. Naturally, having no experience at the beginning led to me two errors or issues after installing Jekyll and default packages that come with Gem.

First was that the Jekyll command wasn’t found, and this is simple enough to fix in a few keystrokes. It’s wasn’t in the PATH, therefore I needed to get Gem’s home directory into my .bashrc file. It was a quick fix and the commands I used and entered the file was the following commands below. 

``` bash
export GEM_HOME="$(ruby -e 'puts Gem.user_dir')"
export PATH="$PATH:$GEM_HOME/bin" 
```

Second was a “NoMethodError” within the Logger v1.6.0 package as it seems Jekyll v4.3.2 does give this version of Logger everything it needs and prevented Jekyll from building or serving. When installing Gem onto your computer for the first time, all the packages are installed with the latest version, which at the time of this post is 1.6.0 for Logger. After poking around into Logger.rb and Jekyll’s configuration files, I couldn’t find a way to work around it with current versions so I decided to downgrade Jekyll at first but the issue remained so I updated it back to 4.3.2 and downgraded Logger to 1.5.1, which is the default minimum for Gem as you can’t completely uninstall Logger from Gem.

![Cli image showing Logger and Jekyll versions](/assets/images/blog-images/gem_Logger-1-5-1_Jekyll-4-3-2.png)
