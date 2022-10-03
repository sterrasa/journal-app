import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators()
    }, [formState])


    const isFormValid = useMemo( () => {
        for (const formField of Object.keys(formValidation)) {
            if(formValidation[formField] !== null) return false;
        }
        return true;
    },[formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            //create computed property
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
        ...formValidation,
    }
}
