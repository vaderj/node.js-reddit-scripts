const colors = require('colors') ;
const http = require('https') ;

//Start of reddit related stuff 

const options = {
    host: 'www.reddit.com',
    port: 443,
    //path: '/api/v1/me',
    //path: '/r/portland/about.json',
    //path: '/api/info.json?id=2qi2i',
    path: '/r/portland/new.json',
    method: 'GET'
} ;


function getComments(subredditName,threadId,limit,sort)
{
    console.log(`Thread ID: ${threadId}`.red)
    const listComments = {
        host: 'www.reddit.com',
        port: 443,
        path: `/r/${subredditName}/comments/${threadId}/new/.json?limit=${limit}&sort=${sort}`
    }
    
    http.request(listComments, (res) => {
        let commentBody = '' ;
        res.on('data', (chunk) => {
            commentBody += chunk ;
        }) ;

        res.on('end', () => {
            var commentResponce = JSON.parse(commentBody) ;
            /*console.log(commentResponce.data.children[1].data.id) ;
            console.log(commentResponce.data.children[1].data.title) ;
            console.log(commentResponce.data.children[1].data.selftext) ;
            console.log(commentResponce.data.children[1].data) ; */
            console.log(commentResponce) ;

            for (var i = 0 ; i < commentResponce.length ; i++ )
            {
                for (var j = 0 ; j < commentResponce[i].data.children.length ; j++)
                {
                    console.log("") ;
                    console.log(commentResponce[i].data.children.length)
                    var val = j+1 ;
                    console.log(val + "".bold) ;
                    console.log(`author: ${commentResponce[i].data.children[j].data.author}`.red + `comment id: ${commentResponce[i].data.children[j].data.id}`.cyan) ;
                    console.log(`score: ${commentResponce[i].data.children[j].data.score}`.magenta + `ups: ${commentResponce[i].data.children[j].data.ups}`.magenta) ;
/*                    console.log() ;
                    console.log() ;
*/                  console.log(`comment: ${commentResponce[i].data.children[j].data.body}`.cyan) ;
                    console.log("*************************************************************")

                }
            } 
            
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
getComments('politics','97bc5s',"100","controversial") //options for sort order: hot,new,rising,controversial,top,guided
