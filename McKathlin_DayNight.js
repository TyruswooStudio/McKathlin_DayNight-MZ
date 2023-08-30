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
 * @plugindesc MZ v2.1.1 Configure & track a day-night cycle. Optional blood moon.
 * @author McKathlin
 * 
 * @help This plugin tracks a day-night cycle:
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
 * Optionally, you can set up a cycle where some nights have different
 * lighting and a different switch active from most nights. We call this
 * Bloodmoon, but in your game you can tie any meaning to it you want:
 * New Moon, Full Moon, Blue Moon, Eclipse, whatever you have in mind.
 * Here's how to set it up:
 * 11. Set the plugin parameter Enable Bloodmoon to ON.
 * 12. Use the plugin parameters to assign any Bloodmoon switches and variable
 *     you plan to have your game's events use.
 * 13. Set the plugin parameters Days in Moon Cycle and Nights Before First
 *     Bloodmoon to set how often unusual nights happen and when they start.
 * 14. Adjust the Bloodmoon dusk, night, and dawn tone phases to your liking.
 *     The default settings give these nights a dark red cast, but you can
 *     change this to whatever you like.
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
 * v2.0  6/13/2022
 *        - Optional Bloodmoon feature. Periodically, one night will have
 *          unusual lighting, and signal its presence with a distinct switch.
 *        - Reset Lighting plugin command. Allows tinting the screen back to
 *          whichever lighting the map would use, based on the lighting
 *          notetag in the map's note.
 *        - Use Lighting Preset plugin command. Allows tinting the screen to
 *          any lighting preset defined in the plugin parameters, using a
 *          lighting keyword.
 * 
 * v2.1 12/7/2022
 *        - Fixed bug where Bloodmoon phase screen tones failed to display.
 *        - Fixed bug where Bloodmoon phase switches failed to update.
 * 
 * v2.1.1  8/30/2023
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
 * @command resetLighting
 * @text Reset Lighting
 * @desc Reset lighting to the lighting notetag in the map's note.
 *
 * @arg duration
 * @text Duration
 * @default 60
 * @desc Frames (1/60 sec) over which to tint screen to lighting.
 *
 * @command useLightingPreset
 * @text Use Lighting Preset
 * @desc Tint screen to a lighting preset defined in the plugin parameters.
 *
 * @arg lightingKeyword
 * @text Lighting Keyword
 * @desc The keyword of the lighting preset, as defined in the plugin parameters.
 *
 * @arg duration
 * @text Duration
 * @default 60
 * @desc Frames (1/60 sec) over which to tint screen to lighting.
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
 * @param Overlay Starting Picture Number
 * @type number
 * @min 1
 * @max 99
 * @default 10
 * @desc If an overlay's picture number is left blank, this number,
 * or the next unused number larger than it, will be used.
 * @parent Simple Lighting Presets
 * 
 * @param Default Lighting Keyword
 * @type text
 * @default Outside
 * @desc The name of the type of lighting to apply on maps that don't
 * have a lighting notetag.
 *
 * @param Enable Bloodmoon
 * @type boolean
 * @default false
 * @desc Turn this parameter ON, and once every several nights
 * will be unusual, with distinct lighting and switch.
 * 
 * @param Bloodmoon Night Switch
 * @type switch
 * @default 
 * @desc This switch is ON during a Bloodmoon night,
 * and OFF otherwise. If blank, no switch is kept.
 * @parent Enable Bloodmoon
 * 
 * @param Bloodmoon Phase Switch
 * @type switch
 * @default
 * @desc This switch is ON during the day preceding a Bloodmoon
 * night, as well as the Bloodmoon night itself.
 * @parent Enable Bloodmoon
 * 
 * @param Moon Phase Variable
 * @type variable
 * @default
 * @desc Where to store how many days since last Bloodmoon.
 * Variable is 0 on Bloodmoon night and its preceding day.
 * @parent Enable Bloodmoon
 * 
 * @param Days in Moon Cycle
 * @type number
 * @min 1
 * @default 6
 * @desc Number of days from one Bloodmoon to the next.
 * 2 = every other night, 3 = every 3rd night, etc.
 * @parent Enable Bloodmoon
 * 
 * @param Nights Before First Bloodmoon
 * @type number
 * @default 5
 * @desc Number of normal nights before first-ever Bloodmoon night
 * @parent Enable Bloodmoon
 * 
 * @param Bloodmoon Dusk Tone Phases
 * @type struct<tone>[]
 * @default ["{\"red\":\"30\",\"green\":\"-20\",\"blue\":\"-20\",\"gray\":\"0\"}","{\"red\":\"60\",\"green\":\"-40\",\"blue\":\"-30\",\"gray\":\"10\"}","{\"red\":\"40\",\"green\":\"-80\",\"blue\":\"-70\",\"gray\":\"30\"}","{\"red\":\"10\",\"green\":\"-100\",\"blue\":\"-70\",\"gray\":\"60\"}"]
 * @desc Screen tones leading from day into Bloodmoon night
 * @parent Enable Bloodmoon
 * 
 * @param Bloodmoon Night Tone
 * @type struct<tone>
 * @default {"red":"-10","green":"-110","blue":"-80","gray":"120"}
 * @desc Screen tone applied during Bloodmoon night
 * @parent Enable Bloodmoon
 * 
 * @param Bloodmoon Dawn Tone Phases
 * @type struct<tone>[]
 * @default ["{\"red\":\"-15\",\"green\":\"-90\",\"blue\":\"-60\",\"gray\":\"60\"}","{\"red\":\"-15\",\"green\":\"-70\",\"blue\":\"-50\",\"gray\":\"30\"}","{\"red\":\"-15\",\"green\":\"-40\",\"blue\":\"-40\",\"gray\":\"10\"}","{\"red\":\"-15\",\"green\":\"-30\",\"blue\":\"-30\",\"gray\":\"0\"}"]
 * @desc Screen tones leading from Bloodmoon night into the next day
 * @parent Enable Bloodmoon
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
 * @param picture_overlay
 * @text Picture Overlay
 * @type struct<picture>
 * @desc Show this picture (if any) on the screen
 * whenever this lighting preset is active.
 */

/*~struct~picture:
 * @param picture_number
 * @text Picture Number
 * @type number
 * @min 0
 * @max 100
 * @default 
 * @desc The layer number for this picture. Larger numbers
 * have higher priority. Leave blank or zero to auto-assign.
 * 
 * @param filename
 * @text File Name
 * @type file
 * @dir img/pictures/
 * @desc The file containing the picture to show.
 * 
 * @param origin
 * @text Origin
 * @type select
 * @option Upper Left
 * @value 0
 * @option Center
 * @value 1
 * @default 0
 * @desc Treat this point on the picture as its origin.
 * 
 * @param x
 * @text Position X
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc Place the picture's origin this many pixels to the right
 * of the left edge of the screen.
 * 
 * @param y
 * @text Position Y
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc Place the picture's origin this many pixels below
 * the top edge of the screen.
 * 
 * @param width_percent
 * @text Width Percent
 * @type number
 * @min -2000
 * @max 2000
 * @default 100
 * @desc Scale the picture's width to this percent of the original file's width.
 * 
 * @param height_percent
 * @text Height Percent
 * @type number
 * @min -2000
 * @max 2000
 * @default 100
 * @desc Scale the picture's height to this percent of the original file's height.
 * 
 * @param opacity
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc The picture's opacity. 0 is invisible; 255 is fully opaque.
 * The smaller the opacity number, the more see-through.
 * 
 * @param blend_mode
 * @text Blend Mode
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @default 0
 * @desc This picture's way of layering. Normal = simple overlap.
 * Additive = lighten. Multiply = darken. Screen = brighten.
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
	
	McKathlin.DayNight.parsePresets = function(lightingPresetJson) {
		if (!lightingPresetJson) return;
		var structList = JSON.parse(lightingPresetJson);
		var lookup = {};
		for (const presetJson of structList) {
			let preset = JSON.parse(presetJson);
			let key = preset.keyword.toLowerCase();
			preset.tone = McKathlin.DayNight.parseTone(preset.tone);
			preset.picture_overlay = this.parsePicture(
				preset.picture_overlay);
			lookup[key] = preset;
		};
		this.autoAssignPictureNumbers(lookup);
		return lookup;
	};

	McKathlin.DayNight.parsePicture = function(pictureJson) {
		if (!pictureJson) {
			return null;
		}
		var picture = JSON.parse(pictureJson);
		if (!picture || !picture.filename) {
			return null;
		}

		// Convert properties to their intended types.
		for (const key in picture) {
			if ("filename" == key) {
				// Filename remains a string.
			} else {
				// All other properties are numeric.
				picture[key] = Number(picture[key] || 0);
			}
		}
		return picture;
	};

	McKathlin.DayNight.autoAssignPictureNumbers = function(presetLookup) {
		const presets = Object.values(presetLookup);
		const numbersTakenLookup = {};

		// First pass: take note of picture numbers already taken
		for (const preset of presets) {
			if (preset && preset.picture_overlay &&
				preset.picture_overlay.picture_number) {
				numbersTakenLookup[preset.picture_overlay.picture_number] = true;
			}
		}

		// Second pass: assign to not-yet-taken picture numbers
		var nextNumber = McKathlin.DayNight.Param.OverlayStartingPictureNumber;
		for (const preset of presets) {
			if (preset && preset.picture_overlay &&
				!preset.picture_overlay.picture_number) {
				while (numbersTakenLookup[nextNumber]) {
					nextNumber++;
				}
				preset.picture_overlay.picture_number = nextNumber;
				numbersTakenLookup[nextNumber] = true;
			}
		}
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
	// Overlay Starting Picture Number is parsed first,
	// so that preset parsing can reference it to auto-assign picture numbers.
	McKathlin.DayNight.Param.OverlayStartingPictureNumber = Number(
		McKathlin.DayNight.Parameters['Overlay Starting Picture Number']);
	McKathlin.DayNight.Param.SimpleLightingPresets = McKathlin.DayNight.parsePresets(
		McKathlin.DayNight.Parameters['Simple Lighting Presets']);
	McKathlin.DayNight.Param.DefaultLightingKeyword =
		McKathlin.DayNight.Parameters['Default Lighting Keyword'].toLowerCase();

	// Bloodmoon parameters
	McKathlin.DayNight.Param.EnableBloodmoon = "true" ==
		McKathlin.DayNight.Parameters['Enable Bloodmoon'];
	McKathlin.DayNight.Param.BloodmoonNightSwitch = Number(
		McKathlin.DayNight.Parameters['Bloodmoon Night Switch']);
	McKathlin.DayNight.Param.BloodmoonPhaseSwitch = Number(
		McKathlin.DayNight.Parameters['Bloodmoon Phase Switch']);
	McKathlin.DayNight.Param.MoonPhaseVariable = Number(
		McKathlin.DayNight.Parameters['Moon Phase Variable']);
	McKathlin.DayNight.Param.DaysInMoonCycle = Number(
		McKathlin.DayNight.Parameters['Days in Moon Cycle']);
	McKathlin.DayNight.Param.NightsBeforeFirstBloodmoon = Number(
		McKathlin.DayNight.Parameters['Nights Before First Bloodmoon']);
	McKathlin.DayNight.Param.BloodmoonDuskTonePhases = McKathlin.DayNight.parseSimpleToneList(
		McKathlin.DayNight.Parameters['Bloodmoon Dusk Tone Phases']);
	McKathlin.DayNight.Param.BloodmoonNightTone = McKathlin.DayNight.parseTone(
		McKathlin.DayNight.Parameters['Bloodmoon Night Tone']);
	McKathlin.DayNight.Param.BloodmoonDawnTonePhases = McKathlin.DayNight.parseSimpleToneList(
		McKathlin.DayNight.Parameters['Bloodmoon Dawn Tone Phases']);

	// derived 'parameters'
	McKathlin.DayNight.Param.ReservedSwitches = [
		McKathlin.DayNight.Param.DaytimeSwitch,
		McKathlin.DayNight.Param.NightSwitch,
		McKathlin.DayNight.Param.BloodmoonNightSwitch,
		McKathlin.DayNight.Param.BloodmoonPhaseSwitch
	];
	McKathlin.DayNight.Param.ReservedVariables = [
		McKathlin.DayNight.Param.DaysPassedVariable, 
		McKathlin.DayNight.Param.CurrentHourVariable, 
		McKathlin.DayNight.Param.CurrentMinuteVariable,
		McKathlin.DayNight.Param.MoonPhaseVariable
	];
	McKathlin.DayNight.Param.DawnEndTimeAsMinutes = McKathlin.DayNight.Param.DawnStartTimeAsMinutes + 
		(McKathlin.DayNight.Param.DawnTonePhases.length * McKathlin.DayNight.Param.MinutesPerTonePhase);
	McKathlin.DayNight.Param.DuskEndTimeAsMinutes = McKathlin.DayNight.Param.DuskStartTimeAsMinutes + 
		(McKathlin.DayNight.Param.DuskTonePhases.length * McKathlin.DayNight.Param.MinutesPerTonePhase);
	McKathlin.DayNight.Param.MiddayAsMinutes =
		(McKathlin.DayNight.Param.DawnEndTimeAsMinutes +
			McKathlin.DayNight.Param.DuskStartTimeAsMinutes) / 2;

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

		this.updateTime();
		this._switching = false;

		$gameMap.onTimeChanged();
	};

	// Update all time-based variables and switches.
	McKathlin.DayNightCycle.updateTime = function() {
		var isDay = this.isDaytime();
		$gameSwitches.setValue(McKathlin.DayNight.Param.DaytimeSwitch, isDay);
		$gameSwitches.setValue(McKathlin.DayNight.Param.NightSwitch, !isDay);

		$gameVariables.setValue(McKathlin.DayNight.Param.DaysPassedVariable, this.getDays());
		$gameVariables.setValue(McKathlin.DayNight.Param.CurrentHourVariable, this.getHours());
		$gameVariables.setValue(McKathlin.DayNight.Param.CurrentMinuteVariable, this.getMinutes());
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
	// Lighting application and tone-finding
	//=============================================================================
	
	Game_Map.prototype.applyLightingPreset = function(presetName, duration=0) {
		this.lightingType = presetName;
		this.isOutside = (this.lightingType == McKathlin.DayNight.Param.OutdoorLightingKeyword);
		this.mapTone = McKathlin.DayNightCycle.getToneByKeyword(this.lightingType);
		this.pictureOverlay = McKathlin.DayNightCycle.getPictureOverlayByKeyword(this.lightingType);
		$gameScreen.startTint(this.mapTone, duration);
		$gameScreen.startPictureOverlay(this.pictureOverlay, duration);
	};

	McKathlin.DayNightCycle.getToneByKeyword = function(keyword) {
		var tone = null;
		if (keyword) {
			keyword = keyword.toLowerCase();
			if (keyword == McKathlin.DayNight.Param.OutdoorLightingKeyword) {
				tone = this.getOutsideTone();
			} else {
				let preset = McKathlin.DayNight.Param.SimpleLightingPresets[keyword];
				tone = preset ? preset.tone : null;
			}
		}
		
		if (!tone) {
			tone = McKathlin.DayNight.DEFAULT_TONE;
		}
		return tone;
	};

	McKathlin.DayNightCycle.getOutsideTone = function() {
		var time = this.getMinutesOfDay();
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

	//=============================================================================
	// Screen Picture Overlays
	//=============================================================================
	// Picture overlay lookup
	//-----------------------------------------------------------------------------

	McKathlin.DayNightCycle.getPictureOverlayByKeyword = function(keyword) {
		if (keyword) {
			let key = keyword.toLowerCase();
			let preset = McKathlin.DayNight.Param.SimpleLightingPresets[key];
			if (preset) {
				return preset.picture_overlay;
			}
		}
		return null;
	};

	//-----------------------------------------------------------------------------
	// Picture overlay pre-loading
	//-----------------------------------------------------------------------------

	// Alias method
	McKathlin.DayNight.Scene_Boot_loadSystemImages =
		Scene_Boot.prototype.loadSystemImages;
	Scene_Boot.prototype.loadSystemImages = function() {
		McKathlin.DayNight.Scene_Boot_loadSystemImages.call(this);
		McKathlin.DayNight.preLoadPictureOverlays();
	};

	McKathlin.DayNight.preLoadPictureOverlays = function() {
		const presets = Object.values(
			McKathlin.DayNight.Param.SimpleLightingPresets);
		for (const preset of presets) {
			if (preset && preset.picture_overlay && preset.picture_overlay.filename) {
				ImageManager.loadPicture(preset.picture_overlay.filename);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Picture overlay opacity changes
	//-----------------------------------------------------------------------------

	// New method
	// Start showing the picture overlay.
	// Its opacity will increase to full over the duration (in frames) given.
	Game_Screen.prototype.startPictureOverlay = function(picture, duration) {
		if (!picture || !picture.filename) {
			this.clearPictureOverlay(duration);
			return;
		}
		if (picture == this._lastOverlayPicture) {
			// Exact same overlay; no need to change.
			return;
		}

		const INVISIBLE_OPACITY = 0;
		const SIGMOID_EASING = 3;
		const pictureId = this.realPictureId(picture.picture_number);
		
		if (0 == duration) {
			// Instant change.
			if (this._lastOverlayPicture &&
				this._lastOverlayPicture.picture_number != picture.picture_number) {
				this.erasePicture(this._lastOverlayPicture.picture_number);
			}
			this.showPicture(pictureId, picture.filename, picture.origin,
				picture.x, picture.y, picture.width_percent, picture.height_percent,
				picture.opacity, picture.blend_mode);
		} else if (this._lastOverlayPicture &&
			picture.picture_number == this._lastOverlayPicture.picture_number) {
			// This overlay has the same picture number as the last one.
			// If picture file has changed, replace it, but with a warning.
			if (picture.filename != this._lastOverlayPictureFilename) {
				console.warn("Transition of picture overlays assigned to the " +
					"same picture number will be abrupt.\n" +
					"To transition gradually, assign them different picture numbers,\n" +
					"or leave picture number blank for automatic assignment.");
				let last = this._lastOverlayPicture;
				this.showPicture(pictureId, picture.filename, last.origin,
					last.x, last.y, last.width_percent, last.height_percent,
					last.opacity, last.blend_mode);
			}
			// Move picture to match new properties.
			this.movePicture(pictureId, picture.origin, picture.x, picture.y,
				picture.width_percent, picture.height_percent, picture.opacity,
				picture.blend_mode, duration, SIGMOID_EASING);

		} else {
			// Different picture numbers. Fade out the old; fade in the new.
			this.clearPictureOverlay(duration);

			// Start the new overlay at opacity zero.
			this.showPicture(pictureId, picture.filename, picture.origin,
				picture.x, picture.y, picture.width_percent, picture.height_percent,
				INVISIBLE_OPACITY, picture.blend_mode);

			// Fade it in over time.
			this.movePicture(pictureId, picture.origin, picture.x, picture.y,
				picture.width_percent, picture.height_percent, picture.opacity,
				picture.blend_mode, duration, SIGMOID_EASING);
		}
		this._lastOverlayPicture = picture;
	};

	// Remove the current picture overlay, if any.
	// Its opacity will fade to zero over the duration (in frames) given.
	Game_Screen.prototype.clearPictureOverlay = function(duration) {
		if (!this._lastOverlayPicture) {
			// Nothing to clear.
			return;
		}
		const pictureId = this.realPictureId(this._lastOverlayPicture.picture_number);
		if (duration > 0) {
			// Fade the picture to transparent.
			let pic = this._lastOverlayPicture;
			const INVISIBLE_OPACITY = 0;
			const SIGMOID_EASING = 3; // slow to fast to slow change
			// Change picture to transparent (invisible) over the given duration.
			this.movePicture(pictureId, pic.origin, pic.x, pic.y,
				pic.width_percent, pic.height_percent, INVISIBLE_OPACITY,
				pic.blend_mode, duration, SIGMOID_EASING);
		} else {
			// clear instantly
			this.erasePicture(pictureId);
		}
		this._lastOverlayPicture = null;
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
			if (McKathlin.DayNight.Param.ReservedSwitches.includes(switchId)) {
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

		const note = $dataMap.note || "";
		this.minutesPerStep = McKathlin.DayNight.getStepNotetag(note);

		const lightingType = McKathlin.DayNight.getLightingNotetag(note);
		const INSTANT_DURATION = 0;
		this.applyLightingPreset(lightingType, INSTANT_DURATION);
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
	
	//-- Reset Lighting --
	PluginManager.registerCommand(pluginName, "resetLighting", args => {
		const presetName = McKathlin.DayNight.getLightingNotetag($dataMap.note);
		const duration = Number(args.duration || 0);
		$gameMap.applyLightingPreset(presetName, duration);
	});
	
	//-- Use Lighting Preset --
	PluginManager.registerCommand(pluginName, "useLightingPreset", args => {
		const presetName = args.lightingKeyword;
		const duration = Number(args.duration || 0);
		if (presetName) {
			$gameMap.applyLightingPreset(presetName, duration);
		}
	});

	//=============================================================================
	// Bloodmoon features
	//=============================================================================

	if (McKathlin.DayNight.Param.EnableBloodmoon) {
		//-------------------------------------------------------------------------
		// Moon phase calculation helps
		//-------------------------------------------------------------------------
		McKathlin.DayNight.Param.MoonPhaseIndex =
			McKathlin.DayNight.Param.NightsBeforeFirstBloodmoon %
				McKathlin.DayNight.Param.DaysInMoonCycle;

		McKathlin.TimeSpan.prototype.isBloodmoonNight = function(isForTones=false) {
			return this.isNight() && this.isBloodmoonPhase(isForTones);
		};

		McKathlin.TimeSpan.prototype.isBloodmoonPhase = function(isForTones=false) {
			return this.getMoonPhase(isForTones) == 0;
		};

		McKathlin.TimeSpan.prototype.getMoonPhase = function(isForTones=false) {
			const cutoffTime = isForTones ?
				McKathlin.DayNight.Param.MiddayAsMinutes :
				McKathlin.DayNight.Param.DayStartTimeAsMinutes;
			var nightsPassed = this.getDays();
			if (this.getMinutesOfDay() < cutoffTime) {
				nightsPassed -= 1;
			}
			if (nightsPassed < McKathlin.DayNight.Param.NightsBeforeFirstBloodmoon) {
				return -1;
			}
			return (McKathlin.DayNight.Param.DaysInMoonCycle + nightsPassed - McKathlin.DayNight.Param.MoonPhaseIndex)
				% McKathlin.DayNight.Param.DaysInMoonCycle;
		};

		//-------------------------------------------------------------------------
		// Switch setting
		//-------------------------------------------------------------------------

		// Alias method
		// Adds Bloodmoon variable and switch setting.
		McKathlin.DayNightCycle.updateTime_noBloodmoon =
			McKathlin.DayNightCycle.updateTime;
		McKathlin.DayNightCycle.updateTime = function() {
			McKathlin.DayNightCycle.updateTime_noBloodmoon.call(this);

			const moonPhase = this.getMoonPhase();
			const isBloodmoon = 0 == moonPhase;
			const isDay = this.isDaytime();

			$gameVariables.setValue(
				McKathlin.DayNight.Param.MoonPhaseVariable, moonPhase);
			$gameSwitches.setValue(
				McKathlin.DayNight.Param.BloodmoonPhaseSwitch, isBloodmoon);
			$gameSwitches.setValue(
				McKathlin.DayNight.Param.BloodmoonNightSwitch, isBloodmoon && !isDay);
		};

		//-------------------------------------------------------------------------
		// Tone finding
		//-------------------------------------------------------------------------

		// Alias method
		McKathlin.DayNightCycle.getOutsideTone_noBloodmoon = 
			McKathlin.DayNightCycle.getOutsideTone;
		McKathlin.DayNightCycle.getOutsideTone = function() {
			if (!this.isBloodmoonPhase(true)) {
				return McKathlin.DayNightCycle.getOutsideTone_noBloodmoon.call(this);
			}
			var time = this.getMinutesOfDay();
			if (time < McKathlin.DayNight.Param.DawnStartTimeAsMinutes) {
				// night, between midnight and dawn
				return McKathlin.DayNight.Param.BloodmoonNightTone;
			}
			else if (time < McKathlin.DayNight.Param.DawnEndTimeAsMinutes) {
				// dawn
				phase = Math.floor((time - McKathlin.DayNight.Param.DawnStartTimeAsMinutes) /
					McKathlin.DayNight.Param.MinutesPerTonePhase);
				return McKathlin.DayNight.Param.BloodmoonDawnTonePhases[phase];
			}
			else if (time < McKathlin.DayNight.Param.DuskStartTimeAsMinutes) {
				// daytime light is after dawn and before dusk
				return McKathlin.DayNight.Param.DaylightTone;
			}
			else if (time < McKathlin.DayNight.Param.DuskEndTimeAsMinutes) {
				phase = Math.floor((time - McKathlin.DayNight.Param.DuskStartTimeAsMinutes) /
					McKathlin.DayNight.Param.MinutesPerTonePhase);
				return McKathlin.DayNight.Param.BloodmoonDuskTonePhases[phase];
			}
			else {
				// night, between dusk and midnight
				return McKathlin.DayNight.Param.BloodmoonNightTone;
			}
		};

	} // endif Bloodmoon enabled
	
})();