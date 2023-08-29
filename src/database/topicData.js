const topics = [
    {
        topicName: 'Coding',
        topicID: 1,
        topicLevel: 1,
        questions: [
                {
                    topic: 'coding',
                    question: "Javascript is an _______ language",
                    level: 2,
                    options: [
                        'Object-Oriented',
                        'Object-Based',
                        'Procedural',
                        'Object-Processing',
                    ],
                    answer: 'Object-Oriented'
                },
                {
                    topic: 'coding',
                    question: "Following methods can be used to display data in some form using Javascript",
                    level: 2,
                    options: [
                        'document.write()',
                        'console.log()',
                        'window.alert()',
                        'print()',
                    ],
                    answer: 'console.log()'
                }
        ],
        videos: [
            {
                topic: 'coding',
                level: 2,
                link: 'https://www.youtube.com/watch?v=Y1IgAEejvqM',
                videoTitle: 'Just Ken'
            }
        ]
    }
]

export default topics