import WindowControl from "../components/WindowControl";
import { gallery, photosLinks } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";
import { Mail, Search } from "lucide-react";

const Photo = () => {
  const { openWindow } = useWindowStore();
  return (
    <>
      <div id="window-header">
        <WindowControl target={"photos"} />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>
      <div className="flex w-full">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={() => {
                  openWindow("imgfile", {
                    id,
                    name: "Galley image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  });
                }}
              >
                <img src={img} alt={`Galley image ${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotoWrapper = windowWrapper(Photo, "photos");

export default PhotoWrapper;