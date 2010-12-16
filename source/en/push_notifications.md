<summary>
This guide covers using Apple Push Notification Services (APNS) with Urban Airship in your application. After reading it, you should be familiar with:

* Configuring your Application for APNS
* Setting up your Urban Airship account
* How to consume APNS messages in your Application
* Sending Push Notifications to Urban Airship
* Additional things that you can do with Urban Airship

</summary>


### Create your Application
Create your application using Titanium Developer - make sure that you take note of your appid

![create app in titanium](../assets/images/guides/push_notifications/08.png)

### Configure Your Application with Apple Provisioning
Log into Apple's provisioning portal and create a new appid.  Take note of your bundle identifier or appid, use the same one form the last step

![provision app with apple](../assets/images/guides/push_notifications/01.png)

When you create your application, you need to configure it and enable push notifications.  In your application list, click configure for the app you just created.

![configure app list](../assets/images/guides/push_notifications/02.png)

Now check the box to enable the notification service and click the configure box next to "Development Push SSL Certificate".  Note that usually you setup 2 different certificates - one for development and one for production.  This maps directly to your development provisioning profile and distribution provisioning profile.

![configure app detail](../assets/images/guides/push_notifications/03.png)

This will prompt us for a certificate

![generate signing request prompt](../assets/images/guides/push_notifications/04.png)

On your machine, open up your keychain and then click "Request a Certificate from a Certificate Authority..."

![keychain create request](../assets/images/guides/push_notifications/05.png)

Put in your email address and common name and make sure that you check "Saved to disk"

![keychain save request](../assets/images/guides/push_notifications/06.png)

Now in your browser, select the certificate request we just generated and submit the request.  Once its been uploaded, you will see a status of pending, just refresh until the download button appears.

![apple download cert](../assets/images/guides/push_notifications/09.png)

Click the download button for the certificate and once downloaded to your local machine, open it.  This will bring up your keychain app with the certificate listed.  

![keychain list cert](../assets/images/guides/push_notifications/10.png)

Right click the certificate and click "Export Apple Development Push Services: xxxx"

![keychain export cert](../assets/images/guides/push_notifications/11.png)

When you export, p12 format will work just fine (the default)

![export cert type](../assets/images/guides/push_notifications/12.png)

You will be prompted for a passphrase for the p12 file, you should definitely put something in here (urban airship requires this).  Make sure that you take note of the passphrase as we'll need that later

![enter passphrase](../assets/images/guides/push_notifications/13.png)


### Setting up your Urban Airship account
Register for an account on [http://urbanairship.com](http://urbanairship.com).  Once you've logged in, click the apps tab and at the bottom, fill in your "Application name" - your appid from before.  Also click and include your p12 export from the last step as your "Apple push certificate".  Dont forget your passphrase for the "Certificate Password".  Click "creat your app".

![configure urban app](../assets/images/guides/push_notifications/14.png)

We now need to get the following for the next step:

* key 
* secret
* master secret


In the details tab of your application, click the show link next to these entries and copy them.

![get urban keys](../assets/images/guides/push_notifications/16.png)

### How to consume APNS messages in your Application
We are now ready to code the application (finally).  In your application, put in the logic to consume APNS messages.  We have written a wrapper object for urban airship's webservice and included the javascript file as [urbanairship.js](../assets/javascripts/guides/push_notifications/urbanairship.js) the [app.js](../assets/javascripts/guides/push_notifications/app.js) is also provided as well.  For a full listing of the webservice API check out the docs at [http://urbanairship.com/docs/](http://urbanairship.com/docs/).  

You will need to setup the UrbanAirship object replacing the "xxx" values with your keys from the last section.
~~~
Ti.include('urbanairship.js');

UrbanAirship.key='xxx';
UrbanAirship.secret ='xxx';
UrbanAirship.master_secret='xxx';
UrbanAirship.baseurl = 'https://go.urbanairship.com';
~~~


You will make a call to Ti.Network.registerForPushNotifications.  Which will regiter the app with APNS.  

* In the **success** function you will make a call to urban airship to register the device with Urban Airship (UrbanAirship.register).  Do not worry about the params variable right now, we'll get into that later. 
* In the **callback** function you will put a handler for when you receive a push notification message receive a push notification, we create an alert and show it in the callback function parameter.  

<br/>
~~~
Ti.Network.registerForPushNotifications({
  types: [
    Ti.Network.NOTIFICATION_TYPE_BADGE,
    Ti.Network.NOTIFICATION_TYPE_ALERT,
    Ti.Network.NOTIFICATION_TYPE_SOUND
  ],
  success:function(e) {
    var deviceToken = e.deviceToken;
    Ti.API.info('successfully registered for apple device token with '+e.deviceToken);
    var params = {
      tags: ['version'+Ti.App.getVersion()],
      alias: alias.value
    };
    UrbanAirship.register(params, function(data) {
      Ti.API.debug("registerUrban success: " + JSON.stringify(data));
    }, function(errorregistration) {
      Ti.API.warn("Couldn't register for Urban Airship");
    });
  },
  error:function(e) {
    Ti.API.warn("push notifications disabled: "+e);
  },
  callback:function(e) {
    var a = Ti.UI.createAlertDialog({
      title:'New Message',
      message:e.data.alert
    });
    a.show();
  }
});  
~~~


### Sending Push Notifications to Urban Airship
To test this, you cannot run your application in the emulator - push notifications must be run on a phone.  First launch your application on your device and enter in a simple alias name (ex: 'az') and click the register button.  

<img src="../assets/images/guides/push_notifications/19.png" height="450" width="300" alt="run app">
<br/>

Now open up your urban airship web admin.  Click on your application and click the "Push Notifications" tab and then the "Device Tokens" item.  You should see something like below for your device.  You'll notice that we have included the alias and the tags parameters when we registered the device which are optional for Urban Airship, we'll cover more on this in the next section.

![device token](../assets/images/guides/push_notifications/17.png)

We are now ready to send a test message to your device.  For this scenario, lets send a broadcast message.

![send message](../assets/images/guides/push_notifications/21.png)


You should see something like this on your device

<img src="../assets/images/guides/push_notifications/20.png" height="450" width="300" alt="recieve message">
<br/>

Obviously using the Urban Airship admin to send messages is not something that you will probably do in production.  Urban Aiship has exposed a RESTful service that you can remotely invoke.  For more information on how to send messages to Urban Airship, check out [http://urbanairship.com/docs/](http://urbanairship.com/docs/). 

### Additional things that you can do with Urban Airship
Now that we have covered the basics of consuming and registering for APNS messages, there are a couple of notes that can be made.  Most likely when you register with urban airship, you will want to associate the device with an user account when the user signs in to your application.  This is what the **alias** attribute could be used for.  This way when you are sending messages to one of your users, you do not have to worry about tracking device tokens, etc and can just send a notification to that user.

Likewise you may also have multiple versions of your application deployed and want to send messages based on the application version.  For that reason we suggest including the **tags** attribute when registering.

When you no longer want to associate the user with the device, you can make a call to **UrbanAirship.unregister**.  This will still include the device token from urban airship's standpoint, but it will not be associated with an alias or tags.

![unregistered token](../assets/images/guides/push_notifications/18.png)

If for some reason you are curious what alias or tag the device is associated with, you can make a call to **UrbanAirship.getAlias**.  

<img src="../assets/images/guides/push_notifications/22.png" height="450" width="300" alt="get alias">

