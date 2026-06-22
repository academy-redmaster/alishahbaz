import Dock from "#components/Dock";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Navbar from "#components/Navbar";
import Terminal from "#windows/Terminal";
import Safari from "#windows/Safari";
import Resume from "#windows/Resume";
import Finder from "#windows/Finder";
import Text from "#windows/Text";
import Image from "#windows/Image";
import Contact from "#windows/Contact";
import Home from "#windows/Home";
import Photo from "#windows/Photo";
import Welcome from "./components/Welcome";

// ======================
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main className="w-dvw h-dvh overflow-hidden">
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Home />
      <Photo />
    </main>
  );
};

export default App;
