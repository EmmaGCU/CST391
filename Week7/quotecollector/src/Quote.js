import React from "react";
import { useLocation } from "react-router-dom";

const Quote = (props) => {

    const location = useLocation();
    const data = location.state;

    console.log('in Quote, props = ', props);
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
                                            <li >{data.quote.tags.tagName}</li>
                                        </ul>
                                        <br />
                                        <button className="btn btn-primary" style={{marginRight: 10}}>Edit</button>
                                        <button className="btn btn-primary" style={{marginRight: 10}}>Delete</button>
                                        <button className="btn btn-primary" style={{marginRight: 10}}>Back</button>
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