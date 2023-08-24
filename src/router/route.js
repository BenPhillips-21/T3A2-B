import { Router } from 'express'; 
const customRouter = Router(); 

import * as controller from '/home/ben/projects/js/T3A2-B/src/controllers/controller.js'

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

export default customRouter;
