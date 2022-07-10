const categories = [
    {
        id: 1,
        img: require('../assets/milk.png'),
        heading: 'Milk',
        paragraph: '2 items will expire soon!',
        backgroundColor: '#F6AFB0',
        expired: true,
        color: 'red',
    },
    {
        id: 2,
        img: require('../assets/canned.png'),
        heading: 'Canned food',
        paragraph: '5 items will expire soon!',
        backgroundColor: '#80CEEE',
        expired: true,
        color: 'red',
    },
    {
        id: 3,
        img: require('../assets/vegetable.png'),
        heading: 'Vegetables',
        paragraph: 'All items are fine!',
        backgroundColor: '#8ECC81',
        expired: false,
        color: 'red',
    }
];

const transactions = [
    {
        id: 1,
        img: require('../assets/recipe1.png'),
        heading: 'Recipe 1',
        price: '5 ingredients used',
        backgroundColor: '#F6AFB0',
    },
    {
        id: 2,
        img: require('../assets/recipe2.png'),
        heading: 'Recipe 2',
        price: '3 ingredients used',
        backgroundColor: '#8ECC81',
    },
    {
        id: 3,
        img: require('../assets/recipe3.png'),
        heading: 'Recipe 3',
        price: '7 ingredients used',
        backgroundColor: '#80CEEE',
    }
];

const transfer = [
    {
        id: 1,
        img: require('../assets/adaptive-icon.png'),
        heading: 'You send',
        price: 'R 149 000',
        isSending: true,
    },
    {
        id: 2,
        img: require('../assets/vegetable.png'),
        heading: 'They receive',
        price: '$ 9 197,53',
        isSending: false,
    }
];

const cards = [
    {
        id: 1,
        img: require('../assets/adaptive-icon.png'),
        price: 'R 149 000',
        cardNum: '8757197138425741',
        backgroundColor: '#80CEEE',
    },
    {
        id: 2,
        img: require('../assets/adaptive-icon.png'),
        price: '$ 9 197,53',
        cardNum: '8757197138425741',
        backgroundColor: '#8ECC81',
    },
    {
        id: 3,
        img: require('../assets/adaptive-icon.png'),
        price: '$ 9 197,53',
        cardNum: '8757197138425741',
        backgroundColor: '#80CEEE',
    }
]

export {categories, transactions, transfer, cards}