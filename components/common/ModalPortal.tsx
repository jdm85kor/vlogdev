import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};
const ModalPortal = ({ children }: Props) => {
  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? ReactDOM.createPortal(
    children,
    modalRoot
  ) : <></>;
};

export default ModalPortal;
