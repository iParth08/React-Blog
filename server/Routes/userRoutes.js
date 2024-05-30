import { Router } from "express";
import { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors } from "../Controllers/usersControllers.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const router = Router();

router.get('/test', (req, res, next) => {
    res.json({ message: 'User route works' });
})

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.post('/change-avatar', authMiddleware, changeAvatar)
router.patch('/edit-user', editUser)
router.get('/', getAuthors)

export default router