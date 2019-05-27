import app from './app';
import {
    getAll as getCategories,
    getOne as getCategory,
    post as createCategory,
    put as updateCategory,
    remove as deleteCategory,
} from './controllers/category';

import {
    getAll as getPosts,
    getOne as getPost,
    post as createPost,
    put as updatePost,
    remove as deletePost,
} from './controllers/post';

import {
    getAll as getUsers,
    getOne as getUser,
    post as createUser,
    put as updateUser,
    remove as deleteUser,
} from './controllers/user';

import { changePassword, login } from './controllers/auth';
import { verifyToken } from './midlewares/verifyToken';
import { verifyUserRole } from './midlewares/verifyUserRole';

app.get('/', (req, res) => {
    res.send({
        liu: 'Laureate International Universities',
    });
});

// App Routes below

// Category
app.post('/category', [verifyToken, verifyUserRole(['Admin', 'Editor'])], createCategory);
app.get('/category', [verifyToken, verifyUserRole(['Admin', 'Editor', 'Viewer'])], getCategories);
app.get('/category/:id', [verifyToken, verifyUserRole(['Admin', 'Editor', 'Viewer'])], getCategory);
app.put('/category/:id', [verifyToken, verifyUserRole(['Admin', 'Editor'])], updateCategory);
app.delete('/category/:id', [verifyToken, verifyUserRole(['Admin', 'Editor'])], deleteCategory);

// Post
app.post('/post', [verifyToken, verifyUserRole(['Admin', 'Editor'])], createPost);
app.get('/post', [verifyToken], getPosts);
app.get('/post/:id', [verifyToken, verifyUserRole(['Admin', 'Editor', 'Viewer'])], getPost);
app.put('/post/:id', [verifyToken, verifyUserRole(['Admin', 'Editor'])], updatePost);
app.delete('/post/:id', [verifyToken, verifyUserRole(['Admin', 'Editor'])], deletePost);

// User
app.post('/user', [verifyToken, verifyUserRole(['Admin'])], createUser);
app.get('/user', [verifyToken, verifyUserRole(['Admin'])], getUsers);
app.get('/user/:id', [verifyToken, verifyUserRole(['Admin'])], getUser);
app.put('/user/:id', [verifyToken, verifyUserRole(['Admin'])], updateUser);
app.delete('/user/:id', [verifyToken, verifyUserRole(['Admin'])], deleteUser);

// // Auth
app.post('/login', login);
app.get('/change-password', [verifyToken], changePassword);
