import { ComponentPropsWithRef, useMemo } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ComponentPropsWithRef<'button'> {
    variant?: 'primary' | 'secondary';
}

const Button = ({ children, className, variant, ...props }: ButtonProps) => {
    const buttonClass = useMemo(() => {
        switch (variant) {
            case 'primary':
                return styles.buttonPrimary;
            case 'secondary':
                return styles.buttonSecondary;
            default:
                return '';
        }
    }, [variant]);

    return ( 
        <button className={`${styles.button} ${buttonClass} ${className}`} {...props}>
            {children}
        </button>
     );
}
 
export default Button;