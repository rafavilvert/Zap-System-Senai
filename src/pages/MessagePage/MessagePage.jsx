import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

import api from '../../components/services/api'

const MessagePage = (props) => {
    const [messages, setMessages] = useState([])
    const [searchTrigger, setSearchTrigger] = useState('')
    const [searchChannel, setSearchChannel] = useState('')
    const [searchTimer, setSearchTimer] = useState('')

    useEffect(() => {
        const handleGetMessages = async () => {
            try {
                const response = await api.get('/messages')
                setMessages(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        handleGetMessages();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await api.get(`/messages?trigger_like=${searchTrigger}&channel_like=${searchChannel}&timer_like=${searchTimer}`);

        setMessages(response.data);
        setSearchTrigger('');
        setSearchChannel('');
        setSearchTimer('');
    }

    return (
        <>
            <Navbar />
            <div>
                <h2>Menssagens</h2>
                <section>
                    <button type='submit' onClick={handleSubmit}>Pesquisar</button>
                    <Link to="/newmessage"><button>Nova menssagem</button></Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="trigger">Gatilho: </label>
                    <select name="trigger" id="trigger" value={searchTrigger} onChange={(event) => setSearchTrigger(event.target.value)} >
                        <option defaultValue></option>
                        <option value="abertura_conta">abertura_conta</option>
                        <option value="fez_pix">fez_pix</option>
                        <option value="recarregou_celular">recarregou_celular</option>
                        <option value="alterou_dados_pessois">alterou_dados_pessois</option>
                        <option value="consultou_saldo">consultou_saldo</option>
                        <option value="fex_transferencia_outro_banco">fex_transferencia_outro_banco</option>
                        <option value="deletou_chave_pix">deletou_chave_pix</option>
                        <option value="criou_chave_pix">criou_chave_pix</option>
                        <option value="falou_com_atendimento">falou_com_atendimento</option>
                    </select>
                    <label htmlFor="channel">Canal: </label>
                    <select name="channel" id="channel" value={searchChannel} onChange={(event) => setSearchChannel(event.target.value)} >
                        <option defaultValue></option>
                        <option value="sms">sms</option>
                        <option value="whatsapp">whatsapp</option>
                        <option value="email">email</option>
                    </select>
                    <label htmlFor="timer">Tempo: </label>
                    <input type="text" value={searchTimer} onChange={(event) => setSearchTimer(event.target.value)} />
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Gatilho</th>
                        <th>Canal</th>
                        <th>Timer</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {messages.map((messages) => {
                        return (

                            <tr key={messages.id}>
                                <td>{messages.trigger}</td>
                                <td>{messages.channel}</td>
                                <td>{messages.timer}</td>
                                <td><button onClick={() => { alert(messages.message) }}>Ver menssagem</button></td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>
            <ul>

            </ul>
        </>
    );
}

export default MessagePage;