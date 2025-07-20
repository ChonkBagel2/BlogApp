// Create a basic web server setup using Express 
import bodyParser from 'body-parser';
import express from 'express';




const app = express()
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true })); 
app.use( express.static('public') ); 


const userPosts = [{ 
    id: 1,
    title: 'Working or not',
    content: 'adfadfaf',
    author: 'Angela Yu' 
}, 
{
    id: 2,
    title: 'Working or not 2',
    content: 'adfadfaf',
    author: 'Angela Yu'
}] 




let blogs = []; 
let currentId = 1; 


app.get('/', function (req, response) {

    response.send('Server is working'); 
})


app.get('/posts', function (req, response) {

    response.render('home.ejs', { 
        posts : blogs
    });
}) 


app.get('/posts/:id', function ( req, response ) { 


    const postId = parseInt( req.params.id ); 

    // find the post with the postId and send it's data to this page 

    const post = blogs.find( function( blog ) {
        return blog.id === postId; 
    })

    response.render('post.ejs', post ); 
})


app.get('/create', function ( req, response ) { 

    response.render('create.ejs'); 
})


app.post('/new-post', function( req, response ) { 

    // validate the inputs by the user
    // create new post and add it to the blogs list 

    const newBlog = {
        id : currentId, 
        title : req.body['title'], 
        author : req.body['author'], 
        content : req.body['content'] 
    } 


    currentId += 1; 
    blogs.push( newBlog ); 


    response.redirect('/posts');
})


app.post('/edit/:id', function( req, response ) { 

    // validate the new edited fields 
    // update the blogs list 
    
    const editId = parseInt( req.params.id ); 

    // find the post and send it along with the new render 
    // so that we can have pre-filled forms 

    const post = blogs.find( function ( blog ) {
        return blog.id === editId; 
    })


    response.render( 'create.ejs', {
        edit: true,
        post: post 
    }) 
})


app.post('/edit-new/:id', function( req, response ) { 


    const editId = parseInt( req.params.id ); 

    // find the index of the old post and replace it with the new post 

    const oldIndex = blogs.findIndex( function ( blog ) {
        return blog.id === editId 
    }); 

    const editedTitle = req.body['title'] 
    const editedAuthor = req.body['author'] 
    const editedContent = req.body['content'] 


    const newPost = {
        id: editId,
        title: editedTitle, 
        author: editedAuthor, 
        content: editedContent
    }


    blogs[ oldIndex ] = newPost; 

    response.redirect('/posts'); 
}); 


app.post('/delete/:id', function( req, response ) { 

    // find the post the user wants to delete 
    // delete from blog list 

    console.log( 'delete route ' ); 

    const postId = parseInt( req.params.id ); 

    const blogIndex = blogs.findIndex( function ( blog ) { 
        return blog.id === postId
    });

    blogs.splice( blogIndex, 1 ); 

    // splice is in-place whereas filter is not 

    response.redirect('/posts'); 
})




app.listen(port, function () {
    console.log(`Server started on port ${port}`);
})




