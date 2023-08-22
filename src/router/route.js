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

    const topicRouters = [
        { topic: 'coding', path: '/coding' },
        { topic: 'history', path: '/history' },
        // Add more topics as needed
    ];
    
    topicRouters.forEach(topicRouter => {
        const topicRoute = topicRouter.path;
        customRouter.route(`/questions${topicRoute}`)
            .get((req, res) => {
                // Handle topic-specific question fetching here
            })
            .post((req, res) => {
                // Handle topic-specific question insertion here
            })
            .delete((req, res) => {
                // Handle topic-specific question deletion here
            });
    });
    


export default customRouter;
