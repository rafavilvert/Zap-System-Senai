import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = (props) => {


  return (
    <>
      <Navbar />
      <Jumbotron>
        <h1 className="display-3">Seja bem vindo ao Zap System Message!</h1>
        <p className="lead">
          Automatizão de envio de mensagens e notificações aos seus clientes,
          agilidade e otimização de tempo.
        </p>
        <hr className="my-2" />
        <p>Clique nos botões abaixo e veja nossos serviços</p>
        <p className="lead">
          <Link to="/dashboard"><Button color="primary">Dashboard</Button></Link>
          <Link to="/messages"><Button className="ml-2" color="primary">Menssagens</Button></Link>
        </p>
      </Jumbotron>
    </>
  );
}

export default HomePage;