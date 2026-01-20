import { onCleanup, onMount, type VoidComponent } from "solid-js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

const CreationOfAdamAscii: VoidComponent = () => {
  let container!: HTMLDivElement;

  onMount(() => {
    const MODEL_URL = "/the-creation-of-adam/scene.gltf";

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 5000);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const effect = new AsciiEffect(renderer, " .:-=+*#%@", {
      resolution: 0.18,
      invert: false,
    });

    const asciiEl = effect.domElement as HTMLElement;
    asciiEl.style.color = "white";
    asciiEl.style.backgroundColor = "transparent";
    asciiEl.style.whiteSpace = "pre";
    asciiEl.style.margin = "0";
    asciiEl.style.userSelect = "none";
    asciiEl.style.pointerEvents = "none";
    asciiEl.style.display = "block";

    container.innerHTML = "";
    container.appendChild(asciiEl);

    scene.add(new THREE.HemisphereLight(0x000000, 0xffffff, 0.85));

    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(0, -5, 3);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.45);
    fill.position.set(-1, -4, 1);
    scene.add(fill);

    const controls = new OrbitControls(camera, asciiEl);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enabled = false;
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;

    const loader = new GLTFLoader();
    let root: THREE.Object3D | null = null;

    let introActive = false;
    let introT0 = 0;
    let introEndTime = 0;
    const INTRO_DURATION_MS = 4500;

    const modelSize = new THREE.Vector3();
    const modelCenter = new THREE.Vector3();
    let targetCamPos = new THREE.Vector3();
    let targetNear = camera.near;
    let targetFar = camera.far;

    let startCamPos = new THREE.Vector3();
    let startNear = camera.near;
    let startFar = camera.far;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const computeFitCameraPose = (obj: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(obj);
      box.getSize(modelSize);
      box.getCenter(modelCenter);

      obj.position.sub(modelCenter);

      const fov = THREE.MathUtils.degToRad(camera.fov);
      const halfFovVertical = fov / 2;
      const halfFovHorizontal = Math.atan(Math.tan(halfFovVertical) * camera.aspect);

      const distance = .45;

      targetCamPos = new THREE.Vector3(0, 0, distance);
      targetNear = .1
      targetFar = 1;
    };

    const removeLikelySkyboxMeshes = (obj: THREE.Object3D) => {
      const drop: THREE.Object3D[] = [];

      obj.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;

        const name = (mesh.name ?? "").toLowerCase();
        const looksLikeSky =
          name.includes("sky") ||
          name.includes("skydome") ||
          name.includes("background") ||
          name.includes("env") ||
          name.includes("dome");

        const geom = mesh.geometry;
        if (geom) {
          geom.computeBoundingSphere();
          const r = geom.boundingSphere?.radius ?? 0;
          if (r > 50) drop.push(mesh);
        }

        if (looksLikeSky) drop.push(mesh);
      });

      for (const o of drop) o.parent?.remove(o);
    };

    const tuneMaterialsForAscii = (obj: THREE.Object3D) => {
      obj.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;

        const mat = mesh.material as THREE.Material | THREE.Material[];
        const mats = Array.isArray(mat) ? mat : [mat];
        for (const m of mats) {
          const anyM = m as any;
          if (typeof anyM.roughness === "number") {
            anyM.roughness = Math.min(1, anyM.roughness + 0.15);
          }
          if (typeof anyM.metalness === "number") {
            anyM.metalness = Math.max(0, anyM.metalness - 0.05);
          }
        }
      });
    };

    const startIntro = () => {
      const extremelyCloseDistance = 0.001;

      startCamPos = new THREE.Vector3(0, 0, extremelyCloseDistance);
      startNear = 0.0001;
      startFar = Math.max(100, targetFar);

      camera.position.copy(startCamPos);
      camera.near = startNear;
      camera.far = startFar;
      camera.updateProjectionMatrix();

      controls.target.set(0, 0, 0);
      controls.update();

      introActive = true;
      introT0 = performance.now();
      controls.enabled = false;
    };

    loader.load(
      MODEL_URL,
      (gltf) => {
        root = gltf.scene;

        removeLikelySkyboxMeshes(root);
        tuneMaterialsForAscii(root);

        root.rotation.y = Math.PI / 2;

        scene.add(root);

        computeFitCameraPose(root);
        startIntro();
      },
      undefined,
      (err) => {
        console.error("[CreationOfAdamAscii] Failed to load glTF:", err);
      }
    );

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, false);
      effect.setSize(w, h);

      if (root && !introActive && targetCamPos) {
        computeFitCameraPose(root);
        camera.position.copy(targetCamPos);
        camera.near = targetNear;
        camera.far = targetFar;
        camera.updateProjectionMatrix();
        controls.target.set(0, 0, 0);
        controls.update();
      }

      const pre = effect.domElement as HTMLElement;
      pre.style.fontFamily =
        "Departure Mono";
      pre.classList.add("text-.65vw", "leading-.85vw");
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);
    window.addEventListener("resize", resize);
    resize();

    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (introActive) {
        const t = (performance.now() - introT0) / INTRO_DURATION_MS;
        const tt = Math.min(1, Math.max(0, t));
        const e = easeOutCubic(tt);

        camera.position.lerpVectors(startCamPos, targetCamPos, e);
        camera.near = THREE.MathUtils.lerp(startNear, targetNear, e);
        camera.far = THREE.MathUtils.lerp(startFar, targetFar, e);
        camera.updateProjectionMatrix();

        if (tt >= 1) {
          introActive = false;
          introEndTime = performance.now();
          controls.target.set(0, 0, 0);
        }
      }

      if (!introActive && introEndTime > 0) {
        const timeSinceIntroEnd = (performance.now() - introEndTime) * 0.0003;
        const oscillationAmount = Math.sin(timeSinceIntroEnd) * 0.15;

        const radius = camera.position.distanceTo(controls.target);
        const polar = Math.acos(Math.max(-1, Math.min(1, (camera.position.y - controls.target.y) / radius)));

        const x = controls.target.x + radius * Math.sin(polar) * Math.sin(oscillationAmount);
        const y = controls.target.y + radius * Math.cos(polar);
        const z = controls.target.z + radius * Math.sin(polar) * Math.cos(oscillationAmount);

        camera.position.set(x, y, z);
        camera.lookAt(controls.target);
      }

      controls.update();
      effect.render(scene, camera);
    };

    animate();

    onCleanup(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ro.disconnect();

      controls.dispose();

      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;

        mesh.geometry?.dispose();

        const mat = mesh.material as THREE.Material | THREE.Material[];
        const mats = Array.isArray(mat) ? mat : [mat];
        for (const m of mats) m.dispose();
      });

      renderer.dispose();

      if (asciiEl.parentElement) asciiEl.parentElement.removeChild(asciiEl);
      container.innerHTML = "";
    });
  });

  return (
    <div
      ref={(el) => (container = el)}
      class="size-full relative"
    />
  );
};

export default CreationOfAdamAscii;
