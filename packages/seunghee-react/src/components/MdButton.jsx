function MdButton({ item, onButtonMouseDown, onButtonMouseUp }) {
  return (
    <button
      className="md-btn"
      onMouseDown={() => onButtonMouseDown(item)}
      onMouseUp={() => onButtonMouseUp(item)}
    >
      <div>{item.name}</div>
      <div>{item.price}</div>
    </button>
  );
}

export default MdButton;
