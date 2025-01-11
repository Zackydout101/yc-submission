interface RunButtonProps {
  onRun: () => void;
  onPanelOpen: () => void;
}

export function RunButton({ onRun, onPanelOpen }: RunButtonProps) {
  const handleClick = () => {
    console.log("Running flow...");
    onRun(); // Trigger the iteration logic
    onPanelOpen(); // Trigger panel opening
  };

  return (
    <button
      onClick={handleClick}
      className="absolute text-lg top-4 right-4 bg-pink-100 hover:bg-pink-200 text-pink-500 font-semibold py-2 px-4 rounded-lg border border-pink-500 transition-colors z-50 flex items-center gap-2"
    >
      Run Flow
    </button>
  );
}
