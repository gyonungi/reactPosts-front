import React, { useEffect, useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useParams } from "react-router-dom";

export const Index = () => {
  const { id } = useParams();
  const [comment, setComment] = useState();
  useEffect(() => {
    if (id) {
      axios
        .patch(`/posts/${id}/comm`)
        .then(({ data }) => {
          setComment(data.comment);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, []);

  const onSubmit = async () => {
    try {
      const dto = {
        comment,
      };
      const { data } = await(`/posts/${id}/comm`, dto);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
