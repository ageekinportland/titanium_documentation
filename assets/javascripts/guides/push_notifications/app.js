Titanium.UI.setBackgroundColor('#000');
var tabGroup = Titanium.UI.createTabGroup();

var win = Titanium.UI.createWindow({  
    title:'sample',
    backgroundColor:'#fff',
    url: 'js/sample.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'sample',
    window:win
});

Ti.include('urbanairship.js');

UrbanAirship.key='xxx';
UrbanAirship.secret ='xxx';
UrbanAirship.master_secret='xxx';
UrbanAirship.baseurl = 'https://go.urbanairship.com';



win.add(Ti.UI.createLabel({
  text: 'alias name:',
  top: 20,
  left: 10,
  width: 120,
  height:25,
  textAlign: 'left',
  font: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    fontWeight: 'bold'
  }
}));

var alias = Ti.UI.createTextField({
  autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
  keyboardType:Ti.UI.KEYBOARD_EMAIL,
  hintText:'enter your alias',
  width:170,
  height:30,
  left: 130,
  top: 20,
  borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  returnKeyType:Titanium.UI.RETURNKEY_NEXT,
  clearButtonMode:Ti.UI.INPUT_BUTTONMODE_ALWAYS,
  autocorrect: false
});
win.add(alias);

var register = Ti.UI.createButton({
  title: 'register',
  top: 60,
  left: 130,
  width: 120,
  height: 25
});

register.addEventListener('click', function() {
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
  Ti.API.info('registered urban airship');
});
win.add(register);

var getAlias = Ti.UI.createButton({
  title: 'get alias',
  top: 95,
  width: 120,
  left: 130,
  height: 25
});
getAlias.addEventListener('click', function() {
  UrbanAirship.getAlias(function(data) {
    Ti.UI.createAlertDialog({
      title:'Get Alias',
      message: JSON.stringify(data)
    }).show();
  }, function(errorregistration) {
    Ti.API.warn("Couldn't register for Urban Airship");
  });
});
win.add(getAlias);


var unregister = Ti.UI.createButton({
  title: 'unregister',
  top: 130,
  width: 120,
  left: 130,
  height: 25
});
unregister.addEventListener('click', function() {
  UrbanAirship.unregister(function(data) {
    Ti.UI.createAlertDialog({
      title:'Successfully unregistered',
      message: JSON.stringify(data)
    }).show();
  }, function(errorregistration) {
    Ti.API.warn("Couldn't unregister for Urban Airship");
  });
});
win.add(unregister);

tabGroup.addTab(tab1);  

tabGroup.open();
