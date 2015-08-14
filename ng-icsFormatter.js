if ( typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
	module.exports = 'IcsFormatter';
}( function() {
		'use strict';
		/*global angular: false, Highcharts: false */
		angular.module('IcsFormatter', []).service('IcsFormatter', function() {
			if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
				console.log('Unsupported Browser');
				return;
			}

			var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
			var calendarEvents = [];
			var calendarStart = ['BEGIN:VCALENDAR', 'VERSION:2.0'].join(SEPARATOR);
			var calendarEnd = SEPARATOR + 'END:VCALENDAR';

			/**
			 * Returns events array
			 * @return {array} Events
			 */
			this.events = function() {
				return calendarEvents;
			};

			/**
			 * Returns calendar
			 * @return {string} Calendar in iCalendar format
			 */
			this.calendar = function() {
				return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
			};

			/**
			 * Add event to the calendar
			 * @param  {string} subject     Subject/Title of event
			 * @param  {string} description Description of event
			 * @param  {string} location    Location of event
			 * @param  {string} begin       Beginning date of event
			 * @param  {string} stop        Ending date of event
			 */
			this.addEvent = function(subject, description, location, begin, stop) {
				// I'm not in the mood to make these optional... So they are all required
				if ( typeof subject === 'undefined' || typeof description === 'undefined' || typeof location === 'undefined' || typeof begin === 'undefined' || typeof stop === 'undefined') {
					return false;
				};

				//TODO add time and time zone? use moment to format?
				var start_date = new Date(begin);
				var end_date = new Date(stop);

				var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
				var start_month = ("00" + ((start_date.getMonth() + 1).toString())).slice(-2);
				var start_day = ("00" + ((start_date.getDate()).toString())).slice(-2);
				var start_hours = ("00" + (start_date.getHours().toString())).slice(-2);
				var start_minutes = ("00" + (start_date.getMinutes().toString())).slice(-2);
				var start_seconds = ("00" + (start_date.getMinutes().toString())).slice(-2);

				var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
				var end_month = ("00" + ((end_date.getMonth() + 1).toString())).slice(-2);
				var end_day = ("00" + ((end_date.getDate()).toString())).slice(-2);
				var end_hours = ("00" + (end_date.getHours().toString())).slice(-2);
				var end_minutes = ("00" + (end_date.getMinutes().toString())).slice(-2);
				var end_seconds = ("00" + (end_date.getMinutes().toString())).slice(-2);

				// Since some calendars don't add 0 second events, we need to remove time if there is none...
				var start_time = '';
				var end_time = '';
				if (start_minutes + start_seconds + end_minutes + end_seconds != 0) {
					start_time = 'T' + start_hours + start_minutes + start_seconds;
					end_time = 'T' + end_hours + end_minutes + end_seconds;
				}

				var start = start_year + start_month + start_day + start_time;
				var end = end_year + end_month + end_day + end_time;

				var calendarEvent = ['BEGIN:VEVENT', 'CLASS:PUBLIC', 'DESCRIPTION:' + description, 'DTSTART;VALUE=DATE:' + start, 'DTEND;VALUE=DATE:' + end, 'LOCATION:' + location, 'SUMMARY;LANGUAGE=en-us:' + subject, 'TRANSP:TRANSPARENT', 'END:VEVENT'].join(SEPARATOR);

				calendarEvents.push(calendarEvent);
				return calendarEvent;
			};
			
			this.emptyEvents = function() {
				if (calendarEvents.length = 0) {
					return false;
				}
				
				calendarEvents = [];
			};

			/**
			 * Download calendar
			 * @param  {string} filename Filename
			 * @param  {string} ext      Extention
			 */
			this.download = function(filename, ext) {
				if (calendarEvents.length < 1) {
					return false;
				}

				ext = ( typeof ext !== 'undefined') ? ext : '.ics';
				filename = ( typeof filename !== 'undefined') ? filename : 'calendar';
				var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;

				window.open("data:text/calendar;charset=utf8," + escape(calendar));
				
				this.emptyEvents();
			};
		});
	}
()); 