import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PostsContext } from "../contexts/PostsContext";
import styles from "./FormDialog.module.css";

import { getDatabase, ref, set } from "firebase/database";

export default function FormDialog({ item }) {
  const [open, setOpen] = React.useState(false);
  const { user, setPost, content, setContent } = React.useContext(PostsContext);

  function editarPost(textValue) {
    setPost(textValue);
    // console.log(textValue);
    const arrayDpsDaRemocao = content.filter((postExistente) => {
      return postExistente !== item;
    });

    const valorText = textValue;

    if (valorText !== null && valorText !== "") {
      setContent([
        {
          id: item.id,
          post: valorText,
          imagem: item.imagem,
          nome: item.nome,
          email: user.email,
        },
        ...arrayDpsDaRemocao,
      ]);

      const db = getDatabase();
      set(ref(db, "posts/"), [
        {
          id: item.id,
          post: valorText,
          imagem: item.imagem,
          nome: item.nome,
          email: user.email,
        },
        ...arrayDpsDaRemocao,
      ]);
    }
  }

  const handleClickOpen = () => {
    if (
      confirm(
        "Tem certeza disso ? se você confirmar você deverá colocar outro texto para esse post"
      )
    ) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={styles.title}>
          Edite o texto desse post
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.title}>
            Você poderá alterar o conteúdo do seu post, mas não poderá alterar a
            imagem e nem o nome !
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Editar Post'
            type='text'
            fullWidth
            variant='standard'
            onChange={(event) => editarPost(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Editar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
