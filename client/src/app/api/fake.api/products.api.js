const typeProduct = {
    pizza: { id: "30rdfjhg82njhf6fg", name: "Пицца" },
    drinks: { id: "22rdca3uereb7f6fg", name: "Напитки" },
    sаuсes: { id: "87rdca4ttp98f6fg", name: "Соусы" }
};

const products = [
    {
        _id: "67rdca3eeb7f6fg",
        name: "Pizza 1",
        image: "https://eda.ru/img/eda/c620x415/s1.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg",
        content: "Lorem ipsum dolor",
        category: typeProduct.pizza,
        price: 610
    },
    {
        _id: "67rdca3eeb7f6fgdasd",
        name: "Pizza 2",
        image: "https://img.delo-vcusa.ru/2017/02/7-vkusnykh-retseptov-pitstsy.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 500
    },
    {
        _id: "67rdca3eeb7f6fgdaasd",
        name: "Pizza 3",
        image: "https://art-lunch.ru/content/uploads/2014/11/pizza_base_01.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 550
    },
    {
        _id: "68rdca3eeb7f6fg",
        name: "Pizza 4",
        image: "https://адм-покровка.рф/wp-content/uploads/top-10-samyh-populyarnyh-vidov-pitstsy-v-mire-3.jpg",
        content: "Lorem ipsum dolor",
        category: typeProduct.pizza,
        price: 700
    },
    {
        _id: "68rdca3eeb7f6fgdasd",
        name: "Pizza 5",
        image: "https://cooklikemary.ru/sites/default/files/img_2246_0.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 699
    },
    {
        _id: "68rdca3eeb7f6fgdaasd",
        name: "Pizza 6",
        image: "https://academy.oetker.ru/upload/resize_cache/iblock/195/750_430_2/19519a82c8131d46d8e7a4718fb7e2d2.png",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 635
    },
    {
        _id: "69rdca3eeb7f6fg",
        name: "Pizza 7",
        image: "https://www.chefmarket.ru/blog/wp-content/uploads/2018/04/picca-pepperoni-e1536061000810.jpg",
        content: "Lorem ipsum dolor",
        category: typeProduct.pizza,
        price: 444
    },
    {
        _id: "69rdca3eeb7f6fgdasd",
        name: "Pizza 8",
        image: "https://klopotenko.com/wp-content/uploads/2020/10/pizza-na-skovorodke_siteweb-1000x600.jpg?v=1626471329",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 555
    },
    {
        _id: "69rdca3eeb7f6fgdaasd",
        name: "Pizza 9",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsSTuQGJKyOkUd7km2lsfugd9JW8V1fnBZg&usqp=CAU",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 666
    },
    {
        _id: "66rdca3eeb7f6fg",
        name: "Pizza 10",
        image: "https://klike.net/uploads/posts/2020-04/1588058477_1.jpg",
        content: "Lorem ipsum dolor",
        category: typeProduct.pizza,
        price: 800
    },
    {
        _id: "66rdca3eeb7f6fgdasd",
        name: "Pizza 11",
        image: "https://jgod.ru/assets/images/products/29/medium600/e99f9f283099290d0edee6e26e60f6dce8627e19.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 900
    },
    {
        _id: "66rdca3eeb7f6fgdaasd",
        name: "Pizza 12",
        image: "https://cdn.7days.ru/pic/70a/971797/1382739/86.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.pizza,
        price: 670
    },
    {
        _id: "66rdctyuyjhb7f6fgdasd",
        name: "Drink 1",
        image: "https://irecommend.ru/sites/default/files/product-images/235864/BY5U1QG3BGdUmRjwApIFA.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.drinks,
        price: 333
    },
    {
        _id: "66rdc343yjhb7f6fgdasd",
        name: "Drink 2",
        image: "https://cdn-img.perekrestok.ru/i/400x400-fit/xdelivery/files/01/4a/dd25c0bf5b867e641deb7xd79c48.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.drinks,
        price: 350
    },
    {
        _id: "33rdct56jhb7f6fgdasd",
        name: "Drink 3",
        image: "https://dvemorkovki.ru/upload/iblock/79a/napitok_chupa_chups_strawberry_0.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.drinks,
        price: 400
    },
    {
        _id: "72rdcty92ihb7f6fgdasd",
        name: "Drink 4",
        image: "https://turumi.ru/wp-content/uploads/2018/08/%D0%BC%D0%B8%D0%BB%D0%BA%D0%B8%D1%81-%D0%BE%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.drinks,
        price: 405
    },
    {
        _id: "88rt0fy92ihb7f6fgdasd",
        name: "Sauce 1",
        image: "https://nakormi.com/wp-content/uploads/2018/08/smetannyj-sous-dlya-piccy-600x397.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.sаuсes,
        price: 199
    },
    {
        _id: "8uiit0fy92ihb7f6fgdasd",
        name: "Sauce 2",
        image: "https://alimero.ru/uploads/images/00/63/09/2018/11/10/ad28de_wmark.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.sаuсes,
        price: 210
    },
    {
        _id: "99dj0fy92ihb7f6fgdasd",
        name: "Sauce 3",
        image: "https://nakormi.com/wp-content/uploads/2019/02/sous-dlya-piccy-iz-ketchupa-i-majoneza-600x397.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.sаuсes,
        price: 150
    },
    {
        _id: "71jf0fy92ihb7f6fgdasd",
        name: "Sauce 4",
        image: "https://testoved.com/images/sous-dlya-piccy-recepty-s-foto-3.jpg",
        content: "Lorem ipsum dolor and etc",
        category: typeProduct.sаuсes,
        price: 125
    }
];
if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("products")));
        }, 2000);
    });

const getProductById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("products")).find(
                    (product) => product._id === id
                )
            );
        }, 1000);
    });

const fetchAllByType = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(typeProduct);
        }, 3000);
    });

export default {
    fetchAll,
    getProductById,
    fetchAllByType
};