import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import authApi from '../api/auth'

const Login: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        await authApi.login(username, password)
        navigate('/')
    }
    return (
        <Container>
            <Form onSubmit={submit}>
                <div>
                    {
                        'username + password must only contain numbers, letters, or underscores and must be >= 6 characters'
                    }
                </div>
                <FormElement>
                    <label htmlFor="username">Username</label>
                    <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormElement>
                <FormElement>
                    <label htmlFor="Password">Password</label>
                    <input
                        autoComplete="off"
                        type="password"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormElement>

                <button>Submit</button>
            </Form>
        </Container>
    )
}

export default Login

const Container = styled.div`
    max-width: 250px;
    margin: 0 auto;
    margin-top: 1rem;
`
const Form = styled.form``

const FormElement = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem;
`
