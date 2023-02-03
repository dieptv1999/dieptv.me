import styles from './Uses.module.css';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import random from 'lodash/random';
import { NextSeo } from 'next-seo';

export const Heart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      execute();
    }
  }, []);

  const execute = () => {
    /*
        * Settings
        */
    let settings = {
      particles: {
        length: 500, // maximum amount of particles
        duration: 2, // particle duration in sec
        velocity: 100, // particle velocity in pixels/sec
        effect: -0.75, // play with this for a nice effect
        size: 30, // particle size in pixels
      },
    };

    /*
    * RequestAnimationFrame polyfill by Erik Möller
    */
    (function() {
      let b = 0;
      let c = ['ms', 'moz', 'webkit', 'o'];
      for (let a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
        window.requestAnimationFrame = window[c[a] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[c[a] + 'CancelAnimationFrame'] || window[c[a] + 'CancelRequestAnimationFrame'];
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(h, e) {
          let d = new Date().getTime();
          let f = Math.max(0, 16 - (d - b));
          let g = window.setTimeout(function() {
            h(d + f);
          }, f);
          b = d + f;
          return g;
        };
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(d) {
          clearTimeout(d);
        };
      }
    }());

    /*
    * Point class
    */
    let Point = (function() {
      function Point(x, y) {
        this.x = (typeof x !== 'undefined') ? x : 0;
        this.y = (typeof y !== 'undefined') ? y : 0;
      }

      Point.prototype.clone = function() {
        return new Point(this.x, this.y);
      };
      Point.prototype.length = function(length) {
        if (typeof length == 'undefined')
          return Math.sqrt(this.x * this.x + this.y * this.y);
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
      };
      Point.prototype.normalize = function() {
        let length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
      };
      return Point;
    })();

    /*
    * Particle class
    */
    let Particle = (function() {
      function Particle() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
      }

      Particle.prototype.initialize = function(x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
      };
      Particle.prototype.update = function(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
      };
      Particle.prototype.draw = function(context, image) {
        function ease(t) {
          return (--t) * t * t + 1;
        }

        let size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
      };
      return Particle;
    })();

    /*
    * ParticlePool class
    */
    let ParticlePool = (function() {
      let particles,
        firstActive = 0,
        firstFree = 0,
        duration = settings.particles.duration;

      function ParticlePool(length) {
        // create and populate particle pool
        particles = new Array(length);
        for (let i = 0; i < particles.length; i++)
          particles[i] = new Particle();
      }

      ParticlePool.prototype.add = function(x, y, dx, dy) {
        particles[firstFree].initialize(x, y, dx, dy);

        // handle circular queue
        firstFree++;
        if (firstFree == particles.length) firstFree = 0;
        if (firstActive == firstFree) firstActive++;
        if (firstActive == particles.length) firstActive = 0;
      };
      ParticlePool.prototype.update = function(deltaTime) {
        let i;

        // update active particles
        if (firstActive < firstFree) {
          for (i = firstActive; i < firstFree; i++)
            particles[i].update(deltaTime);
        }
        if (firstFree < firstActive) {
          for (i = firstActive; i < particles.length; i++)
            particles[i].update(deltaTime);
          for (i = 0; i < firstFree; i++)
            particles[i].update(deltaTime);
        }

        // remove inactive particles
        while (particles[firstActive].age >= duration && firstActive != firstFree) {
          firstActive++;
          if (firstActive == particles.length) firstActive = 0;
        }


      };
      ParticlePool.prototype.draw = function(context, image) {
        // draw active particles
        if (firstActive < firstFree) {
          for (let i = firstActive; i < firstFree; i++)
            particles[i].draw(context, image);
        }
        if (firstFree < firstActive) {
          for (let i = firstActive; i < particles.length; i++)
            particles[i].draw(context, image);
          for (let i = 0; i < firstFree; i++)
            particles[i].draw(context, image);
        }
      };
      return ParticlePool;
    })();

    /*
    * Putting it all together
    */
    (function(canvas) {
      let context = canvas.getContext('2d'),
        particles = new ParticlePool(settings.particles.length),
        particleRate = settings.particles.length / settings.particles.duration, // particles/sec
        time;

      // get point on heart with -PI <= t <= PI
      function pointOnHeart(t) {
        return new Point(
          160 * Math.pow(Math.sin(t), 3),
          130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25,
        );
      }

      // creating the particle image using a dummy canvas
      let image = (function() {
        let canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');
        canvas.width = settings.particles.size;
        canvas.height = settings.particles.size;

        // helper function to create the path
        function to(t) {
          let point = pointOnHeart(t);
          point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
          point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
          return point;
        }

        // create the path
        context.beginPath();
        let t = -Math.PI;
        let point = to(t);
        context.moveTo(point.x, point.y);
        while (t < Math.PI) {
          t += 0.01; // baby steps!
          point = to(t);
          context.lineTo(point.x, point.y);
        }
        context.closePath();
        // create the fill
        // context.fillStyle = '#ea80b0';
        context.fillStyle = '#880808';
        context.fill();
        // create the image
        let image = new Image();
        image.src = canvas.toDataURL();
        return image;
      })();

      // render that thing!
      function render() {
        // next animation frame
        requestAnimationFrame(render);

        // update time
        let newTime = new Date().getTime() / 1000,
          deltaTime = newTime - (time || newTime);
        time = newTime;

        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // create new particles
        let amount = particleRate * deltaTime;
        for (let i = 0; i < amount; i++) {
          let pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
          let dir = pos.clone().length(settings.particles.velocity);
          particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
        }

        // update and draw particles
        particles.update(deltaTime);
        particles.draw(context, image);
      }

      function renderBubble() {
        // next animation frame
        requestAnimationFrame(render);

        // update time
        let newTime = new Date().getTime() / 1000,
          deltaTime = newTime - (time || newTime);
        time = newTime;

        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // create new particles
        let amount = particleRate * deltaTime;
        for (let i = 0; i < amount; i++) {
          let pos = new Point(random(5, canvasRef.current.clientWidth), random(5, canvasRef.current.clientHeight));
          let dir = pos.clone().length(settings.particles.velocity);
          particles.add(pos.x, pos.y, dir.x, -dir.y);
        }

        // update and draw particles
        particles.update(deltaTime);
        particles.draw(context, image);
      }

      // handle (re-)sizing of the canvas
      function onResize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      window.onresize = onResize;

      // delay rendering bootstrap
      setTimeout(function() {
        onResize();
        render();
        renderBubble();
      }, 10);
    })(document.getElementById('pinkboard'));
  };

  return (
    <div className={styles.heartContainer}>
      <NextSeo
        title={'Heart'}
        description={'Heart animation'}
        canonical="https://www.techlens.tech/"
        openGraph={{
          url: 'https://www.techlens.tech/uses/heart',
          title: 'Heart',
          description: 'Heart animation',
          images: [
            {
              url: 'https://i.ibb.co/4dH5V0g/Screenshot-2022-11-10-173351.png',
              width: 1513,
              height: 681,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: 'Heart',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Script src='/script-v1.js' />
      <canvas ref={canvasRef} id='pinkboard' className={styles.canvasV1}></canvas>
    </div>
  );
};