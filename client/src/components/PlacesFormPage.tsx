import FormFiled from "./FormField";
import Perks from "./Perks";
import { useState, FormEvent } from "react";

export default function PlacesFormPage() {
    const [inputValue, setInputValue] = useState({
        title: '',
        address: '',
        description: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: 1,
        price: 100,
        perks: [],
        photos: []
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setInputValue(inputValue);
    }
    const onChangeInput = () => {
        console.log('siema')
    }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <FormFiled header={'Title'} description={'Title for your place. Should be short and catchy.'}>
                        <input name="title" value={inputValue.title} type="text" placeholder="title, for example: My lovely apt" onChange={onChangeInput}/>
                    </FormFiled>
                    <FormFiled header={'Address'} description={'Address to this place'}>
                        <input name="address" type={'text'} placeholder="address" onChange={onChangeInput} />
                    </FormFiled>
                    <FormFiled header={'Photos'} description={'gallery of this place'}>
                        <div className={'flex gap-2'}>
                            <input className={''} type="text" placeholder={'Add using a link...jpg'} onChange={onChangeInput}/>
                            <button className={'primary grow whitespace-nowrap'}>Add photos</button>
                        </div>
                    </FormFiled>
                    <div className={'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'}>
                        <button className={'border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center items-center gap-2'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                            Upload
                        </button>
                    </div>
                    <FormFiled header={'Description'} description={'description of this place'}>
                        <textarea name="description" rows={5} onChange={onChangeInput}/>
                    </FormFiled>
                    <FormFiled header={'Perks'} description={'Select all the perks of your place'}>
                        <div className={'grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'}>
                            <Perks onChange={onChangeInput} />
                        </div>
                    </FormFiled>
                    <FormFiled header={'Extra Info'} description={'House rules,etc.'} >
                        <textarea name="extraInfo" onChange={onChangeInput}/>
                    </FormFiled>
                    <FormFiled header={'Check in&out times'} description={'Add check in and out times, remember to have some time window for cleaning the room between guests'} >
                        <div className={'grid sm:grid-cols-3 gap-2'}>
                            <div>
                                <h3 className={'mt-2 -mb-1'}>Check in time</h3>
                                <input type="text" placeholder="14:00" onChange={onChangeInput}/>
                            </div>
                            <div>
                                <h3 className={'mt-2 -mb-1'}>Check out time</h3>
                                <input type="text" onChange={onChangeInput}/>
                            </div>
                            <div>
                                <h3 className={'mt-2 -mb-1'}>Max number of guests</h3>
                                <input type="text" onChange={onChangeInput}/>
                            </div>
                        </div>
                    </FormFiled>
                    <button className={'primary w-full my-4'} type={'submit'}>Save</button>
                </form>
            </div>
        </>
    )
}