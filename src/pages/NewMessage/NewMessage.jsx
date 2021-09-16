import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

import './NewMessage.css'

const NewMessage = () => {
    return (
        <>
            <Navbar />
            <h1>Nova menssagem</h1>
            <div className="title-main">
                <h2>Menssagens</h2>
                <div>
                    <button>Voltar</button>
                    <button>Cadastrar</button>
                </div>
            </div>
            <div className="form-new-message">
                <div>
                    <label htmlFor="trigger">Gatilho: </label> 
                    <select name="trigger" id="trigger">
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
                    <select name="channel" id="channel">
                        <option defaultValue value></option>
                        <option value="sms">sms</option>
                        <option value="whatsapp">whatsapp</option>
                        <option value="email">email</option>
                    </select>
                    <label htmlFor="timer">Tempo: </label>
                    <input type="time" name="timer" />
                </div>
                <label htmlFor="message">Menssagem: </label>
                <textarea type="text" name="message" />
            </div>
        </>
    );
}

export default NewMessage;