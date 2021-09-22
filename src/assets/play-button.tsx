interface Props {
  onClick: () => void
}

export const PlayButton = (props: Props) => {
  const { onClick } = props
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 245 245"
      onClick={onClick}
      fill="#fff"
      cursor="pointer"
    >
      <path
        d="M122.5,0C54.953,0,0,54.953,0,122.5S54.953,245,122.5,245S245,190.047,245,122.5S190.047,0,122.5,0z M122.5,230
 C63.225,230,15,181.775,15,122.5S63.225,15,122.5,15S230,63.225,230,122.5S181.775,230,122.5,230z M91.094,200.659l93.981-78.159
 l-93.98-78.159L91.094,200.659z M106.095,76.325l55.521,46.175l-55.522,46.175L106.095,76.325z"
      />
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  )
}
