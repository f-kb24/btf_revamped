import React from 'react'
import styled from 'styled-components'
import useSignup from './useSignup'

const Signup: React.FC = () => {
    const [username, setUsername, password, setPassword, submit, error, usernameValid, passwordValid] = useSignup()
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
                {usernameValid ? <div>Username is valid</div> : <div>Username is not valid</div>}
                {passwordValid ? <div>password is valid</div> : <div>password is not valid</div>}
                <button disabled={!usernameValid || !passwordValid}>Submit</button>
                {error && <div>{error}</div>}
            </Form>
        </Container>
    )
}

export default Signup

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

const Message = styled.div`
    padding: 1rem 0rem;
`
