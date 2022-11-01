import React, { useEffect, useState } from 'react'
import authApi from '../api/auth'
import { useNavigate } from 'react-router-dom'

export default () => {
    const [username, setUsername] = useState('')
    const [usernameValid, setUsernameValid] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const navigate = useNavigate()

    const alphanumregex = /^[a-zA-Z0-9_]*$/
    useEffect(() => {
        if (username.length >= 6 && alphanumregex.test(username)) {
            setUsernameValid(true)
        } else {
            setUsernameValid(false)
        }
    }, [username])

    useEffect(() => {
        if (password.length >= 6 && alphanumregex.test(password)) {
            setPasswordValid(true)
        } else {
            setPasswordValid(false)
        }
    }, [password])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (usernameValid && passwordValid) {
            try {
                await authApi.createUser(username, password)
                await authApi.login(username, password)
                navigate('/')
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                }
            }
        }
        // no need for else because button will be disabled
    }

    return [username, setUsername, password, setPassword, submit, error, usernameValid, passwordValid] as const
}
