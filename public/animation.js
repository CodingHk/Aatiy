var cw = window.innerWidth,
    ch = window.innerHeight,
    nWaves = 5,
    waves = [],
    amp = 10,
    speed = 0.4,
    detail = 30,
    waveY = 0,
    w = 0;

// This function is taking care of the source of this animation done by the W3 website, along with the base colours using JQuery
for (var w=0; w<nWaves; w++) {
    var p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    waves.push(p);
    $('#m').append(p);
     gsap.set(p, {attr:()=>{ return (w==0) ? {fill:'#fff'} : {fill:'none', stroke:'#fff', 'stroke-dasharray':'2 4', 'stroke-width':3-w/nWaves*3}}});
}


gsap.timeline({defaults:{duration:1}, delay:0.9})
    .from('.txt1', {opacity:0, ease:'power2.inOut'}, 0)
    .to(window, {scrollTo:ch/2}, 0);

gsap.ticker.add(drawWave);

// This function is handling the duration of the animation whenver you scroll, you will see
// a rounded shape that can perform multiple colors based on white
function drawWave(t) { 
  if (waveY!=-$(window).scrollTop()) gsap.to(window, {duration:1, waveY:Math.round($(window).scrollTop())});
  
  for (var k=0; k<nWaves; k++) {
    var p = waves[k],
        offset = (1 - k/nWaves) * nWaves/6,
        pts = '';
    
    for(var i=-1; i<(cw+detail); i+=detail) {
      var y = ch-waveY;
      y += Math.sin(i * 0.003 - t/speed + offset) * amp;
      y += Math.sin(i * 0.004 - t/speed + offset) * amp;
      y += Math.sin(i * -0.011 - t/speed + 20+offset) * amp;
      pts += i.toFixed(2)+','+y.toFixed(2)+' ';
    }
    
    gsap.set(p, {attr:{points:'-20,-20 -20,'+ch/2+' '+pts+' '+cw+',-20'}});
  }  
}

$(window).on('resize', ()=>{ cw=window.innerWidth; ch=window.innerHeight; })
