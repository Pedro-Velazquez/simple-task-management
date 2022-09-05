import {PropsWithChildren} from "react";
import ReactModal from "react-modal"

export interface ModalProps {
  open: boolean
}

export default function Modal({children, open}: PropsWithChildren<ModalProps>) {
  return (
    <ReactModal
      isOpen={open}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          inset: "auto",
          padding: "0px"
        }
      }}
    >
      <div className="p-3">
        {children}
      </div>
    </ReactModal>
  )
}
