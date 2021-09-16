import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';

import api from '../../components/services/api'

import './NewMessage.css'

const NewMessage = () => {
    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])

    const [registerTrigger, setRegisterTrigger] = useState('')
    const [registerChannel, setRegisterChannel] = useState('')
    const [registerTimer, setRegisterTimer] = useState('')
    const [registermessage, setRegisterMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await api.post('/messages', {
            trigger: registerTrigger,
            channel: registerChannel,
            timer: registerTimer,
            message: registermessage
        });
        console.log(response.data);


    }

    const handleGetApiDatas = async () => {
        try {
            const responseTriggers = await api.get('/triggers')
            const responseChannels = await api.get('/channels')

            setTriggers(responseTriggers.data)
            setChannels(responseChannels.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetApiDatas();
    }, []);

    return (
        <>
            <Navbar />
            <h1>Nova menssagem</h1>
            <div className="title-main">
                <h2>Menssagens</h2>
                <div>
                    <button>Voltar</button>
                    <button type='submit' onClick={handleSubmit}>Cadastrar</button>
                </div>
            </div>
            <div className="form-new-message">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="trigger">Gatilho: </label>
                    <select name="trigger" id="trigger" value={registerTrigger} onChange={(event) => setRegisterTrigger(event.target.value)} >
                        <option defaultValue></option>
                        {triggers.map((triggers) => {
                            return <option key={triggers.id} value={triggers.name}>{triggers.name}</option>
                        })}
                    </select>
                    <label htmlFor="channel">Canal: </label>
                    <select name="channel" id="channel" value={registerChannel} onChange={(event) => setRegisterChannel(event.target.value)} >
                        <option defaultValue></option>
                        {channels.map((channels) => {
                            return <option key={channels.id} value={channels.name}>{channels.name}</option>
                        })}
                    </select>
                    <label htmlFor="timer">Tempo: </label>
                    <input type="text" name="timer" value={registerTimer} onChange={(event) => setRegisterTimer(event.target.value)} />

                    <label htmlFor="message">Menssagem: </label>
                    <textarea type="text" name="message" value={registermessage} onChange={(event) => setRegisterMessage(event.target.value)} />
                </form>
            </div>
        </>
    );
}

export default NewMessage;