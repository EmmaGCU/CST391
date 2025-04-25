import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dataSource from "./dataSource";

const Quote = (props) => {

    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    console.log("in Quote, data = ",data);

    const tags = data.quote.tags.map((tag) => {
        return (
            <li>{tag.name}</li>
        );
    });

    const onClickEdit = () => {
        navigate('/edit', {state:{quote:data.quote, user:data.quote.userId}})
    }

    const onClickDelete = async (quoteId) => {
        await dataSource.delete('/quotes/'+quoteId);
        alert('Quote Deleted!');
        navigate('/quotes')
    }

    const onClickBack = () => {
        if (data.from === '/quotes') {
            navigate(data.from);
        }
        else {
            console.log('Quote clickBack search: ', data.search);
            navigate(data.from, {state:{search:data.search}});
        }
    }

    //console.log('in Quote, props = ', props);
    return (
        <div align="center">
            <div className="card mb-6" style={{maxWidth: 700}}>
                <div className="row no-gutters">
                    <table>
                        <colgroup>
                            <col style={{width: '60%'}} />
                            <col style={{width: '40%'}} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>
                                    <div style={{textAlign: 'center'}}>
                                        <div>
                                            <b>{data.quote.text}</b>
                                        </div>
                                        <br />
                                        <div>
                                            {data.quote.comments}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="card-body">
                                        <div>
                                            <b>Date Added:</b> {data.quote.dateAdded}
                                        </div>
                                        <div>
                                            <b>Author:</b> {data.quote.authorFirst} {data.quote.authorLast}
                                        </div>
                                        <b>Tags:</b>
                                        <ul>
                                            <li >{tags}</li>
                                        </ul>
                                        <br />
                                        <button className="btn btn-primary" onClick={() => onClickEdit()} style={{marginRight: 10}}>Edit</button>
                                        <button className="btn btn-primary" onClick={() => onClickDelete(data.quote.quoteId)} style={{marginRight: 10}} >Delete</button>
                                        <button className="btn btn-primary" onClick={() => onClickBack()}style={{marginRight: 10}}>Back</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Quote;