import {useState, ChangeEvent} from "react";

export default function useForm(formState: object) {
    const [formData, setFormData] = useState<object>(formState);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        })
    }
/*    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>, input : string) => {
        const {name, checked} = e.target;
        if(checked) {
            setFormData({
                ...formData,
                [input] : [name]
            })
        } else {
            setFormData({
                ...formData,

                [input]: [formData[input].filter(element => element !== name)]
            })
        }
    }*/

    return {
        formData,
        setFormData,
        handleChangeInput,
    }
}