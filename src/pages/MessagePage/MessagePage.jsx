import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

import api from '../../components/services/api'

const MessagePage = (props) => {
    const [messages, setMessages] = useState([])
    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])

    const [searchTrigger, setSearchTrigger] = useState('')
    const [searchChannel, setSearchChannel] = useState('')
    const [searchTimer, setSearchTimer] = useState('')

    const handleGetApiDatas = async () => {
        try {
            const responseMessages = await api.get('/messages')
            const responseTriggers = await api.get('/triggers')
            const responseChannels = await api.get('/channels')
            
            setMessages(responseMessages.data)
            setTriggers(responseTriggers.data)
            setChannels(responseChannels.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetApiDatas();
    }, []);

    // useEffect(() => {
    //     const handleGetTriggers = async () => {
    //         try {
    //             const response = await api.get('/triggers')
    //             setTriggers(response.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    

    //     handleGetTriggers();
    // }, []);

    // useEffect(() => {
    //     const handleGetChannels = async () => {
    //         try {
    //             const response = await api.get('/channels')
    //             setChannels(response.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    

    //     handleGetChannels();
    // }, []);

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
                        {triggers.map((triggers) => {
                            return <option key={triggers.id} value={triggers.name}>{triggers.name}</option>
                        })}
                    </select>
                    <label htmlFor="channel">Canal: </label>
                    <select name="channel" id="channel" value={searchChannel} onChange={(event) => setSearchChannel(event.target.value)} >
                    <option defaultValue></option>
                        {channels.map((channels) => {
                            return <option key={channels.id} value={channels.name}>{channels.name}</option>
                        })}
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