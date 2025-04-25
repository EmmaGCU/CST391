import React, { useState, useEffect } from 'react'; 
import dataSource from './dataSource';
import QuoteList from './QuoteList';
import TagListItem from './TagListItem';
import { useNavigate, useLocation } from 'react-router-dom';

const EditQuote = (props) => {
    let quote = {
        authorFirst: '',
        authorLast: '',
        text: '',
        comments: '',
        tags: []
    }
    let newQuoteCreation = true;
    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state;
    let addedDate = new Date();
    let quoteId = 0;

    if(data.quote) {
        newQuoteCreation = false;
        quoteId = data.quote.quoteId;
        quote = data.quote;
        addedDate = data.quote.dateAdded;
    }

    const [authorFirst, setAuthorFirst] = useState('');
    const [authorLast, setAuthorLast] = useState('');
    const [text, setText] = useState('');
    const [comments, setComments] = useState('');
    const [tags, setTags] = useState([]);
    const [quoteTags, setQuoteTags] = useState([]);

    const updateAuthorFirst = (event) => {
        setAuthorFirst(event.target.value);
    }
    const updateAuthorLast = (event) => {
        setAuthorLast(event.target.value);
    }
    const updateText = (event) => {
        setText(event.target.value);
    }
    const updateComments = (event) => {
        setComments(event.target.value);
    }

    const updateTags = (tag, isChecked) => {
        if (isChecked) {
            for (let i=0; i<tags.length; i++) {
                if(tags[i].tagId == tag.tagId) {
                    quoteTags.push(tag);
                    break;
                }
            }
        }
        else {
            for (let i=0; i<quoteTags.length; i++) {
                if (quoteTags[i].tagId == tag.tagId) {
                quoteTags.splice(i,1);
                break;
                }
            }
        }
        console.log(JSON.stringify(quoteTags));
    }

    let refresh = false;

    useEffect(() => {
        console.log('*** in refresh search***')
        loadTags();

        if(data.quote) {
            setAuthorFirst(quote.authorFirst);
            setAuthorLast(quote.authorLast);
            setComments(quote.comments);
            setText(quote.text);

            let quoteTagsToAdd = [];
            for (let i=0; i<quote.tags.length; i++) {
                quoteTagsToAdd.push(quote.tags[i]);
            }

            setQuoteTags(quoteTagsToAdd);
        }
    }, [refresh]);

    const loadTags = async () => {
        let response;
        response = await dataSource.get('/tags');
        setTags(response.data);
        console.log("*** refreshed from DB: Tags ***", response.data);
    }

    const tagList = tags.map((tag) => {
        let checked = false;
        console.log(tag);
        if (data.quote != null) {
            for (let i=0; i<data.quote.tags.length; i++) {
                if(tag.tagId == data.quote.tags[i].tagId) {
                    checked=true; 
                    break;
                }
            }
            console.log(checked);
        }
        return (
            <TagListItem tag={tag} checked={checked} onChange={(tag, isChecked) => updateTags(tag, isChecked)}/>
        );
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log("submit");
        const editedQuote = {
            quoteId: quoteId,
            userId: data.user,
            authorFirst: authorFirst,
            authorLast: authorLast,
            text: text,
            comments: comments,
            dateAdded: addedDate,
            tags: quoteTags
        };
        console.log(editedQuote);

        saveQuote(editedQuote);
    };

    const saveQuote= async (quote) => {
        let response;
        if (newQuoteCreation) {
            response = await dataSource.post('/quotes', quote);
            alert('Quote Added');
            navigate('/quotes');
        }
        else {
            response = await dataSource.put('/quotes', quote);
            alert('Quote Updated');
            let updatedQuote=await dataSource.get('/quotes?quoteId='+quote.quoteId);
            console.log("get updated quote from DB ",updatedQuote.data[0]);
            navigate('/quote', {state:{quote:updatedQuote.data[0], user:data.user}});
        }
        //console.log(response);
        //console.log(response.data);
        if (newQuoteCreation) {

        }
        else {

        }
    }

    return (
        <div align="center" style={{marginLeft: 50, marginRight:50}} >
            <div>
                <table width="100%">
                    <colgroup>
                        <col width="50%" />
                        <col width="50%" />
                    </colgroup>
                    <tr width="100%">
                        <td style={{paddingRight: 10}}>
                            <div className="form-group">
                                <label>Text</label>
                                <textarea id="text" rows="3" className="form-control" aria-describedby="helpText" value={text} onChange={updateText} placeholder="Enter the quote text" required name="text"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Comments</label>
                                <textarea id="comments" rows="3" className="form-control" aria-describedby="helpComments" value={comments} onChange={updateComments} placeholder="Enter comments" name="comments"></textarea>
                            </div>
                        </td>
                        <td style={{paddingLeft: 10}}>
                            <div className="form-group">
                                <label>Author First:</label>
                                <input id="authorFirst" type="text" className="form-control" aria-describedby="helpAuthorFirst" value={authorFirst} onChange={updateAuthorFirst} placeholder="Enter the author's first name" 
                                required name="authorFirst" />
                            </div>
                            <div className="form-group">
                                <label>Author Last:</label>
                                <input id="authorLast" type="text" className="form-control" aria-describedby="helpAuthorLast" value={authorLast} onChange={updateAuthorLast} placeholder="Enter the author's last name" required name="authorLast" />
                            </div>
                            <div className="form-group">
                                {tagList}
                            </div>
                            <br />
                            <button className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>   
    );
};

export default EditQuote;