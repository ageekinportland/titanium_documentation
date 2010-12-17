<summary>
This guide will assist you in internationalizing your application for different languages.  After reading this guide,
you will understand:

* How to create internationalized strings
* Variable replacement in localized strings
* The locale-specific functions and properties in Titanium

</summary>

# Internationalization in Titanium

Titanium provides a number of JavaScript functions in the Titanium namespace for use in localization.  Also,
mirroring the Android localization file format, we provide the ability to use localized strings in your Titanium
application.  Let's see how this works.

# Resource files

At the top level of your Titanium project (the same level as tiapp.xml and the Resources directory), you will create a
folder called `i18n`.  Inside this folder, you will have folders for all the supported languages in your application, with
`en` serving as the default.

![directory](https://img.skitch.com/20101217-ei9xhehmy9mabjwk8c1444sjex.jpg)

## Resource file structure

The string resource file closely mirrors the format of Android localization files, which have an XML-based
format.  The name attribute represents the 'key' for the string, and the text inside the XML node represents the value.
A typical `strings.xml` file would look like the following:

	<?xml version="1.0" encoding="UTF-8"?>
	<resources>
		<string name="welcome_message">Welcome to Kitchen Sink for Titanium/</string>
		<string name="user_agent_message">user agent set to</string>
		<string name="format_test">Your name is %s</string>
		<string name="base_ui_title">Base UI</string>
		<string name="controls_win_title">Controls</string> 
		<string name="phone_win_title">Phone</string>
		<string name="platform_win_title">Platform</string>
		<string name="mashups_win_title">Mashups</string>
		<string name="ordered">Hi %1$s, my name is %2$s</string>
	</resources>

Resource files are processed and included with your application at build time by our Python build scripts.

## Getting a localized string

Titanium provides two functions for obtaining a localized string from your resource file.  Both take the key of the
string requested.  The `L` macro is a short form for `Ti.Locale.getString`:

	var str1 = L('welcome_message');
	var str2 = Ti.Locale.getString('welcome_message');
	// str1 === str2

## Replacing values in a localized string

The `String` object in Titanium contains a `format` function which formats strings according to the
[IEEE printf specification](http://www.opengroup.org/onlinepubs/009695399/functions/printf.html).  If your
localization string contains replacement keys, as `format_test` does in our example file above, you can replace
values into your localized string like so:

	var formatted = String.format(L('format_test'),'Kevin'); // contains 'Your name is Kevin'
	
Using the other replacement values from the printf spec, you can also do ordered values:

	var formatted = String.format(L('ordered'), 'Jeff', 'Kevin'); // contains 'Hi Jeff, my name is Kevin'

# More Locale Goodness

For more locale specific functions and features, check out the [Titanium.Locale](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Locale-module)
docs.