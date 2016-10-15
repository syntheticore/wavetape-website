var declaire = require('declaire');
var Wavetape = require('wavetape');
var _ = declaire.utils;

module.exports = declaire.ViewModel('EchoView', {
  width: 400,
  height: 50,

  running: false,
  obstacle: false,
  distance: 0,
  minRange: 0,
  maxRange: 0,

  toggle: function() {
    var self = this;
    var running = self.get('running');
    if(running) {
      self.radar.stop();
    } else {
      // Update UI with range
      var range = self.radar.getRange();
      self.set('minRange', range.min.toFixed(2));
      self.set('maxRange', range.max.toFixed(2));
      // Start measuring
      var signalCtx = document.getElementById('signal-canvas').getContext('2d');
      self.radar.start(function(distance) {
        // Update UI with measurement
        self.set('distance', distance.toFixed(2));
        // Check if close to obstacle
        var obstacle = (distance < 0.6);
        // Vibrate and show animated red waves
        vibrate(!obstacle);
        self.set('obstacle', obstacle);
      }, function(data) {
        // Draw signal
        drawData(data.signal, signalCtx, 8, data);
      });
    }
    self.set('running', !running);
  },

  resize: function() {
    var width = document.getElementById('signal-canvas').parentNode.offsetWidth;
    this.set('width', width * 1);
  }
}, function() {
  var self = this;

  if(_.onClient()) {
    self.radar = new Wavetape();
    self.on('remove', function() {
      self.radar.stop();
    });
    self.resize();
    window.addEventListener('resize', function() {
      if(!self.get('running')) {
        self.resize();
      }
    });
  }
});

var drawData = function(data, ctx, scale, signals) {
  if(!data) return;
  var w = ctx.canvas.width;
  var h = ctx.canvas.height;
  // Draw buffer
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgb(26, 166, 210)';
  ctx.beginPath();
  var x = 0;
  var sliceWidth = w / data.length;
  for(var i = 0; i < data.length; i++) {
    // var v = (data[i] - 0.5) * scale + 0.5;
    var v = data[i] * scale;
    var y = h - v * h;
    if(i == 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  }
  ctx.stroke();
  // Draw peaks
  if(!(signals && signals.peaks)) return;
  var drawPeaks = function(peaks) {
    _.each(peaks, function(peak) {
      var x = peak.index * sliceWidth;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    });
  };
  // Draw echoes
  ctx.strokeStyle = 'rgb(220, 220, 220)';
  ctx.beginPath();
  drawPeaks(signals.peaks);
  ctx.stroke();
  // Draw pulse
  ctx.strokeStyle = 'rgb(255, 100, 200)';
  ctx.beginPath();
  drawPeaks([signals.pulse]);
  ctx.stroke();
  // Draw main echo
  ctx.beginPath();
  drawPeaks([signals.echo]);
  ctx.stroke();
};

var vibrate = function(stop) {
  window.navigator.vibrate && window.navigator.vibrate(stop ? 0 : 10000);
}
