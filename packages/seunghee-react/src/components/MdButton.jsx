function MdButton({ item, onButtonMouseDown, onButtonMouseUp }) {
  return (
    <button
      onMouseDown={() => onButtonMouseDown(item)}
      onMouseUp={() => onButtonMouseUp(item)}
    >
      <div>{item.name}</div>
      <div>{item.price}</div>
    </button>
  );
}

export default MdButton;
