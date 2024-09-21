
import styles from './Button.module.css'

type ButtonProps = {
    children?: React.ReactNode;
}

const Button = ({children, ...props}: ButtonProps) => {
    return (
        <button {...props} className={styles.btn}>
            {children}
        </button>
    );
};

export default Button;