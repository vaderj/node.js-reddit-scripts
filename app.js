const colors = require('colors') ;
const http = require('https') ;
const commentsHttp = require('https') ;
const express = require('express') ;

const app = express() ;

app.get('/', (req,res) => {
    res.send('<html><body><h1>Hello</h1></body></html>')
}) ;

app.get('/asd',(req,res)=>{
    
    res.send([1,2,3])
})

app.listen(3000, () => { console.log("Listening on port 3000...") } )

const options = {
    host: 'www.reddit.com',
    port: 443,
    //path: '/api/v1/me',
    //path: '/r/portland/about.json',
    //path: '/api/info.json?id=2qi2i',
    path: '/r/portland/new.json',
    method: 'GET'
} ;


function getComments(threadId)
{
    console.log(`Thread ID: ${threadId}`.red)
    const listComments = {
        host: 'www.reddit.com',
        port: 443,
        path: `/r/Portland/comments/${threadId}/.json`
    }
    
    commentsHttp.request(options, (res) => {
        let commentBody = '' ;
        res.on('data', (chunk) => {
            commentBody += chunk ;
        }) ;

        res.on('end', () => {
            var commentResponce = JSON.parse(commentBody) ;
            console.log(commentResponce.data.children[10].data) ;

            /* for (var i = 0 ; i < commentResponce.data.children.length ; i++ )
            {
                let title = commentResponce.data.children[i].data.title ;
                let id = commentResponce.data.children[i].data.id ;
                console.log(`body: ${commentResponce.data.children[i].data.body}` ) ;
                console.log(`ID: ${id}` ) ;
                console.log("");
                //console.dir()
            } */
            
    //        console.dir(body)
        })
    }).end() ;
}

function makeRequest()
{
    http.request(options, (res) => {
        var body = '' ;
        res.on('data', (chunk) => {
            body += chunk ;
        }) ;

        res.on('end', () => {
            var jsonResponce = JSON.parse(body) ;
            console.log("") ;
            console.log(`Thread Title: ${jsonResponce.data.children[5].data.title}`.underline.red)
            console.log(`Thread  ID:   ${jsonResponce.data.children[5].data.id}`)
            //getComments(jsonResponce.data.children[5].data.id)
            /*for (var i = 0 ; i < jsonResponce.data.children.length ; i++ )
            {
                let title = jsonResponce.data.children[i].data.title ;
                let id = jsonResponce.data.children[i].data.id ;
                console.log(`Thread Title: ${title}` ) ;
                //console.log(`ID: ${id}` ) ;
                //console.log(""); 
                getComments(id) ;
            } */
            
    //        console.dir(body)
        })
    }).end() ;
} ;

//makeRequest() ;
getComments('96q3wq')