document.addEventListener('DOMContentLoaded', () => {

  /* ===== THREE.JS BACKGROUND ===== */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 3000;
  const starPositions = new Float32Array(starsCount * 3);
  const starColors = new Float32Array(starsCount * 3);
  const starSizes = new Float32Array(starsCount);

  for (let i = 0; i < starsCount; i++) {
    const radius = 30 + Math.random() * 70;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = radius * Math.cos(phi);
    const colorVal = 0.5 + Math.random() * 0.5;
    starColors[i * 3] = colorVal;
    starColors[i * 3 + 1] = colorVal;
    starColors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    starSizes[i] = 0.02 + Math.random() * 0.08;
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
  starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(starsGeometry, starMaterial);
  scene.add(stars);

  const icosahedronGeo = new THREE.IcosahedronGeometry(2.2, 0);
  const icosahedronMat = new THREE.MeshBasicMaterial({
    color: 0x7c3aed,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const icosahedron = new THREE.Mesh(icosahedronGeo, icosahedronMat);
  icosahedron.position.set(0, 0, 0);
  scene.add(icosahedron);

  const innerIcosaGeo = new THREE.IcosahedronGeometry(1.5, 1);
  const innerIcosaMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const innerIcosa = new THREE.Mesh(innerIcosaGeo, innerIcosaMat);
  scene.add(innerIcosa);

  const torusKnotGeo = new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8);
  const torusKnotMat = new THREE.MeshBasicMaterial({
    color: 0x7c3aed,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });
  const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
  torusKnot.position.set(3.5, 2, -5);
  scene.add(torusKnot);

  const torusKnot2 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.5, 0.15, 48, 6),
    new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    })
  );
  torusKnot2.position.set(-3.8, -1.5, -6);
  scene.add(torusKnot2);

  const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 32, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.12,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  ring.position.set(0, 0, -3);
  scene.add(ring);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.02, 32, 64),
    new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.08,
    })
  );
  ring2.rotation.x = Math.PI / 4;
  ring2.rotation.z = Math.PI / 6;
  ring2.position.set(0, 0, -5);
  scene.add(ring2);

  const mouse = { x: 0, y: 0 };
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotX = mouse.y * 0.08;
    targetRotY = mouse.x * 0.08;
  });

  let scrollPos = 0;
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollPos = window.scrollY / maxScroll;
  });

  camera.position.z = 6;

  function animateScene() {
    requestAnimationFrame(animateScene);

    currentRotX += (targetRotX - currentRotX) * 0.05;
    currentRotY += (targetRotY - currentRotY) * 0.05;

    stars.rotation.x += 0.0002;
    stars.rotation.y += 0.0003;

    icosahedron.rotation.x += 0.003;
    icosahedron.rotation.y += 0.005;
    icosahedron.rotation.x += currentRotX * 0.01;
    icosahedron.rotation.y += currentRotY * 0.01;

    innerIcosa.rotation.x -= 0.005;
    innerIcosa.rotation.y -= 0.008;
    innerIcosa.rotation.x += currentRotX * 0.015;
    innerIcosa.rotation.y += currentRotY * 0.015;

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.015;
    torusKnot.rotation.x += currentRotX * 0.02;
    torusKnot.rotation.y += currentRotY * 0.02;

    torusKnot2.rotation.x -= 0.008;
    torusKnot2.rotation.y -= 0.012;
    torusKnot2.rotation.x += currentRotX * 0.015;
    torusKnot2.rotation.y += currentRotY * 0.015;

    ring.rotation.z += 0.002;
    ring2.rotation.z -= 0.003;

    const cameraZ = 6 - scrollPos * 2;
    camera.position.z += (cameraZ - camera.position.z) * 0.05;

    camera.position.x += (currentRotY * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (currentRotX * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animateScene();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ===== CUSTOM CURSOR ===== */
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (cursor && cursorFollower) {
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    });

    function animateCursor() {
      followerX += (cursorX - followerX) * 0.15;
      followerY += (cursorY - followerY) * 0.15;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, .stat, .nav-link, .hamburger, .social-icons a, .soft-skill-tag, .skill-cat, .achievement-card, .timeline-item');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
      });
    });
  }

  /* ===== NAVBAR ===== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* ===== TYPING EFFECT ===== */
  const typedTextEl = document.querySelector('.typed-text');
  if (typedTextEl) {
    const strings = [
      'Fresher',
      'Python Developer',
      'Data Science Enthusiast',
      'Problem Solver',
      'Tech Explorer',
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentString = strings[stringIndex];
      if (isDeleting) {
        typedTextEl.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextEl.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentString.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        speed = 500;
      }

      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  /* ===== SECTION REVEAL ===== */
  const sectionContainers = document.querySelectorAll('.section-container');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sectionContainers.forEach(container => {
    revealObserver.observe(container);
  });

  /* ===== SKILL PROGRESS ANIMATION ===== */
  const skillRings = document.querySelectorAll('.skill-ring');
  const ringObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = parseInt(ring.dataset.percent);
        const circumference = 282.7;
        const offset = circumference - (percent / 100) * circumference;
        const progressCircle = ring.querySelector('.progress');
        const percentEl = ring.querySelector('.skill-percent');

        progressCircle.style.strokeDashoffset = circumference;
        percentEl.textContent = '0%';

        let currentPercent = 0;
        const duration = 1500;
        const startTime = performance.now();

        function animateProgress(time) {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          currentPercent = Math.round(eased * percent);

          const currentOffset = circumference - (currentPercent / 100) * circumference;
          progressCircle.style.strokeDashoffset = currentOffset;
          percentEl.textContent = currentPercent + '%';

          if (progress < 1) {
            requestAnimationFrame(animateProgress);
          }
        }
        requestAnimationFrame(animateProgress);

        ringObserver.unobserve(ring);
      }
    });
  }, { threshold: 0.3 });

  skillRings.forEach(ring => ringObserver.observe(ring));

  /* ===== COUNT-UP ANIMATION ===== */
  const countUps = document.querySelectorAll('.count-up');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1500;
        const startTime = performance.now();

        function animateCount(time) {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            el.textContent = target;
          }
        }
        requestAnimationFrame(animateCount);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countUps.forEach(el => countObserver.observe(el));

  /* ===== 3D TILT ON CARDS ===== */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    const glow = card.querySelector('.card-glow');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;

      if (glow) {
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        glow.style.opacity = 1;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      if (glow) {
        glow.style.opacity = 0;
      }
    });
  });

});
