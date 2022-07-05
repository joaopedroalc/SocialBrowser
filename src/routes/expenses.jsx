export default function Expenses(props) {
  console.log(props);
  return (
    <div>
      <h2>{props.text}</h2>
      <p>{props.nome}</p>
      <p>{props.email}</p>

      {props.postState === "" ? (
        ""
      ) : (
        <>
          <button onClick={props.removePost}>Remover</button>
          <button onClick={props.editPost}>Editar</button>
        </>
      )}
    </div>
  );
}
