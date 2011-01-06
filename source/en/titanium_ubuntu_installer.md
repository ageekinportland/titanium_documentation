<summary>

Introducing the *Titanium Ubuntu Installer*,  an Ubuntu Desktop disk image with the Titanium development environment pre-configured that can be installed and running within 5 minutes. This guide will tell you:

* Where to get TUI's latest release
* TUI's installation process for all systems
* How to configure VirtualBox correctly for TUI
* All the useful tools included

</summary>

# About TUI

Whether you have just found Titanium and need a quick way to try it out, or you are a seasoned Titanium user who wants to avoid the pain of reinstalling their Operating System and development environment, consider using the *Titanium Ubuntu Installer* to get up and running in no time.

The "Titanium Ubunu Installer", or **TUI** for short, is a bootable disk to install a standard version of [Ubuntu Desktop 10.10](https://help.ubuntu.com/10.10/index.html), with the Titanium environment pre-installed, onto any 32-bit-compatible Intel-compatible machine. It can also be installed onto a virtual machine, using virtualization software such as Oracle's [VirtualBox](http://www.virtualbox.org/) (available free of charge) and [VMWare](http://www.vmware.com/) products.

The [Titanium Ubuntu Installation](#titanium_ubuntu_installation) section describes how to install TUI onto any platform, but this document also explains how to run it on a VirtualBox guest. With VirtualBox manager already installed, and the TUI file available locally, the author can consistently install the TUI environment onto a virtual machine and have an up-to-date version of the [Titanium KitchenSink](https://github.com/appcelerator/KitchenSink) launched in an Android emulator in less than 5 minutes from start to finish, as described in chapters 9 to 14 inclusive.

TUI's Titanium environment for Android development includes [Titanium Developer](http://www.appcelerator.com/products/download/), the [Android SDK](http://developer.android.com/sdk/index.html), the [Titanium Android SDK](http://developer.appcelerator.com/guides/en/continuous_builds.html), [Eclipse IDE](http://www.eclipse.org/) with [Google ADT](http://developer.android.com/sdk/eclipse-adt.html) and other tools and software detailed in the [TUI Useful Tools and Other Software](#tui_useful_tools_and_other_software) section. Other than where has been absolutely necessary, Ubuntu settings have not been altered from their defaults, ensuring that the user has a clean install suitable for any purpose.

# Disclaimer
<info>
We very much welcome any feedback about your experiences when using TUI. However, we regret that, at this time, the Titanium Ubuntu Installer is **not officially supported**. It comes with no guarantees and is used at the user's own risk. It is provided purely on a best-effort and goodwill basis.
</info>

# Feedback
Problems, suggestions and discussions may be raised by posting a question to the [Q&A](http://developer.appcelerator.com/questions/created). Tagging your TUI questions with `TUI` will ensure that the people interested in helping with TUI-related issues receive them by email.

# License and Distribution
Your right to use TUI is subject to [Ubuntu's License policy](http://www.ubuntu.com/project/about-ubuntu/licensing) and that of each individual software package installed on the disk image file.

All the third-party packages installed by TUI, in addition to Ubuntu's default packages, are detailed in the [TUI Useful Tools and Other Software](#tui_useful_tools_and_other_software) section. If you hold the copyright to one of these packages and believe that its license has been infringed, please contact us immediately so that we may rectify the issue.

Appcelerator makes TUI available for download from a single location, specified in the [Download](#download) section of this document. Copies available elsewhere are not endorsed by Appcelerator.

Distribution and republishing of TUI is subject to the respective distribution license of each third-party package. By distributing or republishing TUI, you take responsibility for its contents.

<note>In order for us to get an idea about how often TUI has been downloaded, and thus how popular it is over time and whether it is worth maintaining in the future, we would very much prefer that TUI is not republished elsewhere. The speed you experience when downloading TUI from our resource will hopefully be adequate, so there should be no reason to distribute it by other means.</note>

# Download
The latest version of TUI is available as a single  [TitaniumUbuntuInstaller.iso](http://titanium-ubuntu-installer.s3.amazonaws.com/TitaniumUbuntuInstaller.iso) disk image file which, at the time of writing, is about 1.6GB in size. Always check the file's hash after download, using [md5sum](http://en.wikipedia.org/wiki/Md5sum) for example, to ensure that the file was not corrupted during transfer.

# Changelog
See the [changelog](http://titanium-ubuntu-installer.s3.amazonaws.com/changelog.html) for information about TUI releases, as well as to confirm which version you have downloaded by comparing the md5 hash.

# System Requirements

The considerations involved when installing TUI are the same as installing Ubuntu using its normal installer, thus you will need to observe the published [System Requirements](https://help.ubuntu.com/10.10/installation-guide/i386/hardware-req.html).

The hardware specification of most modern systems will be adequate to at least run TUI, although performance can be optimized by having sufficient memory available to it. Precise numbers are not known, but 1GB of memory seems to be more than adequate.

## Disk Usage

The amount of disk space available on your system is the deciding factor about whether TUI can be installed. At the time of writing, TUI consumes 4150MB of disk space, but more is required in order to run it, to accommodate log files, software installation and updates, temporary files and user data files. The following screenshot, that was taken immediately after TUI was installed onto a clean system, will help you to plan your filesystem layout.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-prerequisites/screenshot_001.png)

The following shows the top-level root directory subdirectory sizes, in MB, of the same system.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-prerequisites/screenshot_002.png)

<info>
It is recommended that **a minimum** of 6GB be reserved for a TUI installation.
</info>

# Login Credentials

The Titanium environment has been configured for the **appcel** user, so you would normally just use this account with the password shown in the following table.

<table>
<tr>
	<th>User</th> <th>Password</th> <th>Type</th>
</tr>
<tr>
	<td>appcel</td>
	<td>MountainView (case sensitive)</td>
  <td>Standard user</td>
</tr>
<tr>
	<td>root</td>
	<td>MountainView (case sensitive)</td>
  <td>Administrative user</td>
</tr>
</table>

If you wish to log in to the system using the administrative user, click "other" at the login screen and enter **root**. Typically this would not be necessary, as Ubuntu will automatically request an admin password when a graphical application requires full privileges, such as when you use the `System / Administration / Synaptic` application to install software.

If you need full privileges at the command line (known in the Unix/Linux world as the "shell") you may precede a command with the `sudo` command, which stands for "Super User Do...".  You will then be prompted for appcel's password. Alternatively, also at the shell, you can use *interactive* sudo, by running `sudo -i`, to execute all commands with full access without the need for the sudo prefix.

# VirtualBox Configuration

If your machine has the resources to run both it's own programs and a virtual machine at the same time, then you may want to install some virtualization software like [VirtualBox](http://www.virtualbox.org/wiki/Downloads) to run TUI. Once VirtualBox has been installed, the rest of this section will describe how to configure a virtual machine that is capable of running TUI.

<info>At the time of writing, VirtualBox version 4.0.0 is recommended.</info>

### Oracle VM VirtualBox Manager
* Click the "New" button
![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_001.png)

### Create New Virtual Machine / Welcome to the New Virtual Machine Wizard
* Click the "Next" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_002.png)

### Create New Virtual Machine / VM Name and OS Type
* Type "Titanium Ubuntu" in the "Name" text field
* Click the "Next" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_003.png)

### Create New Virtual Machine / Memory
* Set the "Base Memory Size" slider to whatever you system can accommodate, for example 1024MB
* Click the "Next" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_004.png)

### Create New Virtual Machine / Virtual Hard Disk
* Ensure "Boot Hard Disk" checkbox is enabled
* Ensure the "Create new hard disk" radio button is enabled
* Click the "Next" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_005.png)

### Create New Virtual Machine / Welcome...Wizard
* Click the "Next" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_006.png)

### Create New Virtual Machine / Hard Disk Storage Type
* Ensure the "Dynamically expending storage" radio button is enabled
* Click the "Next" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_007.png)

### Create New Virtual Machine / Virtual Disk Location and Size
* In the "Location" text field, if preferred, replace the space in "Titanium Ubuntu" with a hyphen, giving "Titanium-Ubuntu"
* Set the desired hard disk size, using the "Size" slider. Be aware that Titanium Ubuntu will not install if this value is less than 4.2GB. A absolute minimum of 5GB is required to accommodate system log files and updates, but 6GB or more is recommended
* Click the "Next" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_008.png)

### Create New Virtual Machine / Summary
* Click the "Finish" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_009.png)

### Create New Virtual Machine / Summary
* Click the "Finish" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_010.png)

### Oracle VM VirtualBox Manager

* Select "Titanium Ubuntu" virtual machine on left, and click the "Settings" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_011.png)


### Titanium Ubuntu / Settings / System
* In "Boot Order" section, untick "Floppy" checkbox, if not needed

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_012.png)

### Titanium Ubuntu / Settings / Display
* Set the "Video Memory" slider to whatever you system can accommodate, for example 32MB

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_013.png)

### Titanium Ubuntu / Settings / Storage
* Under "Storage Tree" / "IDE Controller", select the CD icon
* On the right, under "Attributes", select the CD icon and "Choose a virtual CD/DVD disk file..."

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_014.png)

### Choose a virtual CD/DVD disk file
* Navigate to the location where you downloaded the "TitaniumUbuntuInstaller.iso" image file, select it and click the "Open" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_015.png)

### Titanium Ubuntu / Settings / Storage
* Ensure that "TitaniumUbuntuInstaller.iso" is now listed as a disk under "Storage Tree" / "IDE Controller"
* Click "OK" button to confirm all the settings changes you have made

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_016.png)

### Oracle VM VirtualBox Manager
* Review the settings of the "Titanium Ubuntu" virtual machine, using the summary on the right, to ensure you are happy with them
* Click the "Start" button, to boot the virtual machine

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-vbox-config/screenshot_017.png)

# Titanium Ubuntu Installation

### Boot TUI Disk Image
* With the machine booting from the Titanium Ubuntu Installer, wait for the menu to appear
* Use the keyboard cursor keys to select the "install" option

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_001.png)
<note>Unfortunately, the environment will not work reliably if you boot the image as a live disk. Thus, use of the "live" option is **not** recommended</note>

### Ubuntu 10.10
* Wait for the install configuration dialog to appear

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_002.png)

### Install / Welcome
* Choose your language
* Click "Forward" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_003.png)

### Preparing to install Titanium
* Without changing any options, click the "Forward" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_004.png)

### Allocate drive space
* If you are an experienced Linux user, you may configure the filesystem layout, using the information in the [Disk Usage](#disk_usage) section. Otherwise, click the "Forward" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_005.png)

### Allocate drive space
* Click the "Install Now" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_006.png)

### Where are you?
* Type your location in the text field and select from the list of options
* Click the "Forward" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_007.png)

### Keyboard layout
* Select your keyboard layout from the double-list
* Click the "Forward" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_008.png)

### Almost finished copying files
* Wait for installation to complete

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_009.png)

### Installation Complete
* Click the "Restart Now" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_010.png)

### Please remove installation media...
* If you are using VirtualBox, see steps below. Otherwise, remove the Titanium Ubuntu Installer media, and press Enter to reboot

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_011a.png)

* If using VirtualBox, power off the virtual machine by clicking the close icon (x) in the top right-hand corner

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_011b.png)

* Access VirtualBox's storage settings for your virtual machine
* Under "Storage Tree" / "IDE Controller", select the , "TitaniumUbuntuInstaller.iso" disk
* On the right, under "Attributes", select the CD icon and "Remove disk from virtual drive"
* Click "OK" button to confirm
* Boot the virtual machine using the "Start" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_012.png)

### Ubuntu login menu / Account selection
* At the login screen, click the **appcel** user to activate the password field

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_013.png)

### Ubuntu login menu / Password
* Note the locale options that appear at the bottom. Choose your preferred language and keyboard layout
* Ensure "Ubuntu Desktop Edition" is also selected
* Enter the password. Refer to the [TUI Login Credentials](#tui_login_credentials) section for this information
* Click the "Log in" button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-installation/screenshot_014.png)

# Navigate the Ubuntu Desktop

TUI uses the [GNOME](http://www.gnome.org/about/) to provide its desktop environment. The following section gives a quick tour to help give you a general idea of where things are, but much more detail is provided in the GNOME Documentation Library's [Desktop Overview](http://library.gnome.org/users/user-guide/stable/overview.html.en) and the Ubuntu Documentation's [Getting around the desktop](https://help.ubuntu.com/10.10/newtoubuntu/C/desktop.html) guide.

### Useful features
* **show / hide desktop** - minimizes and restores all running application windows
* **virtual workspace switcher** - changes between the four available virtual desktops
* **hide / show toolbar** - slides the toolbar out of view when not needed. By showing and hiding the two toolbars in alternate combinations, the toolbars can be re-ordered

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-ubuntu-desktop/screenshot_001.png)

### Applications menu
You can access all the installed programs from the **Applications** menu

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-ubuntu-desktop/screenshot_002.png)

### Places menu
You can browse the filesystem, access recent documents and connect to remote servers from the **Places** menu. When you click on some of the items it contains, such as "Home Folder", it opens the [Nautilus](http://live.gnome.org/Nautilus) file manager, which is GNOME's equivalent to Microsoft's Windows Explorer.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-ubuntu-desktop/screenshot_003.png)

### System menu
You can configure the Operating System, including install new software using the `Synaptic` tool, using the **System** menu.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-ubuntu-desktop/screenshot_004.png)

### Date and time widget
Set the system date and time, and the default timezone, using the **data and time** widget.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-ubuntu-desktop/screenshot_005.png)

### Keyboard layout widget
You can switch between different keyboard layouts on-the-fly using the **keyboard layout** widget.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-ubuntu-desktop/screenshot_006.png)

### "Power symbol" menu
You can initiate log out, restart or shut down of the system using the menu with the **power symbol**, on the far right of the toolbar. While you can also use this menu to lock the screen, the key combination `CTRL+ALT+L` is usually more convenient.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-ubuntu-desktop/screenshot_007.png)

# VirtualBox GuestAdditions Installation
If you are running TUI using virtualization software, such as VirtualBox or VMWare, you will need to install the virtual machine  drivers provided by the software vendor. These enable support for better display resolutions, seamless mode, mouse integration and shared clipboard, among other features.

The VirtualBox drivers are provided by its [GuestAdditions](http://www.virtualbox.org/manual/ch04.html) software. TUI includes this package with a custom script to make its installation easier but, if you prefer, you may follow the [Guest Additions for Linux Instructions](http://www.virtualbox.org/manual/ch04.html#id489939) to install it manually.

<warning>TUI includes version 4.0.0 of GuestAdditions. You should ensure that you install the same version of GuestAdditions as the VirtualBox Manager running on the host, or it may not work correctly</warning>

## installer.sh

* open the `useful-tools` folder, located on your desktop

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-guest-additions/screenshot_015.png)

<info>
Notice in the bottom right-hand corner of the VIrtualBox window, the words "Right Ctrl" are shown. This indicates the current "Host" key that is used for capturing and releasing the keyboard and mouse and using with VirtualBox keyboard shortcut combinations.
</info>

* navigate to the `virtualBox-GuestAdditions` folder

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-guest-additions/screenshot_016.png)

* double-click on the `installer.sh` script, and choose "Run in Terminal" from the options

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-guest-additions/screenshot_017.png)

* at the installer menu, choose "Install" by typing `1` and press enter to confirm
* type **appcel** user password and press enter

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-guest-additions/screenshot_018.png)

* ensure that no errors occurred during installation, by comparing the output with the following screenshot
* click the terminal window, to make sure it has focus, and press enter

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-guest-additions/screenshot_019.png)

* restart the machine, by opening the `Power` menu on the far-right of the toolbar and choosing from the list of options
* once the virtual machine has restarted, you should be able to resize the window and the display resolution used by the virtual machine will automatically adjust to accommodate

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-guest-additions/screenshot_020.png)

With GuestAdditions installed, you will benefit from its following main features:

* copy text between your host and TUI (the guest)
* share filesystem directories on your host with TUI, using *Shared Folders* (see following section)

## uninstaller.sh

The `uninstaller.sh` script is simply a symbolic link to the `installer.sh` script, described in the previous section. By running it and selecting option `2`, the currently-installed version of VirtualBox GuestAdditions will be removed.

`uninstaller.sh` should be capable of removing *any* version of GuestAdditions, although this has not been tested thoroughly.

Like `installer.sh`, a system restart is required in order to complete the process.

# VirtualBox Shared Folders Configuration

With VirtualBox GuestAdditions installed, you can share directories on your host so that they may be [mounted](http://en.wikipedia.org/wiki/Mount_%28computing%29) by TUI, known as *Shared Folders*.

### Shared Folders

* open the VirtualBox top menu named `Devices`, and select the `Shared Folders...` item
* select `Transient Folders`, and click the green "plus" icon on the right hand side

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_001.png)

### Add Share

* choose "Other..." from the `Folder Path` drop-down list

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_002.png)

* browse to the directory you wish to share
* click the `Open` button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_003.png)

* the `Folder Name` field will be automatically filled. Accept this or amend as desired
* select the `Read-only`, `Auto-mount` and `Make Permanent` options as required
* click `OK`

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_004.png)

* click `OK`, to confirm the changes

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_006.png)

* in the `useful-tools/virtualBox-GuestAdditions` folder, you will find a text file named `howto-mount-shared-folders.txt`, in which you will find instructions about how to mount the `Shared Folder` you have just configured

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_007.png)

After creating a virtualBox shared folder using the `Devices / Shared Folders` menu, you can mount it using the following commands in a terminal window:

<code>
sudo mkdir /mnt/myShare
sudo mount.vboxsf myShare /mnt/myShare -o fmode=0777,dmode=0777
</code>

where `myShare` is the shared folder name

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_008.png)

In this example, you can access the mounted shared folder via the `Mounted Shares` folder on the desktop, which is a symbolic link (aka shortcut) to `/mnt/`

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-shared-folders/screenshot_009.png)


# Launch Titanium's KitchenSink

Now that you have your TUI environment installed and running, use this section to help you to bring your local, pre-installed, copy of the KitchenSink git repository up-to-date and launch it in an Android emulator.

## titanium-kitchensink-updater.sh

* navigate to the `useful-tools / user-scripts / bin` folder on the desktop
* double-click on the `titanium-kitchensink-updater.sh` script, and choose "Run in Terminal" from the options

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-kitchensink/screenshot_001.png)

* at the installer menu, read the warnings, and then choose "Proceed" by typing `1` and press enter to confirm
* if a password is requested, type the **appcel** password and press enter

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-kitchensink/screenshot_002.png)

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-kitchensink/screenshot_003.png)

## Titanium Developer

* start Titanium Developer using its icon on your desktop
* Sign Up if you don't have an Appcelerator account, or Sign In using your usual email address and password
* select `KitchenSink` from the left-hand panel
* select `Test & Package` from the three tabs
* click the `Launch` button

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-kitchensink/screenshot_004.png)

## Android Emulator

Once the Launch button is clicked, the Android emulator should boot up automatically. If it has not displayed within a couple of minutes, click the launch button in Titanium Developer again.

* unlock the virtual android device by clicking on the lock icon in the green circle with your mouse and sliding it right, towards the speaker icon.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-kitchensink/screenshot_005.png)

When Titanium Developer outputs a message **"Application should be running"**, you should see the KitchenSink running on the virtual device. If this is not the case, click the launch button in Titanium Developer again.

<note>On first boot of the emulator, unfortunately, it can sometimes take up to three attempts (although no more than that) to get an application running on the device.</note>

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-kitchensink/screenshot_006.png)

## Eclipse

The [Eclipse](http://www.eclipse.org/) Integrated Development Environment (IDE) has been installed and configured for Javascript and Android development.

* launch Eclipse using its icon on the desktop
* click the `Javascript` button in the top right-hand corner, right-click on the KitchenSink project on the left and "Open Project". You will observe syntax highlighting for `.js` (javascript) files and syntax validation (in the "Problems" tab at the bottom)
* click the `DDMS` button in the top right-hand corner and select the emulator in the "Devices" section on the left. Select the "File Explorer" tab to navigate the Android virtual device's filesystem. Click the "LogCat" tab to see the emulator's debugging output

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-kitchensink/screenshot_007.png)

# Troubleshooting

## titanium-quickfix.sh

When you encounter a situation where your application will not launch, and you have checked Titanium Developer's `Trace` output on the "Run Emulator" screen, or adb's logcat output, to confirm that it is not caused by an exception generated by your own code, TUI's `titanium-quickfix.sh` may be able to resolve it:

* open the `useful-tools` folder on the desktop
* navigate to `/home/appcel/Desktop/useful-tools/user-scripts/bin/`
* double-click on the `titanium-quickfix.sh` file
* choose "Run in Terminal" from the options
* enter the appcel password, if requested
* read the warnings and disclaimer
* press `1` and enter to proceed

When the script has finished, try to launch the application again.

# TUI's Useful Tools

The software, tools and scripts described in this section are either vital, due to Titanium's reliance of them, or just extremely useful when performing day-to-day development tasks. If there are any others that you feel TUI should include, please let us know via a [Q&A](http://developer.appcelerator.com/questions/created) post.

## Titanium Developer and SDK

[Titanium Developer](http://www.appcelerator.com/products/download/) can be launched using its icon on the desktop.

You will be automatically notified when a new major version of the Titanium Mobile SDK is released, and Titanium Developer will install it with your authorization. You may also install the interim development releases, known as the Continuous Builds, by following [these instructions](http://developer.appcelerator.com/guides/en/continuous_builds.html).

## Android SDK and AVD Manager

The Android Virtual Device (AVD) manager can be launched using its icon on the desktop. This allows you to update the Android SDK with new packages when they are released.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-tools-and-software/screenshot_001.png)

It is also useful to confirm that the virtual devices created by Titanium can be booted successfully, by selecting one and clicking the "Start..." button.

## Eclipse

The [Eclipse ADT Plugin](http://developer.android.com/sdk/eclipse-adt.html) can be accessed in Eclipse by clicking on the `DDMS` perspective button in the top-right-hand corner of the IDE. See the [Eclipse](#eclipse) section for a demonstration.

Eclipse has also been configured with Javascript syntax highlighting and validation, which can be accessed by clicking on the `Javascript` button when a project is open.

The following commonly-needed plugins have been included.

<table>
<tr>
	<th>Package</th> <th>Source</th>
</tr>
<tr>
  <td>
	eclipse-dltk<br />
	eclipse-dtp<br />
	eclipse-pdt<br />
	eclipse-wtp<br />
	eclipse-gef
  </td>
  <td>
	<a href="http://blog.yogarine.com/2009/10/eclipse-plugin-packages-for-ubuntu.html">yogarine.com</a>
  </td>
</tr>
</table>

## logcat.sh and coloredlogcat.py

When your application is running in an emulator, open a terminal and run `logcat.sh`. This will invoke the [coloredlogcat.py](http://jsharkey.org/blog/2009/04/22/modifying-the-android-logcat-stream-for-full-color-debugging/) script, which is responsible for displaying the `/opt/android-sdk/tools/adb` output with useful colored formatting, as follows.

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-tools-and-software/screenshot_004.png)

You can customize the `adb` output by modifying `/home/appcel/Desktop/useful-tools/user-scripts/bin/logcat.sh`.

## gitlog.sh

After running the [titanium-kitchensink-updater.sh](#titanium-kitchensink-updater.sh) script, you can open a terminal, change to the local KitchenSink repository's directory, and run `gitlog.sh` to see its recent list of code changes. For example:

![screenshot](../assets/images/guides/titanium_ubuntu_installer/tui-tools-and-software/screenshot_003.png)


## Terminator

The [Terminator](http://software.jessies.org/terminator/) terminal emulator provides the following useful features when working at the shell:

<table>
<tr>
	<th>Keyboard Shortcut</th> <th>Result</th>
</tr>
<tr>
  <td>ALT+t</td>
  <td>New tab</td>
</tr>
<tr>
  <td>ALT+f</td>
  <td>Find text</td>
</tr>
<tr>
  <td>ALT+k</td>
  <td>Clear screen</td>
</tr>
</table>


# TUI's Other Software

## Python packages

The following packages are necessary to build some of Titanium's documentation projects.
<table>
<tr>
	<th>Package</th> <th>Source</th>
</tr>
<tr>
  <td>
	python Pygments<br />
	python elementTree<br />
  </td>
  <td>
	via <a href="http://packages.python.org/distribute/easy_install.html">python setuptools / easy_install</a>
  </td>
</tr>
</table>

## remastersys

Remastersys is a powerful tool for backing up entire linux-based filesystems to a single `.iso` file format.

<table>
<tr>
	<th>Package</th> <th>Source</th>
</tr>
<tr>
  <td>
	remastersys
  </td>
  <td>
	<a href="http://www.geekconnection.org/remastersys/">www.geekconnection.org</a>
  </td>
</tr>
</table>


## Ubuntu installed packages

The following table lists the third-party packages included with TUI that are not automatically installed on a default installation of Ubuntu.

<table>
<tr>
	<th>Package</th> <th>Source</th>
</tr>
<tr>
  <td>
	build-essentials<br />
	git<br />
	gitk<br />
	gparted<br />
	python-setuptools<br />
	scons<br />
	smbfs<br />
  </td>
  <td>
	<a href="http://www.ubuntu.com/project/about-ubuntu/components">Ubuntu Main Repo</a>
  </td>
</tr>
<tr>
  <td>
	  eclipse (3.5.2)<br />
	  eclipse-emf<br />
	  gcolor2<br />
	  hardinfo<br />
	  markdown<br />
	  meld<br />
	  python-markdown<br />
	  python-pip<br />
	  regexxer<br />
	  scite<br />
	  screenruler<br />
	  shutter<br />
	  sqlitebrowser<br />
	  sqliteman<br />
	  xchat
  </td>
  <td>
		<a href="http://www.ubuntu.com/project/about-ubuntu/components">Ubuntu Universe Repo</a>
  </td>
</tr>
<tr>
  <td>
	sun-java6-jdk (version 6, 32-bit)
  </td>
  <td>
		<a href="http://archive.canonical.com/ubuntu">Ubuntu Canonical Partners Repo</a>
  </td>
</tr>
</table>

## Ubuntu removed packages

Of the default packages installed on a standard installation of Ubuntu, the following have been omitted from TUI to minimize the disk image download time:

* OpenOffice, including all components
* All packages listed in the `Applications / Games` desktop menu

These can be installed on your system using the `Synaptic` software installation tool.

# Credits and Thanks

The team that develops the Titanium Open Source project appreciates the talents of the people behind all the other Open Source projects that make TUI possible, some of whom are as follows:

* The [Ubuntu team](http://www.ubuntu.com/project/about-ubuntu) and all of its contributors
* The Google Android Team for the [Android SDK](http://developer.android.com/sdk/index.html) and [Eclipse ADT Plugin](http://developer.android.com/sdk/eclipse-adt.html)
* The Eclipse Foundation and its third-party plugin contributors for the [Eclipse IDE](http://www.eclipse.org/)
* [Oracle](http://www.oracle.com) for [VirtualBox Guest Additions](http://download.virtualbox.org/virtualbox/4.0.0/)
* The [Python Foundation](http://www.python.org/) and it's third-party package contributors
* The Terminator Team for the [Terminator](http://software.jessies.org/terminator/) terminal emulator
* Jeff Sharkey for [coloredlogcat](http://jsharkey.org/blog/2009/04/22/modifying-the-android-logcat-stream-for-full-color-debugging/)
* Mario Kemper and Vadim Peretokin for their [Shutter Screenshot Tool](http://shutter-project.org)
* The regexxer team for the text [regexxer file search and replace tool](http://regexxer.sourceforge.net/)
* The Scintilla team for the [Scite](http://www.scintilla.org/SciTE.html) text editor
* The remastersys team for [remastersys](http://www.geekconnection.org/remastersys/), the backup and system copy tool
* Linus Torvalds and the Git Team for the [Git Version Control System](http://git-scm.com/)


# To do

* remove unneeded ubiquity launcher icon from desktop
* update README FIRST launcher on desktop with published guide URL
* contact vendors/developers of tools included in TUI, to confirm there are no license restrictions to distributing their software
