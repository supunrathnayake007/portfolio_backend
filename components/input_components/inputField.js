import styles from "./input_field.module.css";

function InputField(props) {
  const { id, labelText } = props;
  const onChanged = (Username) => {
    props.callbackValue(Username);
  };
  let inputType = "text";
  if (id === "password") inputType = "password";

  return (
    <div className={styles.container}>
      <label for={id}>{labelText}</label>
      <input
        type={inputType}
        id={id}
        className={styles.input}
        onChange={(e) => {
          onChanged(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default InputField;
