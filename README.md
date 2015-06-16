# ion-custom-range
Custom range directive for Ionic Framework. It has the same look and feel of the input range component, except it doesn't block scrolling. 

## Usage

* Copy `ion-custom-range.css` to your www/css folder.
* Copy `ion-custom-range.js` to your www/js folder.
* Open index.html and:
  * Add CSS file to header block, after ionic.css, like this:
  ```
  <link href="css/ion-custom-range.css" rel="stylesheet">
  ```
  * Add JS file after ionic.bundle.js, like this:
  ```
  <script src="js/ion-custom-range.js"></script>
  ```

* Open app.js and add ionicCustomRange to the list of modules, like this:
  ```
  angular.module('starter', ['ionic', 'ionicCustomRange'])
  ```
* In template ion-custom-range can be used like this:

  ```
  <div class="range">
    <i class="icon ion-volume-low"></i>
    <ion-custom-range ng-model="data.volume" min="0" max="100"></ion-custom-range>
    <i class="icon ion-volume-high"></i>
  </div>
  ```

## Example

Live example can be found on Ionic Playground.
* Instructions
  * Open Google Chrome and enable Device Mode (first open Developer tools and on the top left, next to search icon there is a mobile icon)
  * Next, paste: http://play.ionic.io/m/fc9456fe858f

Full code preview (range component will not work in desktop browser without Device mode): 
http://play.ionic.io/app/fc9456fe858f


