import { useEffect, useRef } from 'react'

export default function FireworkAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return

    let w = c.width = window.innerWidth,
      h = c.height = window.innerHeight,
      ctx = c.getContext('2d'),
      
      hw = w / 2,
      hh = h / 2,
      
      opts = {
        strings: [ 'HAPPY', 'VALENTINE', 'DAY TO YOU', 'BABY' ],
        charSize: 30,
        charSpacing: 35,
        lineHeight: 40,
          
        cx: w / 2,
        cy: h / 2,
        
        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 5,
        fireworkAddedLineWidth: 8,
        fireworkSpawnTime: 200,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: 20,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime: 30,
        fireworkCircleAddedTime: 30,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 5,
        fireworkAddedShards: 5,
        fireworkShardPrevPoints: 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: .1,
        upFlow: -.1,
        letterContemplatingWaitTime: 360,
        balloonSpawnTime: 20,
        balloonBaseInflateTime: 10,
        balloonAddedInflateTime: 10,
        balloonBaseSize: 20,
        balloonAddedSize: 20,
        balloonBaseVel: .4,
        balloonAddedVel: .4,
        balloonBaseRadian: -( Math.PI / 2 - .5 ),
        balloonAddedRadian: -1,
      },
      calc = {
        totalWidth: opts.charSpacing * Math.max( ...opts.strings.map(s => s.length) )
      },
      
      Tau = Math.PI * 2,
      TauQuarter = Tau / 4,
      
      letters = []

    ctx.font = opts.charSize + 'px Verdana'

    function Letter( char, x, y ){
      this.char = char
      this.x = x
      this.y = y
      
      this.dx = -ctx.measureText( char ).width / 2
      this.dy = +opts.charSize / 2
      
      this.fireworkDy = this.y - hh
      
      // Black and white colors - using grayscale based on position
      var gray = Math.floor( (x / calc.totalWidth) * 100 + 50 ) // 50-150 range
      this.color = `rgb(${gray},${gray},${gray})`
      this.lightAlphaColor = 'rgba(255,255,255,alp)'
      this.lightColor = 'rgb(255,255,255)'
      this.alphaColor = 'rgba(200,200,200,alp)'
      
      this.reset()
    }

    Letter.prototype.reset = function(){
      this.phase = 'firework'
      this.tick = 0
      this.spawned = false
      this.spawningTime = opts.fireworkSpawnTime * Math.random() |0
      this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() |0
      this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random()
      this.prevPoints = [ [ 0, hh, 0 ] ]
    }

    Letter.prototype.step = function(){
      if( this.phase === 'firework' ){
        if( !this.spawned ){
          ++this.tick
          if( this.tick >= this.spawningTime ){
            this.tick = 0
            this.spawned = true
          }
        } else {
          ++this.tick
          
          var linearProportion = this.tick / this.reachTime,
              armonicProportion = Math.sin( linearProportion * TauQuarter ),
              
              x = linearProportion * this.x,
              y = hh + armonicProportion * this.fireworkDy
          
          if( this.prevPoints.length > opts.fireworkPrevPoints )
            this.prevPoints.shift()
          
          this.prevPoints.push( [ x, y, linearProportion * this.lineWidth ] )
          
          var lineWidthProportion = 1 / ( this.prevPoints.length - 1 )
          
          for( var i = 1; i < this.prevPoints.length; ++i ){
            var point = this.prevPoints[ i ],
                point2 = this.prevPoints[ i - 1 ]
            
            var alpha = i / this.prevPoints.length
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = point[ 2 ] * lineWidthProportion * i
            ctx.beginPath()
            ctx.moveTo( point[ 0 ], point[ 1 ] )
            ctx.lineTo( point2[ 0 ], point2[ 1 ] )
            ctx.stroke()
          }
          
          if( this.tick >= this.reachTime ){
            this.phase = 'contemplate'
            
            this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random()
            this.circleCompleteTime = opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random() |0
            this.circleCreating = true
            this.circleFading = false
            
            this.circleFadeTime = opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random() |0
            this.tick = 0
            this.tick2 = 0
            
            this.shards = []
            
            var shardCount = opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random() |0,
                angle = Tau / shardCount,
                cos = Math.cos( angle ),
                sin = Math.sin( angle ),
                
                x = 1,
                y = 0
            
            for( var i = 0; i < shardCount; ++i ){
              var x1 = x
              x = x * cos - y * sin
              y = y * cos + x1 * sin
              
              this.shards.push( new Shard( this.x, this.y, x, y, this.alphaColor ) )
            }
          }
        }
      } else if( this.phase === 'contemplate' ){
        ++this.tick
        
        if( this.circleCreating ){
          ++this.tick2
          var proportion = this.tick2 / this.circleCompleteTime,
              armonic = -Math.cos( proportion * Math.PI ) / 2 + .5
          
          ctx.beginPath()
          var alpha = proportion
          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.beginPath()
          ctx.arc( this.x, this.y, armonic * this.circleFinalSize, 0, Tau )
          ctx.fill()
          
          if( this.tick2 > this.circleCompleteTime ){
            this.tick2 = 0
            this.circleCreating = false
            this.circleFading = true
          }
        } else if( this.circleFading ){
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fillText( this.char, this.x + this.dx, this.y + this.dy )
          
          ++this.tick2
          var proportion = this.tick2 / this.circleFadeTime,
              armonic = -Math.cos( proportion * Math.PI ) / 2 + .5
          
          ctx.beginPath()
          ctx.fillStyle = `rgba(255,255,255,${1 - armonic})`
          ctx.arc( this.x, this.y, this.circleFinalSize, 0, Tau )
          ctx.fill()
          
          if( this.tick2 >= this.circleFadeTime )
            this.circleFading = false
        } else {
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fillText( this.char, this.x + this.dx, this.y + this.dy )
        }
        
        for( var i = 0; i < this.shards.length; ++i ){
          this.shards[ i ].step()
          
          if( !this.shards[ i ].alive ){
            this.shards.splice( i, 1 )
            --i
          }
        }
        
        if( this.tick > opts.letterContemplatingWaitTime ){
          this.phase = 'balloon'
          
          this.tick = 0
          this.spawning = true
          this.spawnTime = opts.balloonSpawnTime * Math.random() |0
          this.inflating = false
          this.inflateTime = opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random() |0
          this.size = opts.balloonBaseSize + opts.balloonAddedSize * Math.random() |0
          
          var rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
              vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random()
          
          this.vx = Math.cos( rad ) * vel
          this.vy = Math.sin( rad ) * vel
        }
      } else if( this.phase === 'balloon' ){
        ctx.strokeStyle = 'rgb(200,200,200)'
        
        if( this.spawning ){
          ++this.tick
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fillText( this.char, this.x + this.dx, this.y + this.dy )
          
          if( this.tick >= this.spawnTime ){
            this.tick = 0
            this.spawning = false
            this.inflating = true	
          }
        } else if( this.inflating ){
          ++this.tick
          
          var proportion = this.tick / this.inflateTime,
              x = this.cx = this.x,
              y = this.cy = this.y - this.size * proportion
          
          ctx.fillStyle = `rgba(150,150,150,${proportion})`
          ctx.beginPath()
          generateBalloonPath( x, y, this.size * proportion )
          ctx.fill()
          
          ctx.beginPath()
          ctx.moveTo( x, y )
          ctx.lineTo( x, this.y )
          ctx.stroke()
          
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fillText( this.char, this.x + this.dx, this.y + this.dy )
          
          if( this.tick >= this.inflateTime ){
            this.tick = 0
            this.inflating = false
          }
        } else {
          this.cx += this.vx
          this.cy += this.vy += opts.upFlow
          
          ctx.fillStyle = this.color
          ctx.beginPath()
          generateBalloonPath( this.cx, this.cy, this.size )
          ctx.fill()
          
          ctx.beginPath()
          ctx.moveTo( this.cx, this.cy )
          ctx.lineTo( this.cx, this.cy + this.size )
          ctx.stroke()
          
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fillText( this.char, this.cx + this.dx, this.cy + this.dy + this.size )
          
          if( this.cy + this.size < -hh || this.cx < -hw || this.cy > hw  )
            this.phase = 'done'
        }
      }
    }

    function Shard( x, y, vx, vy, color ){
      var vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random()
      
      this.vx = vx * vel
      this.vy = vy * vel
      
      this.x = x
      this.y = y
      
      this.prevPoints = [ [ x, y ] ]
      this.color = color
      
      this.alive = true
      
      this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random()
    }

    Shard.prototype.step = function(){
      this.x += this.vx
      this.y += this.vy += opts.gravity
      
      if( this.prevPoints.length > opts.fireworkShardPrevPoints )
        this.prevPoints.shift()
      
      this.prevPoints.push( [ this.x, this.y ] )
      
      var lineWidthProportion = this.size / this.prevPoints.length
      
      for( var k = 0; k < this.prevPoints.length - 1; ++k ){
        var point = this.prevPoints[ k ],
            point2 = this.prevPoints[ k + 1 ]
        
        var alpha = k / this.prevPoints.length
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx.lineWidth = k * lineWidthProportion
        ctx.beginPath()
        ctx.moveTo( point[ 0 ], point[ 1 ] )
        ctx.lineTo( point2[ 0 ], point2[ 1 ] )
        ctx.stroke()
      }
      
      if( this.prevPoints[ 0 ][ 1 ] > hh )
        this.alive = false
    }

    function generateBalloonPath( x, y, size ){
      ctx.moveTo( x, y )
      ctx.bezierCurveTo( x - size / 2, y - size / 2,
                        x - size / 4, y - size,
                        x,            y - size )
      ctx.bezierCurveTo( x + size / 4, y - size,
                        x + size / 2, y - size / 2,
                        x,            y )
    }

    function anim(){
      window.requestAnimationFrame( anim )
      
      // Clear canvas with transparency to show stars behind
      ctx.clearRect( 0, 0, w, h )
      
      ctx.translate( hw, hh )
      
      var done = true
      for( var l = 0; l < letters.length; ++l ){
        letters[ l ].step()
        if( letters[ l ].phase !== 'done' )
          done = false
      }
      
      ctx.translate( -hw, -hh )
      
      if( done )
        for( var l = 0; l < letters.length; ++l )
          letters[ l ].reset()
    }

    for( var i = 0; i < opts.strings.length; ++i ){
      for( var j = 0; j < opts.strings[ i ].length; ++j ){
        letters.push( new Letter( opts.strings[ i ][ j ], 
                                  j * opts.charSpacing - (opts.strings[ i ].length - 1) * opts.charSpacing / 2,
                                  i * opts.lineHeight - (opts.strings.length - 1) * opts.lineHeight / 2 - 200 ) )
      }
    }

    anim()

    const handleResize = () => {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
      
      hw = w / 2
      hh = h / 2
      
      ctx.font = opts.charSize + 'px Verdana'
    }

    window.addEventListener( 'resize', handleResize )

    return () => {
      window.removeEventListener( 'resize', handleResize )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10
      }}
    />
  )
}
