import type { Component } from "solid-js";

const Star: Component<{ fill?: boolean }> = (props) => (
  <svg
    height="5.5vh"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.0469 16.5693L23.1143 16.8857L23.4307 16.9531L37.6172 20L23.4307 23.0469L23.1143 23.1143L23.0469 23.4307L20 37.6172L16.9531 23.4307L16.8857 23.1143L16.5693 23.0469L2.38184 20L16.5693 16.9531L16.8857 16.8857L16.9531 16.5693L20 2.38184L23.0469 16.5693Z"
      stroke="currentColor"
      fill={props.fill ? "currentColor" : void 0}
    />
  </svg>
);

export default Star;
