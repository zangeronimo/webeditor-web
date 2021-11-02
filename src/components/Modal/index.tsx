import { v4 as uuid } from 'uuid';

import { Container, ShowModal, Title, Content } from './styles';

export type ModalProps = {
  id?: string;
  title?: string;
  disabled?: boolean;
  confirm?: () => void;
  button: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  id = `tl_${uuid()}`,
  title = '',
  confirm,
  disabled = false,
  button,
  children,
}) => {
  if (disabled) {
    return <div>{button}</div>;
  }

  return (
    <>
      <Container
        className="modal fade"
        id={id}
        tabIndex={-1}
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <Title className="modal-header">
              {title && (
                <h5 className="modal-title" id={`${id}Label`}>
                  {title}
                </h5>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </Title>
            <Content className="modal-content">{children}</Content>
            {confirm && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Não
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirm}
                  data-bs-dismiss="modal"
                >
                  Sim
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
      <ShowModal data-bs-toggle="modal" data-bs-target={`#${id}`} id={id}>
        {button}
      </ShowModal>
    </>
  );
};
