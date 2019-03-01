[![Maintainability](https://api.codeclimate.com/v1/badges/bf8ffb6b4dfd2857d615/maintainability)](https://codeclimate.com/repos/5c54a7fc2deb395da200875d/maintainability)

# zoomstats

A command line utility and chrome extension to derive statistics from zoom recordings.

## Setup
Make sure you run
```bash
npm install
```
## Usage (command line)
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
{ 'James T. Kirk': '15 minutes',
  'Hans Christian Anderssen': 'a few seconds',
  'James Norrington': 'a few seconds',
  'Old McDonald': '9 minutes',
  'Hank Williams': 'a few seconds',
  'Joshua Frasure': 'a few seconds',
  'Amanda Brown: 'a few seconds',
  'Peter Williams': 'a minute' }
```

## Available statistics
- **talktime** get the total talk times per speaker
- **effectiveness** get the percentage of actual talktime vs. total meeting time
- **topwords** get the twenty most used words from the meeting

## Chrome extension
This also includes a chrome extension exposing the same functionality.
The extension is currently published privately.

## Contributing
Please feel free and encouraged to improve this project by
filing issues and pull requests.

A secondary aim of the project is to serve as a playground
for functional programming style in JS. PRs must adhere
to this, please.
