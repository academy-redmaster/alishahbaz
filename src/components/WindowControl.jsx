import useWindowStore from "#store/window";

const WindowControl = ({ target }) => {
  const { closeWindow } = useWindowStore();
  return (
    <div id="window-controls" className="z-50 flex gap-2">
      <div
        className="close"
        onClick={() => {
          closeWindow(target);
        }}
      />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControl;
