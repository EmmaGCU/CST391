import React, { useState, useEffect } from 'react'; 
import dataSource from './dataSource';
import QuoteList from './QuoteList';
import TagListItem from './TagListItem';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchForm = (props) => { 

    const location = useLocation();
    const data = location.state;

    //alert(props.user);
    const [keywordText, setKeywordText] = useState(""); 
    const [authorText, setAuthorText] = useState(""); 
    const [results, setResults] = useState([]); 
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchData, setSearchData] = useState({
        keyword: '',
        author: '',
        tags: [],
        comments: {
            with: false,
            without: false,
            all: true
        }
    });

    let search = {
        keyword: keywordText,
        author: authorText,
        tags: [],
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

        const setSearch = async () => {
            console.log('Resetting search: ', data.search);
            await setInitialSearch(data.search);
            //performSearch(props.user);
        }
        if (data) {
            if (data.search) {
                setSearch();
            }
        }
    }, [refresh]);

    const loadTags = async () => {
        let response;
        response = await dataSource.get('/tags');
        setTags(response.data);
        console.log("*** refreshed from DB: Tags ***", response.data);
    }

    const setInitialSearch = async (initialData) => {
        await setSearchData(initialData);
    }

    const performSearch = async (userId) => {
        let response;
        //alert("here");
        console.log('performSearch: ', searchData);
        response = await dataSource.post('/quotes/search?userId='+props.user, searchData);
        console.log("*** refreshed from DB search***",response.data);
        setResults(response.data); 
        console.log('performSearch: after: ', searchData);  
    }
    
    const handleChangeKeyword = (event) => { 
        setKeywordText(event.target.value); 
        setSearchData(search);
        console.log(keywordText); 
    }; 

    const handleChangeAuthor = (event) => { 
        setAuthorText(event.target.value); 
        setSearchData(search);
        console.log(authorText); 
    }; 

    const onChangeTag = (tag, isChecked) => { 
        if (isChecked) {
            for (let i=0; i<tags.length; i++) {
                if(tags[i].tagId == tag.tagId) {
                    search.tags.push(tag);
                    break;
                }
            }
        }
        else {
            for (let i=0; i<search.tags.length; i++) {
                if (search.tags[i].tagId == tag.tagId) {
                search.tags.splice(i,1);
                break;
                }
            }
        }
        setSearchData(search);

        //console.log(JSON.stringify(quoteTags));
    }

    const onSelectQuote = (quoteId, navigate) => {
        console.log('Selected quote is ', quoteId);
        props.onClick(quoteId, navigate);
    };
    
    const tagList = tags.map((tag) => {
        let checked = false;
        return (
            <TagListItem tag={tag} checked={checked} onChange={(tag, isChecked) => onChangeTag(tag, isChecked)}/>
        );
    });

    const onSelectComments = (event) => {
        let isChecked = (event.target).checked;
        if (event.target.value == 'comments') {
          search.comments.with = isChecked;
        }
        else {
          search.comments.without = isChecked
        }
        if ((search.comments.with && search.comments.without) || (!search.comments.with && !search.comments.without)) {
          search.comments.all = true;
        }
        else {
          search.comments.all = false;
        }
        setSearchData(search);
        //alert(JSON.stringify(search.comments));
    }
    
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
                                        value="comments" onChange={onSelectComments}/>
                                    <label style={{marginRight: '20px'}}>With Comments</label>
                                    <input type="checkbox" id="noComments" name="noComments" 
                                        value="noComments" onChange={onSelectComments}/>
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
                            <QuoteList quoteList={results} from='/search' search={searchData} user={props.user} onClick={(quoteId, navigate) => onSelectQuote(quoteId, navigate)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ); 
}; 

export default SearchForm;