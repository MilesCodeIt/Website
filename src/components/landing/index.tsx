import grain from "../../assets/grain.png";
import computer from "../../assets/computer.txt?raw";
import footer from "../../assets/footer.txt?raw";
import radialDots from "../../assets/radial-dots.svg";
import Star from "./star";
import MilesLeftStrip from "./miles-left-strip";
import MilesRightStrip from "./miles-right-strip";
import CreationOfAdamAscii from "../three/CreationOfAdamAscii";
import { Motion } from "solid-motionone";

const LandingPage = () => {
  return (
    <div class="relative overflow-hidden size-screen flex items-center justify-center bg-center bg-size-[6.45vh] bg-gradient-to-l from-white/15 from-1% to-transparent to-1%">
      {/* line at the top */}
      <div class="pointer-events-none z-10 fixed w-400px h-6px top-0 inset-x-0 mx-auto bg-white" />

      {/* first circle */}
      <div class="pointer-events-none fixed -bottom-20vh size-160vh border border-white/10 rd-full" />

      {/* second circle */}
      <div class="pointer-events-none fixed -bottom-20vh size-115vh border border-white/10 rd-full flex justify-center pt-1vh">
        <p class="absolute font-mono whitespace-pre select-none leading-1.5vh text-1.3vh">
          {computer}
        </p>

        <img
          aria-hidden
          src={radialDots.src}
          alt="Stars of wisdom!"
          class="absolute inset-0 object-top scale-170 -left-.5vh -top-46.5vh animate-spin animate-duration-240000"
        />
      </div>

      {/* third circle */}
      <div class="pointer-events-none z-10 fixed -bottom-20vh size-96vh border border-white/10 rd-full flex justify-center pt-.5vh">
        <Motion.div class="w-fit relative"
          animate={{opacity: [0, 1], scale: [1.25, 1]}}
          transition={{delay: .5, duration: 2, easing: "ease-out"}}
        >
          <svg
            width="4vh"
            height="4vh"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-0 top-1vh rd-xs"
          >
            <path
              d="M38 3H9C5.68629 3 3 5.68629 3 9V38"
              stroke="white"
              stroke-width="6"
            />
          </svg>

          <h1 class="pointer-events-auto font-display [writing-mode:vertical-lr] [text-orientation:upright] -tracking-4.5vh text-9.5vh"
          >
            MILES
          </h1>
        </Motion.div>
      </div>

      {/* fourth circle */}
      <div class="pointer-events-none fixed -bottom-20vh size-72.5vh border border-white/10 rd-full" />

      {/* centered frame! */}
      <div class="border-b border-l mx-32 h-71% w-80% relative">
        {/* top half lines */}
        <div class="absolute top-0 left-0 bg-white h-1px w-25vw" />
        <div class="absolute top-0 right-0 bg-white h-1px w-25vw" />

        {/* right half (for anchor) line */}
        <div class="absolute right-0 bottom-0 top-30 bg-white w-1px" />

        {/* stars at the top left (outside) */}
        <div class="absolute -left-8vh -top-2.75vh flex flex-col gap-2">
          <Star />
          <Star />
          <Star fill />
          <Star fill />
          <Star />
        </div>

        {/* stars at the bottom right (outside) */}
        <div class="absolute -right-8vh -bottom-2.75vh flex flex-col gap-2">
          <Star />
          <Star />
          <Star fill />
          <Star fill />
          <Star />
        </div>

        {/* little anchor at the top right */}
        <div
          class="absolute bg-white h-6 w-12 -right-12 top-0"
          style={{
            "clip-path": "polygon(0 0, 0% 100%, 100% 100%)",
          }}
        />

        <div class="absolute -right-12 top-6 w-25vw flex flex-col gap-2">
          <div class="relative h-24 border flex items-center justify-center">
            <div
              class="absolute top-3 left-3 size-5 bg-white"
              style={{
                "clip-path": "polygon(0 0, 0 100%, 100% 0)",
              }}
            />

            <div
              class="absolute bottom-3 right-3 size-5 bg-white rotate-180"
              style={{
                "clip-path": "polygon(0 0, 0 100%, 100% 0)",
              }}
            />

            <p class="pl-1vw font-noto font-black text-[min(3.5vw,48px)] tracking-1vw text-center">
              クライソラ
            </p>
          </div>

          <div class="flex gap-2">
            <a
              href="https://milescode.dev/blog"
              target="_blank"
              class="font-mono border px-4 py-2 hover:bg-white hover:text-black"
            >
              blog
            </a>

            <a
              href="https://github.com/MilesCodeIt"
              target="_blank"
              class="font-mono border px-4 py-2 hover:bg-white hover:text-black"
            >
              github
            </a>

            <div
              class="size-6 bg-white"
              style={{
                "clip-path": "polygon(0 0, 0 100%, 100% 0)",
              }}
            />
          </div>
        </div>

        <p class="absolute font-mono text-[min(2vh,14px)] bottom-2 left-3">
          BROUGHT TO YOU BY{" "}
          <a href="https://github.com/Vexcited" target="_blank">
            MIKKEL
          </a>{" "}
          AND{" "}
          <a href="https://github.com/invertime" target="_blank">
            JULES
          </a>
        </p>

        <p class="absolute font-mono text-[min(2vh,14px)] bottom-2 right-3">
          CYBERSECURITY - WEB DEVELOPMENT
        </p>

        <div class="absolute top-4 left-5 flex flex-col font-mono text-[min(2vh,16px)]">
          <div class="flex items-center gap-2">
            <div class="bg-white size-1vh" />
            <p>Invertime......19ms</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-white size-1vh" />
            <p>Vexcited........6ms</p>
          </div>
        </div>

        <Motion.div

          animate={{opacity: [0, .75]}}
                transition={{duration: 1.5, easing: "ease-out"}}

          class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-75">
          <CreationOfAdamAscii />
        </Motion.div>

        <p class="absolute inset-x-0 w-fit mx-auto bottom-0 pb-2.5vh text-.95vh font-mono flex items-center gap-1">
          <MilesLeftStrip />
          MILES
          <MilesRightStrip />
        </p>
      </div>

      {/* background texture */}
      <div
        class="z-0 fixed inset-0 opacity-50 mix-blend-color-dodge pointer-events-none bg-white"
        style={{
          background: `url(${grain.src})`,
        }}
      />

      {/* footer text, half hidden behind everything */}
      <p class="pointer-events-none fixed top-86% font-mono whitespace-pre select-none tracking-.45vw text-1vh opacity-50">
        {footer}
      </p>
    </div>
  );
};

export default LandingPage;
