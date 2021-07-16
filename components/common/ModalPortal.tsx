import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};
const ModalPortal: React.FC<Props> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? ReactDOM.createPortal(
    children,
    modalRoot
  ) : <></>;
};

export default ModalPortal;
