import grain from "../assets/grain.png";
import computer from "../assets/computer.txt?raw";
import hands from "../assets/hands.txt?raw";
import footer from "../assets/footer.txt?raw";
import radialDots from "../assets/radial-dots.svg";
import Star from "../assets/star";

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
          src={radialDots}
          alt="Stars of wisdom!"
          class="absolute inset-0 object-top scale-170 -left-.5vh -top-46.5vh"
        />
      </div>

      {/* <p class="hidden xl:block fixed top-12vh ml-16vw font-mono whitespace-pre pointer-events-none leading-.75vh text-.65vh opacity-50">
        {stars}
      </p> */}

      {/* third circle */}
      <div class="pointer-events-none z-10 fixed -bottom-20vh size-96vh border border-white/10 rd-full flex justify-center pt-.5vh">
        <h1 class="pointer-events-auto font-display [writing-mode:vertical-lr] [text-orientation:upright] -tracking-4.5vh text-9.5vh">
          MILES
        </h1>
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
          <div class="h-24 border flex items-center justify-center">
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
          </div>
        </div>

        <p class="absolute font-mono text-[min(2vh,14px)] bottom-2 left-3">
          BROUGHT TO YOU BY{" "}
          <a href="https://github/Vexcited" target="_blank">
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

        <div class="absolute top-4 left-5 flex flex-col">
          <div class="flex items-center gap-2">
            <div class="bg-white size-1.5" />
            <p class="font-mono">Invertime......19ms</p>
          </div>
          <div class="flex items-center gap-2">
            <div class="bg-white size-1.5" />
            <p class="font-mono">Vexcited........6ms</p>
          </div>
        </div>

        <div class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <p class="font-mono text-.65vw pt-6vh -ml-3vw whitespace-pre select-none leading-.85vw opacity-75">
            {hands}
          </p>
        </div>

        <p class="absolute inset-x-0 w-fit mx-auto bottom-0 pb-2vh text-2vh font-mono">
          MILES
        </p>
      </div>

      {/* background texture */}
      <div
        class="z-0 fixed inset-0 opacity-50 mix-blend-color-dodge pointer-events-none bg-white"
        style={{
          background: `url(${grain})`,
        }}
      />

      {/* footer text, half hidden behind everything */}
      <p class="fixed top-86% font-mono whitespace-pre select-none tracking-.45vw text-1vh opacity-50">
        {footer}
      </p>
    </div>
  );
};

export default LandingPage;
