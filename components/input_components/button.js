function Button(props) {
  const { buttonText } = props;
  const onButtonClick = () => {
    props.onButtonClick();
  };

  return (
    <div>
      <button
        className="m-1 bg-lime-500 px-2 py-1 rounded hover:bg-lime-600"
        type="button"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
export default Button;
