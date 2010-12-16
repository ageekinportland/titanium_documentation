<summary>
	This document provides guidelines on how support different device orientations.
</summary>


# Basics of Supporting Different Orientations

Application support of both portrait and landscape orientations is an Apple requirement for iPad apps,
while it is completely optional for the iPhone.

iPad orientation support starts with two versions of the Splash screen image: for landscape and portrait mode.
The formet should have 1024x768 dimensions, the later – 768x1024. Corresponding files MUST be placed into 
Resources/iphone folder and named as follows:

* Default-Landscape.png
* Default-Portrait.png

Please pay the special attention to the case of the first letters: misspelled images
would not load on the actual device (however you will see them in the case-insensitive emulator).

<note>
You do not need any of the mentioned files on the iPhone apps; so in this case the splash screen image
MUST be named Default.png even if your application is intended to work in both orientation.
</note>

Next, only if you are using Titanium Mobile SDK 1.5.0 or later, go to the tiapp.xml file in the root project
directory and make sure that it contains the following lines:

<code class="xml">
	<iphone>
		<orientations device="iphone">
			<orientation>Ti.UI.PORTRAIT</orientation>
		</orientations>
		<orientations device="ipad">
			<orientation>Ti.UI.PORTRAIT</orientation>
			<orientation>Ti.UI.UPSIDE_PORTRAIT</orientation>
			<orientation>Ti.UI.LANDSCAPE_LEFT</orientation>
			<orientation>Ti.UI.LANDSCAPE_RIGHT</orientation>
		</orientations>
	</iphone>
</code>


# Run-time Device Orientation Detection 

You can easily detect the current device orientation by checking value of the Ti.UI.orientation property.
This value equals to one of the orientation constants defined under Ti.UI namespace:

* Ti.UI.PORTRAIT
* Ti.UI.UPSIDE_PORTRAIT
* Ti.UI.LANDSCAPE_LEFT
* Ti.UI.LANDSCAPE_RIGHT

As you can see, there are two constants corresponding to landscape and portrait orientation, and we can
write some functions to automatise our checks:

<code class="javascript">
	Ti.Gesture.isLandscape = function (orient) {
		orient = orient || Ti.UI.orientation;
		return orient == Ti.UI.LANDSCAPE_LEFT ||
					 orient == Ti.UI.LANDSCAPE_RIGHT;
	};
	
	Ti.Gesture.isPortrait = function (orient) {
		orient = orient || Ti.UI.orientation;
		return orient == Ti.UI.PORTRAIT ||
					 orient == Ti.UI.UPSIDE_PORTRAIT;
	};
</code>

You can put the above code inside a separate ti-ext.js file, which you may reuse across different projects.
Now, it is really simple to detect the device orientation from anywhere in the code:

<code class="javascript">
	if (Ti.Gesture.isLandscape()) {
		alert("I am in landscape orientation!");
	} else {
		alert("I am in portrait orientation!");
	}
</code>

If you have noticed, we are anticipating a single argument for the functions. Basically, if you will call them
without any arguments, they will return current device orientation. From the other hand, you can also provide them
with an argument, which can be useful in handling orientation change events.


# Handling Orientation Changes

Orientation changes can be detected by attaching an event listener for orientationchange event of Ti.Gesture module:

<code class="javascript">
	Ti.Gesture.addEventListener('orientationchange', function (ev) {
		// Put your handling code here
	});
</code>

The updated device orientation can be read from orientation property of the supplied event object.
Its value is one of the constant defined in Ti.UI module:

* Ti.UI.PORTRAIT
* Ti.UI.UPSIDE_PORTRAIT
* Ti.UI.LANDSCAPE_LEFT
* Ti.UI.LANDSCAPE_RIGHT

If you are using our Ti.Gesture extension proposed in the previous section of the article then you can easily
check when your device come into landscape or portrait mode without hardcoding the mentioned constants each time:

<code class="javascript">
	Ti.Gesture.addEventListener('orientationchange', function (ev) {
		if (Ti.Gesture.isLandscape(ev.orientation)) {
			// Update your UI for landscape orientation
		} else {
			// Update your UI for portrait orientation
		}
	});
</code>


# Changing Device Orientation Programatically

There are two main ways of changing the device orientation: by modifying Ti.UI global value
and limiting the number of supported orientations for a given window object.

## Changing the global orientation

First, you can change it directly by updating the value of Ti.UI.orientation property
with the appropriate orientation constant

<code class="javascript">
	Ti.UI.orientation = Ti.UI.PORTRAIT;
</code>

This approach is recommended if you need to permanently change device orientation and
stick to it. In fact, you can do the same using *orientation* section of the *tiapp.xml* file,
as described in the first section of the article. This will be even more preferable, since will
allow some flexibility to support both left/right landscape orientations (or normal and upside down
portrait), so user would be able to flip the device in his hands.

For temporal orientation changes we recommend to use the second option:

## Limiting supported orientation modes for a given windows

You can limit allowed orientation for the given Window object. Then device will
go into the desired orientation whenever the window is opened on the screen

<code class="javascript">
	var win = Ti.UI.createWindow({ 
		width: '100%', 
		height: '100%',
		orientationModes: [
			Titanium.UI.LANDSCAPE_LEFT,
			Titanium.UI.LANDSCAPE_RIGHT
		]
	});
</code>

This specific window will support only landscape mode, so whenever you call win.open()
or Ti.UI.currentTab.open(win) the device will go landscape. Whenever you close close the window
(or user navigate back using navigation controller) the screen will return back to the actual
physical orientation of the device.

Of course you can also update orientationModes of the already existing windows (including the opened one):

<code class="javascript">
	Ti.UI.currentWindow.orientationModes = [
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];
</code>
