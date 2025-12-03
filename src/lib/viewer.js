import * as THREE from 'three';
import { OBJLoader } from '../../vendor/OBJLoader.js';
import { FBXLoader } from '../../vendor/loaders/FBXLoader.js';
import { OrbitControls } from '../../vendor/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from '../../vendor/renderers/CSS3DRenderer.js';

const TABLE_DIMENSIONS = Object.freeze({
  width: 60,
  depth: 120,
  thickness: 3,
});

const TABLET_CONFIG = Object.freeze({
  modelPath: './public/models/tablet/',
  fileName: 'iPad Pro 2018.FBX',
  targetLongestSide: 34,
  surfaceOffset: 0.04,
  position: Object.freeze({
    x: 0,
    z: 0,
  }),
  rotation: Object.freeze({
    x: 0,
    y: THREE.MathUtils.degToRad(280),
    z: THREE.MathUtils.degToRad(180),
  }),
});

const TABLET_HOVER_CONFIG = Object.freeze({
  lift: 1.8,
  smoothness: 6,
});

const TABLET_ROTATION_CONFIG = Object.freeze({
  focusEuler: Object.freeze({
    x: THREE.MathUtils.degToRad(0),
    y: THREE.MathUtils.degToRad(0),
    z: 45,
  }),
  smoothness: 5,
});

const TABLET_FOCUS_OFFSET = Object.freeze({
  lift: 12,
  smoothness: 4,
});

const CAMERA_TRANSITION_CONFIG = Object.freeze({
  duration: 1.2,
});

const TABLET_SCREEN_POINTER_FLAG = Symbol('tabletScreenPointerForwarding');

const POINTER_CLICK_CONFIG = Object.freeze({
  dragThreshold: 6,
  holdThreshold: 350,
});

const TABLET_SCREEN_DOM_CONFIG = Object.freeze({
  pixelsPerUnit: 48,
  htmlPath: 'public/tablet.html',
  widthScale: 1,
  heightScale: 1,
});

const TABLET_SCREEN_ORIENTATION = Object.freeze({
  inPlaneRotation: 0,
});

const HTML_SCREEN_BASE = Object.freeze({
  position: Object.freeze({
    x: 0,
    y: TABLE_DIMENSIONS.thickness - 3.15,
    z: 0,
  }),
  normal: Object.freeze({
    x: 0,
    y: 1,
    z: 0,
  }),
  right: Object.freeze({
    x: 1,
    y: 0,
    z: 0,
  }),
  dimensions: Object.freeze({
    width: 34.7,
    height: 26.6,
  }),
});

function easeInOutCubic(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const COFFEE_CUP_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'coffee-cup.obj',
  scale: 0.4,
  position: {
    x: 15,
    y: TABLE_DIMENSIONS.thickness + 3.7,
    z: 38,
  },
  rotation: Object.freeze({
    x: -Math.PI / 2,
    y: THREE.MathUtils.degToRad(0),
    z: 10,
  }),
  defaultMaterial: 'color_16774632',
  materials: Object.freeze({
    color_16774632: Object.freeze({
      color: 0xf7eadd,
      metalness: 0.08,
      roughness: 0.32,
      sheen: 0.2,
      sheenRoughness: 0.82,
      clearcoat: 0.08,
      clearcoatRoughness: 0.6,
      reflectivity: 0.22,
    }),
    color_6306067: Object.freeze({
      color: 0x603516,
      metalness: 0.04,
      roughness: 0.6,
      sheen: 0,
      sheenRoughness: 0,
      clearcoat: 0.02,
      clearcoatRoughness: 0.85,
      reflectivity: 0.08,
    }),
  }),
});

const PENCIL_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'pencil.obj',
  scale: 0.35,
  position: {
    x: 12,
    y: TABLE_DIMENSIONS.thickness + 0.5,
    z: 19,
  },
  rotation: Object.freeze({
    x: 55,
    y: 0,
    z: 30,
  }),
  material: Object.freeze({
    color: 0xf3c623,
    metalness: 0.12,
    roughness: 0.48,
  }),
});

const ERASER_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'eraser.obj',
  scale: 0.3,
  position: {
    x: 15,
    y: TABLE_DIMENSIONS.thickness + 0.2,
    z: 16,
  },
  rotation: Object.freeze({
    x: 55,
    y: 0,
    z: THREE.MathUtils.degToRad(25),
  }),
  material: Object.freeze({
    color: 0xffffff,
    metalness: 0.04,
    roughness: 0.55,
  }),
});

const POSTIT_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'postit.obj',
  scale: 1,
  position: {
    x: 20,
    y: TABLE_DIMENSIONS.thickness + 0.9,
    z: 33,
  },
  rotation: Object.freeze({
    x: 55,
    y: 0,
    z: 0,
  }),
  material: Object.freeze({
    color: 0xfffa96,
    metalness: 0.02,
    roughness: 0.6,
  }),
});

const PAPERCLIP_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'paperclip.obj',
  scale: 1,
  position: {
    x: 17.5,
    y: TABLE_DIMENSIONS.thickness + 1.2,
    z: 24,
  },
  rotation: Object.freeze({
    x: 55,
    y: 0,
    z: 10,
  }),
  material: Object.freeze({
    color: 0xc0c8cc,
    metalness: 0.6,
    roughness: 0.25,
  }),
});

const CHESS_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'chess.obj',
  scale: 2.3,
  position: {
    x: 15,
    y: TABLE_DIMENSIONS.thickness + 0.2,
    z: -43,
  },
  rotation: Object.freeze({
    x: 0,
    y: -0.1,
    z: 0,
  }),
  material: Object.freeze({
    color: 0x444444,
    metalness: 0.1,
    roughness: 0.6,
  }),
});


const BOOK_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'book.fbx',
  scale: 1.15,
  position: {
    x: -10,
    y: TABLE_DIMENSIONS.thickness + 0.4,
    z: 28,
  },
  rotation: Object.freeze({
    x: 0,
    y: THREE.MathUtils.degToRad(-95),
    z: 0,
  }),
});

const BOOK_HOVER_CONFIG = Object.freeze({
  lift: TABLET_HOVER_CONFIG.lift,
  smoothness: TABLET_HOVER_CONFIG.smoothness,
});


const BOOK_LIGHT_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'book_light.obj',
  scale: 1.25,
  position: {
    x: -1,
    y: TABLE_DIMENSIONS.thickness + 0.45,
    z: 28.8,
  },
  rotation: Object.freeze({
    x: THREE.MathUtils.degToRad(90),
    y: 0,
    z: THREE.MathUtils.degToRad(95),
  }),
  material: Object.freeze({
    color: 0x00ff66,
    emissive: 0x00ff66,
    emissiveIntensity: 1.2,
    metalness: 0,
    roughness: 0.05,
    opacity: 0.7,
    transparent: true,
  }),
  pulse: Object.freeze({
    base: 1.2,
    amplitude: 2.4,
    speed: 2.4,
  }),
});

const PHONE_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'phone.obj',
  scale: 1,
  position: {
    x: -10,
    y: TABLE_DIMENSIONS.thickness + 0.2,
    z: -25,
  },
  rotation: Object.freeze({
    x: THREE.MathUtils.degToRad(-90),
    y: 0,
    z: THREE.MathUtils.degToRad(175),
  }),
  material: Object.freeze({
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.4,
  }),
});

const PHONE_HOVER_CONFIG = Object.freeze({
  lift: TABLET_HOVER_CONFIG.lift,
  smoothness: TABLET_HOVER_CONFIG.smoothness,
});

const TABLET_LIGHT_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'tablet_light.obj',
  scale: 3.12,
  position: {
    x: -17,
    y: TABLE_DIMENSIONS.thickness + 0.6,
    z: 3,
  },
  rotation: Object.freeze({
    x: THREE.MathUtils.degToRad(90),
    y: 0,
    z: THREE.MathUtils.degToRad(-100),
  }),
  material: Object.freeze({
    color: 0x00ff66,      
    emissive: 0x00ff66,   
    emissiveIntensity: 1.5, 
    metalness: 0.0,
    roughness: 0.05,      
    opacity: 0.7,
    transparent: true,
  }),
  pulse: Object.freeze({
      base: 1.4,        
      amplitude: 2.2,    
      speed: 4,        
}),
});

const PHONE_LIGHT_CONFIG = Object.freeze({
  modelPath: './public/models/',
  fileName: 'phone_light.obj',
  scale: 1.01,
  position: {
    x: -10,
    y: TABLE_DIMENSIONS.thickness + 0.25,
    z: -25.2,
  },
  rotation: Object.freeze({
    x: THREE.MathUtils.degToRad(-90),
    y: 0,
    z: THREE.MathUtils.degToRad(175),
  }),
  material: Object.freeze({
    color: 0x00ff66,
    emissive: 0x00ff66,
    emissiveIntensity: 1.4,
    metalness: 0,
    roughness: 0.05,
    opacity: 0.7,
    transparent: true,
  }),
  pulse: Object.freeze({
    base: 1.2,
    amplitude: 2.4,
    speed: 2.4,
  }),
});

const PHONE_MODAL_CONFIG = Object.freeze({
  modalId: 'phone-html-modal',
  htmlPath: 'public/phone-modal.html',
  label: 'téléphone',
});

const BOOK_MODAL_CONFIG = Object.freeze({
  modalId: 'book-html-modal',
  htmlPath: 'public/book-modal.html',
  label: 'livre',
});

const BRAND_TITLE_TEXT = Object.freeze({
  default: 'THOMAS VUILLIN',
  tablet: 'MES PROJETS',
  phone: 'ME CONTACTER',
  book: 'À PROPOS',
});

const DEFAULT_CAMERA_SETTINGS = {
  fov: 45,
  near: 0.1,
  far: 200,
};

const GLOBAL_MODAL_STYLE_ID = 'global-image-modal-styles';
const GLOBAL_MODAL_HTML_ID = 'global-image-modal';
const GLOBAL_MODAL_STYLES = `
.global-image-modal,
.global-html-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(12px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-in-out;
  z-index: 2000;
}

.global-image-modal.is-open,
.global-html-modal.is-open {
  opacity: 1;
  pointer-events: auto;
}

.global-image-modal__frame,
.global-html-modal__frame {
  position: relative;
  max-width: 90%;
  max-height: 98%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.global-image-modal__img {
  width: 100%;
  height: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 18px 80px rgba(0, 0, 0, 0.7);
  background: #0c0c0c;
}

.global-image-modal__caption {
  color: #e0e0e5;
  font-size: 20px;
  text-align: center;
  line-height: 1.4;
}

.global-image-modal__close,
.global-html-modal__close {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 0, 0, 0.2);
  color: #f5f5f7;
  font-size: 24px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.global-image-modal__close:hover,
.global-html-modal__close:hover {
  background: rgba(255, 0, 0, 0.25);
  transform: scale(1.05);
}

.global-html-modal__frame {
  background: #1c1c1e;
  padding: 20px 22px;
  border-radius: 18px;
  box-shadow: 0 18px 80px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.global-html-modal__body {
  max-height: 88vh;
  overflow: auto;
  color: #e9ecf2;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}

.global-html-modal__body h2 {
  margin-top: 0;
  font-size: 28px;
  letter-spacing: 0.4px;
}

.global-html-modal__body p {
  margin: 8px 0 14px;
  color: #cdd3df;
}

.global-html-modal__body ul {
  padding-left: 18px;
}

.global-html-modal__body li + li {
  margin-top: 6px;
}
`;

function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  const { width, height } = getContainerDimensions(container);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = false;

  renderer.domElement.classList.add('viewer-canvas');
  container.appendChild(renderer.domElement);

  return renderer;
}

function createCssRenderer(container) {
  const renderer = new CSS3DRenderer();
  const { width, height } = getContainerDimensions(container);
  renderer.setSize(width, height);
  renderer.domElement.classList.add('viewer-css');
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.inset = '0';
  renderer.domElement.style.zIndex = '1';
  renderer.domElement.style.pointerEvents = 'none';
  container.appendChild(renderer.domElement);
  return renderer;
}

function getContainerDimensions(container) {
  if (container === document.body) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  return {
    width: container.clientWidth,
    height: container.clientHeight,
  };
}

function createCamera(container) {
  const { width, height } = getContainerDimensions(container);
  const aspectRatio = width / Math.max(height, 1);

  const camera = new THREE.PerspectiveCamera(
    DEFAULT_CAMERA_SETTINGS.fov,
    aspectRatio,
    DEFAULT_CAMERA_SETTINGS.near,
    DEFAULT_CAMERA_SETTINGS.far,
  );

  camera.position.set(24, 48, 70);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.up.set(0, 1, 0);

  return camera;
}

function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x13171d);

  const fill = new THREE.HemisphereLight(0xf6dec8, 0x1a2029, 0.45);
  scene.add(fill);

  const key = new THREE.DirectionalLight(0xfff3d2, 0.9);
  key.position.set(-18, 32, 22);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xc7d8f8, 0.45);
  rim.position.set(20, 28, -18);
  scene.add(rim);

  return scene;
}

function ensureGlobalModalStyles() {
  if (document.getElementById(GLOBAL_MODAL_STYLE_ID)) {
    return;
  }
  const style = document.createElement('style');
  style.id = GLOBAL_MODAL_STYLE_ID;
  style.textContent = GLOBAL_MODAL_STYLES;
  document.head.appendChild(style);
}

function createGlobalImageModal() {
  let modal = null;
  let modalImg = null;
  let modalCaption = null;
  let closeBtn = null;
  let initialized = false;
  let openedAt = 0;

  const ensureModal = () => {
    if (initialized && modal) {
      return;
    }
    ensureGlobalModalStyles();
    modal = document.getElementById(GLOBAL_MODAL_HTML_ID);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = GLOBAL_MODAL_HTML_ID;
      modal.className = 'global-image-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="global-image-modal__frame">
          <button class="global-image-modal__close" type="button" aria-label="Fermer l'aperçu">&#10005;</button>
          <img class="global-image-modal__img" src="" alt="">
          <p class="global-image-modal__caption"></p>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modalImg = modal.querySelector('.global-image-modal__img');
    modalCaption = modal.querySelector('.global-image-modal__caption');
    closeBtn = modal.querySelector('.global-image-modal__close');

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        const justOpened = performance.now() - openedAt < 150;
        if (!justOpened) {
          close();
        }
      }
    });

    closeBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
        close();
      }
    });

    initialized = true;
  };

  const open = ({ src, alt, caption }) => {
    ensureModal();
    if (!modal || !modalImg) {
      return;
    }
    openedAt = performance.now();
    modalImg.src = src;
    modalImg.alt = alt || '';
    if (modalCaption) {
      modalCaption.textContent = caption || '';
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const close = () => {
    if (!modal || !modalImg) {
      return;
    }
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
  };

  return {
    open,
    close,
  };
}

function createHtmlContentModal(config = {}) {
  const modalId = config.modalId ?? 'html-content-modal';
  const htmlPath = config.htmlPath ?? null;
  const label = config.label ?? 'téléphone';

  let modal = null;
  let modalBody = null;
  let closeBtn = null;
  let initialized = false;
  let contentLoaded = false;
  let loadingPromise = null;
  let formEnhanced = false;
  let openedAt = 0;

  const close = () => {
    if (!modal) {
      return;
    }
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  const loadContent = () => {
    if (!htmlPath || contentLoaded) {
      return Promise.resolve();
    }
    if (loadingPromise) {
      return loadingPromise;
    }
    loadingPromise = fetch(htmlPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Statut HTTP ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        if (modalBody) {
          modalBody.innerHTML = html;
          contentLoaded = true;
          attachFormHandler();
        }
      })
      .catch((error) => {
        console.error(`Impossible de charger le contenu HTML du ${label}.`, error);
        loadingPromise = null;
      });
    return loadingPromise;
  };

  const ensureModal = () => {
    if (initialized && modal) {
      return;
    }
    ensureGlobalModalStyles();
    modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'global-html-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="global-html-modal__frame">
          <button class="global-html-modal__close" type="button" aria-label="Fermer la fenêtre">&#10005;</button>
          <div class="global-html-modal__body">Chargement du contenu…</div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modalBody = modal.querySelector('.global-html-modal__body');
    closeBtn = modal.querySelector('.global-html-modal__close');

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        const justOpened = performance.now() - openedAt < 150;
        if (!justOpened) {
          close();
        }
      }
    });

    closeBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
        close();
      }
    });

    initialized = true;
  };

  const attachFormHandler = () => {
    if (!modalBody || formEnhanced) {
      return;
    }
    const form = modalBody.querySelector('form');
    if (!form) {
      return;
    }
    formEnhanced = true;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Message envoyé avec succès');
      close();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    });
  };

  const open = () => {
    ensureModal();
    if (!modal) {
      return;
    }
    openedAt = performance.now();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    loadContent().then(() => {
      attachFormHandler();
    });
  };

  return {
    open,
    close,
  };
}

function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 20;
  controls.maxDistance = Infinity;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.target.set(0, 0, 0);
  controls.enablePan = false;
  controls.screenSpacePanning = false;
  controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
  controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
  controls.update();
  return controls;
}

function createWoodTexture(renderer) {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const palette = ['#6f4a2c', '#7d5431', '#8a5f36', '#96683b', '#a17341'];
  const stripeWidth = size / palette.length;

  let offset = 0;
  for (let index = 0; index < palette.length * 4; index += 1) {
    const colorIndex = index % palette.length;
    const widthJitter = stripeWidth * (0.8 + Math.random() * 0.4);
    ctx.fillStyle = palette[colorIndex];
    ctx.fillRect(offset, 0, widthJitter, size);
    offset += widthJitter * 0.6;
    if (offset > size) {
      break;
    }
  }

  if (offset < size) {
    ctx.fillStyle = palette[palette.length - 1];
    ctx.fillRect(offset, 0, size - offset, size);
  }

  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 18;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain * 0.65));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain * 0.35));
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy?.() ?? 1;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

function createWoodSurface(renderer) {
  const geometry = new THREE.BoxGeometry(
    TABLE_DIMENSIONS.width,
    TABLE_DIMENSIONS.thickness,
    TABLE_DIMENSIONS.depth,
    1,
    1,
    1,
  );

  const woodTexture = createWoodTexture(renderer);

  const topMaterial = new THREE.MeshPhysicalMaterial({
    map: woodTexture,
    metalness: 0.06,
    roughness: 0.5,
    sheen: 0.12,
    sheenRoughness: 0.82,
    clearcoat: 0.22,
    clearcoatRoughness: 0.55,
    reflectivity: 0.16,
  });

  const sideMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x4d3422,
    metalness: 0.04,
    roughness: 0.65,
    sheen: 0.05,
    clearcoat: 0.08,
    clearcoatRoughness: 0.72,
    reflectivity: 0.08,
  });

  const bottomMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2f1f13,
    metalness: 0.02, 
    roughness: 0.7,
  });

  const materials = [
    sideMaterial,
    sideMaterial,
    topMaterial,
    bottomMaterial,
    sideMaterial,
    sideMaterial,
  ];

  const board = new THREE.Mesh(geometry, materials);
  board.position.y = TABLE_DIMENSIONS.thickness / 2;
  woodTexture.repeat.set(TABLE_DIMENSIONS.width / 15, TABLE_DIMENSIONS.depth / 15);

  return board;
}

function createTabletScreenElement(onContentLoaded = null) {
  const wrapper = document.createElement('div');
  wrapper.className = 'tablet-screen-ui';
  const content = document.createElement('div');
  content.className = 'tablet-screen-ui__content';
  content.innerHTML = `
    <div class="tablet-screen-ui__placeholder">Chargement de l'interface…</div>
  `;
  wrapper.appendChild(content);
  wrapper.style.pointerEvents = 'auto';

  const htmlPath = TABLET_SCREEN_DOM_CONFIG.htmlPath;
  if (htmlPath) {
    fetch(htmlPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Statut HTTP ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        content.innerHTML = html;
        if (typeof onContentLoaded === 'function') {
          onContentLoaded();
        }
      })
      .catch((error) => {
        console.error("Impossible de charger le contenu HTML de la tablette.", error);
      });
  }

  return wrapper;
}

function measureElementDimensions(element) {
  if (!element || typeof element.cloneNode !== 'function') {
    return { width: 1, height: 1 };
  }
  const measurementTarget = document.body ?? document.documentElement;
  if (!measurementTarget) {
    return { width: 1, height: 1 };
  }
  const clone = element.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.pointerEvents = 'none';
  clone.style.transform = 'none';
  clone.style.left = '0';
  clone.style.top = '0';
  clone.style.margin = '0';
  measurementTarget.appendChild(clone);
  const rect = clone.getBoundingClientRect();
  measurementTarget.removeChild(clone);
  return {
    width: rect.width || 1,
    height: rect.height || 1,
  };
}

function createCoffeeCupMaterials() {
  const materialMap = {};

  Object.entries(COFFEE_CUP_CONFIG.materials).forEach(([materialName, parameters]) => {
    materialMap[materialName] = new THREE.MeshPhysicalMaterial({
      color: parameters.color,
      metalness: parameters.metalness,
      roughness: parameters.roughness,
      sheen: parameters.sheen,
      sheenRoughness: parameters.sheenRoughness,
      clearcoat: parameters.clearcoat,
      clearcoatRoughness: parameters.clearcoatRoughness,
      reflectivity: parameters.reflectivity,
    });
  });

  return materialMap;
}

function loadCoffeeCup() {
  const loader = new OBJLoader();
  loader.setPath(COFFEE_CUP_CONFIG.modelPath);

  return new Promise((resolve, reject) => {
    loader.load(
      COFFEE_CUP_CONFIG.fileName,
      (object) => {
        const cupMaterials = createCoffeeCupMaterials();
        const fallbackMaterial =
          cupMaterials[COFFEE_CUP_CONFIG.defaultMaterial] ??
          new THREE.MeshPhysicalMaterial({ color: 0xffffff });

        object.traverse((child) => {
          if (child.isMesh) {
            const materialName = child.material?.name;
            child.material = (materialName && cupMaterials[materialName]) ?? fallbackMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const cupGroup = new THREE.Group();
        cupGroup.add(object);

        cupGroup.scale.setScalar(COFFEE_CUP_CONFIG.scale);
        cupGroup.position.set(
          COFFEE_CUP_CONFIG.position.x,
          COFFEE_CUP_CONFIG.position.y,
          COFFEE_CUP_CONFIG.position.z,
        );
        cupGroup.rotation.set(
          COFFEE_CUP_CONFIG.rotation.x,
          COFFEE_CUP_CONFIG.rotation.y,
          COFFEE_CUP_CONFIG.rotation.z,
        );

        resolve(cupGroup);
      },
      undefined,
      (error) => {
        reject(error);
      },
    );
  });
}

function loadPencil() {
  const loader = new OBJLoader();
  loader.setPath(PENCIL_CONFIG.modelPath);

  const createPencilMaterials = () => {
    const entries = {
      color_12568524: 0xbfc7cc,
      color_10988977: 0xa7adb1,
      color_16089887: 0xf5861f,
      color_15256974: 0xe8cda4,
      color_2829873: 0x2b2e31,
      color_15102120: 0xe568a8,
    };

    const map = {};
    Object.entries(entries).forEach(([name, hex]) => {
      map[name] = new THREE.MeshPhysicalMaterial({
        color: hex,
        metalness: 0.08,
        roughness: 0.5,
      });
    });

    map.__default =
      new THREE.MeshPhysicalMaterial({
        color: PENCIL_CONFIG.material.color,
        metalness: PENCIL_CONFIG.material.metalness,
        roughness: PENCIL_CONFIG.material.roughness,
      }) ?? new THREE.MeshStandardMaterial({ color: PENCIL_CONFIG.material.color });

    return map;
  };

  const materialMap = createPencilMaterials();
  const defaultMaterial = materialMap.__default;

  return new Promise((resolve, reject) => {
    loader.load(
      PENCIL_CONFIG.fileName,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const materialName = child.material?.name;
            child.material = (materialName && materialMap[materialName]) || defaultMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const pencilGroup = new THREE.Group();
        pencilGroup.add(object);

        pencilGroup.scale.setScalar(PENCIL_CONFIG.scale);
        pencilGroup.position.set(
          PENCIL_CONFIG.position.x,
          PENCIL_CONFIG.position.y,
          PENCIL_CONFIG.position.z,
        );
        pencilGroup.rotation.set(
          PENCIL_CONFIG.rotation.x,
          PENCIL_CONFIG.rotation.y,
          PENCIL_CONFIG.rotation.z,
        );

        resolve(pencilGroup);
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadEraser() {
  const loader = new OBJLoader();
  loader.setPath(ERASER_CONFIG.modelPath);

  const materialMap = {
    color_16448250: new THREE.MeshPhysicalMaterial({
      color: 0xfafafa,
      metalness: 0.05,
      roughness: 0.4,
    }),
    color_40919: new THREE.MeshPhysicalMaterial({
      color: 0x009fD7,
      metalness: 0.08,
      roughness: 0.35,
    }),
  };

  const defaultMaterial =
    materialMap.color_16448250 ??
    new THREE.MeshPhysicalMaterial({
      color: ERASER_CONFIG.material.color,
      metalness: ERASER_CONFIG.material.metalness,
      roughness: ERASER_CONFIG.material.roughness,
    });

  return new Promise((resolve, reject) => {
    loader.load(
      ERASER_CONFIG.fileName,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const materialName = child.material?.name;
            child.material = (materialName && materialMap[materialName]) || defaultMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const eraserGroup = new THREE.Group();
        eraserGroup.add(object);

        eraserGroup.scale.setScalar(ERASER_CONFIG.scale);
        eraserGroup.position.set(
          ERASER_CONFIG.position.x,
          ERASER_CONFIG.position.y,
          ERASER_CONFIG.position.z,
        );
        eraserGroup.rotation.set(
          ERASER_CONFIG.rotation.x,
          ERASER_CONFIG.rotation.y,
          ERASER_CONFIG.rotation.z,
        );

        resolve(eraserGroup);
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadPostit() {
  const loader = new OBJLoader();
  loader.setPath(POSTIT_CONFIG.modelPath);

  const materialMap = {
    color_16775830: new THREE.MeshPhysicalMaterial({
      color: 0xfffa96,
      metalness: 0.02,
      roughness: 0.6,
    }),
  };

  const defaultMaterial =
    materialMap.color_16775830 ??
    new THREE.MeshPhysicalMaterial({
      color: POSTIT_CONFIG.material.color,
      metalness: POSTIT_CONFIG.material.metalness,
      roughness: POSTIT_CONFIG.material.roughness,
    });

  return new Promise((resolve, reject) => {
    loader.load(
      POSTIT_CONFIG.fileName,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const materialName = child.material?.name;
            child.material = (materialName && materialMap[materialName]) || defaultMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const postitGroup = new THREE.Group();
        postitGroup.add(object);

        postitGroup.scale.setScalar(POSTIT_CONFIG.scale);
        postitGroup.position.set(
          POSTIT_CONFIG.position.x,
          POSTIT_CONFIG.position.y,
          POSTIT_CONFIG.position.z,
        );
        postitGroup.rotation.set(
          POSTIT_CONFIG.rotation.x,
          POSTIT_CONFIG.rotation.y,
          POSTIT_CONFIG.rotation.z,
        );

        resolve(postitGroup);
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadPaperclip() {
  const loader = new OBJLoader();
  loader.setPath(PAPERCLIP_CONFIG.modelPath);

  const materialMap = {
    color_12568524: new THREE.MeshPhysicalMaterial({
      color: 0xbfc7cc,
      metalness: 0.35,
      roughness: 0.52,
      reflectivity: 0.18,
      clearcoat: 0.08,
      clearcoatRoughness: 0.6,
    }),
  };

  const defaultMaterial =
    materialMap.color_12568524 ??
    new THREE.MeshPhysicalMaterial({
      color: PAPERCLIP_CONFIG.material.color,
      metalness: PAPERCLIP_CONFIG.material.metalness,
      roughness: PAPERCLIP_CONFIG.material.roughness,
    });

  return new Promise((resolve, reject) => {
    loader.load(
      PAPERCLIP_CONFIG.fileName,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const materialName = child.material?.name;
            child.material = (materialName && materialMap[materialName]) || defaultMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const paperclipGroup = new THREE.Group();
        paperclipGroup.add(object);

        paperclipGroup.scale.setScalar(PAPERCLIP_CONFIG.scale);
        paperclipGroup.position.set(
          PAPERCLIP_CONFIG.position.x,
          PAPERCLIP_CONFIG.position.y,
          PAPERCLIP_CONFIG.position.z,
        );
        paperclipGroup.rotation.set(
          PAPERCLIP_CONFIG.rotation.x,
          PAPERCLIP_CONFIG.rotation.y,
          PAPERCLIP_CONFIG.rotation.z,
        );

        resolve(paperclipGroup);
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadChess() {
  const loader = new OBJLoader();
  loader.setPath(CHESS_CONFIG.modelPath);

  const materialMap = {
    mat0: new THREE.MeshPhysicalMaterial({
      color: 0x121212,
      metalness: 0.08,
      roughness: 0.58,
    }),
    mat1: new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.08,
      roughness: 0.58,
    }),
    mat2: new THREE.MeshPhysicalMaterial({
      color: 0xbcA382,
      metalness: 0.12,
      roughness: 0.5,
    }),
    mat3: new THREE.MeshPhysicalMaterial({
      color: 0xbcA382,
      metalness: 0.12,
      roughness: 0.5,
    }),
    mat4: new THREE.MeshPhysicalMaterial({
      color: 0xd9d9d9,
      metalness: 0.06,
      roughness: 0.4,
    }),
  };

  const defaultMaterial =
    materialMap.mat4 ??
    new THREE.MeshPhysicalMaterial({
      color: CHESS_CONFIG.material.color,
      metalness: CHESS_CONFIG.material.metalness,
      roughness: CHESS_CONFIG.material.roughness,
    });

  return new Promise((resolve, reject) => {
    loader.load(
      CHESS_CONFIG.fileName,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const materialName = child.material?.name;
            child.material = (materialName && materialMap[materialName]) || defaultMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const chessGroup = new THREE.Group();
        chessGroup.add(object);

        chessGroup.scale.setScalar(CHESS_CONFIG.scale);
        chessGroup.position.set(
          CHESS_CONFIG.position.x,
          CHESS_CONFIG.position.y,
          CHESS_CONFIG.position.z,
        );
        chessGroup.rotation.set(
          CHESS_CONFIG.rotation.x,
          CHESS_CONFIG.rotation.y,
          CHESS_CONFIG.rotation.z,
        );

        resolve(chessGroup);
      },
      undefined,
      (error) => reject(error),
    );
  });
}


function loadBook() {
  const loader = new FBXLoader();
  loader.setPath(BOOK_CONFIG.modelPath);

  return new Promise((resolve, reject) => {
    loader.load(
      BOOK_CONFIG.fileName,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            child.material =
              child.material || new THREE.MeshStandardMaterial({ color: 0xcacaca, roughness: 0.5 });
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const bookGroup = new THREE.Group();
        bookGroup.add(object);

        bookGroup.scale.setScalar(BOOK_CONFIG.scale);
        bookGroup.position.set(
          BOOK_CONFIG.position.x,
          BOOK_CONFIG.position.y,
          BOOK_CONFIG.position.z,
        );
        bookGroup.rotation.set(
          BOOK_CONFIG.rotation.x,
          BOOK_CONFIG.rotation.y,
          BOOK_CONFIG.rotation.z,
        );

        resolve(bookGroup);
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadPhone() {
  const loader = new OBJLoader();
  loader.setPath(PHONE_CONFIG.modelPath);

  const materialMap = {
    color_16448250: new THREE.MeshPhysicalMaterial({
      color: 0xfafafa,
      metalness: 0.12,
      roughness: 0.35,
    }),
    color_2829873: new THREE.MeshPhysicalMaterial({
      color: 0x2b2e31,
      metalness: 0.2,
      roughness: 0.5,
    }),
  };

  const defaultMaterial =
    materialMap.color_2829873 ??
    new THREE.MeshPhysicalMaterial({
      color: PHONE_CONFIG.material.color,
      metalness: PHONE_CONFIG.material.metalness,
      roughness: PHONE_CONFIG.material.roughness,
    });

  return new Promise((resolve, reject) => {
    loader.load(
      PHONE_CONFIG.fileName,
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const materialName = child.material?.name;
            child.material = (materialName && materialMap[materialName]) || defaultMaterial;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const phoneGroup = new THREE.Group();
        phoneGroup.add(object);

        phoneGroup.scale.setScalar(PHONE_CONFIG.scale);
        phoneGroup.position.set(
          PHONE_CONFIG.position.x,
          PHONE_CONFIG.position.y,
          PHONE_CONFIG.position.z,
        );
        phoneGroup.rotation.set(
          PHONE_CONFIG.rotation.x,
          PHONE_CONFIG.rotation.y,
          PHONE_CONFIG.rotation.z,
        );

        resolve(phoneGroup);
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadTabletLight() {
  const loader = new OBJLoader();
  loader.setPath(TABLET_LIGHT_CONFIG.modelPath);

  const defaultMaterial =
    new THREE.MeshPhysicalMaterial({
      color: TABLET_LIGHT_CONFIG.material.color,
      emissive: TABLET_LIGHT_CONFIG.material.emissive,
      emissiveIntensity: TABLET_LIGHT_CONFIG.pulse.base,
      metalness: TABLET_LIGHT_CONFIG.material.metalness,
      roughness: TABLET_LIGHT_CONFIG.material.roughness,
      transparent: true,
      opacity: TABLET_LIGHT_CONFIG.material.opacity ?? 0.7,
    }) ?? new THREE.MeshStandardMaterial({ color: TABLET_LIGHT_CONFIG.material.color });

  return new Promise((resolve, reject) => {
    loader.load(
      TABLET_LIGHT_CONFIG.fileName,
      (object) => {
        const emissiveMaterials = [];

        object.traverse((child) => {
          if (child.isMesh) {
            child.material = defaultMaterial.clone();
            emissiveMaterials.push(child.material);
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const lightGroup = new THREE.Group();
        lightGroup.add(object);

        lightGroup.scale.setScalar(TABLET_LIGHT_CONFIG.scale);
        lightGroup.position.set(
          TABLET_LIGHT_CONFIG.position.x,
          TABLET_LIGHT_CONFIG.position.y,
          TABLET_LIGHT_CONFIG.position.z,
        );
        lightGroup.rotation.set(
          TABLET_LIGHT_CONFIG.rotation.x,
          TABLET_LIGHT_CONFIG.rotation.y,
          TABLET_LIGHT_CONFIG.rotation.z,
        );

        resolve({
          group: lightGroup,
          emissiveMaterials,
        });
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadBookLight() {
  const loader = new OBJLoader();
  loader.setPath(BOOK_LIGHT_CONFIG.modelPath);

  const defaultMaterial =
    new THREE.MeshPhysicalMaterial({
      color: BOOK_LIGHT_CONFIG.material.color,
      emissive: BOOK_LIGHT_CONFIG.material.emissive,
      emissiveIntensity: BOOK_LIGHT_CONFIG.pulse.base,
      metalness: BOOK_LIGHT_CONFIG.material.metalness,
      roughness: BOOK_LIGHT_CONFIG.material.roughness,
      transparent: true,
      opacity: BOOK_LIGHT_CONFIG.material.opacity ?? 0.7,
    }) ?? new THREE.MeshStandardMaterial({ color: BOOK_LIGHT_CONFIG.material.color });

  return new Promise((resolve, reject) => {
    loader.load(
      BOOK_LIGHT_CONFIG.fileName,
      (object) => {
        const emissiveMaterials = [];

        object.traverse((child) => {
          if (child.isMesh) {
            child.material = defaultMaterial.clone();
            emissiveMaterials.push(child.material);
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const lightGroup = new THREE.Group();
        lightGroup.add(object);

        lightGroup.scale.setScalar(BOOK_LIGHT_CONFIG.scale);
        lightGroup.position.set(
          BOOK_LIGHT_CONFIG.position.x,
          BOOK_LIGHT_CONFIG.position.y,
          BOOK_LIGHT_CONFIG.position.z,
        );
        lightGroup.rotation.set(
          BOOK_LIGHT_CONFIG.rotation.x,
          BOOK_LIGHT_CONFIG.rotation.y,
          BOOK_LIGHT_CONFIG.rotation.z,
        );

        resolve({
          group: lightGroup,
          emissiveMaterials,
        });
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function loadPhoneLight() {
  const loader = new OBJLoader();
  loader.setPath(PHONE_LIGHT_CONFIG.modelPath);

  const defaultMaterial =
    new THREE.MeshPhysicalMaterial({
      color: PHONE_LIGHT_CONFIG.material.color,
      emissive: PHONE_LIGHT_CONFIG.material.emissive,
      emissiveIntensity: PHONE_LIGHT_CONFIG.pulse.base,
      metalness: PHONE_LIGHT_CONFIG.material.metalness,
      roughness: PHONE_LIGHT_CONFIG.material.roughness,
      transparent: true,
      opacity: PHONE_LIGHT_CONFIG.material.opacity ?? 0.7,
    }) ?? new THREE.MeshStandardMaterial({ color: PHONE_LIGHT_CONFIG.material.color });

  return new Promise((resolve, reject) => {
    loader.load(
      PHONE_LIGHT_CONFIG.fileName,
      (object) => {
        const emissiveMaterials = [];

        object.traverse((child) => {
          if (child.isMesh) {
            child.material = defaultMaterial.clone();
            emissiveMaterials.push(child.material);
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });

        const boundingBox = new THREE.Box3().setFromObject(object);
        const size = boundingBox.getSize(new THREE.Vector3());
        const center = boundingBox.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += size.y / 2;

        const lightGroup = new THREE.Group();
        lightGroup.add(object);

        lightGroup.scale.setScalar(PHONE_LIGHT_CONFIG.scale);
        lightGroup.position.set(
          PHONE_LIGHT_CONFIG.position.x,
          PHONE_LIGHT_CONFIG.position.y,
          PHONE_LIGHT_CONFIG.position.z,
        );
        lightGroup.rotation.set(
          PHONE_LIGHT_CONFIG.rotation.x,
          PHONE_LIGHT_CONFIG.rotation.y,
          PHONE_LIGHT_CONFIG.rotation.z,
        );

        resolve({
          group: lightGroup,
          emissiveMaterials,
        });
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function hasTexture(material) {
  return Boolean(material?.map ?? material?.emissiveMap);
}

function hasTextureInSubtree(root) {
  let textured = false;
  root.traverse((child) => {
    if (textured || !child.isMesh) {
      return;
    }
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    textured = materials.some((material) => hasTexture(material));
  });
  return textured;
}

function removeDuplicateShells(root) {
  if (!root.children || root.children.length <= 1) {
    return;
  }

  const candidates = root.children
    .filter((child) => child.isObject3D)
    .map((child) => {
      const box = new THREE.Box3().setFromObject(child);
      if (box.isEmpty()) {
        return null;
      }
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      return {
        node: child,
        size,
        centerY: center.y,
        textured: hasTextureInSubtree(child),
      };
    })
    .filter(Boolean);

  if (candidates.length <= 1) {
    return;
  }

  const largestWidth = Math.max(...candidates.map((candidate) => candidate.size.x));
  const largestDepth = Math.max(...candidates.map((candidate) => candidate.size.z));
  const tolerance = 0.04;
  const epsilon = (value) => Math.max(Math.abs(value) * tolerance, 0.01);

  const overlappingCandidates = candidates.filter((candidate) => {
    const closeWidth = Math.abs(candidate.size.x - largestWidth) <= epsilon(largestWidth);
    const closeDepth = Math.abs(candidate.size.z - largestDepth) <= epsilon(largestDepth);
    return closeWidth && closeDepth;
  });

  if (overlappingCandidates.length <= 1) {
    return;
  }

  overlappingCandidates
    .sort((a, b) => {
      if (a.textured !== b.textured) {
        return a.textured ? -1 : 1;
      }
      return a.centerY - b.centerY;
    })
    .slice(1)
    .forEach(({ node }) => {
      node.parent?.remove(node);
    });
}

function prepareTabletObject(object, renderer) {
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy?.() ?? 1;

  object.traverse((child) => {
    if (!child.isMesh) {
      return;
    }

    child.castShadow = false;
    child.receiveShadow = false;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (!material) {
        return;
      }

      if (material.map) {
        material.map.colorSpace = THREE.SRGBColorSpace;
        material.map.anisotropy = maxAnisotropy;
        material.map.needsUpdate = true;
      }

      if (material.emissiveMap) {
        material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
        material.emissiveMap.anisotropy = maxAnisotropy;
        material.emissiveMap.needsUpdate = true;
      }
    });
  });

  object.updateMatrixWorld(true);

  removeDuplicateShells(object);

  object.updateMatrixWorld(true);

  const boundingBox = new THREE.Box3().setFromObject(object);
  const size = boundingBox.getSize(new THREE.Vector3());
  const center = boundingBox.getCenter(new THREE.Vector3());

  if (size.lengthSq() === 0) {
    size.setScalar(1);
  }

  object.position.sub(center);

  const longestSide = Math.max(size.x, size.y, size.z) || 1;
  const scaleFactor = TABLET_CONFIG.targetLongestSide / longestSide;
  const scaledHeight = size.y * scaleFactor;
  const scaledSize = size.clone().multiplyScalar(scaleFactor);

  const tabletGroup = new THREE.Group();
  tabletGroup.add(object);
  tabletGroup.scale.setScalar(scaleFactor);

  tabletGroup.rotation.set(
    TABLET_CONFIG.rotation.x,
    TABLET_CONFIG.rotation.y,
    TABLET_CONFIG.rotation.z,
  );

  tabletGroup.position.set(
    TABLET_CONFIG.position.x,
    TABLE_DIMENSIONS.thickness + scaledHeight / 2 + TABLET_CONFIG.surfaceOffset,
    TABLET_CONFIG.position.z,
  );

  const focusHeight = tabletGroup.position.y + scaledHeight * 0.25;
  const screenNormal = new THREE.Vector3(0, 1, 0)
    .applyQuaternion(tabletGroup.quaternion)
    .normalize();
  if (screenNormal.y < 0) {
    screenNormal.multiplyScalar(-1);
  }

  const screenForward = new THREE.Vector3(0, 0, 1)
    .applyQuaternion(tabletGroup.quaternion)
    .normalize();
  const screenRight = new THREE.Vector3(1, 0, 0)
    .applyQuaternion(tabletGroup.quaternion)
    .normalize();

  return {
    object: tabletGroup,
    focusHeight,
    dimensions: scaledSize,
    screenNormal,
    axes: {
      forward: screenForward,
      right: screenRight,
    },
  };
}

function loadTablet(renderer) {
  const loader = new FBXLoader();
  loader.setPath(TABLET_CONFIG.modelPath);
  loader.setResourcePath(TABLET_CONFIG.modelPath);

  return new Promise((resolve, reject) => {
    loader.load(
      TABLET_CONFIG.fileName,
      (object) => {
        try {
          resolve(prepareTabletObject(object, renderer));
        } catch (error) {
          reject(error);
        }
      },
      undefined,
      (error) => reject(error),
    );
  });
}

function showStatusMessage(statusElement, message) {
  if (!statusElement) {
    return;
  }
  statusElement.textContent = message;
  statusElement.classList.remove('is-hidden');
}

export function initModelViewer({ container, statusElement }) {
  if (statusElement) {
    statusElement.textContent = '';
    statusElement.classList.add('is-hidden');
  }

  const renderer = createRenderer(container);
  const cssRenderer = createCssRenderer(container);
  const camera = createCamera(container);
  const scene = createScene();
  const globalImageModal = createGlobalImageModal();
  const phoneContentModal = createHtmlContentModal(PHONE_MODAL_CONFIG);
  const bookContentModal = createHtmlContentModal(BOOK_MODAL_CONFIG);
  const controls = createControls(camera, renderer.domElement);
  const pointer = new THREE.Vector2(2, 2);
  const pointerClickState = {
    isPointerDown: false,
    pointerId: null,
    downTime: 0,
    downPosition: new THREE.Vector2(),
    exceededDrag: false,
    eligibleClick: false,
  };
  const raycaster = new THREE.Raycaster();
  const tabletHoverState = {
    object: null,
    baseY: 0,
    currentOffset: 0,
    targetOffset: 0,
    meshes: [],
    dimensions: new THREE.Vector3(1, 1, 1),
    screenNormal: new THREE.Vector3(0, 1, 0),
    focusPoint: new THREE.Vector3(),
    axes: {
      forward: new THREE.Vector3(0, 0, 1),
      right: new THREE.Vector3(1, 0, 0),
    },
    rotation: {
      base: new THREE.Quaternion(),
      focus: new THREE.Quaternion(),
      current: new THREE.Quaternion(),
      target: new THREE.Quaternion(),
    },
    verticalOffset: {
      base: 0,
      focus: TABLET_FOCUS_OFFSET.lift,
      current: 0,
      target: 0,
    },
  };
  const phoneHoverState = {
    object: null,
    baseY: 0,
    currentOffset: 0,
    targetOffset: 0,
    meshes: [],
  };
  const bookHoverState = {
    object: null,
    baseY: 0,
    currentOffset: 0,
    targetOffset: 0,
    meshes: [],
  };
  const screenDomState = {
    element: null,
    object: null,
    parent: null,
    localPosition: new THREE.Vector3(
      HTML_SCREEN_BASE.position.x,
      HTML_SCREEN_BASE.position.y,
      HTML_SCREEN_BASE.position.z,
    ),
    localNormal: new THREE.Vector3(
      HTML_SCREEN_BASE.normal.x,
      HTML_SCREEN_BASE.normal.y,
      HTML_SCREEN_BASE.normal.z,
    ),
    localRight: new THREE.Vector3(
      HTML_SCREEN_BASE.right.x,
      HTML_SCREEN_BASE.right.y,
      HTML_SCREEN_BASE.right.z,
    ),
    dimensions: {
      width: HTML_SCREEN_BASE.dimensions.width,
      height: HTML_SCREEN_BASE.dimensions.height,
    },
    domSize: {
      width: 1,
      height: 1,
    },
    isInteracting: false,
    closeModal: null,
  };
  const tabletLightState = {
    group: null,
    materials: [],
    time: 0,
  };
  const phoneLightState = {
    group: null,
    materials: [],
    time: 0,
  };
  const bookState = {
    object: null,
  };
  const bookLightState = {
    group: null,
    materials: [],
    time: 0,
  };
  const brandTitleState = {
    element: typeof document !== 'undefined' ? document.querySelector('.brand-title') : null,
    overlay: typeof document !== 'undefined' ? document.querySelector('.brand-overlay') : null,
    currentText: null,
    defaultText: BRAND_TITLE_TEXT.default,
    animating: false,
    pendingText: null,
  };
  brandTitleState.currentText = brandTitleState.element?.textContent ?? brandTitleState.defaultText;

  const attachTabletLightToTablet = () => {
    const tablet = tabletHoverState.object;
    const lightGroup = tabletLightState.group;
    if (!tablet || !lightGroup) {
      return;
    }
    if (lightGroup.parent === tablet) {
      return;
    }
    lightGroup.parent?.updateMatrixWorld(true);
    tablet.updateMatrixWorld(true);
    lightGroup.updateMatrixWorld(true);

    const parentMatrixWorldInv = new THREE.Matrix4().copy(tablet.matrixWorld).invert();
    const localMatrix = new THREE.Matrix4().multiplyMatrices(
      parentMatrixWorldInv,
      lightGroup.matrixWorld,
    );
    const localPosition = new THREE.Vector3();
    const localQuaternion = new THREE.Quaternion();
    const localScale = new THREE.Vector3();
    localMatrix.decompose(localPosition, localQuaternion, localScale);

    lightGroup.parent?.remove(lightGroup);
    tablet.add(lightGroup);
    lightGroup.position.copy(localPosition);
    lightGroup.quaternion.copy(localQuaternion);
    lightGroup.scale.copy(localScale);
  };

  const attachPhoneLightToPhone = () => {
    const phone = phoneHoverState.object;
    const phoneLight = phoneLightState.group;
    if (!phone || !phoneLight) {
      return;
    }
    if (phoneLight.parent === phone) {
      return;
    }
    phoneLight.parent?.updateMatrixWorld(true);
    phone.updateMatrixWorld(true);
    phoneLight.updateMatrixWorld(true);

    const parentMatrixWorldInv = new THREE.Matrix4().copy(phone.matrixWorld).invert();
    const localMatrix = new THREE.Matrix4().multiplyMatrices(
      parentMatrixWorldInv,
      phoneLight.matrixWorld,
    );
    const localPosition = new THREE.Vector3();
    const localQuaternion = new THREE.Quaternion();
    const localScale = new THREE.Vector3();
    localMatrix.decompose(localPosition, localQuaternion, localScale);

    phoneLight.parent?.remove(phoneLight);
    phone.add(phoneLight);
    phoneLight.position.copy(localPosition);
    phoneLight.quaternion.copy(localQuaternion);
    phoneLight.scale.copy(localScale);
  };

  const attachBookLightToBook = () => {
    const book = bookState.object;
    const bookLight = bookLightState.group;
    if (!book || !bookLight) {
      return;
    }
    if (bookLight.parent === book) {
      return;
    }
    bookLight.parent?.updateMatrixWorld(true);
    book.updateMatrixWorld(true);
    bookLight.updateMatrixWorld(true);

    const parentMatrixWorldInv = new THREE.Matrix4().copy(book.matrixWorld).invert();
    const localMatrix = new THREE.Matrix4().multiplyMatrices(
      parentMatrixWorldInv,
      bookLight.matrixWorld,
    );
    const localPosition = new THREE.Vector3();
    const localQuaternion = new THREE.Quaternion();
    const localScale = new THREE.Vector3();
    localMatrix.decompose(localPosition, localQuaternion, localScale);

    bookLight.parent?.remove(bookLight);
    book.add(bookLight);
    bookLight.position.copy(localPosition);
    bookLight.quaternion.copy(localQuaternion);
    bookLight.scale.copy(localScale);
  };

  const CAMERA_FOCUS_MODES = Object.freeze({
    OVERVIEW: 'overview',
    TABLET: 'tablet',
  });

  const defaultView = {
    position: camera.position.clone(),
    quaternion: camera.quaternion.clone(),
    target: controls.target.clone(),
    stored: false,
  };

  const resetControlsInertia = () => {
    if (controls.sphericalDelta?.set) {
      controls.sphericalDelta.set(0, 0, 0);
    }
    if (controls.panOffset?.set) {
      controls.panOffset.set(0, 0, 0);
    }
    controls.zoomChanged = false;
  };

  const applyScreenDomScale = () => {
    if (!screenDomState.object) {
      return;
    }
    const baseWidth = screenDomState.domSize.width || 1;
    const baseHeight = screenDomState.domSize.height || 1;
    screenDomState.object.scale.set(
      screenDomState.dimensions.width / baseWidth,
      screenDomState.dimensions.height / baseHeight,
      1,
    );
  };

  const refreshScreenDomBaseSize = () => {
    if (!screenDomState.element) {
      return;
    }
    const measured = measureElementDimensions(screenDomState.element);
    screenDomState.domSize.width = measured.width || 1;
    screenDomState.domSize.height = measured.height || 1;
    applyScreenDomScale();
  };

  const updateScreenDomElementSize = () => {
    if (
      !screenDomState.element ||
      !screenDomState.dimensions.width ||
      !screenDomState.dimensions.height
    ) {
      return;
    }
    const pixelsPerUnit = TABLET_SCREEN_DOM_CONFIG.pixelsPerUnit;
    const widthScale = TABLET_SCREEN_DOM_CONFIG.widthScale ?? 1;
    const heightScale = TABLET_SCREEN_DOM_CONFIG.heightScale ?? 1;
    const widthPx = Math.max(
      1,
      Math.round(screenDomState.dimensions.width * pixelsPerUnit * widthScale),
    );
    const heightPx = Math.max(
      1,
      Math.round(screenDomState.dimensions.height * pixelsPerUnit * heightScale),
    );
    const element = screenDomState.element;
    element.style.setProperty('--tablet-screen-width', `${widthPx}px`);
    element.style.setProperty('--tablet-screen-height', `${heightPx}px`);
    element.style.width = `${widthPx}px`;
    element.style.height = `${heightPx}px`;
  };

  const updateScreenDom = () => {
    if (
      !screenDomState.object ||
      !screenDomState.localPosition ||
      !screenDomState.parent
    ) {
      return;
    }

    const localPosition = screenDomState.localPosition.clone();
    const worldPosition = screenDomState.parent.localToWorld(localPosition);

    const worldQuaternion = screenDomState.parent.getWorldQuaternion(new THREE.Quaternion());
    const normal = screenDomState.localNormal
      .clone()
      .applyQuaternion(worldQuaternion)
      .normalize();
    const right = screenDomState.localRight
      .clone()
      .applyQuaternion(worldQuaternion)
      .normalize();
    const up = normal.clone().cross(right).normalize();

    const basisMatrix = new THREE.Matrix4().makeBasis(right, up, normal);
    const screenQuaternion = new THREE.Quaternion().setFromRotationMatrix(basisMatrix);
    const inPlaneRotation = TABLET_SCREEN_ORIENTATION.inPlaneRotation ?? 0;
    if (inPlaneRotation !== 0) {
      screenQuaternion.multiply(new THREE.Quaternion().setFromAxisAngle(normal, inPlaneRotation));
    }
    const yawRotation = TABLET_SCREEN_ORIENTATION.yaw ?? 0;
    if (yawRotation !== 0) {
      screenQuaternion.multiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yawRotation),
      );
    }
    const pitchRotation = TABLET_SCREEN_ORIENTATION.pitch ?? 0;
    if (pitchRotation !== 0) {
      screenQuaternion.multiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitchRotation),
      );
    }

    screenDomState.object.position.copy(worldPosition).add(normal.clone().multiplyScalar(0.01));
    screenDomState.object.quaternion.copy(screenQuaternion);
    applyScreenDomScale();
  };

  const cameraTransition = {
    mode: CAMERA_FOCUS_MODES.OVERVIEW,
    nextMode: CAMERA_FOCUS_MODES.OVERVIEW,
    isAnimating: false,
    startTime: 0,
    duration: CAMERA_TRANSITION_CONFIG.duration,
    startPosition: camera.position.clone(),
    endPosition: camera.position.clone(),
    startQuaternion: camera.quaternion.clone(),
    endQuaternion: camera.quaternion.clone(),
    startTarget: controls.target.clone(),
    endTarget: controls.target.clone(),
  };

  const isTabletViewActive = () =>
    !cameraTransition.isAnimating && cameraTransition.mode === CAMERA_FOCUS_MODES.TABLET;

  const setupTabletScreenInteractions = () => {
    const wrapper = screenDomState.element;
    if (!wrapper || wrapper.dataset.screenInteractionsReady === 'true') {
      return;
    }
    wrapper.dataset.screenInteractionsReady = 'true';

    // Fournit la fonction utilisée par les attributs onclick des boutons de carrousel.
    window.scrollCarousel = function scrollCarousel(btn, direction) {
      const carouselWrapper = btn?.closest?.('.carousel-wrapper');
      if (!carouselWrapper) return;
      const track = carouselWrapper.querySelector('.carousel-track');
      if (!track) return;
      const slideWidth = carouselWrapper.clientWidth || track.clientWidth;
      track.scrollBy({
        left: direction * slideWidth,
        behavior: 'smooth',
      });
    };

    const openModal = (img) => {
      if (!isTabletViewActive()) {
        return;
      }
      const captionText =
        img.closest('.slide')?.querySelector('.caption')?.textContent?.trim() ||
        img.alt ||
        'Aperçu';
      globalImageModal.open({
        src: img.src,
        alt: img.alt || '',
        caption: captionText,
      });
    };

    const closeModal = () => {
      globalImageModal.close();
    };

    screenDomState.closeModal = closeModal;

    wrapper.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLImageElement && target.closest('.carousel-track')) {
        if (!isTabletViewActive()) {
          return;
        }
        event.preventDefault();
        openModal(target);
      }
    });
  };

  const storeDefaultViewIfNeeded = () => {
    if (defaultView.stored) {
      return;
    }
    defaultView.position.copy(camera.position);
    defaultView.quaternion.copy(camera.quaternion);
    defaultView.target.copy(controls.target);
    defaultView.stored = true;
  };

  const setTabletRotationMode = (mode) => {
    if (!tabletHoverState.object) {
      return;
    }
    const rotationState = tabletHoverState.rotation;
    if (rotationState) {
      const targetQuaternion =
        mode === CAMERA_FOCUS_MODES.TABLET ? rotationState.focus : rotationState.base;
      rotationState.target.copy(targetQuaternion);
    }
    const verticalOffsetState = tabletHoverState.verticalOffset;
    if (verticalOffsetState) {
      verticalOffsetState.target = mode === CAMERA_FOCUS_MODES.TABLET ? TABLET_FOCUS_OFFSET.lift : 0;
    }
  };

  const startCameraTransition = (nextMode, pose) => {
    if (!pose) {
      return;
    }
    cameraTransition.isAnimating = true;
    cameraTransition.startTime = performance.now();
    cameraTransition.nextMode = nextMode;
    cameraTransition.startPosition.copy(camera.position);
    cameraTransition.startQuaternion.copy(camera.quaternion);
    cameraTransition.startTarget.copy(controls.target);
    cameraTransition.endPosition.copy(pose.position);
    cameraTransition.endQuaternion.copy(pose.quaternion);
    cameraTransition.endTarget.copy(pose.target);
    if (nextMode === CAMERA_FOCUS_MODES.OVERVIEW) {
      screenDomState.closeModal?.();
    }
    controls.enabled = false;
    resetControlsInertia();
    controls.update();
  };

  const calculateTabletFocusPose = () => {
    if (!tabletHoverState.object) {
      return null;
    }

    const focusYOffset = tabletHoverState.focusPoint.y - tabletHoverState.baseY;
    const focusPoint = new THREE.Vector3(
      tabletHoverState.focusPoint.x,
      tabletHoverState.baseY + focusYOffset + TABLET_FOCUS_OFFSET.lift,
      tabletHoverState.focusPoint.z,
    );
    const dimensions = tabletHoverState.dimensions.clone();

    const horizontalCandidates = [tabletHoverState.axes.forward, tabletHoverState.axes.right]
      .map((vector) => vector.clone().setY(0))
      .filter((vector) => vector.lengthSq() > 0)
      .map((vector) => vector.normalize());

    let approachDirection = horizontalCandidates[0] ?? new THREE.Vector3(0, 0, 1);
    if (horizontalCandidates.length > 1) {
      const comparativeDistanceAlongForward = Math.abs(tabletHoverState.axes.forward.z);
      if (comparativeDistanceAlongForward < 0.25) {
        approachDirection = horizontalCandidates[1];
      }
    }

    const focusDistance = THREE.MathUtils.clamp(Math.max(dimensions.x, dimensions.z) * 1.25, 30, 30);
    const cameraPosition = focusPoint.clone().add(approachDirection.clone().multiplyScalar(focusDistance));
    const heightOffset = Math.max(dimensions.y * 3.2, TABLE_DIMENSIONS.thickness * 6);
    cameraPosition.y = focusPoint.y + heightOffset;

    const upHint = new THREE.Vector3(0, 1, 0);
    const lookAtMatrix = new THREE.Matrix4().lookAt(cameraPosition, focusPoint, upHint);
    const cameraQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);

    return {
      position: cameraPosition,
      quaternion: cameraQuaternion,
      target: focusPoint,
    };
  };

  const focusTabletCamera = () => {
    if (cameraTransition.mode === CAMERA_FOCUS_MODES.TABLET || cameraTransition.isAnimating) {
      return;
    }
    storeDefaultViewIfNeeded();
    const pose = calculateTabletFocusPose();
    tabletHoverState.currentOffset = 0;
    tabletHoverState.object.position.y = tabletHoverState.baseY;
    setTabletRotationMode(CAMERA_FOCUS_MODES.TABLET);
    startCameraTransition(CAMERA_FOCUS_MODES.TABLET, pose);
  };

  const returnToOverview = () => {
    if (!defaultView.stored) {
      return;
    }
    if (
      cameraTransition.mode !== CAMERA_FOCUS_MODES.TABLET &&
      !(cameraTransition.isAnimating && cameraTransition.nextMode === CAMERA_FOCUS_MODES.TABLET)
    ) {
      return;
    }
    const pose = {
      position: defaultView.position.clone(),
      quaternion: defaultView.quaternion.clone(),
      target: defaultView.target.clone(),
    };
    setTabletRotationMode(CAMERA_FOCUS_MODES.OVERVIEW);
    startCameraTransition(CAMERA_FOCUS_MODES.OVERVIEW, pose);
  };

  const updateCameraTransition = (delta) => {
    if (!cameraTransition.isAnimating) {
      return;
    }

    const elapsed = performance.now() - cameraTransition.startTime;
    const t = THREE.MathUtils.clamp(elapsed / cameraTransition.duration, 0, 1);
    const eased = easeInOutCubic(t);

    camera.position.lerpVectors(cameraTransition.startPosition, cameraTransition.endPosition, eased);
    camera.quaternion.slerpQuaternions(
      cameraTransition.startQuaternion,
      cameraTransition.endQuaternion,
      eased,
    );
    controls.target.lerpVectors(
      cameraTransition.startTarget,
      cameraTransition.endTarget,
      eased,
    );

    if (t >= 1) {
      cameraTransition.isAnimating = false;
      cameraTransition.mode = cameraTransition.nextMode;
      camera.position.copy(cameraTransition.endPosition);
      camera.quaternion.copy(cameraTransition.endQuaternion);
      controls.target.copy(cameraTransition.endTarget);
      if (cameraTransition.mode === CAMERA_FOCUS_MODES.OVERVIEW) {
        controls.enabled = true;
        resetControlsInertia();
      }
      updateControlDistanceLimits();
      controls.update();
    }
  };

  const woodSurface = createWoodSurface(renderer);
  scene.add(woodSurface);

  controls.target.set(0, TABLE_DIMENSIONS.thickness, 0);
  controls.update();

  const updateControlDistanceLimits = () => {
    const distance = camera.position.distanceTo(controls.target);
    controls.minDistance = Math.min(controls.minDistance, distance * 0.35);
    controls.maxDistance = distance;
  };
  updateControlDistanceLimits();

  const renderScene = () => {
    if (controls.enabled) {
      controls.update();
    }
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera);
  };

  const updateTabletHover = (delta) => {
    if (!tabletHoverState.object || tabletHoverState.meshes.length === 0) {
      return;
    }

    const focusActive =
      cameraTransition.mode === CAMERA_FOCUS_MODES.TABLET ||
      (cameraTransition.isAnimating && cameraTransition.nextMode === CAMERA_FOCUS_MODES.TABLET);

    if (focusActive) {
      tabletHoverState.targetOffset = 0;
    } else if (screenDomState.isInteracting) {
      tabletHoverState.targetOffset = 0;
    } else {
      const pointerInside =
        pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;

      if (pointerInside) {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(tabletHoverState.meshes, true);
        tabletHoverState.targetOffset = intersects.length > 0 ? TABLET_HOVER_CONFIG.lift : 0;
      } else {
        tabletHoverState.targetOffset = 0;
      }
    }

    tabletHoverState.currentOffset = THREE.MathUtils.damp(
      tabletHoverState.currentOffset,
      tabletHoverState.targetOffset,
      TABLET_HOVER_CONFIG.smoothness,
      delta,
    );

    tabletHoverState.object.position.y = tabletHoverState.baseY + tabletHoverState.currentOffset;

    const rotationState = tabletHoverState.rotation;
    if (rotationState) {
      const rotationLerp = 1 - Math.exp(-TABLET_ROTATION_CONFIG.smoothness * delta);
      rotationState.current.slerp(rotationState.target, rotationLerp);
      tabletHoverState.object.quaternion.copy(rotationState.current);
    }

    const verticalOffsetState = tabletHoverState.verticalOffset;
    if (verticalOffsetState) {
      verticalOffsetState.current = THREE.MathUtils.damp(
        verticalOffsetState.current,
        verticalOffsetState.target,
        TABLET_FOCUS_OFFSET.smoothness,
        delta,
      );
      tabletHoverState.object.position.y += verticalOffsetState.current;
    }
  };

  const updatePhoneHover = (delta) => {
    if (!phoneHoverState.object || phoneHoverState.meshes.length === 0) {
      return;
    }

    const pointerInside =
      pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;

    if (pointerInside) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(phoneHoverState.meshes, true);
      phoneHoverState.targetOffset = intersects.length > 0 ? PHONE_HOVER_CONFIG.lift : 0;
    } else {
      phoneHoverState.targetOffset = 0;
    }

    phoneHoverState.currentOffset = THREE.MathUtils.damp(
      phoneHoverState.currentOffset,
      phoneHoverState.targetOffset,
      PHONE_HOVER_CONFIG.smoothness,
      delta,
    );

    phoneHoverState.object.position.y = phoneHoverState.baseY + phoneHoverState.currentOffset;
  };

  const updateBookHover = (delta) => {
    if (!bookHoverState.object || bookHoverState.meshes.length === 0) {
      return;
    }

    const pointerInside =
      pointer.x >= -1 && pointer.x <= 1 && pointer.y >= -1 && pointer.y <= 1;

    if (pointerInside) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(bookHoverState.meshes, true);
      bookHoverState.targetOffset = intersects.length > 0 ? BOOK_HOVER_CONFIG.lift : 0;
    } else {
      bookHoverState.targetOffset = 0;
    }

    bookHoverState.currentOffset = THREE.MathUtils.damp(
      bookHoverState.currentOffset,
      bookHoverState.targetOffset,
      BOOK_HOVER_CONFIG.smoothness,
      delta,
    );

    bookHoverState.object.position.y = bookHoverState.baseY + bookHoverState.currentOffset;
  };

  const updateBrandOverlayWidth = () => {
    if (!brandTitleState.overlay) {
      return;
    }
    brandTitleState.overlay.style.width = 'auto';
    const measured = Math.ceil(brandTitleState.overlay.scrollWidth);
    brandTitleState.overlay.style.width = `${measured}px`;
  };

  const setBrandTitleText = (nextText) => {
    if (!brandTitleState.element) {
      return;
    }
    if (nextText === brandTitleState.currentText) {
      return;
    }
    if (brandTitleState.animating) {
      brandTitleState.pendingText = nextText;
      return;
    }
    brandTitleState.animating = true;
    brandTitleState.element.classList.add('is-fading');
    setTimeout(() => {
      brandTitleState.element.textContent = nextText;
      brandTitleState.currentText = nextText;
      updateBrandOverlayWidth();
      brandTitleState.element.classList.remove('is-fading');
      brandTitleState.animating = false;
      if (brandTitleState.pendingText && brandTitleState.pendingText !== nextText) {
        const pending = brandTitleState.pendingText;
        brandTitleState.pendingText = null;
        setBrandTitleText(pending);
      } else {
        brandTitleState.pendingText = null;
      }
    }, 120);
  };

  const updateBrandTitle = () => {
    const hoverThreshold = 0.01;
    let nextText = brandTitleState.defaultText;
    if (tabletHoverState.targetOffset > hoverThreshold) {
      nextText = BRAND_TITLE_TEXT.tablet;
    } else if (phoneHoverState.targetOffset > hoverThreshold) {
      nextText = BRAND_TITLE_TEXT.phone;
    } else if (bookHoverState.targetOffset > hoverThreshold) {
      nextText = BRAND_TITLE_TEXT.book;
    }
    setBrandTitleText(nextText);
  };

  const updateBrandVisibility = () => {
    if (!brandTitleState.overlay) {
      return;
    }
    const focusActive =
      cameraTransition.mode === CAMERA_FOCUS_MODES.TABLET ||
      (cameraTransition.isAnimating && cameraTransition.nextMode === CAMERA_FOCUS_MODES.TABLET);
    brandTitleState.overlay.classList.toggle('is-hidden', focusActive);
  };

  const clock = new THREE.Clock();

  const animate = () => {
    const delta = clock.getDelta();
    updateTabletHover(delta);
    updatePhoneHover(delta);
    updateBookHover(delta);
    updateBrandTitle();
    updateBrandVisibility();
    updateCameraTransition(delta);
    updateTabletLight(delta);
    updatePhoneLight(delta);
    updateBookLight(delta);
    updateScreenDom();
    renderScene();
    requestAnimationFrame(animate);
  };

  const updatePointerFromEvent = (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const updateTabletLight = (delta) => {
    if (!tabletLightState.materials || tabletLightState.materials.length === 0) {
      return;
    }
    const focusActive =
      cameraTransition.mode === CAMERA_FOCUS_MODES.TABLET ||
      (cameraTransition.isAnimating && cameraTransition.nextMode === CAMERA_FOCUS_MODES.TABLET);
    const isHovering = tabletHoverState.targetOffset > 0.001;
    const shouldHide = focusActive || isHovering;

    if (tabletLightState.group) {
      tabletLightState.group.visible = !shouldHide;
    }
    if (shouldHide) {
      return;
    }

    tabletLightState.time += delta;
    const phase = tabletLightState.time * TABLET_LIGHT_CONFIG.pulse.speed;
    const intensity =
      TABLET_LIGHT_CONFIG.pulse.base +
      TABLET_LIGHT_CONFIG.pulse.amplitude * 0.5 * (1 + Math.sin(phase));
    tabletLightState.materials.forEach((material) => {
      material.emissiveIntensity = intensity;
      const opacityBase = TABLET_LIGHT_CONFIG.material.opacity ?? 0.7;
      const opacityAmp = 0.25;
      material.opacity = opacityBase + opacityAmp * Math.sin(phase * 0.65);
      material.transparent = true;
    });
  };

  const updatePhoneLight = (delta) => {
    if (!phoneLightState.materials || phoneLightState.materials.length === 0) {
      return;
    }
    const isHovering = phoneHoverState.targetOffset > 0.001;

    if (phoneLightState.group) {
      phoneLightState.group.visible = !isHovering;
    }
    if (isHovering) {
      return;
    }

    phoneLightState.time += delta;
    const phase = phoneLightState.time * PHONE_LIGHT_CONFIG.pulse.speed;
    const intensity =
      PHONE_LIGHT_CONFIG.pulse.base +
      PHONE_LIGHT_CONFIG.pulse.amplitude * 0.5 * (1 + Math.sin(phase));
    const opacityBase = PHONE_LIGHT_CONFIG.material.opacity ?? 0.7;
    const opacityAmp = 0.25;
    phoneLightState.materials.forEach((material) => {
      material.emissiveIntensity = intensity;
      material.opacity = opacityBase + opacityAmp * Math.sin(phase * 0.65);
      material.transparent = true;
    });
  };

  const updateBookLight = (delta) => {
    if (!bookLightState.materials || bookLightState.materials.length === 0) {
      return;
    }

    const isHovering = bookHoverState.targetOffset > 0.001;

    if (bookLightState.group) {
      bookLightState.group.visible = !isHovering;
    }
    if (isHovering) {
      return;
    }

    bookLightState.time += delta;
    const phase = bookLightState.time * BOOK_LIGHT_CONFIG.pulse.speed;
    const intensity =
      BOOK_LIGHT_CONFIG.pulse.base +
      BOOK_LIGHT_CONFIG.pulse.amplitude * 0.5 * (1 + Math.sin(phase));
    const opacityBase = BOOK_LIGHT_CONFIG.material.opacity ?? 0.7;
    const opacityAmp = 0.25;
    bookLightState.materials.forEach((material) => {
      material.emissiveIntensity = intensity;
      material.opacity = opacityBase + opacityAmp * Math.sin(phase * 0.65);
      material.transparent = true;
    });
  };

  const resetPointer = () => {
    pointer.set(2, 2);
    tabletHoverState.targetOffset = 0;
    phoneHoverState.targetOffset = 0;
    bookHoverState.targetOffset = 0;
  };

  const beginPointerClick = (event) => {
    pointerClickState.isPointerDown = true;
    pointerClickState.pointerId = event.pointerId;
    pointerClickState.downTime = performance.now();
    pointerClickState.downPosition.set(event.clientX, event.clientY);
    pointerClickState.exceededDrag = false;
    pointerClickState.eligibleClick = false;
  };

  const updatePointerDragState = (event) => {
    if (!pointerClickState.isPointerDown || pointerClickState.pointerId !== event.pointerId) {
      return;
    }
    const deltaX = event.clientX - pointerClickState.downPosition.x;
    const deltaY = event.clientY - pointerClickState.downPosition.y;
    if (Math.hypot(deltaX, deltaY) > POINTER_CLICK_CONFIG.dragThreshold) {
      pointerClickState.exceededDrag = true;
    }
  };

  const endPointerClick = (event) => {
    if (pointerClickState.isPointerDown && pointerClickState.pointerId === event.pointerId) {
      const holdDuration = performance.now() - pointerClickState.downTime;
      pointerClickState.eligibleClick =
        !pointerClickState.exceededDrag && holdDuration <= POINTER_CLICK_CONFIG.holdThreshold;
    } else {
      pointerClickState.eligibleClick = false;
    }
    pointerClickState.isPointerDown = false;
    pointerClickState.pointerId = null;
  };

  const cancelPointerClick = () => {
    pointerClickState.isPointerDown = false;
    pointerClickState.pointerId = null;
    pointerClickState.exceededDrag = false;
    pointerClickState.eligibleClick = false;
  };

  const handlePointerMoveEvent = (event) => {
    updatePointerFromEvent(event);
    updatePointerDragState(event);
  };

  const handlePointerDownEvent = (event) => {
    updatePointerFromEvent(event);
    beginPointerClick(event);
  };

  const handlePointerUpEvent = (event) => {
    updatePointerFromEvent(event);
    endPointerClick(event);
    if (event.pointerType !== 'mouse') {
      handleCanvasClick(event);
    }
  };

  const handleViewerPointerLeave = () => {
    resetPointer();
    cancelPointerClick();
  };

  const handleCanvasClick = (event) => {
    const keyboardTriggered = event.detail === 0;
    const eligibleClick = pointerClickState.eligibleClick || keyboardTriggered;
    pointerClickState.eligibleClick = false;
    if (!eligibleClick) {
      return;
    }
    updatePointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera);
    const hitTablet =
      tabletHoverState.object && tabletHoverState.meshes.length > 0
        ? raycaster.intersectObjects(tabletHoverState.meshes, true).length > 0
        : false;
    const hitPhone =
      phoneHoverState.object && phoneHoverState.meshes.length > 0
        ? raycaster.intersectObjects(phoneHoverState.meshes, true).length > 0
        : false;
    const hitBook =
      bookHoverState.object && bookHoverState.meshes.length > 0
        ? raycaster.intersectObjects(bookHoverState.meshes, true).length > 0
        : false;

    if (isTabletViewActive()) {
      if (!hitTablet) {
        returnToOverview();
      }
      return;
    }

    if (cameraTransition.isAnimating) {
      return;
    }

    if (hitTablet) {
      focusTabletCamera();
      return;
    }

    if (hitPhone) {
      phoneContentModal.open();
    }

    if (hitBook) {
      bookContentModal.open();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      returnToOverview();
    }
  };

  // Forward DOM-based pointer events to the WebGL canvas so tablet hover/click logic still runs.
  const attachTabletScreenPointerEvents = (element) => {
    if (!element || element[TABLET_SCREEN_POINTER_FLAG]) {
      return;
    }
    const markInteracting = () => {
      screenDomState.isInteracting = true;
    };
    const clearInteracting = () => {
      screenDomState.isInteracting = false;
    };
    const forwardPointerMove = (event) => {
      handlePointerMoveEvent(event);
    };
    const forwardPointerEnter = (event) => {
      handlePointerMoveEvent(event);
    };
    const forwardPointerDown = (event) => {
      markInteracting();
      handlePointerDownEvent(event);
    };
    const forwardPointerUp = (event) => {
      clearInteracting();
      handlePointerUpEvent(event);
    };
    const handlePointerLeave = () => {
      clearInteracting();
      resetPointer();
    };
    const handlePointerCancel = () => {
      clearInteracting();
      cancelPointerClick();
    };
    const forwardClick = (event) => {
      clearInteracting();
      handleCanvasClick(event);
    };
    element.addEventListener('pointerdown', forwardPointerDown);
    element.addEventListener('pointermove', forwardPointerMove);
    element.addEventListener('pointerenter', forwardPointerEnter);
    element.addEventListener('pointerup', forwardPointerUp);
    element.addEventListener('pointercancel', handlePointerCancel);
    element.addEventListener('pointerleave', handlePointerLeave);
    element.addEventListener('click', forwardClick);
    element[TABLET_SCREEN_POINTER_FLAG] = true;
  };

  const setupScreenDom = () => {
    if (!screenDomState.element) {
      screenDomState.element = createTabletScreenElement(() => {
        refreshScreenDomBaseSize();
        updateScreenDomElementSize();
        updateScreenDom();
        renderScene();
        setupTabletScreenInteractions();
      });
      screenDomState.element.style.pointerEvents = 'auto';
    }

    if (!screenDomState.object) {
      screenDomState.object = new CSS3DObject(screenDomState.element);
      scene.add(screenDomState.object);
    }

    screenDomState.localPosition.set(
      HTML_SCREEN_BASE.position.x,
      HTML_SCREEN_BASE.position.y,
      HTML_SCREEN_BASE.position.z,
    );
    screenDomState.localNormal.set(
      HTML_SCREEN_BASE.normal.x,
      HTML_SCREEN_BASE.normal.y,
      HTML_SCREEN_BASE.normal.z,
    );
    screenDomState.localRight.set(
      HTML_SCREEN_BASE.right.x,
      HTML_SCREEN_BASE.right.y,
      HTML_SCREEN_BASE.right.z,
    );
    screenDomState.dimensions.width = HTML_SCREEN_BASE.dimensions.width;
    screenDomState.dimensions.height = HTML_SCREEN_BASE.dimensions.height;

    attachTabletScreenPointerEvents(screenDomState.element);
    updateScreenDomElementSize();
    refreshScreenDomBaseSize();
    applyScreenDomScale();
    updateScreenDom();
  };

  renderer.domElement.addEventListener('pointerdown', handlePointerDownEvent);
  renderer.domElement.addEventListener('pointermove', handlePointerMoveEvent);
  renderer.domElement.addEventListener('pointerup', handlePointerUpEvent);
  renderer.domElement.addEventListener('pointerenter', handlePointerMoveEvent);
  renderer.domElement.addEventListener('pointercancel', handleViewerPointerLeave);
  renderer.domElement.addEventListener('pointerleave', handleViewerPointerLeave);
  renderer.domElement.addEventListener('click', handleCanvasClick);
  window.addEventListener('keydown', handleKeyDown);

  setupScreenDom();
  updateBrandOverlayWidth();

  loadTablet(renderer)
    .then(({ object: tablet, focusHeight, dimensions, screenNormal, axes }) => {
      scene.add(tablet);
      controls.target.set(tablet.position.x, focusHeight, tablet.position.z);
      controls.update();
      updateControlDistanceLimits();
      tabletHoverState.object = tablet;
      tabletHoverState.baseY = tablet.position.y;
      tabletHoverState.currentOffset = 0;
      tabletHoverState.targetOffset = 0;
      tabletHoverState.meshes = [];
      tabletHoverState.dimensions = dimensions.clone();
      tabletHoverState.screenNormal = screenNormal.clone();
      tabletHoverState.focusPoint = new THREE.Vector3(
        tablet.position.x,
        focusHeight,
        tablet.position.z,
      );
      tabletHoverState.axes.forward.copy(axes.forward);
      tabletHoverState.axes.right.copy(axes.right);
      tabletHoverState.rotation.base.copy(tablet.quaternion);
      const focusRotationDelta = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          TABLET_ROTATION_CONFIG.focusEuler.x,
          TABLET_ROTATION_CONFIG.focusEuler.y,
          TABLET_ROTATION_CONFIG.focusEuler.z,
        ),
      );
      tabletHoverState.rotation.focus
        .copy(tabletHoverState.rotation.base)
        .multiply(focusRotationDelta);
      tabletHoverState.rotation.current.copy(tablet.quaternion);
      tabletHoverState.rotation.target.copy(tabletHoverState.rotation.base);
      tabletHoverState.verticalOffset.current = 0;
      tabletHoverState.verticalOffset.target = 0;
      tablet.traverse((child) => {
        if (child.isMesh) {
          tabletHoverState.meshes.push(child);
        }
      });
      screenDomState.parent = tabletHoverState.object;
      attachTabletLightToTablet();
      updateScreenDom();
      storeDefaultViewIfNeeded();
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger la tablette.', error);
      showStatusMessage(statusElement, 'Impossible de charger la tablette.');
    });

  loadCoffeeCup()
    .then((coffeeCup) => {
      scene.add(coffeeCup);
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger la tasse.', error);
      showStatusMessage(statusElement, 'Impossible de charger la tasse de café.');
    });

  loadPencil()
    .then((pencil) => {
      scene.add(pencil);
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger le crayon.', error);
      showStatusMessage(statusElement, 'Impossible de charger le crayon.');
    });

  loadEraser()
    .then((eraser) => {
      scene.add(eraser);
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger la gomme.', error);
      showStatusMessage(statusElement, 'Impossible de charger la gomme.');
    });

  loadPostit()
    .then((postit) => {
      scene.add(postit);
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger le post-it.', error);
      showStatusMessage(statusElement, 'Impossible de charger le post-it.');
    });

  loadPaperclip()
    .then((paperclip) => {
      scene.add(paperclip);
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger le trombone.', error);
      showStatusMessage(statusElement, 'Impossible de charger le trombone.');
    });

  loadChess()
    .then((chess) => {
      scene.add(chess);
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger les pièces d\'échecs.', error);
      showStatusMessage(statusElement, 'Impossible de charger les pièces d\'échecs.');
    });

  loadBook()
    .then((book) => {
      scene.add(book);
      bookState.object = book;
      bookHoverState.object = book;
      bookHoverState.baseY = book.position.y;
      bookHoverState.currentOffset = 0;
      bookHoverState.targetOffset = 0;
      bookHoverState.meshes = [];
      book.traverse((child) => {
        if (child.isMesh) {
          bookHoverState.meshes.push(child);
        }
      });
      attachBookLightToBook();
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger le livre.', error);
      showStatusMessage(statusElement, 'Impossible de charger le livre.');
    });

  loadTabletLight()
    .then((light) => {
      tabletLightState.group = light.group;
      tabletLightState.materials = light.emissiveMaterials;
      scene.add(light.group);
      attachTabletLightToTablet();
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger la lumière de tablette.', error);
      showStatusMessage(statusElement, 'Impossible de charger la lumière de tablette.');
    });

  loadPhone()
    .then((phone) => {
      scene.add(phone);
      phoneHoverState.object = phone;
      phoneHoverState.baseY = phone.position.y;
      phoneHoverState.currentOffset = 0;
      phoneHoverState.targetOffset = 0;
      phoneHoverState.meshes = [];
      phone.traverse((child) => {
        if (child.isMesh) {
          phoneHoverState.meshes.push(child);
        }
      });
      attachPhoneLightToPhone();
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger le téléphone.', error);
      showStatusMessage(statusElement, 'Impossible de charger le téléphone.');
    });

  loadPhoneLight()
    .then((light) => {
      phoneLightState.group = light.group;
      phoneLightState.materials = light.emissiveMaterials;
      scene.add(light.group);
      attachPhoneLightToPhone();
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger la lumière du téléphone.', error);
      showStatusMessage(statusElement, 'Impossible de charger la lumière du téléphone.');
    });

  loadBookLight()
    .then((light) => {
      bookLightState.group = light.group;
      bookLightState.materials = light.emissiveMaterials;
      scene.add(light.group);
      attachBookLightToBook();
      renderScene();
    })
    .catch((error) => {
      console.error('Impossible de charger la lumière du livre.', error);
      showStatusMessage(statusElement, 'Impossible de charger la lumière du livre.');
    });

  animate();

  window.addEventListener('resize', () => {
    const { width, height } = getContainerDimensions(container);
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    cssRenderer.setSize(width, height);

    refreshScreenDomBaseSize();
    updateControlDistanceLimits();
    controls.update();
    updateBrandOverlayWidth();

    renderScene();
  });
}
