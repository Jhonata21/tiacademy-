import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap"
import { api } from "../../../config";


export const Cadastrarpedido = () => {

    const[pedido,setPedido] = useState({
        id:'',
        idCliente:'',
        idServico:'',
        valor:'',
        data:""
    });

    const[status,setStatus] = useState({
        formSave:false, 
        type:'',
        message:''
    });

    const valorInput = e => setPedido({
        ...pedido,[e.target.name]:e.target.value
    });

    const cadPedido = async e =>{
        e.preventDefault();

        setStatus({
            formSave:true
        });

        const headers = {
            'Content-Type':'application/json'
        };

        await axios.post(api+"/pedidos", pedido,{headers})
        .then((response) => {
            if(response.data.error){
                setStatus({
                    formSave:false,
                    type:'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    formSave:false,
                    type: 'success',           
                    message: response.data.message
                });
            }
            
        })
        .catch(()=>{
            setStatus({
                formSave:false,
                type: 'error',           
                message:"Erro: Não foi possível se conectar a API"
            })
                
        });    
    
    };
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Cadastrar Pedido</h1>
                    </div>

                    <div className="p-2">
                        <Link to="/visualizarpedido" className="btn btn-outline-primary btn-sm">Listar</Link>
                    </div>
                </div>

                <hr className="m-1"/>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>:""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert>:""}


                <Form className="p-2" onSubmit={cadPedido}>
                    <FormGroup className="p-2">
                        <Label>ID</Label>
                        <Input type="text" name="id" placeholder="Id do pedido" onChange={valorInput}></Input>
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>IdCliente</Label>
                        <Input type="text" name="idCliente" placeholder="Id do cliente" onChange={valorInput}></Input>
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>IdServiço</Label>
                        <Input type="text" name="idServico" placeholder="Id do serviço" onChange={valorInput}></Input>
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor" placeholder="Valor do pedido" onChange={valorInput}></Input>
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="text" name="data" placeholder="Data do pedido" onChange={valorInput}></Input>
                    </FormGroup>
                    {status.formSave ?
                    <Button type="submit" outline color="info" disabled>Salvando...
                    <Spinner size="sm" color="info" children/></Button>:
                    <Button type="submit" outline color="info">Cadastrar</Button>}
                </Form>
               
            </Container>
        </div>
    )
}