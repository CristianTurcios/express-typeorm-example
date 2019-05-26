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
app.post('/category', [verifyToken, verifyUserRole(['ADMIN'])], createCategory);
app.get('/category', [verifyToken, verifyUserRole(['ADMIN'])], getCategories);
app.get('/category/:id', [verifyToken, verifyUserRole(['ADMIN'])], getCategory);
app.put('/category/:id', [verifyToken, verifyUserRole(['ADMIN'])], updateCategory);
app.delete('/category/:id', [verifyToken, verifyUserRole(['ADMIN'])], deleteCategory);

// Post
app.post('/post', [verifyToken, verifyUserRole(['ADMIN'])], createPost);
app.get('/post', [verifyToken, verifyUserRole(['ADMIN'])], getPosts);
app.get('/post/:id', [verifyToken, verifyUserRole(['ADMIN'])], getPost);
app.put('/post/:id', [verifyToken, verifyUserRole(['ADMIN'])], updatePost);
app.delete('/post/:id', [verifyToken, verifyUserRole(['ADMIN'])], deletePost);

// User
app.post('/user', [verifyToken, verifyUserRole(['ADMIN'])], createUser);
app.get('/user', [verifyToken, verifyUserRole(['ADMIN'])], getUsers);
app.get('/user/:id', [verifyToken, verifyUserRole(['ADMIN'])], getUser);
app.put('/user/:id', [verifyToken, verifyUserRole(['ADMIN'])], updateUser);
app.delete('/user/:id', [verifyToken, verifyUserRole(['ADMIN'])], deleteUser);

// // Auth
app.post('/login', login);
app.get('/change-password', [verifyToken], changePassword);
