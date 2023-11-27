function Button(props) {
  const { buttonText } = props;
  const onButtonClick = () => {
    props.onButtonClick();
  };

  return (
    <div>
      <button type="button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
}
export default Button;
