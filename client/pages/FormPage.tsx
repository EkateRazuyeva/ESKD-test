import {useForm} from 'react-hook-form';
import {type FormData, FormField} from '../components/FormField.tsx';

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl border-2 border-violet-400 shadow-md w-full max-w-md"
            >
                <h2 className="text-xl font-semibold text-center mb-7">Оставьте сообщение</h2>

                <FormField name={'name'} register={register} registerOptions={{
                    required: 'Имя обязательно',
                    minLength: {value: 2, message: 'Минимум 2 символа'}
                }}
                           placeholder={'Имя'}
                           errors={errors}
                />
                <FormField name={'phone'} register={register} registerOptions={{
                    required: 'Телефон обязателен',
                    pattern: {value: /^(\+375|80)\d{7,9}$/,
                        message: 'Неверный формат телефона (+375 или 80)'}
                }}
                           placeholder={'Телефон'}
                           errors={errors}
                />
                <FormField textarea name={'message'} register={register} registerOptions={{
                    required: 'Сообщение обязательно',
                    minLength: {value: 2, message: 'Минимум 2 символа'}
                }}
                           placeholder={'Сообщение'}
                           errors={errors}
                />
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
