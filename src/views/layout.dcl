head
  meta(charset="UTF-8")
  meta(name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0")
  meta(content='IE=edge, chrome=1' http-equiv='X-UA-Compatible')

  title Echolot

  link(href='/stylesheets/main.css' rel='stylesheet')
  link(href="/font-awesome/css/font-awesome.min.css" rel="stylesheet")
    
  link(rel="shortcut icon" href="/favicon.png")

body
  {{view EchoView}}
    .echo-view
      header
        h1 Echolot

        button({{on click toggle}})
          {{if running}}
            | Stop
          {{=>}}
            | Start

      ul.charts
        //- li
        //-   h3 Time Domain
        //-   canvas#frequency-canvas(width="{width}" height="{height}")
        
        li
          h3 Signal
          canvas#waveform-canvas(width="{width}" height="{height}")

      footer
        .distance(class="{running: running, obstacle: obstacle}")
          h2 Distance
          span {distance} m
