import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

import { Table, Button, Label, Input, FormGroup } from 'reactstrap';
import SearchIcon from '../../assets/images/icons/search.svg'

import api from '../../components/services/api'
import Swal from 'sweetalert2'

const MessagePage = (props) => {
    const [messages, setMessages] = useState([])
    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])

    const [searchTrigger, setSearchTrigger] = useState('')
    const [searchChannel, setSearchChannel] = useState('')
    const [searchTimer, setSearchTimer] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await api.get(`/messages?trigger_like=${searchTrigger}&channel_like=${searchChannel}&timer_like=${searchTimer}`);

        setMessages(response.data);
        setSearchTrigger('');
        setSearchChannel('');
        setSearchTimer('');
    }

    const handleGetMessages = async () => {
        try {
            const responseMessages = await api.get('/messages')
            setMessages(responseMessages.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetTriggers = async () => {
        try {
            const response = await api.get('/triggers')
            setTriggers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetChannels = async () => {
        try {
            const response = await api.get('/channels')
            setChannels(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetMessages();
        handleGetTriggers();
        handleGetChannels();
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <div className="d-flex w-75 ml-auto mr-auto mb-3 justify-content-between">
                    <h2>Menssagens</h2>
                    <section>
                        <Button className="btn btn-outline-info" type='submit' onClick={handleSubmit}>
                            <img src={SearchIcon} alt="pesquisar" />
                        </Button>
                        <Link to="/newmessage"><Button className="ml-2 btn btn-outline-primary" color="primary">Nova menssagem</Button></Link>
                    </section>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormGroup className="d-flex flex-row justify-content-between w-75 ml-auto mr-auto mb-3">
                        <div>
                            <Label for="trigger">Gatilho:</Label>
                            <Input type="select" name="select" id="trigger" value={searchTrigger} onChange={(event) => setSearchTrigger(event.target.value)}>
                                <option defaultValue></option>
                                {triggers.map((triggers) => {
                                    return <option key={triggers.id} value={triggers.name}>{triggers.name}</option>
                                })}
                            </Input>
                        </div>
                        <div>
                            <Label for="channel">Canal: </Label>
                            <Input type="select" name="select" id="channel" value={searchChannel} onChange={(event) => setSearchChannel(event.target.value)}>
                                <option defaultValue></option>
                                {channels.map((channels) => {
                                    return <option key={channels.id} value={channels.name}>{channels.name}</option>
                                })}
                            </Input>
                        </div>
                        <div>
                            <Label htmlFor="timer">Tempo: </Label>
                            <Input type="text" value={searchTimer} onChange={(event) => setSearchTimer(event.target.value)} />
                        </div>
                    </FormGroup>
                </form>
            </div>

            <Table hover className="w-75 ml-auto mr-auto table border border-info">
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
                                <td>
                                    <Button className="ml-2 btn btn-outline-success" color="primary" onClick={() => Swal.fire({
                                            title: 'Messagem: ',
                                            text: messages.message,
                                            icon: 'info',
                                            confirmButtonText: 'ok'
                                        })}>Ver menssagem</Button>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default MessagePage;