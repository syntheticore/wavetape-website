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

        label
          span Debug
          input(type="checkbox" checked="{debug!}")

      {{if debug}}
        form
          label
            input(type="range" min="-10" max="45" value="{temperature!}")
            span Temperature ({temperature})
          label
            input(type="range" max="200" value="{rate!}")
            span Measure rate ({rate})
          label
            input(type="range" max="200" value="{delay!}")
            span Delay ({delay})
          label
            input(type="range" min="1000" max="17000" value="{frequency!}")
            span Frequency ({frequency})
          label
            input(type="range" min="2" max="128" value="{kernel!}")
            span Filter Kernel ({kernel})
          label
            input(type="range" min="0.1" max="20" step="0.1" value="{pulseLength!}")
            span Pulse Length ({pulseLength})

        ul.charts
          li
            header
              h3 Frequency
              input(type="checkbox" checked="{showFrequency!}")
            canvas#frequency-canvas(width="{width}" height="{height}")

          li
            header
              h3 Time Domain
              input(type="checkbox" checked="{showWaveform!}")
            canvas#waveform-canvas(width="{width}" height="{height}")
          
          li
            header
              h3 Signal
              input(type="checkbox" checked="{showSignal!}")
            canvas#signal-canvas(width="{width}" height="{height}")

      footer
        .distance(class="{running: running, obstacle: obstacle}")
          h2 Distance
          span {distance} m
