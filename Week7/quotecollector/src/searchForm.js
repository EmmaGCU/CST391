import React, { useState, useEffect } from 'react'; 
import dataSource from './dataSource';
import QuoteList from './QuoteList';
import TagListItem from './TagListItem';
import { useNavigate } from 'react-router-dom';

const SearchForm = (props) => { 
    const [keywordText, setKeywordText] = useState(""); 
    const [authorText, setAuthorText] = useState(""); 
    const [results, setResults] = useState([]); 
    const [tags, setTags] = useState([]);

    let search = {
        keyword: keywordText,
        author: authorText,
        tags: tags,
        comments: {
            with: false,
            without: false,
            all: true
        }
      }

    let refresh = false;
    let navigate = useNavigate();
    
    useEffect(() => {
        console.log('*** in refresh search***')
        loadTags();
    }, [refresh]);

    const loadTags = async () => {
        let response;
        response = await dataSource.get('/tags');
        setTags(response.data);
        console.log("*** refreshed from DB: Tags ***", response.data);
    }

    const performSearch = async (userId) => {
        let response;
        //alert("here");
        response = await dataSource.post('/quotes/search?userId=1', search);
        console.log("*** refreshed from DB search***",response.data);
        setResults(response.data);   
    }
    
    const handleChangeKeyword = (event) => { 
        setKeywordText(event.target.value); 
        console.log(keywordText); 
    }; 

    const handleChangeAuthor = (event) => { 
        setAuthorText(event.target.value); 
        console.log(authorText); 
    }; 

    const onChangeTag = (event) => {

    }

    const onSelectQuote = (quoteId, navigate) => {
        console.log('Selected quote is ', quoteId);
        props.onClick(quoteId, navigate);
    };
    
    const tagList = tags.map((tag) => {
        //console.log('bulding checkbox for tag id ', tag.tagId);
        //const x = quote.quoteId;
        return (
            <TagListItem tag={tag} onChange={(tagId) => onChangeTag(tagId)}/>
        );
    });
    
    return ( 
        <div align="center" style={{marginLeft: '50px', marginRight: '50px'}}>
            <table width="100%">
                <colgroup>
                    <col style={{width: '50%'}} />
                    <col style={{width: '50%'}} />
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <div className="form-group">
                                    <label><b>Keyword: </b></label>
                                    <input id="keyword" className="form-control" aria-describedby="helpKeyword" onChange={handleChangeKeyword} placeholder="Enter a keyword" name="keyword"/>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label><b>Author: </b></label>
                                    <input id="author" className="form-control" aria-describedby="helpAuthor" onChange={handleChangeAuthor} placeholder="Enter author name" name="author"/>
                                </div>
                                <br />
                                <b>Search for quotes: </b>
                                <div className="form-group">
                                    <input type="checkbox" id="comments" name="comments" 
                                        value="comments" />
                                    <label style={{marginRight: '20px'}}>With Comments</label>
                                    <input type="checkbox" id="noComments" name="noComments" 
                                        value="noComments" />
                                    <label>No Comments</label>
                                </div>
                                <br />
                                <b>Tags:</b>
                                <div className="form-group">
                                    {tagList}
                                </div>
                                <br />
                                <button className="btn btn-primary" onClick={() => performSearch(props.user)}>Search</button>
                            </div>
                        </td>
                        <td style={{paddingLeft: '20px', verticalAlign: 'top', textAlign: 'center'}}>
                            <h4>Results:</h4>
                            <QuoteList quoteList={results} user={props.user} onClick={(quoteId, navigate) => onSelectQuote(quoteId, navigate)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ); 
}; 

export default SearchForm;