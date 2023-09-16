//=============================================================================
// Day-Night Cycle
// For RPG Maker MZ
// by McKathlin
//=============================================================================

/*
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Imported = Imported || {};
Imported.McKathlin_DayNight = true;

var McKathlin = McKathlin || {};
McKathlin.DayNight = McKathlin.DayNight || {};

/*:
 * @target MZ
 * @plugindesc MZ v1.1.1 Configure and track a day-night cycle.
 * @author McKathlin
 * 
 * @help WARNING: This is an older version of the plugin! It lacks the
 * features and improvements of this plugin's later versions. To get the
 * latest version for free, visit Tyruswoo.com.
 * 
 * ---------------------------------------------------------------------------
 * 
 * This plugin tracks a day-night cycle:
 * it keeps track of time of day as the cycle advances,
 * auto-updates variables and switches based on time of day,
 * and applies screen tones to areas marked as outdoors.
 * 
 * ===========================================================================
 * How to Start Using This Plugin                                               
 * ===========================================================================
 * To start seeing results from this plugin, follow these steps:
 * 1. As with any plugin, place it in the plugins folder and add it to your
 *    plugin list. 
 * 2. Edit plugin parameters to assign any switches and variables you plan on
 *    using in your events. For example, you can use the Night switch to make
 *    events that only show up at night.
 * 3. For any maps that should advance the day-night cycle when the player
 *    walks, add this to the map's Note: <DayNight: step>
 * 
 * Now all maps' lighting changes based on time of day.
 * Here's how you can customize each map's lighting conditions:
 * 4. Open this plugin's parameters to Simple Lighting Presets, and look over
 *    your options. For instance, "Bright" makes a map bright as day at all
 *    times; "Fire" gives the map a subdued warm light; "Dark" is dim lighting
 *    good for caves, etc. Configure your own presets here if you want.
 * 5. To assign a lighting preset to a specific map, right click the map, and
 *    choose Edit. In the Note box, type a lighting notetag with the name
 *    of the preset to use map-wide. For example: <lighting: Fire>
 *    See the Map Notetag Examples section below for more info.
 * 6. Also, you can change which lighting preset applies to all maps that
 *    don't have their own lighting notetag. Change the plugin parameter
 *    Default Lighting Keyword to the name of the lighting preset you want.
 *    This is useful if most of your maps are indoor or dungeon maps.
 *    Then for the few maps that are outside, add the map notetag
 *    <lighting: Outside>
 * 
 * Here's how to make events change depending on the time of day:
 * 7. This plugin's parameters include Daytime Switch and Night Switch.
 *    Set these to switch IDs that will automatically be updated when the
 *    time of day changes between day and night.
 * 8. If you plan on having your game check the exact day, hour, or minute
 *    of day-night cycle time passed, set their variables in the plugin
 *    parameters as well. This is optional.
 * 9. To make an event that only shows up at night, set the event page's
 *    conditions to include your game's Night Switch. For an event that only
 *    shows up in the daytime, make its event page conditions include the Day
 *    Switch.
 * 10.To make an event change the time of day, have it use a plugin command
 *    such as Add Time or Set Time. For example, an inn might use Set Time to
 *    pass the night and make it morning. See the Plugin Command Examples
 *    section for more info.
 * 
 * ===========================================================================
 * Map Notetag Examples                                                   
 * ===========================================================================
 * <DayNight: step>
 *   Each step while on this map advances the in-universe time by the
 *   number of minutes given in the "Minutes Per Step" parameter.
 * 
 * <DayNight: step=15m>
 *   Each step while on this map causes the in-universe time to advance by
 *   the given number of minutes (in this case, 15).
 *
 * <Lighting: outside>
 *   The screen tone while in this map will vary depending on the time of day.
 *
 * <lighting: dark>
 *   While on this map, the "Dark" lighting preset's screen tone will be used,
 *   unless overridden by an event. For more map lighting options, see the
 *   "Simple Lighting Presets" parameter.
 * 
 * ===========================================================================
 * Plugin Command Examples                                               
 * ===========================================================================
 * Set Time 7:05 AM
 *   Sets the the time of day to the specified time.
 *   In-universe time passed only moves forward, so setting the time earlier
 *   than the present time will advance in-universe time to the next day.
 *
 * Add Time 2 hours 30 minutes
 *   Moves the time of day forward the specified amount.
 *
 * Reset Time
 *   Changes the time back to game start time on day 0.
 *
 * ===========================================================================
 * Script Call Getter Methods                                             
 * ===========================================================================
 * McKathlin.DayNightCycle.getMinutes();
 *     // The number of minutes past the current hour: 0 through 59
 * McKathlin.DayNightCycle.getHours();
 *     // The hour of the current day: 0 (midnight) through 23 (11 PM)
 * McKathlin.DayNightCycle.getDays();
 *     // Number of full days since midnight of the starting day.
 * McKathlin.DayNightCycle.getTotalHours();
 *     // Number of hours since midnight of the starting day.
 * McKathlin.DayNightCycle.getTotalMinutes();
 *     // Number of minutes since midnight of the starting day.
 * McKathlin.DayNightCycle.getMinutesOfDay();
 *     // Number of minutes since midnight of the current day.
 * 
 * ============================================================================
 * For more help using the Day-Night Cycle plugin, see Tyruswoo.com.
 * ============================================================================
 * Version History:
 *
 * v1.0  6/1/2021
 *        - Day-Night Cycle plugin released for RPG Maker MZ
 * 
 * v1.1  12/27/2021
 *        - Fixed bug where day-night switches and variables updated based on
 *          the _previous_ time change. (Errors were most noticeable after
 *          multi-hour time jumps, such as inn stays.)
 *        - Added more getting started instructions to help text.
 * 
 * v1.0.1  8/30/2023
 *        - This plugin is now free and open source under the MIT license.
 * 
 * ============================================================================
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ============================================================================
 * Happy storytelling!
 * -McKathlin
 *
 * 
 * @command setTime
 * @text Set Time
 * @desc Set the time forward to a specific time of day.
 * 
 * @arg time_of_day
 * @text Time of Day
 * @type struct<time>
 * 
 * @command addTime
 * @text Add Time
 * @desc Move the time forward some number of hours and minutes.
 * 
 * @arg time_span
 * @text Time Span
 * @type struct<timespan>
 * 
 * @command resetTime
 * @text Reset Time
 * @desc Reset time to the game's designated starting time.
 * 
 * @param Daytime Switch
 * @type switch
 * @desc The switch that signals when it is daytime.
 *
 * @param Night Switch
 * @type switch
 * @desc The switch that signals when it is night time.
 * 
 * @param Days Passed Variable
 * @type variable
 * @desc The variable stating how many in-game days since day start.
 * 
 * @param Current Hour Variable
 * @type variable
 * @desc The variable stating the hour of the day, 0 (midnight) to 23 (11PM).
 * @parent Days Passed Variable
 * 
 * @param Current Minute Variable
 * @type variable
 * @desc The variable stating the minute of the current hour, 0 to 59.
 * @parent Days Passed Variable
 * 
 * @param New Game Start Time
 * @type struct<time>
 * @default {"hour":"8","minutes":"0","ampm":"AM"}
 * @desc A new game will start at this time of day.
 *
 * @param Dawn Start Time
 * @type struct<time>
 * @default {"hour":"6","minutes":"0","ampm":"AM"}
 * @desc When to start dawn (sunrise) tone phases.
 * @parent New Game Start Time
 *
 * @param Day Start Time
 * @type struct<time>
 * @default {"hour":"6","minutes":"0","ampm":"AM"}
 * @desc When to set Daytime Switch to ON and Night Switch to OFF.
 * @parent New Game Start Time
 *
 * @param Dusk Start Time
 * @type struct<time>
 * @default {"hour":"6","minutes":"0","ampm":"PM"}
 * @desc When to start dusk (sunset) tone phases.
 * @parent New Game Start Time
 *
 * @param Night Start Time
 * @type struct<time>
 * @default {"hour":"8","minutes":"0","ampm":"PM"}
 * @desc When to set Night Switch to ON and Daytime Switch to OFF.
 * @parent New Game Start Time
 *
 * @param Minutes Per Step
 * @type number
 * @default 5
 * @min 0
 * @desc How many minutes pass per player step, in maps where
 * <DayNight step> is enabled.
 *
 * @param Minutes Per Tone Phase
 * @desc How many minutes pass from one dawn or dusk phase to the next.
 * @type number
 * @default 30
 * @parent Minutes Per Step
 *
 * @param Tone Fade Duration
 * @desc Number of frames to spend fading from one day-night screen tone
 * to the next.
 * @type number
 * @default 60
 * @parent Minutes Per Step
 * 
 * @param Dawn Tone Phases
 * @type struct<tone>[]
 * @default ["{\"red\":\"-68\",\"green\":\"-68\",\"blue\":\"-14\",\"gray\":\"41\"}","{\"red\":\"-68\",\"green\":\"-68\",\"blue\":\"-27\",\"gray\":\"14\"}","{\"red\":\"-54\",\"green\":\"-54\",\"blue\":\"-27\",\"gray\":\"0\"}","{\"red\":\"-27\",\"green\":\"-27\",\"blue\":\"-14\",\"gray\":\"0\"}"]
 * @desc The tone(s) to step through during transition from night to day.
 * 
 * @param Daylight Tone
 * @type struct<tone>
 * @default {"red":"0","green":"0","blue":"0","gray":"0"}
 * @desc The screen tone to apply during day time.
 * @parent Dawn Tone Phases
 * 
 * @param Dusk Tone Phases
 * @type struct<tone>[]
 * @default ["{\"red\":\"27\",\"green\":\"-14\",\"blue\":\"-14\",\"gray\":\"0\"}","{\"red\":\"54\",\"green\":\"-27\",\"blue\":\"-27\",\"gray\":\"0\"}","{\"red\":\"41\",\"green\":\"-41\",\"blue\":\"-27\",\"gray\":\"14\"}","{\"red\":\"-14\",\"green\":\"-54\",\"blue\":\"-14\",\"gray\":\"41\"}"]
 * @desc The tone(s) to step through during transition from day to night.
 * @parent Dawn Tone Phases
 * 
 * @param Night Tone
 * @type struct<tone>
 * @default {"red":"-68","green":"-68","blue":"0","gray":"68"}
 * @desc The screen tone to apply during night time.
 * @parent Dawn Tone Phases
 * 
 * @param Outdoor Lighting Keyword
 * @type text
 * @default Outside
 * @desc The keyword that calls for outdoor lighting
 * in notetags or plugin commands.
 * 
 * @param Simple Lighting Presets
 * @type struct<lightingPreset>[]
 * @default ["{\"keyword\":\"Bright\",\"tone\":\"{\\\"red\\\":\\\"0\\\",\\\"green\\\":\\\"0\\\",\\\"blue\\\":\\\"0\\\",\\\"gray\\\":\\\"0\\\"}\"}","{\"keyword\":\"Fire\",\"tone\":\"{\\\"red\\\":\\\"0\\\",\\\"green\\\":\\\"-48\\\",\\\"blue\\\":\\\"-68\\\",\\\"gray\\\":\\\"68\\\"}\"}","{\"keyword\":\"Blue\",\"tone\":\"{\\\"red\\\":\\\"-68\\\",\\\"green\\\":\\\"-68\\\",\\\"blue\\\":\\\"0\\\",\\\"gray\\\":\\\"68\\\"}\"}","{\"keyword\":\"Dark\",\"tone\":\"{\\\"red\\\":\\\"-68\\\",\\\"green\\\":\\\"-68\\\",\\\"blue\\\":\\\"-68\\\",\\\"gray\\\":\\\"0\\\"}\"}","{\"keyword\":\"Sunset\",\"tone\":\"{\\\"red\\\":\\\"68\\\",\\\"green\\\":\\\"-34\\\",\\\"blue\\\":\\\"-34\\\",\\\"gray\\\":\\\"0\\\"}\"}","{\"keyword\":\"Sepia\",\"tone\":\"{\\\"red\\\":\\\"34\\\",\\\"green\\\":\\\"-34\\\",\\\"blue\\\":\\\"-68\\\",\\\"gray\\\":\\\"170\\\"}\"}","{\"keyword\":\"Gold\",\"tone\":\"{\\\"red\\\":\\\"34\\\",\\\"green\\\":\\\"0\\\",\\\"blue\\\":\\\"-90\\\",\\\"gray\\\":\\\"100\\\"}\"}","{\"keyword\":\"Green\",\"tone\":\"{\\\"red\\\":\\\"-34\\\",\\\"green\\\":\\\"0\\\",\\\"blue\\\":\\\"-68\\\",\\\"gray\\\":\\\"100\\\"}\"}","{\"keyword\":\"Gray\",\"tone\":\"{\\\"red\\\":\\\"0\\\",\\\"green\\\":\\\"0\\\",\\\"blue\\\":\\\"0\\\",\\\"gray\\\":\\\"255\\\"}\"}"]
 * @desc These single-tone lighting presets can be invoked by keyword
 * in notetags and plugin commands.
 * 
 * @param Default Lighting Keyword
 * @type text
 * @default Outside
 * @desc The name of the type of lighting to apply on maps that don't
 * have a lighting notetag.
 */

/*~struct~time:
 * @param hour
 * @text Hour
 * @type number
 * @min 1
 * @max 12
 * @default 6
 * 
 * @param minutes
 * @text Minutes
 * @type number
 * @min 0
 * @max 59
 * @default 0
 * 
 * @param ampm
 * @text AM/PM
 * @type select
 * @option AM
 * @option PM
 * @default AM
 */
 
/*~struct~timespan:
 * @param hours
 * @text Hours
 * @type number
 * @min 0
 * @default 0
 * 
 * @param minutes
 * @text Minutes
 * @type number
 * @min 0
 * @max 59
 * @default 0
 */
 
/*~struct~tone:
 * @param red
 * @text Red
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @param green
 * @text Green
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @param blue
 * @text Blue
 * @type number
 * @min -255
 * @max 255
 * @default 0
 * 
 * @param gray
 * @text Gray
 * @type number
 * @min 0
 * @max 255
 * @default 0
 */

/*~struct~lightingPreset:
 * @param keyword
 * @text Keyword
 * @type text
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * 
 * @param tone
 * @text Tone
 * @type struct<tone>
 * @desc The screen tone to apply when a notetag or plugin command calls for this preset.
 * 
 */

(() => {
	//=============================================================================
	// Constants
	//=============================================================================
	
	const pluginName = 'McKathlin_DayNight';
	
	McKathlin = McKathlin || {};
	McKathlin.DayNight = McKathlin.DayNight || {};
	
	McKathlin.DayNight.MINUTES_PER_HOUR = 60;
	McKathlin.DayNight.HOURS_PER_DAY = 24;
	McKathlin.DayNight.MINUTES_PER_DAY = McKathlin.DayNight.HOURS_PER_DAY *
		McKathlin.DayNight.MINUTES_PER_HOUR;
	
	McKathlin.DayNight.DEFAULT_TONE = [0, 0, 0, 0];
	
	//=============================================================================
	// Parameter parsing
	//=============================================================================
	
	McKathlin.DayNight.parseTimeAsMinutes = function(timeJson) {
		var timeStruct = JSON.parse(timeJson);
		var minutes = Number(timeStruct.minutes);
		var hours;
		if (timeStruct.ampm) {
			// It's a time of day.
			hours = timeStruct.hour % 12;
			if ('PM' == timeStruct.ampm) {
				hours += 12;
			}
		} else {
			hours = Number(timeStruct.hours);
		}
		minutes += hours * McKathlin.DayNight.MINUTES_PER_HOUR;
		return minutes;
	};

	// Converts RGBG JSON string into the format RPG Maker uses when setting tone
	McKathlin.DayNight.parseTone = function(toneJson) {
		if (!toneJson) return;
		var tone = JSON.parse(toneJson);
		return [Number(tone.red), Number(tone.green),
			Number(tone.blue), Number(tone.gray)];
	};
	
	McKathlin.DayNight.parseSimpleToneList = function(toneListJson) {
		if (!toneListJson) return;
		var list = JSON.parse(toneListJson);
		for (var i = 0; i < list.length; i++) {
			list[i] = McKathlin.DayNight.parseTone(list[i]);
		}
		return list;
	};
	
	McKathlin.DayNight.parseNamedToneSet = function(namedToneListJson) {
		if (!namedToneListJson) return;
		var structList = JSON.parse(namedToneListJson);
		var toneSet = {};
		for (var namedToneJson of structList) {
			var namedTone = JSON.parse(namedToneJson);
			toneSet[namedTone.keyword.toLowerCase()] = McKathlin.DayNight.parseTone(namedTone.tone);
		};
		return toneSet;
	};
	
	//=============================================================================
	// Parameter init
	//=============================================================================
	
	McKathlin.DayNight.Parameters = PluginManager.parameters(pluginName);
	McKathlin.DayNight.Param = McKathlin.DayNight.Param || {};
	
	McKathlin.DayNight.Param.DaytimeSwitch = Number(
		McKathlin.DayNight.Parameters['Daytime Switch']);
	McKathlin.DayNight.Param.NightSwitch = Number(
		McKathlin.DayNight.Parameters['Night Switch']);
	
	McKathlin.DayNight.Param.DaysPassedVariable = Number(
		McKathlin.DayNight.Parameters['Days Passed Variable']);
	McKathlin.DayNight.Param.CurrentHourVariable = Number(
		McKathlin.DayNight.Parameters['Current Hour Variable']);
	McKathlin.DayNight.Param.CurrentMinuteVariable = Number(
		McKathlin.DayNight.Parameters['Current Minute Variable']);

	McKathlin.DayNight.Param.NewGameStartTimeAsMinutes = McKathlin.DayNight.parseTimeAsMinutes(
		McKathlin.DayNight.Parameters['New Game Start Time']);
	McKathlin.DayNight.Param.DawnStartTimeAsMinutes = McKathlin.DayNight.parseTimeAsMinutes(
		McKathlin.DayNight.Parameters['Dawn Start Time']);
	McKathlin.DayNight.Param.DayStartTimeAsMinutes = McKathlin.DayNight.parseTimeAsMinutes(
		McKathlin.DayNight.Parameters['Day Start Time']);
	McKathlin.DayNight.Param.DuskStartTimeAsMinutes = McKathlin.DayNight.parseTimeAsMinutes(
		McKathlin.DayNight.Parameters['Dusk Start Time']);
	McKathlin.DayNight.Param.NightStartTimeAsMinutes = McKathlin.DayNight.parseTimeAsMinutes(
		McKathlin.DayNight.Parameters['Night Start Time']);
	
	McKathlin.DayNight.Param.MinutesPerStep = Number(
		McKathlin.DayNight.Parameters['Minutes Per Step']);
	McKathlin.DayNight.Param.MinutesPerTonePhase = Number(
		McKathlin.DayNight.Parameters['Minutes Per Tone Phase']);
	McKathlin.DayNight.Param.ToneFadeDuration = Number(
		McKathlin.DayNight.Parameters['Tone Fade Duration']);

	McKathlin.DayNight.Param.DawnTonePhases = McKathlin.DayNight.parseSimpleToneList(
		McKathlin.DayNight.Parameters['Dawn Tone Phases']);
	McKathlin.DayNight.Param.DaylightTone = McKathlin.DayNight.parseTone(
		McKathlin.DayNight.Parameters['Daylight Tone']);
	McKathlin.DayNight.Param.DuskTonePhases = McKathlin.DayNight.parseSimpleToneList(
		McKathlin.DayNight.Parameters['Dusk Tone Phases']);
	McKathlin.DayNight.Param.NightTone = McKathlin.DayNight.parseTone(
		McKathlin.DayNight.Parameters['Night Tone']);
	
	McKathlin.DayNight.Param.OutdoorLightingKeyword =
		McKathlin.DayNight.Parameters['Outdoor Lighting Keyword'].toLowerCase();
	McKathlin.DayNight.Param.SimpleLightingPresets =
		McKathlin.DayNight.parseNamedToneSet(
			McKathlin.DayNight.Parameters['Simple Lighting Presets']);
	McKathlin.DayNight.Param.DefaultLightingKeyword =
		McKathlin.DayNight.Parameters['Default Lighting Keyword'].toLowerCase();

	// derived 'parameters'
	McKathlin.DayNight.Param.ReservedVariables = [
		McKathlin.DayNight.Param.DaysPassedVariable, 
		McKathlin.DayNight.Param.CurrentHourVariable, 
		McKathlin.DayNight.Param.CurrentMinuteVariable
	];
	McKathlin.DayNight.Param.DawnEndTimeAsMinutes = McKathlin.DayNight.Param.DawnStartTimeAsMinutes + 
		(McKathlin.DayNight.Param.DawnTonePhases.length * McKathlin.DayNight.Param.MinutesPerTonePhase);
	McKathlin.DayNight.Param.DuskEndTimeAsMinutes = McKathlin.DayNight.Param.DuskStartTimeAsMinutes + 
		(McKathlin.DayNight.Param.DuskTonePhases.length * McKathlin.DayNight.Param.MinutesPerTonePhase);

	//=============================================================================
	// TimeSpan class
	//=============================================================================
	
	/** The TimeSpan class.
	 *  Keeps track of a timespan in terms of days, hours, and minutes.
	 *
	 * @class McKathlin.TimeSpan
	 * @constructor
	 * @param {Number} days The number of days
	 * @param {Number} hours The number of hours
	 * @param {Number} minutes The number of minutes
	 */
	McKathlin.TimeSpan = function() {
		this.initialize.apply(this, arguments);
	};

	Object.defineProperty(McKathlin.TimeSpan.prototype, 'totalMinutes', {
		get: function() { return this._totalMinutes; },
		set: function(value) { this._totalMinutes = value; },
		configurable: true
	});

	McKathlin.TimeSpan.prototype.initialize = function(days, hours, minutes) {
		days = days || 0;
		hours = hours || 0;
		minutes = minutes || 0;
		
		var totalMins = days * McKathlin.DayNight.MINUTES_PER_DAY;
		totalMins += hours * McKathlin.DayNight.MINUTES_PER_HOUR;
		totalMins += minutes;
		this.totalMinutes = totalMins;
	};

	McKathlin.TimeSpan.prototype.getMinutes = function() {
		return this.totalMinutes % McKathlin.DayNight.MINUTES_PER_HOUR;
	};

	McKathlin.TimeSpan.prototype.getHours = function() {
		return Math.floor(this.totalMinutes / McKathlin.DayNight.MINUTES_PER_HOUR) %
			McKathlin.DayNight.HOURS_PER_DAY;
	};

	McKathlin.TimeSpan.prototype.getDays = function() {
		return Math.floor(this.totalMinutes / McKathlin.DayNight.MINUTES_PER_DAY);
	};

	McKathlin.TimeSpan.prototype.getTotalHours = function() {
		return Math.floor(this.totalMinutes / McKathlin.DayNight.MINUTES_PER_HOUR);
	};

	McKathlin.TimeSpan.prototype.getTotalMinutes = function() {
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.getMinutesOfDay = function() {
		return this.totalMinutes % McKathlin.DayNight.MINUTES_PER_DAY;
	};

	McKathlin.TimeSpan.prototype.isDaytime = function() {
		var timeOfDay = this.getMinutesOfDay();
		return timeOfDay >= McKathlin.DayNight.Param.DayStartTimeAsMinutes &&
				timeOfDay < McKathlin.DayNight.Param.NightStartTimeAsMinutes;
	};

	McKathlin.TimeSpan.prototype.isNight = function() {
		return !this.isDaytime();
	};

	McKathlin.TimeSpan.prototype.valueOf = function() {
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.toString = function() {
		var hh = this.getHours().toString().padStart(2, '0');
		var mm = this.getMinutes().toString().padStart(2, '0');
		return "" + hh + ":" + mm;
	};

	// Either a TimeSpan or a number of minutes can be added; they are equivalent.
	McKathlin.TimeSpan.prototype.add = function(timeSpan) {
		this.totalMinutes += timeSpan.totalMinutes;
		return this.totalMinutes;
	};
	
	McKathlin.TimeSpan.prototype.addMinutes = function(minutes) {
		this.totalMinutes += minutes;
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.setForwardTo = function(timeOfDay) {
		var theirMinutesToday = timeOfDay.getMinutesOfDay();
		var myMinutesToday = this.getMinutesOfDay();
		var difference = theirMinutesToday - myMinutesToday;
		if (difference < 0) { // Target time is earlier in day than current time
			// Add a day to get the target time of day tomorrow.
			difference += McKathlin.DayNight.MINUTES_PER_DAY;
		}
		this.totalMinutes += difference;
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.setTotalMinutes = function(minutes) {
		this.totalMinutes = Number(minutes);
		return this.totalMinutes;
	};

	// Returns a new TimeSpan that equals this TimeSpan
	// with the stated TimeSpan or number of minutes added.
	McKathlin.TimeSpan.prototype.plus = function(timeSpan) {
		var minuteSum = this.totalMinutes + timeSpan.totalMinutes;
		return new McKathlin.TimeSpan(0, 0, minuteSum);
	};

	// Returns a new TimeSpan that equals this TimeSpan
	// with the stated TimeSpan or number of minutes subtracted.
	McKathlin.TimeSpan.prototype.minus = function(timeSpan) {
		var minuteDifference = this.totalMinutes - timeSpan.totalMinutes;
		return new McKathlin.timeSpan(0, 0, minuteDifference);
	};

	McKathlin.DayNightCycle = new McKathlin.TimeSpan();
	
	//=============================================================================
	// Time parsing
	//=============================================================================
	
	McKathlin.DayNight.parseTimeSpan = function(timeSpanJson) {
		var timeSpanStruct = JSON.parse(timeSpanJson);
		return new McKathlin.TimeSpan(0, Number(timeSpanStruct.hours), Number(timeSpanStruct.minutes));
	};
	
	McKathlin.DayNight.parseTimeOfDay = function(timeOfDayJson) {
		var tod = JSON.parse(timeOfDayJson);
		var totalHours = Number(tod.hour) % 12; // 12 functions as 0 hours.
		if (tod.ampm == 'PM') {
			totalHours += 12;
		}
		return new McKathlin.TimeSpan(0, totalHours, Number(tod.minutes));
	};
	
	//=============================================================================
	// Day-Night timekeeping
	//=============================================================================
	
	McKathlin.DayNightCycle._switching = false;

	Object.defineProperty(McKathlin.DayNightCycle, 'totalMinutes', {
		get: function() {
			return $gameSystem.totalMinutes;
		},
		set: function(value) {
			this.changeTimeTo(value);
		},
		configurable: true
	});

	McKathlin.DayNightCycle.changeTimeTo = function(minutes) {
		this._switching = true;
		$gameSystem.totalMinutes = minutes;

		var isDay = this.isDaytime();
		$gameSwitches.setValue(McKathlin.DayNight.Param.DaytimeSwitch, isDay);
		$gameSwitches.setValue(McKathlin.DayNight.Param.NightSwitch, !isDay);

		$gameVariables.setValue(McKathlin.DayNight.Param.DaysPassedVariable, this.getDays());
		$gameVariables.setValue(McKathlin.DayNight.Param.CurrentHourVariable, this.getHours());
		$gameVariables.setValue(McKathlin.DayNight.Param.CurrentMinuteVariable, this.getMinutes());
		this._switching = false;

		$gameMap.onTimeChanged();
	};

	McKathlin.DayNightCycle.now = function() {
		return this;
	};

	McKathlin.DayNightCycle.reset = function() {
		McKathlin.DayNightCycle.setTotalMinutes(0);
		McKathlin.DayNightCycle.setForwardTo(new McKathlin.TimeSpan(
			0, 0, McKathlin.DayNight.Param.NewGameStartTimeAsMinutes));
	};
	
	//=============================================================================
	// DayNight tone-finding
	//=============================================================================
	
	McKathlin.DayNightCycle.getOutsideTone = function() {
		var time = McKathlin.DayNightCycle.getMinutesOfDay();
		if (time < McKathlin.DayNight.Param.DawnStartTimeAsMinutes) {
			// night, between midnight and dawn
			return McKathlin.DayNight.Param.NightTone;
		}
		else if (time < McKathlin.DayNight.Param.DawnEndTimeAsMinutes) {
			// dawn
			phase = Math.floor((time - McKathlin.DayNight.Param.DawnStartTimeAsMinutes) /
				McKathlin.DayNight.Param.MinutesPerTonePhase);
			return McKathlin.DayNight.Param.DawnTonePhases[phase];
		}
		else if (time < McKathlin.DayNight.Param.DuskStartTimeAsMinutes) {
			// daytime light is after dawn and before dusk
			return McKathlin.DayNight.Param.DaylightTone;
		}
		else if (time < McKathlin.DayNight.Param.DuskEndTimeAsMinutes) {
			phase = Math.floor((time - McKathlin.DayNight.Param.DuskStartTimeAsMinutes) /
				McKathlin.DayNight.Param.MinutesPerTonePhase);
			return McKathlin.DayNight.Param.DuskTonePhases[phase];
		}
		else {
			// night, between dusk and midnight
			return McKathlin.DayNight.Param.NightTone;
		}
	}
	
	McKathlin.DayNightCycle.getToneByKeyword = function(keyword) {
		var tone = null;
		if (keyword) {
			keyword = keyword.toLowerCase();
			if (keyword == McKathlin.DayNight.Param.OutdoorLightingKeyword) {
				tone = this.getOutsideTone();
			} else {
				tone = McKathlin.DayNight.Param.SimpleLightingPresets[keyword];
			}
		}
		
		if (!tone) {
			tone = McKathlin.DayNight.DEFAULT_TONE;
		}
		return tone;
	};
	
	//=============================================================================
	// Game Variables and Switches management
	//=============================================================================
	
	// extended method
	McKathlin.DayNight.DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function() {
		McKathlin.DayNight.DataManager_setupNewGame.call(this);
		McKathlin.DayNightCycle.reset();
	};
	
	// extended method
	// protects reserved switches from being set outside this plugin.
	McKathlin.DayNight.Game_Switches_setValue = Game_Switches.prototype.setValue;
	Game_Switches.prototype.setValue = function(switchId, value) {
		if (switchId > 0 && !McKathlin.DayNightCycle._switching) {
			if (switchId == McKathlin.DayNight.Param.DaytimeSwitchID ||
				switchId == McKathlin.DayNight.Param.NightSwitchID) {
				throw new Error("Switch " + switchId +
					" is reserved for use by McKathlin.DayNight plugin," +
					" and should not be set outside of it."
				);
			}
		}
		McKathlin.DayNight.Game_Switches_setValue.call(this, switchId, value);
	};
	
	McKathlin.DayNight.Game_Variables_setValue = Game_Variables.prototype.setValue;
	Game_Variables.prototype.setValue = function(variableId, value) {
		if (variableId > 0 && !McKathlin.DayNightCycle._switching) {
			if (McKathlin.DayNight.Param.ReservedVariables.includes(variableId)) {
				throw new Error("Variable " + variableId +
					" is reserved for use by McKathlin.DayNight plugin," +
					" and should not be set outside of it."
				);
			}
		}
		McKathlin.DayNight.Game_Variables_setValue.call(this, variableId, value);
	};

	//=============================================================================
	// Map Notetag General Utilities
	//=============================================================================
	McKathlin.Core = McKathlin.Core || {};
	McKathlin.Core.NOTETAG_REGEX = /<[^<>]*>/g;
	
	McKathlin.Core.includesSimpleNotetag = function(note, notetagName) {
		simpleRegex = new RegExp('<' + notetagName + '>', 'i');
		return simpleRegex.test(note);
	};
	
	McKathlin.Core.getNotetagValueIn = function(note, notetagName) {
		if (McKathlin.Core.includesSimpleNotetag(note, notetagName)) {
			return true;
		} else {
			var regex = new RegExp('<' + notetagName + '(?: |: |:)([^>]+)>', 'i');
			var captures = note.match(regex);
			if (captures) {
				return captures[1];
			} else {
				return null;
			}
		}
	};
	
	//=============================================================================
	// Map Notetags for Day-Night and Lighting
	//=============================================================================
	
	McKathlin.DayNight.getStepNotetag = function(note) {
		var stepString = McKathlin.Core.getNotetagValueIn(note, 'day-?night');
		if (!stepString) {
			// No DayNight notetag found. No minutes per step.
			return 0;
		}
		
		var captures = stepString.match(/step(?: ?[=: ] ?(\d+))?/i);
		if (captures) {
			// It's a step notetag.
			if (captures[1]) {
				// Minutes per step specified.
				return Number(captures[1]);
			} else {
				// No amount given. Use the default.
				return McKathlin.DayNight.Param.MinutesPerStep;
			}
		} else {
			// It's not a step notetag. No minutes per step.
			return 0;
		}
	};
	
	McKathlin.DayNight.getLightingNotetag = function(note) {
		var lightingWord = McKathlin.Core.getNotetagValueIn(note, 'lighting');
		return lightingWord ? lightingWord.toLowerCase() :
			McKathlin.DayNight.Param.DefaultLightingKeyword;
	};
	
	// Game_Map on time changed
	// new method
	Game_Map.prototype.onTimeChanged = function() {
		if (!this.isOutside) return;
		
		var newTone = McKathlin.DayNightCycle.getOutsideTone();
		if (newTone == this.mapTone) return;
		
		this.mapTone = newTone;
		$gameScreen.startTint(this.mapTone, McKathlin.DayNight.Param.ToneFadeDuration);
	};
	
	// Game_Map setup
	// extended method
	McKathlin.DayNight.Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		McKathlin.DayNight.Game_Map_setup.call(this, mapId);
		
		this.minutesPerStep = McKathlin.DayNight.getStepNotetag($dataMap.note);
		this.lightingType = McKathlin.DayNight.getLightingNotetag($dataMap.note);
		this.isOutside = (this.lightingType == McKathlin.DayNight.Param.OutdoorLightingKeyword);
		
		this.mapTone = McKathlin.DayNightCycle.getToneByKeyword(this.lightingType);
		$gameScreen.startTint(this.mapTone, 0);
	};
	
	//=============================================================================
	// Party Step
	//=============================================================================

	McKathlin.DayNight.Game_Party_increaseSteps = Game_Party.prototype.increaseSteps;
	Game_Party.prototype.increaseSteps = function() {
		McKathlin.DayNight.Game_Party_increaseSteps.call(this);
		if ($gameMap && $gameMap.minutesPerStep > 0) {
			McKathlin.DayNightCycle.addMinutes($gameMap.minutesPerStep);
		}
	};
	
	//=============================================================================
	// Plugin Commands
	//=============================================================================
	
	//-- Set Time --
	PluginManager.registerCommand(pluginName, "setTime", args => {
		var time = McKathlin.DayNight.parseTimeOfDay(args.time_of_day);
		McKathlin.DayNightCycle.setForwardTo(time);
	});
	
	//-- Add Time --
	PluginManager.registerCommand(pluginName, "addTime", args => {
		var timeSpan = McKathlin.DayNight.parseTimeSpan(args.time_span);
		McKathlin.DayNightCycle.add(timeSpan);
	});
	
	//-- Reset Time --
	PluginManager.registerCommand(pluginName, "resetTime", args => {
		McKathlin.DayNightCycle.reset();
	});
	
})();
