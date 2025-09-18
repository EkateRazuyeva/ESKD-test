import type {RegisterOptions, FieldErrors, UseFormRegister} from 'react-hook-form';
import {clsx} from 'clsx';
import {ErrorMessage} from './ErrorMessage';

export type FormData = {
    name: string;
    phone: string;
    message: string;
};

type Props = {
    name: keyof FormData;
    placeholder: string;
    register: UseFormRegister<FormData>;
    registerOptions?: RegisterOptions<FormData, keyof FormData>;
    textarea?: boolean;
    errors: FieldErrors<FormData>;
};
export const FormField = ({ name, placeholder, register, registerOptions, textarea = false, errors }: Props) => {
    const baseClass = 'w-full p-2 border-2 rounded-lg';
    return (
        <div className="mb-5 relative">
            {textarea ? (
                <textarea
                    {...register(name, registerOptions)}
                    placeholder={placeholder}
                    className={clsx(baseClass, errors[name] ? 'border-red-500' : 'border-gray-800')}
                    aria-invalid={!!errors.name}
                />
            ) : (
                <input
                    {...register(name, registerOptions)}
                    placeholder={placeholder}
                    className={clsx(baseClass, errors[name] ? 'border-red-500' : 'border-gray-800')}
                    aria-invalid={!!errors.name}
                />
            )}
            {errors[name] && <ErrorMessage error={errors[name]?.message} />}
        </div>
    );
};
