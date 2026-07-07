const MoodCalendar = () => {
  const arrowBtnClassName = (direction : 'left' | 'right') => `
    text-3xl text-neutral-600 hover:text-black cursor-pointer transition-transform duration-250
    dark:text-neutral-400 dark:hover:text-white
    ${direction === 'left' ? 'hover:-translate-x-0.5' : 'hover:translate-x-0.5'}
  `
  return (
    <div>
      <button className={`${arrowBtnClassName('left')}`}></button>

      <div className="flex items-center gap-2">
        <p className="text-lg font-medium"></p>
        <button
          className="ml-2 border rounded-md px-2 py-1 text-sm font-medium text-white transition-colors duration-250 dark:border-black"
        >오늘</button>
      </div>

      <button className={`${arrowBtnClassName('right')}`}></button>
    </div>
  )
}

export default MoodCalendar