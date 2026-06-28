type inputRadioProps = {
  htmlFor : string,
  children : string,
  radioName : string,
}

const InputRadio = ({ htmlFor, children, radioName } : inputRadioProps) => {
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
      />
      <span className="text-sm">{children}</span>
    </label>
  )
}

export default InputRadio