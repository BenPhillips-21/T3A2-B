import { Router } from 'express'; 
const customRouter = Router(); 

import * as controller from '../controllers/controller.js'
import * as authController from '../controllers/authController.js'
import * as registerController from '../controllers/registerController.js'

// Questions routes API


customRouter.route('/questions')
    .get(controller.getQuestions)
    .post(controller.insertQuestions)
    .delete(controller.deleteQuestions)

customRouter.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.deleteResult)

customRouter.route('/questions/:topic')
    .get(controller.getQuestionsByTopic);

customRouter.route('/questions/:topic/level/:level')
    .get(controller.getQuestionsByTopicAndLevel);

// Authentication / Authorization
customRouter.route('/login')
    .post(authController.handleLogin)

customRouter.route('/register')
    .post(registerController.handleNewUser)



export default customRouter;
