import React, {type FC, useEffect, useState,} from "react";
import styled from "styled-components";
import {AsYouType, type CountryCode,} from "libphonenumber-js";
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string) => void;
    defaultCountry?: CountryCode;
    isInvalid?: boolean;
    commitOnBlur?: boolean;
    isMargin?: boolean;
}

const PhoneInput: FC<Props> = (props) => {
    const {value, onChange, defaultCountry = "UA", isInvalid, commitOnBlur = false, ...rest} = props;
    const [display, setDisplay] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!value) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDisplay("");
            return;
        }
        const formatted = new AsYouType(defaultCountry).input(value);
        setDisplay(formatted);
    }, [value, defaultCountry]);

    useEffect(() => {
        if (isInvalid !== undefined) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError(isInvalid);
        }
    }, [isInvalid]);

    const formatValue = (raw: string) => {
        const formatter = new AsYouType(defaultCountry);
        const formatted = formatter.input(raw);
        const phone = formatter.getNumber();
        return {
            formatted,
            normalized: phone?.isValid() ? phone.number : raw.replace(/[^+0-9]/g, ""),
            isValid: !!phone?.isValid(),
        };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const {formatted, normalized, isValid,} = formatValue(raw);
        setDisplay(formatted);

        setError(raw.length > 0 && !isValid);
        if (!commitOnBlur) {
            onChange?.(normalized);
        }
    };

    const handleBlur = () => {
        if (!commitOnBlur) return;
        const {normalized, isValid,} = formatValue(display);
        setError(display.length > 0 && !isValid);
        onChange?.(isValid ? normalized : "");
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (!commitOnBlur) return;

        if (e.key === "Enter") {
            e.preventDefault();
            handleBlur();
            (e.target as HTMLInputElement).blur();
        }

        if (e.key === "Escape") {
            e.preventDefault();
            const formatted = value ? new AsYouType(defaultCountry).input(value) : "";

            setDisplay(formatted);
            setError(false);

            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <Input
            {...rest}
            value={display}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={
                handleKeyDown
            }
            $invalid={error}
        />
    );
};

export default PhoneInput;

const Input = styled.input<{
    $invalid?: boolean;
}>`
    width: 100%;

    height: 50px;

    padding: 0 16px;

    border-radius: 14px;

    border: 1px solid #dbe4ee;
    font-family: var(--font-ui);

    outline: none;

    background: #f8fafc;

    font-size: 14px;

    transition: 0.16s ease;

    box-sizing: border-box;

    border: 1px solid
    ${({ $invalid }) =>
            $invalid ? "#ef4444" : "#dbe4ee"};

    background: ${({ $invalid }) =>
            $invalid ? "rgba(239,68,68,0.04)" : "#f8fafc"};

    &::placeholder {
        color: #94a3b8;
    }

    &:focus {
        background: white;
        border-color: ${({ $invalid }) =>
                $invalid ? "#ef4444" : "#94a3b8"};
    }
`;