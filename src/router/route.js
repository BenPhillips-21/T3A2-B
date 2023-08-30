import { Router } from 'express'
const customRouter = Router()

import verifyJWT from '../middleware/verifyJWT.js'
import ROLES_LIST from '../config/roles_list.js'
import verifyRoles from '../middleware/verifyRoles.js'

import * as levelController from '../controllers/levelController.js'
import * as topicController from '../controllers/topicController.js'
import * as videoController from '../controllers/videoController.js'
import * as questionController from '../controllers/questionController.js'
import * as authController from '../controllers/authController.js'
import * as registerController from '../controllers/registerController.js'
import * as refreshTokenController from '../controllers/refreshTokenController.js'
import * as logoutController  from '../controllers/logoutController.js'

// Question routes
customRouter.route('/questions')
    .get(questionController.getQuestions)
    .post(questionController.insertQuestions)
    .delete(questionController.deleteQuestions)

customRouter.route('/questions/:id')
    .put(questionController.updateQuestion)

customRouter.route('/questions/:topic')
    .get(questionController.getQuestionsByTopic)

customRouter.route('/questions/:topic/level/:level')
    .get(verifyJWT, questionController.getQuestionsByTopicAndLevel)

// Video Routes
customRouter.route('/videos')
    .get(videoController.getVideos)
    .post(videoController.insertVideos)
    .delete(videoController.deleteVideos)
    
customRouter.route('/videos/:id')
    .put(videoController.updateVideo)

// Topic Routes
customRouter.route('/topics')
    .get(topicController.getTopics)
    .post(topicController.insertTopics)
    .delete(topicController.deleteTopics)

customRouter.route('/topics/:id')
    .put(topicController.updateTopic)

customRouter.route('/topics/:topicName')
    .get(topicController.getTopicByName)

// "Level Up" route
customRouter.route('/levelup/:username/:topic')
    .put(levelController.levelUp)

// Authentication / Authorization
customRouter.route('/login')
    .post(authController.handleLogin)

customRouter.route('/refresh')
    .get(refreshTokenController.handleRefreshLogin);

customRouter.route('/register')
    .post(registerController.handleNewUser)

customRouter.route('/logout')
    .get(logoutController.handleLogout)

export default customRouter;
