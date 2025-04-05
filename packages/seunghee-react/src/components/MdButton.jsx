function MdButton({ item, onButtonMouseDown, onButtonMouseUp }) {
  return (
    <button
      className="md-btn"
      onMouseDown={() => onButtonMouseDown(item)}
      onMouseUp={() => onButtonMouseUp(item)}
    >
      <h3>{item.name}</h3>
      <p>{`${item.price}원`}</p>
    </button>
  );
}

export default MdButton;
