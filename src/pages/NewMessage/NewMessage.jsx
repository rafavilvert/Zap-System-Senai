import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

import api from '../../components/services/api'

import './NewMessage.css'

const NewMessage = () => {
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
                        <option defaultValue value></option>
                        <option value="abertura_conta">abertura_conta</option>
                        <option value="fez-pix">fez-pix</option>
                        <option value="recarregou_celular">recarregou_celular</option>
                        <option value="alterou_dados_pessois">alterou_dados_pessois</option>
                        <option value="consultou_saldo">consultou_saldo</option>
                        <option value="fex_transferencia_outro_banco">fex_transferencia_outro_banco</option>
                        <option value="deletou_chave_pix">deletou_chave_pix</option>
                        <option value="criou_chave_pix">criou_chave_pix</option>
                        <option value="falou_com_atendimento">falou_com_atendimento</option>
                    </select>
                    <label htmlFor="channel">Canal: </label>
                    <select name="channel" id="channel" value={registerChannel} onChange={(event) => setRegisterChannel(event.target.value)} >
                        <option defaultValue value></option>
                        <option value="sms">sms</option>
                        <option value="whatsapp">whatsapp</option>
                        <option value="email">email</option>
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