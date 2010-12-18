<summary>
	This document provides guidelines on how support device orientations.
</summary>


# Supporting Device Orientations

Mobile devices can be held in a number of different orientations, especially the iPad.  This guide should help you support 
multiple device orientations in your mobile application

# The Splash Screen

iPad orientation support starts with two versions of the Splash screen image - one for landscape and one for portrait mode.
The landscape image should measure 1024 pixels by 768 pixels, with the portrait image being 768px by 1024px. Corresponding files 
must be placed into Resources/iphone folder and named as follows:

* Default-Landscape.png
* Default-Portrait.png

Image names are case-sensitive.

<note>
Landscape and portrait splash images are iPad only - Android and iPhone splash screen images
</note>

# Default Orientations

As of Titanium Mobile 1.5, there are a number of default orientations available for iOS applications:

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

You can detect the current device orientation by checking value of the Ti.UI.orientation property.
This value will match one of the orientation constants defined under the Ti.UI namespace:

* Ti.UI.PORTRAIT
* Ti.UI.UPSIDE_PORTRAIT
* Ti.UI.LANDSCAPE_LEFT
* Ti.UI.LANDSCAPE_RIGHT

An example use of this property might be to define helper functions to determine if the device is in a landscape
or portrait orientation:

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


# Handling Orientation Changes

Orientation changes can be detected by attaching an event listener for orientationchange event in the Ti.Gesture module:

<code class="javascript">
	Ti.Gesture.addEventListener('orientationchange', function (e) {
		// Put your handling code here
	});
</code>

The updated device orientation can be read from `orientation` property of the event object passed to the callback, which will
be defined as one of:

* Ti.UI.PORTRAIT
* Ti.UI.UPSIDE_PORTRAIT
* Ti.UI.LANDSCAPE_LEFT
* Ti.UI.LANDSCAPE_RIGHT

Using our helper function above, you might use the following code to redraw your application UI based on device orientation:

<code class="javascript">
	Ti.Gesture.addEventListener('orientationchange', function (ev) {
		if (Ti.Gesture.isLandscape(ev.orientation)) {
			// Update your UI for landscape orientation
		} else {
			// Update your UI for portrait orientation
		}
	});
</code>


# Changing Device Orientation Programmatically

There are two ways of changing the device orientation in JavaScript.  One can modify Ti.UI global value
or limit the number of supported orientations for a given window object.

## Changing the global orientation

First, you can change it directly by updating the value of Ti.UI.orientation property
with the appropriate orientation constant:

<code class="javascript">
	Ti.UI.orientation = Ti.UI.PORTRAIT;
</code>

This approach is recommended if you need to permanently change device orientation and
stick to it. You can accomplish the same thing using the *orientation* section of the *tiapp.xml* file (for iOS).

## Limiting supported orientation modes for a given window

You can limit allowed orientations for a `Window` object. Then device will go into the desired orientation whenever 
the window is opened:

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

You can also update `orientationModes` of existing windows (including the opened one):

<code class="javascript">
	Ti.UI.currentWindow.orientationModes = [
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];
</code>
