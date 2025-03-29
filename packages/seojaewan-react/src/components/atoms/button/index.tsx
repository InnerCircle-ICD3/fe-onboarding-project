interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <button
      {...rest}
      className={
        "px-[20px] py-[10px] text-[24px] border rounded-[5px] bg-primary hover:bg-hover active:bg-active text-white"
      }
    >
      {children}
    </button>
  );
};

export default Button;
