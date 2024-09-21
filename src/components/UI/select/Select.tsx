
import styles from './Select.module.css'

type Options = {
    name: string;
    value: string;
}

type SelectProps = {
    defaultValue: string;
    value: string;
    onChange: (sort: string) => void;
    options: Options[];
}

const Select = ({defaultValue, value, onChange, options}: SelectProps) => {
    return (
        <select className={styles.select}
                value={value}
                onChange={e => onChange(e.target.value)}
        >
            <option value='' disabled>{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </select>
    );
};

export default Select;