type FilterType = "all" | "complete" | "incomplete";

type inputRadioProps = {
  htmlFor : string,
  children : string,
  radioName : string,
  value : FilterType,

  filter : FilterType,
  setFilter : React.Dispatch<React.SetStateAction<FilterType>>,
}

const InputRadio = ({ htmlFor, children, radioName, value, filter, setFilter } : inputRadioProps) => {
  return (
    <label 
      htmlFor={htmlFor}
      className="flex items-center cursor-pointer"
    >
      <input 
        type="radio"
        className="mr-1.25"
        id={htmlFor}
        name={radioName}
        value={value}
        checked={filter === value}
        onChange={() => setFilter(value)}
      />
      <span className="text-sm">{children}</span>
    </label>
  )
}

export default InputRadio