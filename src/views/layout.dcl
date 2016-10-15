head
  meta(charset="UTF-8")
  meta(name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0")
  meta(content='IE=edge, chrome=1' http-equiv='X-UA-Compatible')

  title Wavetape.js

  link(href='/stylesheets/main.css' rel='stylesheet')
  link(href="/font-awesome/css/font-awesome.min.css" rel="stylesheet")
    
  link(rel="shortcut icon" href="/favicon.png")

body
  {{view EchoView}}
    .echo-view
      header
        a(href="http://github.com/syntheticore/wavetape")
          i.fa.fa-github
          i.fa.fa-npm
        h1 Wavetape<span>.js</span>
        h2 Measure real-world distances on mobile devices using near-ultrasound 

      section#demo
        button.distance(class="{running: running, obstacle: obstacle}" {{on click toggle}})
          {{if running}}
            h2 Distance
            span {distance} m
          {{=>}}
            h2 Demo

        ul.charts(class="{running: running}")
          li
            //- header
            //-   h3 Signal ({minRange} - {maxRange} m)
            canvas#signal-canvas(width="{width}" height="{height}")

      section#instructions
        h3 Install using NPM
        pre
          code+
            $ npm install wavetape --save

        h3 Run in the browser
        pre
          code+
            var radar = new Wavetape();
            radar.start(function(distance) {
              radar.stop();
            });
