
import styles from './Modal.module.css'

type ModalProps = {
    children?: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const Modal = ({children, visible, setVisible}: ModalProps) => {
    const classes = [styles.modal]
    if (visible) {
        classes.push(styles.active)
    }
    return (
        <div className={classes.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;