import WindowControl from "../components/WindowControl";
import windowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;
  const { name, image, subtitle, description } = data;
  
  return (
    <>
      <div id="window-header">
        <WindowControl target={"txtfile"} />
        <h2>{name}</h2>
      </div>
      <div className="p-5 space-y-6 bg-white">
        {image && (
          <div className="w-1/3 mx-auto">
            <img src={image} className="w-full h-auto rounded" alt={name} />
          </div>
        )}
        {subtitle && (
          <h3 className="text-lg font-semibold">{subtitle}</h3>
        )}
        {Array.isArray(description) && description.length > 0 && (
          <div className="space-y-3 leading-relaxed text-base text-gray-800">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = windowWrapper(Text, "txtfile");

export default TextWindow;