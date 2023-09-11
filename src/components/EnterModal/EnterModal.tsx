import React, { FC, useState } from "react";

import { useAction } from "../../hooks/StoreHooks/useAction";

import "./EnterModal.scss";
import { Modal } from "@mui/material";

type PropsT = {
  setOpener: boolean;
};

const EnterModal: FC<PropsT> = ({ setOpener }) => {
  const { setAuth } = useAction();
  const [open, setOpen] = useState(setOpener);

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      /*onClose={handleClose}*/
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="enter-modal">
        <div>Привіт , ласкаво промо до магазну GGWP Shop</div>

        <div className="enter-modal__access-btn" onClick={setAuth}>
          Розпочати
        </div>
      </div>
    </Modal>
  );
};

export default EnterModal;
