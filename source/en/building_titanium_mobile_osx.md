HowTo: Build Titanium Mobile on OS X
====================================

These instructions will guide you through setting up an OS X box for use with Titanium Mobile. The focus is installing the tools in locations that will work for the build system. This same configuration can be used to develop with Appcelerator released mobile SDKs.

>Note: Instructions and screen shots are from Snow Leopard.

Requirements
============

For Developing Mobile Apps
--------------------------

### Required for iPhone

- iPhone SDK

### Required for Android

- Sun Java Development Kit 6 (aka JDK 1.6) 
- Android Development Kit

For Building Titanium Mobile
----------------------------

- **Requirements from Developing Mobile Apps, plus**
- Python 2.5/2.6 _already installed_
- Scons 1.2.0.x
- Git 1.6.X

Overview
========

The Titanium Mobile development environment on OSX requires iPhone SDKs for Versions **NEED VERSIONS**, Java, the Android Development Kit (ADK), and specific platform packages in the ADK. If you plan on developing applications for only one platform then you only need that platforms tools.

### Working with iPhone

**TBD**

### Working with Android 

Google has changed their tooling as of the 1.6 release. You'll want to upgrade your Android toolkit to use the new framework which allows for downloading SDKs and updates without having to redo your directory structure with each update.

>Note: As of mobile SDK release 0.8, we are still using SDK Level 3 which is 1.5, but have switched to the newer tools which still support pulling older and newer platform kits.

Installing the iPhone SDK
-------------------------

### Verify the Install

**TBD**

You should see something similar to the image below.

![iPhone SDK Verification]()

Installing Java
---------------

Java is already installed on Leopard and Snow Leopard.

### Verify the Java Install

In the command window, execute the following command.

- `javac -version`

You should see something similar to the image below.

![Java install verification](http://img.skitch.com/20091130-xjrx9qhcg9qdqy9jts4krtujb.png)

Installing the Android Development Kit (ADK)
--------------------------------------------

Download the [ADK](android-sdk_r3-mac.zip) from the Google Android Developer site. The current version for OS X is r3. If the link fails try the [download page](http://developer.android.com/sdk/index.html)

Once you've downloaded the binary, place it in your `~/Applications` folder then extract.

- `unzip android-sdk_r3-mac.zip`

The build tools expect your ADK at `/opt/android-sdk`. You'll need to symlink it into the /opt folder. Replace USERNAME with your username.

~~~
cd /opt
sudo ln -s /Users/USERNAME/Applications/android-sdk-mac/ android-sdk
~~~

![Symlink](http://img.skitch.com/20091130-pgurud7c8jikfyurt4iwabp4gb.png)

### Download Platforms

Navigate to /opt/android-sdk/tools folder and run `android`.

~~~
cd /opt/android-sdk/tools
android
~~~

After the GUI has launched, select the *Settings option in the left column and select the **Force https://... sources to be fetched using http://...**.

![Turning on http vs https](http://img.skitch.com/20091130-e7ua4t5ffkx7bueyr9k1nieiif.png)

Click on the Available Packages option in the left column. Expand the list by selecting the small arrow to the left of the URL. You may need to click the Refresh button to download the list.

You should see a list of Packages like this.

![package list](http://img.skitch.com/20091130-rpqjt47bng6fk4jc5xje9erguc.png)

It is safe to download everything in the list, but you **must** select.

Google APIs by Google Inc., Android API 3, revision 3
SDK Platform Android 1.5, API 3, revision 3

Then click, Install Selected, accept the license agreement, and stretch for a moment while it downloads.

![Downloading](http://img.skitch.com/20091130-kawh17xcrbc5x28pfek2f2m7tj.png)

After the installation finishes close the installer.

### Add the ADK to your PATH

The Android tools are needed in your path. In your home directory, edit your `.profile` or `.bash_profile` with your favorite text editor and insert the following lines.

> Note: We require the 1.5 tools so that we can build an application that will run on all of the currently shipping platforms. Therefore, make sure to put platforms/android-1.5 in the path and not one of the other platforms.

~~~
PATH=/opt/android-sdk/tools:$PATH
PATH=/opt/android-sdk/platforms/android-1.5/tools:$PATH

export PATH
~~~

![Image of editor with path edits](http://img.skitch.com/20091130-etn42tyhy6atxw1cgew18usf7x.png)

### Verify the ADK Install

From a new command window run the following two commands

- `aapt v`
- `android list`

You should see something similar to the output shown below.

![verify ADK](http://img.skitch.com/20091130-xxtupfq5mqc7jhdrf12ipxiqxj.png)

Developing for Android Installation Complete
--------------------------------------------

All the tools necessary for using the ADK with Titanium Developer are in place. When you create a Titanium Mobile application, Developer will be able to find the tools it needs to compile your application, run the emulator, and install your app.

Installation for Building Titanium Mobile
=========================================

Building Titanium Mobile from source is straight-forward and relatively simple. We need a few tools installed: Python, Scons, and Git. Scons is a build utility written in Python and Git allows you to pull the source from the Appcelerator repository on GitHub.

Install Python 2.5/2.6
----------------------

Python is installed by default.

### Verify the Python Install

From a new command window, execute the following command.

- `python --version`

You should see something similar to the image below.

![Verifying python install](http://img.skitch.com/20091130-qfrtyii39mqaurdc2g1a6fxwmw.png)

Install Scons 1.2.0.x
---------------------

First, find the latest scons version - right now, it's 1.2.0.1.2.0.d20090919. [Download](http://sourceforge.net/projects/scons/files/scons/1.2.0.d20090919/scons-1.2.0.d20090919.zip/download) Then, install scons using the following commands:

~~~
unzip scons-1.2.0.d20090919.zip
cd scons-1.2.0.d20090919
sudo python setup.py install
~~~

### Verify the Scons Install

In the command window, execute the following command.

- `scons -version`

You should see something similar to the output below.

~~~
$ scons -version
SCons by Steven Knight et al.:
	script: v1.2.0.d20090919.r4369[MODIFIED], 2009/09/19 16:58:54, by scons on scons-dev
	engine: v1.2.0.d20090919.r4369[MODIFIED], 2009/09/19 16:58:54, by scons on scons-dev
Copyright (c) 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009 The SCons Foundation

~~~

![Scons install verification](http://img.skitch.com/20091130-psdhexup6mkmyc2ch1ekqqtn8e.png)

Install Git 1.6.X
-----------------

Download Git from [here](http://git-osx-installer.googlecode.com/files/git-1.6.5.2-intel-leopard.dmg). If that link is broken go to the main [download page](http://git-scm.com/download) and get the Intel binary.

Install Git using the following command by executing `git-1.6.5-2.intel-leopard.pkg` and then executing `setup git PATH for non-terminal programs.sh`

[Git installer](http://img.skitch.com/20091130-enakrg3k3d7iuxu8ej5pt7k5y7.png) 

### Verify the Git Install

In the command window, execute the following command.

- `git --version`

You should see something similar to the image below.

![Git install verification](http://img.skitch.com/20091130-rmywe4e2sr3qne1xpecuby36w6.png)

Building Titanium Mobile Installation Complete
==============================================

All the tooling required for building Titanium Mobile is now installed.

TBD: using git, scons