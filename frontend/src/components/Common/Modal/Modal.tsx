import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import closeIcon from "../../../assets/icons/close.svg";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  onClose?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
};

export const Modal: FC<Props> = ({ children, onClose, visible }) => {
  const [showModal, setShowModal] = useState<boolean>(visible);
  const ref = useRef(null);

  useEffect(() => setShowModal(visible), [visible]);

  return (
    <>
      {showModal &&
        createPortal(
          <div className={styles.background} onClick={onClose}>
            <div
              className={styles.modalBody}
              ref={ref}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={onClose}>
                <img className={styles.icon} src={closeIcon} alt="Close Icon" />
              </button>
              <div className={styles.modalContent}>{children}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
