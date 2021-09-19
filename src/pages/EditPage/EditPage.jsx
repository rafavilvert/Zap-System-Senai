import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';

import api from '../../components/services/api'
import * as yup from 'yup';

import { Button, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2'

import { Link } from 'react-router-dom';

const schema = yup.object().shape({
    registermessage: yup.string().required('Campo menssagem é obrigatório'),
    registerTimer: yup.string().required('Campo tempo é obrigatório'),
    registerChannel: yup.string().required('Campo canal é obrigatório'),
    registerTrigger: yup.string().required('Campo gatilho é obrigatório'),
})

const EditPage = (props) => {
    const [triggers, setTriggers] = useState([])
    const [channels, setChannels] = useState([])

    const [registerTrigger, setRegisterTrigger] = useState('')
    const [registerChannel, setRegisterChannel] = useState('')
    const [registerTimer, setRegisterTimer] = useState('')
    const [registermessage, setRegisterMessage] = useState()

    const history = useHistory();

    const dados = props.match.params.id

    const getMessages = async () => {

        const response = await api.get(`/messages/${dados}`);
        setRegisterMessage(response.data.message);
        setRegisterTrigger(response.data.trigger)
        setRegisterChannel(response.data.channel)
        setRegisterTimer(response.data.timer)
        
    }  

    const handleEdit = async (event) => {
        try {
            event.preventDefault();

            await schema.validate({

                registermessage,
                registerTimer,
                registerChannel,
                registerTrigger,
            })

            await api.put(`/messages/${dados}`, {
                "channel": registerChannel,
                "trigger": registerTrigger,
                "timer": registerTimer,
                "message": registermessage
            });

            setRegisterTrigger('');
            setRegisterChannel('');
            setRegisterTimer('');
            setRegisterMessage('');

            Swal.fire(
                'Menssagem editada com sucesse!!',
                '',
                'success'
            )

            history.goBack('/messages')

        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: error.errors,
                icon: 'error',
                confirmButtonText: 'ok'
            })
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
        handleGetTriggers();
        handleGetChannels();
        getMessages();
    }, []);

    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-between w-75 ml-auto mr-auto">
                <h1>Nova menssagem</h1>
                <section>
                    <Link to='/messages'>
                        <Button className="btn btn-outline-info" type='button'>
                            Voltar
                        </Button>
                    </Link>
                </section>
            </div>
            <div className="form-new-message rounded border border-info w-75">
                <form onSubmit={handleEdit}>
                    <FormGroup className="p-5 rounded">
                        <div className="d-flex justify-content-around w-100 ml-auto mr-auto mb-3">
                            <div>
                                <Label for="trigger">Gatilho:</Label>
                                <Input type="select" name="trigger" id="trigger" bsSize="lg" value={registerTrigger} onChange={(event) => setRegisterTrigger(event.target.value)} >
                                    <option defaultValue></option>
                                    {triggers.map((triggers) => {
                                        return <option key={triggers.id} value={triggers.name}>{triggers.name}</option>
                                    })}
                                </Input>
                            </div>
                            <div className="ml-2">
                                <Label htmlFor="channel">Canal: </Label>
                                <Input type="select" name="channel" id="channel" bsSize="lg" value={registerChannel} onChange={(event) => setRegisterChannel(event.target.value)} >
                                    <option defaultValue></option>
                                    {channels.map((channels) => {
                                        return <option key={channels.id} value={channels.name}>{channels.name}</option>
                                    })}
                                </Input>
                            </div>
                            <div className="ml-2">
                                <Label htmlFor="timer">Tempo: </Label>
                                <Input type="text" name="timer" bsSize="lg" value={registerTimer} onChange={(event) => setRegisterTimer(event.target.value)} />
                            </div>
                        </div>
                        <div className="w-100 ml-auto mr-auto">
                            <Label htmlFor="text-area-message">Menssagem: </Label>
                            <Input
                                type="textarea"
                                id=""
                                placeholder="Escreva uma menssagem"
                                value={registermessage}
                                onChange={(event) => setRegisterMessage(event.target.value)} />
                        </div>
                        <div className="d-flex w-75 ml-auto mr-auto">
                            <Input className="btn btn-outline-primary" type="submit" value="Salvar" />
                            <Input className="btn btn-outline-secondary ml-2" 
                                    type="button" 
                                    onClick={() => history.goBack('/messages')} 
                                    value="Cancelar" />
                        </div>
                    </FormGroup>
                </form>
            </div>
        </>
    );
}

export default EditPage;