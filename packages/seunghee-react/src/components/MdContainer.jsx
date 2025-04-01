import MdButton from "./MdButton";

function MdContainer({ items, onButtonMouseDown, onButtonMouseUp }) {
  return (
    <div className="md-container">
      {items.map((item, index) => (
        <MdButton
          key={index}
          item={item}
          onButtonMouseDown={onButtonMouseDown}
          onButtonMouseUp={onButtonMouseUp}
        ></MdButton>
      ))}
    </div>
  );
}

export default MdContainer;
