type ButtonType = "button" | "submit" | "reset";

interface propsTypes {
  type?: ButtonType;
  className?: string;
  text: string;
  eventButton?: () => void;
  disabled?: boolean;
}

export const Button = ({
  type = "button",
  className,
  text,
  eventButton,
  disabled = false,
}: propsTypes) => {
  return (
    <>
      <div>
        <button
          type={type}
          disabled={disabled}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
          onClick={eventButton}
        >
          {text}
        </button>
      </div>
    </>
  );
};
