function MdButton({ item, onSelect }) {
  return (
    <button onClick={() => onSelect(item)}>
      <div>{item.name}</div>
      <div>{item.price}</div>
    </button>
  );
}

export default MdButton;
