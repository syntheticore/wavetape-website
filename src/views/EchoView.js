var declaire = require('declaire');
var Wavetape = require('wavetape');
var _ = declaire.utils;

module.exports = declaire.ViewModel('EchoView', {
  width: 400,
  height: 100,
  running: false,
  obstacle: false,
  radar: new Wavetape(),
  distance: 0,

  toggle: function() {
    var self = this;
    var running = self.get('running');
    var radar = self.get('radar');
    if(running) {
      radar.stop();
    } else {
      var freqCtx = document.getElementById('frequency-canvas').getContext('2d');
      var waveCtx = document.getElementById('waveform-canvas').getContext('2d');
      var signalCtx = document.getElementById('signal-canvas').getContext('2d');
      radar.start(function(distance) {
        // Update UI with measurement
        self.set('distance', distance.toFixed(2));
        self.set('obstacle', distance < 0.6);
      }, function(data) {
        // Draw buffers
        drawData(data.frequency, freqCtx, 1/256);
        drawData(data.waveform, waveCtx, 1/256);
        drawData(data.signal, signalCtx, 16);
      });
    }
    self.set('running', !running);
  },

  resize: function() {
    var width = document.getElementById('signal-canvas').parentNode.offsetWidth;
    this.set('width', width * 1);
    this.set('height', Math.round(width / 4));
  }
}, function() {
  var self = this;
  if(_.onClient()) {
    self.resize();
    window.addEventListener('resize', function() {
      if(!self.get('running')) {
        self.resize();
      }
    });
  }
});

var drawData = function(data, ctx, scale) {
  if(!data) return;
  var w = ctx.canvas.width;
  var h = ctx.canvas.height;
  ctx.fillStyle = 'rgb(245, 245, 245)';
  ctx.fillRect(0, 0, w, h);
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
};
