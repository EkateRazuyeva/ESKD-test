import {useForm} from 'react-hook-form';
import {ErrorMessage} from '../components';
import clsx from 'clsx';

type FormData = {
    name: string;
    phone: string;
    message: string;
};

export const FormPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<FormData>({defaultValues: {message: '', name: '', phone: ''}});

    const onSubmit = async (data: FormData) => {
        console.log(data)
        try {
            const res = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Ошибка при отправке');

            reset();
        } catch (err) {
            console.error(err);
            alert('Ошибка сервера');
        }
    };

    const baseClass = 'w-full p-2 border-2 rounded-lg'
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl border-2 border-violet-400 shadow-md w-full max-w-md"
            >
                <h2 className="text-xl font-semibold text-center mb-7">Оставьте сообщение</h2>

                <div className="mb-5 relative">
                    <input
                        {...register('name', {
                            required: 'Имя обязательно',
                            minLength: {value: 2, message: 'Минимум 2 символа'}
                        })}
                        placeholder="Имя"
                        className={clsx(
                            baseClass,
                            errors.name ? 'border-red-500' : 'border-gray-800'
                        )}
                    />
                    {errors.name && <ErrorMessage error={errors.name.message}/>}
                </div>
                <div className="mb-5 relative">
                    <input
                        {...register('phone', {
                            required: 'Телефон обязателен',
                            pattern: {value: /^(\+375|80)\d{7,9}$/, message: 'Неверный формат телефона (+375 или 80)'}
                        })}
                        placeholder="Телефон"
                        className={clsx(
                            baseClass,
                            errors.phone ? 'border-red-500' : 'border-gray-800'
                        )}
                    />
                    {errors.phone && <ErrorMessage error={errors.phone.message}/>}
                </div>
                <div className="mb-5 relative">
                <textarea
                    {...register('message', {
                        required: 'Сообщение обязательно',
                        minLength: {value: 2, message: 'Минимум 2 символа'}
                    })}
                    placeholder="Сообщение"
                    className={clsx(
                        baseClass,
                        errors.message ? 'border-red-500' : 'border-gray-800'
                    )}
                />
                    {errors.message && <ErrorMessage error={errors.message.message}/>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 rounded-lg disabled:opacity-50 transition"
                >
                    Отправить
                </button>
            </form>
        </div>
    );
}
