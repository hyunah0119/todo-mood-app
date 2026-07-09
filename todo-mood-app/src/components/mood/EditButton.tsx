type EditButtonProps = {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
}

const EditButton = ({ ariaLabel, onClick, children }: EditButtonProps) => {
  return (
    <button 
      type="button" 
      aria-label={ariaLabel}
      className="text-2xl cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default EditButton