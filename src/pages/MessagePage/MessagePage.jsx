import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

import api from '../../components/services/api'

import { Table, Button, Label, Input, FormGroup } from 'reactstrap';
import SearchIcon from '../../assets/images/icons/search.svg'
import Swal from 'sweetalert2'

const MessagePage = () => {

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

    const handleDelete = async (id, trigger, channel, message) => {

        Swal.fire({
            title: 'Tem certeza que deseja excluir esses dados?',
            text: `Gatilho: ${trigger} - Canal: ${channel} - Menssagem: ${message}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Excluir!'
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    api.delete(`/messages/${id}`);

                    const newMessageList = messages.filter((message) => {
                        return message.id !== id;
                    })

                    Swal.fire({
                        title: 'Menssagem deletada!',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })

                    setMessages(newMessageList)
                }
                Swal.fire(
                    'Dados excluidos com sucesso!',
                    '',
                    'success'
                )
            }
        })
    }

    // const handleEdit = async () => {
    //     return(
    //     <>
    //         <Modal  onHide="TEste">
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Modal heading</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick="Olá">
    //                     Close
    //                 </Button>
    //                 <Button variant="primary" onClick="Hello">
    //                     Save Changes
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     </>
    //     )
    // }

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
                                    })}>
                                        Ver menssagem
                                    </Button>
                                    <Link to={`/editingmessage/${messages.id}`}>
                                        <Button className="ml-2 btn btn-outline-secondary"
                                            color="primary">
                                            Editar
                                        </Button>
                                    </Link>
                                    <Button className="ml-2 btn btn-outline-danger"
                                        color="primary"
                                        onClick={() => handleDelete(messages.id, messages.trigger, messages.channel, messages.message)}>
                                        Excluir
                                    </Button>
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