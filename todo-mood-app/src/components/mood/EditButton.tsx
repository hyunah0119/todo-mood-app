type EditButtonProps = {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const EditButton = ({ ariaLabel, onClick, children, disabled }: EditButtonProps) => {
  return (
    <button 
      type="button" 
      aria-label={ariaLabel}
      className={`text-2xl ${disabled ? 'text-neutral-400 cursor-default' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default EditButton