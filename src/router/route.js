import { Router } from 'express'; 
const customRouter = Router(); 
import verifyJWT from '../middleware/verifyJWT.js'
import ROLES_LIST from '../config/roles_list.js'
import verifyRoles from '../middleware/verifyRoles.js'

import * as levelController from '../controllers/levelController.js'
import * as topicController from '../controllers/topicController.js'
import * as videoController from '../controllers/videoController.js'
import * as controller from '../controllers/controller.js'
import * as authController from '../controllers/authController.js'
import * as registerController from '../controllers/registerController.js'
import * as refreshTokenController from '../controllers/refreshTokenController.js'
import * as logoutController  from '../controllers/logoutController.js';

// Questions routes API

customRouter.route('/questions')
    .get(controller.getQuestions)
    .post(controller.insertQuestions)
    .delete(controller.deleteQuestions)

// customRouter.route('/result')
//     .get(controller.getResult)
//     .post(controller.storeResult)
//     .delete(controller.deleteResult)

customRouter.route('/videos')
    .get(videoController.getVideos)
    .post(videoController.insertVideos)
    .delete(videoController.deleteVideos)

customRouter.route('/topics')
    .get(topicController.getTopics)
    .post(topicController.insertTopics)
    .delete(topicController.deleteTopics)

customRouter.route('/questions/:topic')
    .get(controller.getQuestionsByTopic);

customRouter.route('/questions/:topic/level/:level')
    .get(verifyJWT, controller.getQuestionsByTopicAndLevel);

// Authentication / Authorization
customRouter.route('/login')
    .post(authController.handleLogin)

customRouter.route('/refresh')
    .get(refreshTokenController.handleRefreshLogin);

customRouter.route('/register')
    .post(registerController.handleNewUser)

    customRouter.route('/logout')
    .get(logoutController.handleLogout)


customRouter.route('/levelup/:username/:topic')
    .put(levelController.levelUp)


export default customRouter;
