<summary>
This guide will prepare you to work with local data sources in a Titanium mobile application.  By the end of
this guide, you should understand:

* The different modes of local storage and when to use each
* How to use application properties
* How to store and retrieve data from the local filesystem
* How to interact with a local SQLite database

</summary>

# Working With Local data

Even the most rudimentary applications usually have some data storage requirements. As always, Titanium provides access to all the native functionality via its convenient, uniform interface. To use a device's local storage, the following objects are needed:

* `Titanium.App.Properties` is ideal for storing application-related settings
* `Titanium.Filesystem` facilitates file and directory manipulation
* `Titanium.Database` gives access to local SQLite3 databases


Each of these enable data to persist on a device across application restarts, power cycles, reinstallation and even migration to a new device.

## What kind of data storage should I use?

The decision about which of the three local storage options you choose is usually determined by the following:

1. **Application Properties**: used when one or all of the following is true:
    * the data consists of simple key/value pairs
    * the data is related to the application rather than the user
    * the data does not require other data in order to be meaningful or useful
    * there only needs to be one version of the data stored at any one time
2. **Filesystem**:  used when one or all of the following is true:
    * the data is already provided in file format
    * the data is an image file
3. **Database**: used this when one or all of the following is true:
    * there are many similar data items
    * items of data relate to each other
    * you require flexibility over how the data will be presented when you retrieve it
    * the data accumulates over time, such as transaction, logging or archiving data

<note>
Although the local database has the capability to store images in blob (binary) format, this won't lead to optimal performance from your application. Instead, use `Titanium.Database` to store the image file path and name in the database, and `Titanium.Filesystem` to manage the physical files.

To keep the local filesystem organized, and thus easier to manage and backup, it's good practice to keep similar files, like these images, in the same location. That said, properties may be a good candidate for storing this filesystem path, common to all your application's images, as it would be considered an application setting.
</note>

# Application Properties

<info>
Both iOS and Android store properties in special files on the filesystem. Natively, iOS properties are known as `NSUserDefaults`, which are stored in `.plist` files in the application's library directory. Android stores them in standard xml text files at `/data/data/com.domainname.appname/shared_prefs/titanium.xml`.

An application's property data is loaded into memory as the application launches, and exists there until it closes. This allows very rapid access to it, but at the cost of the increased baseline memory used by the application.
</info>

## Reading and Writing Properties

`Titanium.App.Properties` has six sets of get/set methods for handling six different data types:

* **getBool() / setBool()**: for booleans (true, false)
* **getDouble() / setDouble()**: for double-precision floating point numbers
* **getInt() / setInt()**: for integers
* **getList() / setList()**: for arrays
* **getString() / setString()**: for strings

The *get* methods accept a property name and its default value. Thus, if a property has never been set before, the default value will be returned. Each *set* method requires a property name and property value pair. All of these methods are demonstrated below:

<code class="javascript">
var window = Titanium.UI.createWindow({
    backgroundColor:'#999'
});
var myArray = [
	{name:'Name 1', address:'1 Main St'},
	{name:'Name 2', address:'2 Main St'},
	{name:'Name 3', address:'3 Main St'},
	{name:'Name 4', address:'4 Main St'}
];
Ti.App.Properties.setString('myString','This is a string');
Ti.App.Properties.setInt('myInt',10);
Ti.App.Properties.setBool('myBool',true);
Ti.App.Properties.setDouble('myDouble',10.6);
Ti.App.Properties.setList('myList',myArray);
// **********************************************
// Notice the use of the second argument of the get* methods below
// that would be returned if no property exists with that name
// **********************************************
Ti.API.info("String: "+Ti.App.Properties.getString('myString','This is a string default'));
Ti.API.info("Integer: "+Ti.App.Properties.getInt('myInt',20));
Ti.API.info("Boolean: "+Ti.App.Properties.getBool('myBool',false));
Ti.API.info("Double: "+Ti.App.Properties.getDouble('myDouble',20.6));
Ti.API.info("List: "+Ti.App.Properties.getList('myList'));
window.open();
</code>

This code outputs the following results:

<pre>
String: This is a string
Integer: 10
Boolean: true
Double: 10.600000381469727
List:
  {  'address' :  '1 Main St' 'name' :  'Name 1', },
  {  'address' :  '2 Main St' 'name' :  'Name 2', },
  {  'address' :  '3 Main St' 'name' :  'Name 3', },
  {  'address' :  '4 Main St' 'name' :  'Name 4', }
</pre>

## Storing JS objects as JSON in properties

If you have a complex Javascript object, you can convert it to a [JSON](http://en.wikipedia.org/wiki/JSON) string using `JSON.stringify()` provided by [Titanium.JSON](http://developer.appcelerator.com/apidoc/desktop/latest/Titanium.JSON), which will allow you to store it in the database using the [Titanium.App.Properties.setString()](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.App.Properties.setString-method.html) method.

<code class="javascript">
var window = Titanium.UI.createWindow({
    backgroundColor:'#999'
});
var weatherData =
{
	"reports" : [
    {
        "city": "Mountain View",
        "condition": "Cloudy",
        "icon": "http://www.google.com/weather/cloudy.gif"
    },
    {
        "city": "Washington, DC",
        "condition": "Mostly Cloudy",
        "icon": "http://www.google.com/weather/mostly_cloudy.gif"
    },
    {
        "city": "Brasilia",
        "condition": "Thunderstorm",
        "icon": "http://www.google.com/weather/thunderstorm.gif"
    }
  ]
};
Ti.App.Properties.setString('myJSON', JSON.stringify(weatherData));
var retrievedJSON=Ti.App.Properties.getString('myJSON', 'myJSON not found');
Ti.API.info("The myJSON property contains: " + retrievedJSON);
window.open();
</code>

This will output the following to the log:

<pre>
The myJSON property contains: {"reports":[{"icon":"http:\/\/www.google.com\/ig\/images\/weather\/cloudy.gif","condition":"Cloudy","city":"Mountain View"},{"icon":"http:\/\/www.google.com\/ig\/images\/weather\/mostly_cloudy.gif","condition":"Mostly Cloudy","city":"Washington, DC"},{"icon":"http:\/\/www.google.com\/ig\/images\/weather\/thunderstorm.gif","condition":"Thunderstorm","city":"Brasilia"}]}
</pre>

This stored JSON string can later be converted back to a Javascript object using `JSON.parse()`:

<code class="javascript">
var myObject = JSON.parse(Ti.App.Properties.getString('myJSON'));
</code>

# Filesystem Storage

Titanium makes it simple to perform basic filesystem [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations.  Before we dive into an example let's review a few of the most commonly used properties and methods:

#### Objects

* [Titanium.Filesystem](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Filesystem-module) is the top level Filesystem module used for reading and saving files and directories on the device.
* [Titanium.Filesystem.File](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Filesystem.File-object.html) is the file object which supported common filesystem based operations such as create, read, write, delete, etc.

#### Properties

* Data storage locations:
    * **applicationDataDirectory**: A read-only constant that indicates where your application data directory is located.  Place application-specific files in this directory.
    * **resourcesDirectory**: A read-only constant where your application resources are located
    * **tempDirectory**: A read-only constant that indicates where your application can place temporary files

#### Methods

* **getFile()**: return a fully-formed file path as a Titanium.Filesystem.File object
* **deleteFile()**: delete the file
* **exists()**: return true if the file or directory exists on the device
* **extension()**: return the file extension
* **move()**: move the file to another path
* **rename()**: rename the file
* **nativePath()**: return the fully resolved native path
* **read()**: return the contents of file as blob
* **write()**: write the contents to file
* **writeable()**: return true if the file is writeable
* **spaceAvailable()**: return boolean to indicate if the path has space available for storage

## Writing files

This is best explained with a basic example.  We'll start off by creating a dummy JavaScript object that we'd like to store:
<code class="javascript">
var dataToWrite = {"en_us":{"foo":"bar"}};
</code>

Next we create a new directory:
<code class="javascript">
//NOTE: remember to use applicationDataDirectory for writes
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
newDir.createDirectory();
Ti.API.info('Path to newdir: ' + newDir.nativePath);
</code>

Let's add a new file within the newly created directory:
<code class="javascript">
var newFile = Titanium.Filesystem.getFile(newDir.nativePath,'newfile.json');
</code>

An empty file is nice and all, but it would be even better with some data.  Our **dataToWrite** object must be serialized before we can write it to a file, just as we did with Application Properties above, using [Titanium.JSON](http://developer.appcelerator.com/apidoc/desktop/latest/Titanium.JSON). Lets fill it with the JavaScript object:

<code class="javascript">
//Stringify the JavaScript object we created earlier and write it out to the new file
newFile.write(JSON.stringify(dataToWrite));
</code>


## Reading files

What if we wanted to update the value of dataToWrite.en_us.foo?  For this we:

1. Read the file
2. Deserialize the object stored within the file
3. Update the property in question
4. Serialize the object
5. Write back the serialized object

<code class="javascript">
var newFile = Titanium.Filesystem.getFile(newDir.nativePath,'newfile.json');
var resources = JSON.parse(newFile.read().text);

resources.en_us.foo = 'baz'; //bar becomes baz
newFile.write(JSON.stringify(resources));
</code>

## Removing files

Nobody likes a mess.  Lets cleanup after ourselves.  First we'll remove the file and then directory:

<code class="javascript">
//We already have references to the file and directory objects.
//We just need to call their cooresponding delete methods.
newFile.deleteFile();
newDir.deleteDirectory();
</code>

The full gist for this example is available [here](https://gist.github.com/737045).

# SQLite Databases

SQLite3 is version 3 of SQLite's SQL-based relational database management system (RDMS), chosen by Apple, Google and RIM to provide local data storage on their mobile devices.

SQLite is currently the world's most widely-used database. It owes it's popularity to its open source code, low resource footprint and, as it does not rely on any installed services unlike almost all other DBMSs, its simplicity of setup and maintenance.

There are a few things to note when you first work with SQLite, that may influence the way you develop with it:

* its database file is a simple text file. There is no granular security or user privileges for data. As much of it is not encoded, anyone with filesystem access to it may read its contents
* there are only five underlying data types; TEXT, NUMERIC, INTEGER, REAL, NONE. [Datatypes In SQLite](http://www.sqlite.org/datatype3.html) explains them in more detail
* as it stores binary objects (BLOBs) using a text representation of them, access to BLOBs is not optimal. Thus, it's recommended to store in the database only the location of binaries, rather than the binaries themselves
* while the database supports concurrent read access, only one user may write to it at a time. This is because a filesystem lock is placed on the file during write operations
* referential integrity is not enabled by default. See [SQLite Foreign Key Support ](http://www.sqlite.org/foreignkeys.html) for more information
* RIGHT and FULL OUTER JOINs are not supported
* there is limited ALTER TABLE support; columns may not be modified or deleted

For a quick summary of what makes SQLite different, see this [Distinctive Features](http://www.sqlite.org/different.html) document.

## SQL basics and further reading on SQLite

Due to the large numbers of developers working with SQLite, there is no shortage of information about it on the web. However, these are some resources which we feel would be helpful to new users:

* [SQLite Official Homepage](http://www.sqlite.org/)
* [SQLite Getting Started](http://www.sqlite.org/sqlite.html)
* [SQLite Video Tutorial](http://www.youtube.com/profile?user=Jaynonymous1#p/c/463DF6FFEF8D05FA/8/NYlCVoj4peg)
* the [Third Party Tools](tool_thirdparty.html) guide contains some suggestions of graphical tools to make working with SQLite easier

Furthermore, there is always a friendly crowd in the #sqlite channel on the freenode IRC server.

Titanium provides access to SQLite via its [Titanium.Database](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Database-module) module that returns the [Titanium.Database.DB](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Database.DB-object.html) object, for installing and opening databases and executing queries, and the [Titanium.Database.ResultSet](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Database.ResultSet-object.html) object, which holds the data returned from those queries.

## Creating a database

To open a database file, instantiate the `Titanium.Database` object with its `open()` or `install()`methods.

<code>
var db = Ti.Database.open('weatherDB');
</code>

Using `open()` will open a database file "in place", at the filesystem location specified in its argument. If a relative path, or simply the database filename, is given in the argument, the device will attempt to access it in the database directory reserved for the application. On android, this is `applicationDataDirectory/../databases/`, thus residing in the same parent directory as the `applicationDataDirectory`. If a database file does not already exist there with the same name, a new, empty (except for some system tables) SQLite database file will be automatically created.

Once the file exists, some tables may be created using the `execute()` method:

<code>
	db.execute('CREATE TABLE IF NOT EXISTS city (id INTEGER PRIMARY KEY, name VARCHAR(16) NOT NULL, continent VARCHAR(16) NOT NULL, temp_f VARCHAR(4), temp_c VARCHAR(4), condition_id INTEGER NOT NULL)');
	db.execute('CREATE TABLE IF NOT EXISTS condition (id INTEGER PRIMARY KEY, summary VARCHAR(16) NOT NULL, icon TEXT NOT NULL)');
</code>

The `IF NOT EXISTS` part of these statements is standard SQLite syntax to ensure that when tables exist, regardless of whether they contain data or not, they will not be overwritten.  Hence, it's commonplace to run them when an application starts, to ensure that an application won't fail due to a missing database file or table structure.

## Pre-populating a database

### Include it in the application package

If you have a database that already contains data that you want to use for your application, there are a couple of ways that you can utilize it.

The first is to embed it in the application package that you will distribute, by storing it during development in the Titanium's Resources directory or one of its descendents. As the resources directory is read-only, the database cannot be deleted once the application has been packaged.

Unlike the `open()` method, `install()` will copy the file you pass to it to the `applicationDataDirectory/../databases/` folder, resulting in two copies of this file. If a file already exists with the same name, the copy action will silently fail.

<code>
var db = Ti.Database.open('/mydata/weatherDB');
</code>

In this example, weatherDB is stored in the `Resources/mydata/` directory.

If timeliness of your data is crucial to your application's usefulness, consider whether it is appropriate to ship the application with a full database when it will be replaced soon after it's installed.

### Download from a remote resource

As an alternative to the above, an option is to ship a "skeleton" database file; this is a database with the minimum amount of data required for the application to run. Then, on first boot, ask the user's authorization to download a replacement from a remote source, using the following method:

<code>
buttonInstallRemote.addEventListener('click', function(){
	var fileWeatherDB = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'../databases/'+filename);
  var c = Ti.Network.createHTTPClient();
  c.setTimeout(10000);
  c.onload = function(e)
  {
    fileWeatherDB.write(this.responseData);
    Ti.API.info("ONLOAD = "+e);
    Ti.UI.createAlertDialog({title:'Info', message:'Database installed', buttonNames: ['OK']}).show();
  };
  c.onerror = function(e)
  {
    Ti.UI.createAlertDialog({title:'Error', message:'Error: ' + e.error, buttonNames: ['OK']}).show();
  };
  c.open('GET','http://developer.appcelerator.com/guides/assets/images/guides/local_data/weatherDB');
  c.send();
});
</code>

## Storing data

In order to insert records to a database, you should pass an SQL `INSERT` statement to the `execute()` method, using question marks as placemarkers where you would like each variable containing your data to be substituted, as follows:

<code>
db.execute('INSERT INTO city (name,continent,temp_f,temp_c,condition_id) VALUES (?,?,?,?,?)',importName,importContinent,importTempF,importTempC,dbConditionId);
</code>

As with any flavor of SQL, it is only possible to add one record at a time to one table at a time.


## Reading data

Data can be retrieved using a typical SQL `SELECT` query, passed to `execute()` like the examples above, but assigned to a variable in order for you to access the returned result set.

The result set data is available using the methods that the [Titanium.Database.ResultSet](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Database.ResultSet-object.html) object provides. In the following code, a loop is used to iterate through each row, and only ends when `isValidRow()` returns false. The `fieldByName()` allows you to refer to each field by its database column name, or an alias you assign in the SQL statement. At each iteration of the loop, it is necessary to move the ResultSet row pointer to the next row, using the `next()` method.

<code>
var cityWeatherRS = db.execute('SELECT id,name,continent FROM city');
while (cityWeatherRS.isValidRow())
{
  var cityId = cityWeatherRS.fieldByName('id');
  var cityName = cityWeatherRS.fieldByName('name');
  var cityContinent = cityWeatherRS.fieldByName('continent');
  Ti.API.info(cityId + ' ' + cityName + ' ' + cityContinent);
	cityWeatherRS.next();
}
cityWeatherRS.close();
</code>

You may join related tables together, just as you would in standard SQL. The following returns all the `city` records and includes the weather conditions summary for each, if it exists.

<code>
db.execute('SELECT city.id,name,cond.id,cond.summary,cond.icon FROM city LEFT JOIN condition cond WHERE city.condition_id = cond.id');
</code>

Alternatively, you may like to return only those results where the weather summary is "Partly Cloudy":

<code>
var cityWeatherRS = db.execute('SELECT city.id AS city_id,name,cond.id AS cond_id,cond.summary,cond.icon FROM city LEFT JOIN condition cond WHERE city.condition_id = cond.id WHERE cond.summary=?', "Partly Cloudy");
</code>

Notice here that the `city.id` and `cond.id` columns have been aliased. This is because the `fieldByName()` method would not be able to distinguish between them if you simply passed their column name, `fieldByName(id)`. Thus, the ResultSet code would look like this:

<code>
while (cityWeatherRS.isValidRow())
{
var cityId = cityWeatherRS.fieldByName('city_id');
var cityName = cityWeatherRS.fieldByName('name');
var cityConditionId = cityWeatherRS.fieldByName('cond_id');
var cityConditionSummary = cityWeatherRS.fieldByName('summary');
var cityConditionIcon = cityWeatherRS.fieldByName('icon');
Ti.API.info(cityId + ' ' + cityName + ' ' + cityConditionId + ' ' + cityConditionSummary + ' ' + cityConditionIcon);
cityWeatherRS.next();
}
cityWeatherRS.close();
</code>

## Updating data

To update a database row you would use the same approach as used with inserting data, but with a slightly different SQL syntax:

<code>
db.execute('UPDATE condition SET icon=? WHERE id=?',importIcon,dbConditionId);
</code>

## Closing the database and ResultSet

As explained in the introduction, SQLite will only allow write-access to the database by one process at a time. This makes it vital that you close the database connection when you have completed any `INSERT` or `UPDATE` operations, otherwise you may receive "DatabaseObjectNotClosed" exceptions when your script next attempts to write to it.

<code>
db.close();
</code>

Leaving the ResultSet open is less of an issue, but it's good practice to close it to free system resources.

<code>
cityWeatherRS.close();
</code>



