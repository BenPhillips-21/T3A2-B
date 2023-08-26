import { Router } from 'express'; 
const customRouter = Router(); 
import verifyJWT from '../middleware/verifyJWT.js'
import ROLES_LIST from '../config/roles_list.js'
import verifyRoles from '../middleware/verifyRoles.js'

import * as controller from '../controllers/controller.js'
import * as authController from '../controllers/authController.js'
import * as registerController from '../controllers/registerController.js'
import handleRefreshLogin from '../controllers/refreshTokenController.js'
import { handleLogout }  from '../controllers/logoutController.js';

// Questions routes API

customRouter.route('/questions')
    .get(controller.getQuestions)
    .post(verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), controller.insertQuestions)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), controller.deleteQuestions)

// customRouter.route('/result')
//     .get(controller.getResult)
//     .post(controller.storeResult)
//     .delete(controller.deleteResult)

customRouter.route('/questions/:topic')
    .get(controller.getQuestionsByTopic);

customRouter.route('/questions/:topic/level/:level')
    .get(verifyJWT, controller.getQuestionsByTopicAndLevel);

// Authentication / Authorization
customRouter.route('/login')
    .post(authController.handleLogin)

customRouter.route('/logout')
    .get(handleLogout)

customRouter.route('/refresh')
    .get(handleRefreshLogin);

customRouter.route('/register')
    .post(registerController.handleNewUser)



export default customRouter;
