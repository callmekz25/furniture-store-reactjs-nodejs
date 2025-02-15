interface InputProps {
  label: string;
  type: string;
  id: string;
  change: string | number | boolean;
  setChange: React.Dispatch<React.SetStateAction<string | number | boolean>>;
}
const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  change,
  setChange,
}) => {
  console.log(change);

  return (
    <>
      <div className="relative">
        <label htmlFor={id} className="text-gray-400">
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={change}
          onChange={(e) => setChange(e.target.value)}
          className={`border-2 mt-2 border-gray-200 w-full  outline-none rounded-md px-2 py-1 transition-all duration-200 `}
        />
      </div>
    </>
  );
};

export default Input;
