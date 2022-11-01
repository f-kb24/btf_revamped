import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import authApi from '../api/auth'
import pictureApi from '../api/pictures'
import { Link } from 'react-router-dom'

type Pic = {
    id: string
    thumbnail: string
    score: number
    title: string
    author: string
    url: string
    num_comments: number
    reso: { url: string; width: number; height: number }
}

const Home: React.FC = () => {
    const [user, setUser] = useState<{ id: string; username: string; selected: string } | null>(null)
    const [pictures, setPictures] = useState<Pic[] | null>(null)
    const [selectedPicture, setSelectedPicture] = useState<Pic | null>(null)

    useEffect(() => {
        ;(async () => {
            const receivedPictures = await pictureApi.getPictures()
            setPictures(receivedPictures)
            try {
                const response = await authApi.auth()
                setUser(response)
                if (response.selected) {
                    const selectedPic = receivedPictures.filter((pi: any) => pi.id === response.selected)[0]
                    setSelectedPicture(selectedPic)
                }
            } catch (err) {
                // do nothing, just means user not logged in
                // figure out a cleaner way to write this
            }
        })()
    }, [])

    const selectPicture = async (pic: any) => {
        if (selectedPicture?.id === pic.id) {
            setSelectedPicture(null)
            if (user) {
                await authApi.setPicture(null)
            }
        } else {
            setSelectedPicture(pic)
            if (user) {
                await authApi.setPicture(pic.id)
            }
        }
    }

    const logout = async () => {
        if (user) {
            await authApi.logout()
            setUser(null)
        }
    }

    return (
        <Container>
            <Header>
                {user ? (
                    <>
                        <div>{user?.username}</div>
                        <button onClick={logout}>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link style={{ marginRight: '1rem' }} to="/login">
                            Log In
                        </Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </Header>
            <Body>
                <Left>
                    {pictures &&
                        pictures.map((pic: any) => (
                            <PictureElement key={pic.id} onClick={() => selectPicture(pic)}>
                                <div>{pic.score}</div>
                                {pic.thumbnail === 'nsfw' ? <div>Picture is NSFW</div> : <img src={pic.thumbnail} />}
                                <div>{pic.title}</div>
                            </PictureElement>
                        ))}
                </Left>
                <Center>
                    {!selectedPicture ? (
                        <div data-testid="select">Select a Picture</div>
                    ) : (
                        <>
                            <div data-testid="test-title">Title:{selectedPicture.title}</div>
                            {selectedPicture.thumbnail === 'nsfw' ? (
                                <div>Image is NSFW</div>
                            ) : (
                                <img src={selectedPicture.thumbnail} />
                            )}
                            <div>
                                URL:
                                <a href={selectedPicture.url} target="_blank">
                                    {selectedPicture.url}
                                </a>
                            </div>
                            <div data-testid="test-score">score:{selectedPicture.score}</div>
                            <div data-testid="test-author">author:{selectedPicture.author}</div>
                            <div data-testid="test-num-comments">number of comments:{selectedPicture.num_comments}</div>
                        </>
                    )}
                </Center>
                <Right></Right>
            </Body>
        </Container>
    )
}

export default Home

const Header = styled.div`
    padding: 1rem;
    font-weight: 700;
`

const PictureElement = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 250px;
    height: 100vh;
    overflow-y: scroll;
`

const Center = styled.div`
    max-width: 800px;
`
const Right = styled.div``

const Body = styled.div`
    display: flex;
`
