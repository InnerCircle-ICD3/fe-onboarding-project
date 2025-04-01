import MdButton from "./MdButton";

function MdContainer({ items, onSelect }) {
  return (
    <div>
      {items.map((item, index) => (
        <MdButton key={index} item={item} onSelect={onSelect}></MdButton>
      ))}
    </div>
  );
}

export default MdContainer;
