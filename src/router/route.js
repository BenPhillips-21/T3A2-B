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
import * as logoutController  from '../controllers/logoutController.js'

// Question routes
customRouter.route('/questions')
    .get(verifyJWT, questionController.getQuestions)
    .post(verifyJWT, verifyRoles(ROLES_LIST.Admin), questionController.insertQuestions)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), questionController.deleteQuestions)

customRouter.route('/questions/:id')
    .put(verifyJWT, verifyRoles(ROLES_LIST.Admin), questionController.updateQuestion)

customRouter.route('/questions/:topic')
    .get(verifyJWT, questionController.getQuestionsByTopic)

customRouter.route('/questions/:topic/level/:level')
    .get(verifyJWT, questionController.getQuestionsByTopicAndLevel)

// Video Routes
customRouter.route('/videos')
    .get(verifyJWT, videoController.getVideos)
    .post(verifyJWT, verifyRoles(ROLES_LIST.Admin), videoController.insertVideos)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), videoController.deleteVideos)
    
customRouter.route('/videos/:id')
    .put(verifyJWT, verifyRoles(ROLES_LIST.Admin), videoController.updateVideo)

// Topic Routes
customRouter.route('/topics')
    .get(verifyJWT, topicController.getTopics)
    .post(verifyJWT, verifyRoles(ROLES_LIST.Admin), topicController.insertTopics)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), topicController.deleteTopics)

customRouter.route('/topics/:id')
    .put(verifyJWT, verifyRoles(ROLES_LIST.Admin), topicController.updateTopic)

customRouter.route('/topics/:topicName')
    .get(verifyJWT, topicController.getTopicByName)

customRouter.route('/topics/:topicName/:topicLevel')
    .get(topicController.getTopicByNameAndLevel)

// "Level Up" route
customRouter.route('/levelup/:username')
    .put(verifyJWT, levelController.levelUp)

// Authentication / Authorization
customRouter.route('/login')
    .post(authController.handleLogin)

customRouter.route('/user/:username')
    .get(authController.getSpecificUser)

customRouter.route('/register')
    .post(registerController.handleNewUser)

customRouter.route('/logout')
    .get(logoutController.handleLogout)

export default customRouter;
