import React, { useEffect, useState, setState } from 'react';
//import ReactDOM from 'react-dom';
//import {StrictMode} from 'react';
//import {createRoot} from 'react-dom/client';
//import Card from './Card';
import './App.css';
//import SearchAlbum from './SearchAlbum';
import dataSource from './dataSource';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import NavBar from './NavBar';
import EditQuote from './EditQuote';
import Quote from './Quote';
import AddQuote from './AddQuote';
import QuoteListAll from './QuoteListAll';
import Login from './Login';
import SignUp from './SignUp';
import SearchForm from './searchForm';
import PrivateRoute from './PrivateRoute';

const App = (props) => {
    const [currentUser, setCurrentUser] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [quoteList, setQuoteList] = useState([]);
    const [currentlySelectedQuoteIndex, setCurrentlySelectedQuoteIndex] = useState(0);

    console.log('---- APP is reloading ----');

    let refresh = false;
    let userQuotes = [];
    
    // useEffect(() => {
    //     console.log('*** in refresh ***')
    //     loadQuotes(currentUser);
    // }, [refresh]);

    // const loadQuotes = async (userId) => {
    //     let response;
    //     response = await dataSource.get('/quotes?userId='+userId);
    //     setQuoteList(response.data);
    //     console.log("*** refreshed from DB ***",response.data);
    // }

    const handleLogin = async (from, navigate, username, pass) => {
        //alert(username + ", " + pass);
        let userInfo;
        userInfo = await dataSource.get('/users?username='+username);
        //alert(userInfo.data[0].password);
        if (userInfo.data.length > 0 && userInfo.data[0].password === pass) {
            alert(userInfo.data[0].userId);
            setCurrentUser(userInfo.data[0].userId);
            setIsLoggedIn(true);
            generateQuoteList(userInfo.data[0].userId);
            navigate(from, { replace: true });
        }
        else {
            alert('Login Failed');
        }
    };

    const onSelectQuote = (quoteId, navigate) => {
        console.log('QuoteId', quoteId);
        for(let i=0; i<quoteList.length; i++) {
            if (quoteList[i].quoteId === quoteId) {
                setCurrentlySelectedQuoteIndex(i);
                console.log("Found quote ID",quoteId," at index ",i);
            }
        }
        navigate('/quote')
    }

    const generateQuoteList = (userId) => {
        //alert('Hello from generateQuoteList');
        userQuotes = [];
        for (let i=0; i<quoteList.length; i++) {
            if (quoteList[i].userId == userId) {
                userQuotes.push(quoteList[i]);
            }
        }
        //alert(JSON.stringify(userQuotes));
    }

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<RootElement />}/>
                    <Route
                        path='/login'
                        element={
                            <Login user={currentUser} onClick={(from, navigate, username, pass) => handleLogin(from, navigate, username, pass)}/>
                        }
                    />
                    <Route
                        path='/signup'
                        element={
                            <SignUp />
                        }
                    />
                    <Route
                        path='/add'
                        element={
                            <AddQuote user={currentUser}/>
                        }
                    />
                    <Route
                        path='/quotes'
                        element={
                            <QuoteListAll user={currentUser} onClick={(quoteId, navigate) => onSelectQuote(quoteId, navigate)}/>
                        }
                    />
                    <Route
                        path='/search'
                        element={
                            <SearchForm user={currentUser} onClick={(quoteId, navigate) => onSelectQuote(quoteId, navigate)}/>
                        }
                    />
                    <Route
                        path='/quote'
                        element={
                            <Quote user={currentUser} quote={quoteList[currentlySelectedQuoteIndex]} />
                        }
                    />
                    <Route
                        path='/edit'
                        element={
                            <EditQuote user={currentUser} quote={quoteList[currentlySelectedQuoteIndex]} />
                        }
                    />
                </Routes>
                <h3>Welcome to Quote Collector</h3>
            </BrowserRouter>
        </>
    );
};

const RootElement = () => <span></span>;

export default App;