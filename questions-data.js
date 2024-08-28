module.exports = [
    {
        question: "What type of cuisine are you feeling?",
        options: [
            { text: "Chinese", shortenedAnswer: "Chinese", label: "cuisineType"},
            { text: "Thai", shortenedAnswer: "Thai", label: "cuisineType"},
            { text: "Italian", shortenedAnswer: "Italian", label: "cuisineType"},
            { text: "Japanese", shortenedAnswer: "Japanese", label: "cuisineType"},
            { text: "Mexican", shortenedAnswer: "Mexican", label: "cuisineType"},
            { text: "Indian", shortenedAnswer: "Indian", label: "cuisineType"}
        ]
    },
    {
        question: "How far are you thinking?",
        options: [
            { text: "Deliver to me", shortenedAnswer: "100", label: "distance"},
            { text: "Walking distance", shortenedAnswer: "5", label: "distance"},
            { text: "Drive closeby", shortenedAnswer: "10", label: "distance"},
            { text: "Anywhere", shortenedAnswer: "200", label: "distance"},
        ]
    },
    {
        question: "Psst. Any tensions here?",
        options: [
            { text: "I'm mad at my partner", shortenedAnswer: "immad", label: "tension"},
            { text: "My partner is mad at me", shortenedAnswer: "introuble",label: "tension"},
            { text: "We're fine. Just Hangry.", shortenedAnswer: "na",label: "tension"},
            { text: "Not sure", shortenedAnswer: "na", label: "tension"},
        ]
    }
]