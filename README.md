# FED Project Scaffold

This scaffold can be used as a template for writing FED development code.
It uses Node.JS and Gulp.JS tasks to compile separate CSS, JS and HTML.
It then "builds" your project code into one HTML file.

## Dependencies

- Node.JS >= 8.6.0
- (Gulp)[https://gulpjs.com/] installed globally


## Usage

- Run `npm install` to download all Node.JS package dependencies.
- Write your code in `src/` folder. E.g., code for Desktop can go in `src/desktop.html`. You can use any folder and file naming convention you want, but just make sure to also update the source paths in `gulpfile.js`
- Build the project code.
  - Build project code in `src/desktop.html` and/or `src/mobile.html`.
	- If referencing JS and CSS, make sure the correct files are referenced. Preferably minified files.
  - Run `gulp` in the command line to compile the code and output the result to `build/desktop.html` and/or `src/mobile.html`.
  - Watch for changes to your files and rebuild them.


## Package.json
- Update the Project Name, Description and Email at `package.json` before running `npm install`

## Updates

### March 1, 2019

Added the ability to convert PNG and JPG to WEBP format. 
- Adjust the the image file size in `gulpfile.js`
- All images that are converted are sent to `build/images/`