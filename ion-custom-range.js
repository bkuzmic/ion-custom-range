(function() {

  var IonicCustomRange = angular.module('ionicCustomRange', ['ionic']);

  IonicCustomRange.directive('ionCustomRange', ['$window', function($window) {
    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
      },
      template: '<div class="static-background-line"></div>' +
                '<div class="progress-line"></div> '+
                '<div class="scrubber"></div>',
      link: function (scope, element, attrs) {
        var progressLineClass = attrs["class"] ? attrs["class"] + "-bg" : "default-progress-line-bg";
        var min = attrs["min"] ? parseFloat(attrs["min"]) : 0;
        var max = attrs["max"] ? parseFloat(attrs["max"]) : 100;
        var step = attrs["step"] ? parseFloat(attrs["step"]) : 1;
        var value = attrs["value"] ? parseFloat(attrs["value"]) : (max - Math.abs(min)) / 2;
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        }
        
        var containerBox = element[0].getBoundingClientRect();
        var progressLine = element[0].querySelector('.progress-line');
        var scrubber = element[0].querySelector('.scrubber');
        var scrubberSize = scrubber.getBoundingClientRect().width;
        var scrubbing = false;
        var offsetTouchX = Math.round(scrubberSize/2 + scrubberSize/4);
        var startX = containerBox.left + offsetTouchX;
        var offsetMarginRight = 5;
        var maxRangeInPx = containerBox.width - containerBox.left - offsetMarginRight;

        // add Ionic background class to progress line
        progressLine.className += " " + progressLineClass;

        var defaultValue = scope.ngModel || value;
        setPosition(getPositionFromValue(defaultValue));

        function getPositionFromValue(value) {
          return (value - min)/(max - min) * maxRangeInPx;
        }

        function setPosition(x) {
          scrubber.style[ionic.CSS.TRANSFORM] = "translate3d(" + x + "px, 0, 0)";
          progressLine.style.width = x + "px";
        }

        var touchStart = function(event) {
          event.preventDefault();
          scrubbing = true;
        }

        var touchMove = function(event) {
          if (scrubbing) {
            var touchX = event.touches[0].clientX;
            var delta = touchX - startX;
            if (delta < 0) {
              delta = 0;
            } else if (delta > maxRangeInPx) {
              delta = maxRangeInPx;
            }
            setPosition(delta);
            scope.$apply(function() {
              var value = step * Math.floor((delta / maxRangeInPx) * (max - min) / step) + min;
              scope.ngModel = Number((value).toFixed(2));
            });
          }
        }

        var touchEnd = function(event) {
          scrubbing = false;
        }

        var onResize = function(event) {
          containerBox = element[0].getBoundingClientRect();
          maxRangeInPx = containerBox.width - containerBox.left - offsetMarginRight + scrubberSize;
          var currentValue = scope.ngModel || value;
          setPosition(getPositionFromValue(currentValue));
        }

        ionic.on('touchstart', touchStart, scrubber);
        ionic.on('touchmove', touchMove, scrubber);
        ionic.on('touchend', touchEnd, scrubber);
        ionic.on('resize', onResize, $window);

        scope.$on('$destroy', function() {
          ionic.off('touchstart', touchStart, scrubber);
          ionic.off('touchmove', touchMove, scrubber);
          ionic.off('touchend', touchEnd, scrubber);
          ionic.off('resize', onResize, $window);
        });
      }
    };
  }]);
})();