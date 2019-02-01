# zoomstats

A command line utility and chrome extension to derive statistics from zoom recordings.

## Setup
Make sure you run
```bash
npm install
```
## Usage
For now, zoomstats is really simple - a proove of concept so to speak.

You will need to feed it a saved HTML page that contains the
transcript of the recording. To do so...
- open the recording in zoom, make sure the transcript display is enabled
- right-click in an empty area of the page and select save page
- select a location/filename and save the page
- now run
```bash
node src/index.js talktime <path/to/html/file>
```

You should get a small JSON dump with the (humanized) talk times per speaker,
like this:

```
analyzing file ../../../Downloads/Frontend-services catch-up - Zoom.htm
{ 'Andre Wyrwa': '15 minutes',
  'Henry Geddes': 'a few seconds',
  'Unknown Speaker': 'a few seconds',
  'Diego Castano Castiblanco': '9 minutes',
  Dan: 'a few seconds',
  'Rira Choi': 'a few seconds',
  iprokopenko: 'a few seconds',
  'Luiz Silva Junior': 'a minute' }
```

## Available stats
- **talktime** get the total talk times per speaker
- **effectiveness** get the percentage of actual talktime vs. total meeting time
- **topwords** get the twenty most used words from the meeting

## Chrome extension
This is also available as a chrome extension (currently private for members of theiconic.com.au).
