ng-icsFormatter
============

Fork of icsFormatter which is a fork of ics 
icsFormatter -- https://github.com/matthiasanderer/icsFormatter
ics -- https://github.com/nwcell/ics.js

Created an angular factory from the original icsFormatter.

Installation:
---------

bower install ng-icsFormatter

Include library: /ng-icsFormatter/ng-icsFormatter.js

Add module to app: 'IcsFormatter'


Example:
---------
	$scope.addToCalendar = function() {

	    var title = 'Event Title';
	    var place = 'Event location';
	    var begin = new Date();
	    var end = new Date().getTime() + (4 * 60 * 60);
	
	    var description = title + '\n' + begin + '\n' + place + '\nMessage body';
	
	    IcsFormatter.addEvent(title,description, place, begin, end);
	    IcsFormatter.download('event');
	};


Credits
------------------
* [Jose Weeks](https://github.com/jtweeks): Me
* [Matthias](https://github.com/matthiasanderer): icsFormatter
* [Travis Krause](https://github.com/nwcell): ics
